import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-09-30.clover',
});

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ valid: false, error: 'No code provided' });
    }

    console.log('🔍 Validating promo code:', code);

    // Look up promotion code in Stripe
    const promotionCodes = await stripe.promotionCodes.list({
      code: code.toUpperCase(),
      active: true,
    });

    if (promotionCodes.data.length === 0) {
      console.log('❌ Promo code not found:', code);
      return NextResponse.json({ valid: false, error: 'Invalid promo code' });
    }

    const promoCode = promotionCodes.data[0];
    const couponData = (promoCode as any).coupon || promoCode;

    console.log('✅ Valid promo code found:', {
      code: promoCode.code,
      percentOff: couponData?.percent_off,
      amountOff: couponData?.amount_off,
    });

    return NextResponse.json({
      valid: true,
      discount: {
        percentOff: couponData?.percent_off,
        amountOff: couponData?.amount_off,
        name: couponData?.name || 'Discount',
      },
    });
  } catch (error) {
    console.error('❌ Promo validation error:', error);
    return NextResponse.json({ valid: false, error: 'Validation failed' });
  }
}
