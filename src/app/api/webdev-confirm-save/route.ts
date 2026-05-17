import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, packageName, packagePrice, businessName, sitePurpose, referenceSites, notes } = await req.json();

    if (!name || !email || !packageName || !packagePrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailUser = process.env.ART_EMAIL_USER;
    const emailPass = process.env.ART_EMAIL_PASS;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.kirtisaxena.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email to client
    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: `Service Booked - ${packageName} Web Dev Package`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Your service has been booked!</h2>
          <p>Hi ${name}${businessName ? ` (${businessName})` : ''},</p>
          <p>Thank you for selecting the <strong>${packageName}</strong> web development package (<strong>${packagePrice}</strong>).</p>
          <p>Your card is securely on file. <strong>You will not be charged until your project is complete</strong> and you've approved the final result.</p>
          <h3 style="color: #333; margin-top: 25px;">What happens next:</h3>
          <ol style="line-height: 1.8;">
            <li>I'll reach out within 24 hours to discuss your project</li>
            <li>We'll finalize the scope and timeline together</li>
            <li>Work begins after alignment on deliverables</li>
            <li>Payment is collected only after project completion</li>
          </ol>
          <p>If you have any questions, just reply to this email.</p>
          <p>Best regards,<br>Kirti Saxena</p>
          <p style="font-size: 12px; color: #666;">
            Visit <a href="https://kirtisaxena.com">kirtisaxena.com</a>
          </p>
        </div>
      `,
      text: `Hi ${name}, your service has been booked for the ${packageName} package (${packagePrice}). You will not be charged until your project is complete. I'll reach out within 24 hours. - Kirti Saxena`,
    });

    // Email to Kirti
    await transporter.sendMail({
      from: emailUser,
      to: emailUser,
      subject: `New Web Dev Service Booked - ${packageName} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3>New Web Dev Client - Service Booked</h3>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Client:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Package:</strong> ${packageName}</p>
            <p><strong>Price:</strong> ${packagePrice}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
            <p><strong>Business Name:</strong> ${businessName || 'Not provided'}</p>
            <p><strong>Site Purpose:</strong> ${sitePurpose || 'Not provided'}</p>
            <p><strong>Reference Sites:</strong> ${referenceSites || 'Not provided'}</p>
            <p><strong>Additional Notes:</strong> ${notes || 'Not provided'}</p>
          </div>
          <p style="margin-top: 15px;">Card is saved in Stripe. Charge from Dashboard when project is complete.</p>
        </div>
      `,
      text: `New web dev service booked: ${name} (${email}) - ${packageName} ${packagePrice}. Phone: ${phone || 'N/A'}. Business: ${businessName || 'N/A'}. Purpose: ${sitePurpose || 'N/A'}. References: ${referenceSites || 'N/A'}. Notes: ${notes || 'N/A'}. Charge from Stripe Dashboard when ready.`,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Confirmation email error:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation emails' },
      { status: 500 }
    );
  }
}
