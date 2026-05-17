import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-09-30.clover',
});

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe configuration missing' }, { status: 500 });
    }

    const { name, email, phone, packageName, packagePrice, businessName, sitePurpose, referenceSites, notes } = await req.json();

    if (!name || !email || !phone || !packageName || !packagePrice) {
      return NextResponse.json(
        { error: 'Name, email, phone, package name, and price are required' },
        { status: 400 }
      );
    }

    // Create a Stripe Customer
    const customer = await stripe.customers.create({
      name,
      email,
      phone: phone || undefined,
      metadata: {
        source: 'webdev-card-save',
        packageName,
        packagePrice,
        businessName: businessName || '',
      },
    });

    // Create a SetupIntent (no charge — just saves the card)
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
      metadata: {
        packageName,
        packagePrice,
        customerName: name,
        customerEmail: email,
        customerPhone: phone || '',
        businessName: businessName || '',
        sitePurpose: sitePurpose || '',
        referenceSites: referenceSites || '',
        notes: notes || '',
      },
    });

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
      customerId: customer.id,
    });
  } catch (error) {
    console.error('SetupIntent error:', error);
    return NextResponse.json(
      { error: 'Failed to create setup intent: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}
