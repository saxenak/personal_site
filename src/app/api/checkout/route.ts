import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PRODUCTS } from '@/lib/stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: NextRequest) {
  try {
    console.log('🔧 Checkout API called');
    
    // Check environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ STRIPE_SECRET_KEY not found');
      return NextResponse.json({ error: 'Stripe configuration missing' }, { status: 500 });
    }
    
    console.log('✅ Stripe key found, length:', process.env.STRIPE_SECRET_KEY.substring(0, 20) + '...');
    
    const { productType, productId, quantity = 1, bookingData } = await req.json();
    console.log('📦 Request data:', { productType, productId, quantity, bookingData });
    
    // Get product details
    let product;
    if (productType === 'paintings') {
      product = PRODUCTS.paintings[productId as keyof typeof PRODUCTS.paintings];
    } else if (productType === 'clinics') {
      product = PRODUCTS.clinics[productId as keyof typeof PRODUCTS.clinics];
    }
    
    console.log('🎨 Product found:', product ? product.name : 'NOT FOUND');
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Create Stripe checkout session
    console.log('💳 Creating Stripe session...');
    
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: 'image' in product && product.image ? [`${process.env.NEXT_PUBLIC_SITE_URL}${product.image}`] : [],
              metadata: {
                business_name: productType === 'clinics' ? 'Clinics' : 'Kirti Saxena'
              }
            },
            unit_amount: product.price * 100, // Stripe uses cents
          },
          quantity,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        statement_descriptor: productType === 'clinics' ? 'CLINICS' : 'KIRTI SAXENA',
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${productType === 'paintings' ? 'projects/artistry' : 'projects/clinics'}`,
      custom_text: {
        submit: productType === 'clinics' ? {
          message: 'Complete your clinic booking'
        } : undefined
      },
      metadata: {
        productType,
        productId,
        quantity: quantity.toString(),
        ...(bookingData && {
          bookingDate: bookingData.date,
          bookingTime: bookingData.time,
          bookingLocation: bookingData.location,
          bookingNotes: bookingData.notes || ''
        })
      },
    };

    // Add shipping for paintings
    if (productType === 'paintings') {
      sessionConfig.shipping_address_collection = {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'JP'],
      };
      sessionConfig.shipping_options = [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 2500, // $25.00
              currency: 'usd',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 10,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 15000, // $150.00
              currency: 'usd',
            },
            display_name: 'International Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 10,
              },
              maximum: {
                unit: 'business_day',
                value: 21,
              },
            },
          },
        },
      ];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    // If this is a clinic booking with participant data, store the waiver info
    if (productType === 'clinics' && bookingData?.notes) {
      try {
        // Extract participant info from booking notes
        const notes = bookingData.notes;
        const participantMatch = notes.match(/Participant: ([^,]+)/);
        const emailMatch = notes.match(/Email: ([^,]+)/);
        const phoneMatch = notes.match(/Phone: ([^,]+)/);
        const emergencyMatch = notes.match(/Emergency: ([^(]+) \(([^)]+)\)/);
        const medicalMatch = notes.match(/Medical: ([^,]+)/);

        if (participantMatch && emailMatch && phoneMatch && emergencyMatch) {
          await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/store-waiver`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId: session.id,
              participantName: participantMatch[1].trim(),
              email: emailMatch[1].trim(),
              phone: phoneMatch[1].trim(),
              emergencyContact: emergencyMatch[1].trim(),
              emergencyPhone: emergencyMatch[2].trim(),
              medicalConditions: medicalMatch ? medicalMatch[1].trim() : 'None'
            }),
          });
        }
      } catch (waiverError) {
        console.error('⚠️ Warning: Failed to store waiver data:', waiverError);
        // Don't fail the checkout if waiver storage fails
      }
    }

    console.log('✅ Session created:', session.id);
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('❌ Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}