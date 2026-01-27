import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Determine which email to use based on subject
    const isClinicsInquiry = subject?.toLowerCase().includes('clinic');
    const emailUser = isClinicsInquiry ? process.env.CLINICS_EMAIL_USER : process.env.ART_EMAIL_USER;
    const emailPass = isClinicsInquiry ? process.env.CLINICS_EMAIL_PASS : process.env.ART_EMAIL_PASS;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.kirtisaxena.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email content for you (the inquiry)
    const inquiryHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New ${isClinicsInquiry ? 'Clinics' : 'Artwork'} Inquiry</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 1px solid #ddd; margin: 20px 0;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <p style="font-size: 12px; color: #666; margin-top: 20px;">
          This inquiry was sent through your website contact form.
        </p>
      </div>
    `;

    // Send inquiry email to you
    await transporter.sendMail({
      from: emailUser,
      to: emailUser, // Send to yourself
      subject: `${isClinicsInquiry ? 'Clinics' : 'Artwork'} Inquiry: ${subject}`,
      html: inquiryHtml,
      replyTo: email, // So you can reply directly to the customer
    });

    // Auto-reply email to customer
    const autoReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for your inquiry!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out${isClinicsInquiry ? ' about our clinics programs' : ''}. I've received your message and will get back to you within 24-48 hours.</p>
        <p><strong>Your inquiry:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Subject:</strong> ${subject}</p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <p>Best regards,<br>Kirti Saxena</p>
        <p style="font-size: 12px; color: #666;">
          Questions? Visit <a href="https://kirtisaxena.com">kirtisaxena.com</a>
        </p>
      </div>
    `;

    // Send auto-reply to customer
    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: `Thank you for your ${isClinicsInquiry ? 'clinics' : 'artwork'} inquiry - Kirti Saxena`,
      html: autoReplyHtml,
    });

    console.log('✅ Inquiry email sent successfully:', subject);
    return NextResponse.json({ success: true, message: 'Inquiry sent successfully' });

  } catch (error) {
    console.error('❌ Error sending inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to send inquiry' },
      { status: 500 }
    );
  }
}