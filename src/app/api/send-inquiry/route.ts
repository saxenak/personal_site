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

    // Create email transporter (using art email since this is for artwork inquiries)
    const transporter = nodemailer.createTransport({
      host: 'mail.kirtisaxena.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ART_EMAIL_USER,
        pass: process.env.ART_EMAIL_PASS,
      },
    });

    // Email content for you (the inquiry)
    const inquiryHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Artwork Inquiry</h2>
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
      from: process.env.ART_EMAIL_USER,
      to: process.env.ART_EMAIL_USER, // Send to yourself
      subject: `Artwork Inquiry: ${subject}`,
      html: inquiryHtml,
      replyTo: email, // So you can reply directly to the customer
    });

    // Auto-reply email to customer
    const autoReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for your inquiry!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out about my artwork. I've received your message and will get back to you within 24-48 hours.</p>
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
      from: process.env.ART_EMAIL_USER,
      to: email,
      subject: 'Thank you for your artwork inquiry - Kirti Saxena',
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