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

    const { selectedPrograms, personalInfo }: {
      selectedPrograms: SelectedProgram[];
      personalInfo?: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        organization?: string;
        role?: string;
        preferredDates?: string;
      };
    } = await req.json();

    console.log('📦 Selected programs:', selectedPrograms);

    if (!selectedPrograms || selectedPrograms.length === 0) {
      return NextResponse.json({ error: 'No programs selected' }, { status: 400 });
    }

    // Build line items (50% DEPOSIT ONLY)
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let fullTotal = 0;

    for (const selected of selectedPrograms) {
      const program = CLINIC_PROGRAMS[selected.programId as keyof typeof CLINIC_PROGRAMS];
      if (!program) {
        console.error('❌ Program not found:', selected.programId);
        continue;
      }

      const tier = program.tiers[selected.tier];
      const packageQuantity = selected.quantity || 1;
      let fullUnitAmount: number;
      let lineQuantity: number;

      // Check if this is per-person pricing
      if ('pricePerPerson' in tier && selected.participantCount) {
        fullUnitAmount = tier.pricePerPerson;
        lineQuantity = selected.participantCount * packageQuantity;
      } else if ('price' in tier) {
        fullUnitAmount = tier.price;
        lineQuantity = packageQuantity;
      } else {
        console.error('❌ Invalid tier configuration for:', selected.programId);
        continue;
      }

      // Calculate 50% deposit amount
      const depositAmount = Math.round(fullUnitAmount / 2);
      fullTotal += fullUnitAmount * lineQuantity;

      const itemName = packageQuantity > 1
        ? `${packageQuantity}x ${tier.name} (50% Deposit)`
        : `${tier.name} (50% Deposit)`;

      lineItems.push({
        price_data: {
          currency: 'cad',
          product_data: {
            name: itemName,
            description: `${tier.description} | Full price: $${(fullUnitAmount / 100).toFixed(2)} | Remaining balance due after program`,
            metadata: {
              programId: selected.programId,
              tier: selected.tier,
              packageQuantity: packageQuantity.toString(),
              fullUnitAmount: fullUnitAmount.toString(),
              isDeposit: 'true',
            },
          },
          unit_amount: depositAmount,
        },
        quantity: lineQuantity,
      });
    }

    console.log('💰 Full total:', fullTotal / 100, 'CAD | Deposit:', fullTotal / 2 / 100, 'CAD');

    if (lineItems.length === 0) {
      return NextResponse.json({ error: 'No valid programs to checkout' }, { status: 400 });
    }

    // Calculate subtotal
    let subtotal = 0;
    for (const selected of selectedPrograms) {
      const program = CLINIC_PROGRAMS[selected.programId as keyof typeof CLINIC_PROGRAMS];
      if (!program) continue;

      const tier = program.tiers[selected.tier];
      const packageQuantity = selected.quantity || 1;
      let itemPrice = 0;

      if ('pricePerPerson' in tier && selected.participantCount) {
        itemPrice = tier.pricePerPerson * selected.participantCount;
      } else if ('price' in tier) {
        itemPrice = tier.price;
      }

      subtotal += itemPrice * packageQuantity;
    }

    // Generate a booking reference ID
    const bookingRef = `CLINIC-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,

      // Always allow promo codes (BUNDLE for 15%, SKULE for 35%)
      allow_promotion_codes: true,

      // 2) CREATE CUSTOMER + COLLECT REAL INFO (fraud protection)
      customer_creation: 'always',
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },

      // 3) SAVE CARD FOR FUTURE BALANCE CHARGE
      payment_intent_data: {
        setup_future_usage: 'off_session',
        statement_descriptor: 'KIRTI CLINICS',
        metadata: {
          booking_status: 'pending_confirmation',
          bookingRef,
        },
      },

      // 4) TRACKING
      client_reference_id: bookingRef,
      metadata: {
        type: 'clinics-bundle',
        bookingRef,
        programs: JSON.stringify(selectedPrograms),
        programCount: selectedPrograms.length.toString(),
        hasBundle: (selectedPrograms.length >= DISCOUNT_CONFIG.bundleThreshold).toString(),
        contactName: personalInfo ? `${personalInfo.firstName} ${personalInfo.lastName}` : '',
        contactEmail: personalInfo?.email || '',
        contactPhone: personalInfo?.phone || '',
        organization: personalInfo?.organization || '',
        contactRole: personalInfo?.role || '',
        preferredDates: personalInfo?.preferredDates || '',
      },

      // 5) REDIRECTS
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects/clinics/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects/clinics/checkout`,

      custom_text: {
        submit: {
          message: 'Pay 50% deposit now. Remaining balance due after program delivery. Promo codes: BUNDLE (15% off 2+ clinics) or SKULE2 (35% off for schools).',
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
