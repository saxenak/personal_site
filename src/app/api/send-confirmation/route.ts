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
    } else if (productType === 'clinics-bundle' || session.metadata?.type === 'clinics-bundle') {
      // Clinic booking - PENDING confirmation
      subject = '📋 Booking Request Received - Kirti Saxena Clinics';
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px;">
            <div style="background-color: #FFF3CD; border: 1px solid #FFD700; border-radius: 8px; padding: 20px; margin-bottom: 25px; text-align: center;">
              <h2 style="color: #856404; margin: 0;">Thank you for your booking request!</h2>
            </div>

            <p style="color: #333; line-height: 1.6;">Hi ${customerName},</p>
            <p style="color: #333; line-height: 1.6;">We've received your request and deposit. Please note that <strong>your booking is not yet confirmed</strong>. Our team will review the details and follow up within 1–2 business days to finalize everything.</p>

            <h3 style="color: #333; margin-top: 25px; border-bottom: 2px solid #FFD700; padding-bottom: 8px;">What happens next:</h3>
            <ol style="color: #333; line-height: 1.8;">
              <li><strong>Review</strong> – We'll verify your requested dates, location, and selected program.</li>
              <li><strong>Confirmation</strong> – We'll confirm audience size, timing, and any special requirements.</li>
              <li><strong>Finalize</strong> – Once confirmed, you'll receive official confirmation, any program materials, and participant waiver forms (required for clinics only).</li>
            </ol>

            <p style="color: #666; font-size: 14px; font-style: italic; margin-top: 15px;">If we do not receive a response within 48 hours of our follow-up email, the booking request may be released and the deposit refunded.</p>

            <h3 style="color: #333; margin-top: 25px; border-bottom: 2px solid #FFD700; padding-bottom: 8px;">Deposit & Payment Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd;"><strong>Deposit Amount:</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; color: #28a745;">$${(session.amount_total! / 100).toFixed(2)} CAD</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd;"><strong>Payment Reference:</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;"><code>${session.payment_intent}</code></td>
              </tr>
            </table>

            <h3 style="color: #333; margin-top: 25px; border-bottom: 2px solid #FFD700; padding-bottom: 8px;">Deposit & Authorization Policy</h3>
            <div style="background-color: #f8f9fa; border-left: 4px solid #FFD700; padding: 15px; margin: 15px 0;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #333;">As acknowledged at checkout, your card information has been securely stored to process the remaining balance only after booking details are confirmed.</p>
              <p style="margin: 0; font-size: 14px; color: #333;">Your deposit is <strong>fully refundable until confirmation is sent via email</strong>. Once confirmation is issued, the deposit becomes non-refundable and will be applied toward the final invoice.</p>
            </div>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;">

            <p style="color: #333;">If you have any questions or need to update your request, please contact us at<br><a href="mailto:clinics@kirtisaxena.com" style="color: #d4a500; font-weight: bold;">clinics@kirtisaxena.com</a></p>

            <p style="color: #333; margin-top: 20px;">We look forward to working with you.</p>

            <p style="color: #333; margin-top: 25px;">
              Warm regards,<br>
              <strong>Kirti Saxena</strong><br>
              <span style="color: #666; font-size: 14px;">Olympic Athlete | Speaker | Founder</span>
            </p>
          </div>
        </div>
      `;
      textContent = `Thank you for your booking request! We've received your deposit of $${(session.amount_total! / 100).toFixed(2)} CAD. Your booking is not yet confirmed - our team will review and follow up within 1-2 business days. Reference: ${session.payment_intent}. Questions? Contact clinics@kirtisaxena.com`;
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