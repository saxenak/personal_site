import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CLINIC_PROGRAMS, DISCOUNT_CONFIG, SelectedProgram } from '@/lib/stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-09-30.clover',
});

export async function POST(req: NextRequest) {
  try {
    console.log('🔧 Clinics Checkout API called');

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ STRIPE_SECRET_KEY not found');
      return NextResponse.json({ error: 'Stripe configuration missing' }, { status: 500 });
    }

    const { selectedPrograms, promoCode, personalInfo }: {
      selectedPrograms: SelectedProgram[];
      promoCode?: string;
      personalInfo?: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        organization?: string;
      };
    } = await req.json();

    console.log('📦 Selected programs:', selectedPrograms);
    console.log('🎟️ Promo code:', promoCode || 'none');

    if (!selectedPrograms || selectedPrograms.length === 0) {
      return NextResponse.json({ error: 'No programs selected' }, { status: 400 });
    }

    // Build line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const selected of selectedPrograms) {
      const program = CLINIC_PROGRAMS[selected.programId as keyof typeof CLINIC_PROGRAMS];
      if (!program) {
        console.error('❌ Program not found:', selected.programId);
        continue;
      }

      const tier = program.tiers[selected.tier];
      let unitAmount: number;
      let quantity: number;

      // Check if this is per-person pricing
      if ('pricePerPerson' in tier && selected.participantCount) {
        unitAmount = tier.pricePerPerson;
        quantity = selected.participantCount;
      } else if ('price' in tier) {
        unitAmount = tier.price;
        quantity = 1;
      } else {
        console.error('❌ Invalid tier configuration for:', selected.programId);
        continue;
      }

      lineItems.push({
        price_data: {
          currency: 'cad',
          product_data: {
            name: tier.name,
            description: tier.description,
            metadata: {
              programId: selected.programId,
              tier: selected.tier,
            },
          },
          unit_amount: unitAmount,
        },
        quantity,
      });
    }

    if (lineItems.length === 0) {
      return NextResponse.json({ error: 'No valid programs to checkout' }, { status: 400 });
    }

    // Calculate subtotal
    let subtotal = 0;
    for (const selected of selectedPrograms) {
      const program = CLINIC_PROGRAMS[selected.programId as keyof typeof CLINIC_PROGRAMS];
      if (!program) continue;

      const tier = program.tiers[selected.tier];
      if ('pricePerPerson' in tier && selected.participantCount) {
        subtotal += tier.pricePerPerson * selected.participantCount;
      } else if ('price' in tier) {
        subtotal += tier.price;
      }
    }

    // Handle discounts
    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
    let combinedDiscountPercent = 0;

    // Bundle discount: 20% off when 2+ programs selected
    if (selectedPrograms.length >= DISCOUNT_CONFIG.bundleThreshold) {
      console.log('🎁 Applying bundle discount (20%)');
      combinedDiscountPercent += DISCOUNT_CONFIG.bundleDiscountPercent;
    }

    // School discount via promo code
    let schoolDiscountPercent = 0;
    if (promoCode) {
      try {
        console.log('🔍 Looking up promo code:', promoCode);
        const promotionCodes = await stripe.promotionCodes.list({
          code: promoCode.toUpperCase(),
          active: true,
        });

        if (promotionCodes.data.length > 0) {
          console.log('✅ Valid promo code found');
          const promotionCode = promotionCodes.data[0] as any;
          const percentOff = promotionCode.coupon?.percent_off;
          if (percentOff) {
            schoolDiscountPercent = percentOff;
            combinedDiscountPercent += schoolDiscountPercent;
            console.log(`📊 Combined discount: ${combinedDiscountPercent}%`);
          }
        } else {
          console.log('⚠️ Promo code not found or inactive');
        }
      } catch (err) {
        console.error('⚠️ Promo code lookup failed:', err);
      }
    }

    // Apply combined discount as a single coupon
    if (combinedDiscountPercent > 0) {
      // Cap discount at 100%
      const finalDiscountPercent = Math.min(combinedDiscountPercent, 100);
      const discountCoupon = await stripe.coupons.create({
        percent_off: finalDiscountPercent,
        duration: 'once',
        name: `Discount (${finalDiscountPercent}%)`,
      });
      discounts.push({ coupon: discountCoupon.id });
      console.log(`✅ Applied combined discount: ${finalDiscountPercent}%`);
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      discounts: discounts.length > 0 ? discounts : undefined,
      allow_promotion_codes: false, // Disable manual promo entry since we're handling it
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects/clinics/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects/clinics/checkout`,
      customer_creation: 'always',
      billing_address_collection: 'required',
      metadata: {
        type: 'clinics-bundle',
        programs: JSON.stringify(selectedPrograms),
        programCount: selectedPrograms.length.toString(),
        hasBundle: (selectedPrograms.length >= DISCOUNT_CONFIG.bundleThreshold).toString(),
        hasPromoCode: (!!promoCode).toString(),
        discountPercent: combinedDiscountPercent.toString(),
        personalInfo: JSON.stringify(personalInfo),
      },
      payment_intent_data: {
        statement_descriptor: 'KIRTI CLINICS',
      },
      custom_text: {
        submit: {
          message: 'Complete your clinic booking. You will receive confirmation within 48 hours.',
        },
      },
    });

    console.log('✅ Checkout session created:', session.id);
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('❌ Clinics checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}
