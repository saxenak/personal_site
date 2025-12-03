import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-09-30.clover',
});

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    if (!session.customer_details?.email) {
      return NextResponse.json({ error: 'No customer email found' }, { status: 400 });
    }

    const { productType, productId } = session.metadata || {};
    const customerEmail = session.customer_details.email;
    const customerName = session.customer_details.name || 'Customer';
    
    // Choose email credentials based on product type
    const isArtSale = productType === 'paintings';
    const fromEmail = isArtSale ? process.env.ART_EMAIL_USER : process.env.CLINICS_EMAIL_USER;
    const emailPassword = isArtSale ? process.env.ART_EMAIL_PASS : process.env.CLINICS_EMAIL_PASS;
    
    // Create email transporter with appropriate credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: fromEmail,
        pass: emailPassword,
      },
    });
    
    // Email content based on product type
    let subject, htmlContent, textContent;
    
    if (productType === 'paintings') {
      subject = '🎨 Your Art Purchase Confirmation - Kirti Saxena';
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for your purchase!</h2>
          <p>Hi ${customerName},</p>
          <p>Thank you for purchasing my artwork. Your payment has been processed successfully.</p>
          <p><strong>Order Details:</strong></p>
          <ul>
            <li>Product: ${session.line_items?.data[0]?.description}</li>
            <li>Amount: $${(session.amount_total! / 100).toFixed(2)}</li>
            <li>Payment ID: ${session.payment_intent}</li>
          </ul>
          <p>I will contact you within 24 hours to arrange shipping and delivery details.</p>
          <p>Best regards,<br>Kirti Saxena</p>
          <p style="font-size: 12px; color: #666;">
            Questions? Reply to this email or visit <a href="https://kirtisaxena.com">kirtisaxena.com</a>
          </p>
        </div>
      `;
      textContent = `Thank you for your art purchase! I will contact you within 24 hours to arrange delivery. Order: ${session.payment_intent}`;
    } else {
      // Training booking confirmation
      const bookingDate = session.metadata?.bookingDate;
      const bookingTime = session.metadata?.bookingTime;
      const bookingLocation = session.metadata?.bookingLocation;
      const bookingNotes = session.metadata?.bookingNotes;
      
      subject = '🥋 Your Training Session Booking - Kirti Saxena';
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Training Session Confirmed!</h2>
          <p>Hi ${customerName},</p>
          <p>Your training session booking has been confirmed and payment processed.</p>
          <p><strong>Booking Details:</strong></p>
          <ul>
            <li>Service: ${session.line_items?.data[0]?.description}</li>
            <li>Date: ${bookingDate ? new Date(bookingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'TBD'}</li>
            <li>Time: ${bookingTime || 'TBD'}</li>
            <li>Location: ${bookingLocation ? (bookingLocation === 'in-person' ? 'In-Person Training' : 'Virtual Session') : 'TBD'}</li>
            <li>Amount: $${(session.amount_total! / 100).toFixed(2)}</li>
            <li>Payment ID: ${session.payment_intent}</li>
          </ul>
          ${bookingNotes ? `<p><strong>Your Notes:</strong><br>${bookingNotes}</p>` : ''}
          <p>I will contact you within 24 hours to confirm final details and provide location/access information.</p>
          <p>Looking forward to training with you!</p>
          <p>Best regards,<br>Kirti Saxena<br>Olympic Athlete & Coach</p>
          <p style="font-size: 12px; color: #666;">
            Questions? Reply to this email or visit <a href="https://kirtisaxena.com">kirtisaxena.com</a>
          </p>
        </div>
      `;
      textContent = `Your training session is confirmed for ${bookingDate} at ${bookingTime}! I will contact you within 24 hours to confirm details. Booking: ${session.payment_intent}`;
    }

    // Send confirmation email to customer
    await transporter.sendMail({
      from: fromEmail,
      to: customerEmail,
      subject,
      html: htmlContent,
      text: textContent,
    });

    // Send notification email to you (using appropriate email)
    await transporter.sendMail({
      from: fromEmail,
      to: fromEmail, // Send to yourself
      subject: `New ${productType === 'paintings' ? 'Art Sale' : 'Training Booking'} - ${customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h3>New ${productType === 'paintings' ? 'Art Sale' : 'Training Booking'}!</h3>
          <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
          <p><strong>Product:</strong> ${session.line_items?.data[0]?.description}</p>
          <p><strong>Amount:</strong> $${(session.amount_total! / 100).toFixed(2)}</p>
          <p><strong>Payment ID:</strong> ${session.payment_intent}</p>
          <p><strong>Customer Details:</strong></p>
          <ul>
            <li>Phone: ${session.customer_details?.phone || 'Not provided'}</li>
            <li>Address: ${session.customer_details?.address ? 
              `${session.customer_details.address.line1}, ${session.customer_details.address.city}, ${session.customer_details.address.state} ${session.customer_details.address.postal_code}` 
              : 'Not provided'}</li>
          </ul>
          <p>Remember to contact the customer within 24 hours!</p>
        </div>
      `,
      text: `New ${productType === 'paintings' ? 'sale' : 'booking'}: ${customerName} (${customerEmail}) - $${(session.amount_total! / 100).toFixed(2)} - ${session.payment_intent}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email notification error:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}