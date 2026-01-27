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

    // Look up promotion code in Stripe (expand coupon to get discount details)
    const promotionCodes = await stripe.promotionCodes.list({
      code: code.toUpperCase(),
      active: true,
      expand: ['data.coupon'],
    });

    if (promotionCodes.data.length === 0) {
      console.log('❌ Promo code not found:', code);
      return NextResponse.json({ valid: false, error: 'Invalid promo code' });
    }

    const promoCode = promotionCodes.data[0];

    // Log the FULL raw response to see structure
    console.log('📦 RAW Stripe promo code object:', JSON.stringify(promoCode, null, 2));
    console.log('📦 Object keys:', Object.keys(promoCode));

    // Try to get coupon - it might be expanded or just an ID
    let coupon = (promoCode as any).coupon;

    // If coupon is a string (ID), fetch the full coupon
    if (typeof coupon === 'string') {
      console.log('🔄 Coupon is ID, fetching full coupon:', coupon);
      coupon = await stripe.coupons.retrieve(coupon);
    }

    console.log('✅ Valid promo code found:', {
      code: promoCode.code,
      coupon: coupon,
      couponType: typeof coupon,
      percentOff: coupon?.percent_off,
      amountOff: coupon?.amount_off,
      couponId: coupon?.id,
      couponName: coupon?.name,
    });

    // Get percent_off - handle both number and potential string conversion
    const rawPercentOff = coupon?.percent_off;
    const percentOff = typeof rawPercentOff === 'number'
      ? rawPercentOff
      : typeof rawPercentOff === 'string'
        ? parseFloat(rawPercentOff)
        : null;

    const rawAmountOff = coupon?.amount_off;
    const amountOff = typeof rawAmountOff === 'number'
      ? rawAmountOff
      : typeof rawAmountOff === 'string'
        ? parseFloat(rawAmountOff)
        : null;

    console.log('🎯 Coupon details:', { rawPercentOff, percentOff, rawAmountOff, amountOff, coupon });

    const responseData = {
      valid: true,
      discount: {
        percentOff: percentOff && !isNaN(percentOff) ? percentOff : null,
        amountOff: amountOff && !isNaN(amountOff) ? amountOff : null,
        name: coupon?.name || 'Discount',
      },
    };

    console.log('📤 Returning response:', responseData);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('❌ Promo validation error:', error);
    return NextResponse.json({ valid: false, error: 'Validation failed' });
  }
}
