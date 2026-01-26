import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';
import { CLINIC_PROGRAMS, type SelectedProgram } from '@/lib/stripe';

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

    const personalInfoJson = session.metadata?.personalInfo;
    const personalInfo = personalInfoJson ? JSON.parse(personalInfoJson) : null;
    const selectedProgramsJson = session.metadata?.programs;
    const selectedPrograms: SelectedProgram[] = selectedProgramsJson ? JSON.parse(selectedProgramsJson) : [];

    if (!personalInfo) {
      return NextResponse.json({ error: 'No personal info found' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.CLINICS_EMAIL_USER,
        pass: process.env.CLINICS_EMAIL_PASS,
      },
    });

    // Build program details
    let programDetails = '<ul>';
    for (const selected of selectedPrograms) {
      const program = CLINIC_PROGRAMS[selected.programId as keyof typeof CLINIC_PROGRAMS];
      if (program) {
        const tier = program.tiers[selected.tier];
        const tierName = selected.tier === 'mini' ? 'Mini' : 'Series';
        const tierFormat = tier.format;
        programDetails += `<li><strong>${program.name}</strong> - ${tierName} (${tierFormat})`;
        if (selected.participantCount) {
          programDetails += ` - ${selected.participantCount} participants`;
        }
        programDetails += '</li>';
      }
    }
    programDetails += '</ul>';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">New Clinic Booking</h2>
          
          <h3 style="color: #555; margin-top: 20px;">Client Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${personalInfo.firstName} ${personalInfo.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${personalInfo.email}">${personalInfo.email}</a></td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;"><a href="tel:${personalInfo.phone}">${personalInfo.phone}</a></td>
            </tr>
            ${personalInfo.organization ? `
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Organization:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${personalInfo.organization}</td>
            </tr>
            ` : ''}
          </table>

          <h3 style="color: #555; margin-top: 20px;">Booking Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Programs:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${selectedPrograms.length} program(s) selected</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Total Amount:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; color: #FFD700;">$${(session.amount_total! / 100).toFixed(2)}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Payment ID:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;"><code>${session.payment_intent}</code></td>
            </tr>
          </table>

          <h3 style="color: #555; margin-top: 20px;">Selected Programs</h3>
          ${programDetails}

          <div style="margin-top: 20px; padding: 15px; background-color: #fffbea; border-left: 4px solid #FFD700;">
            <p style="margin: 0; color: #333;"><strong>Next Step:</strong> Reach out to the client within 48 hours to confirm dates, location, and logistics.</p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            This is an automated notification from Kirti Saxena's clinic booking system.
          </p>
        </div>
      </div>
    `;

    // Send email to clinics
    await transporter.sendMail({
      from: process.env.CLINICS_EMAIL_USER,
      to: 'clinics@kirtisaxena.com',
      subject: `📅 New Clinic Booking - ${personalInfo.firstName} ${personalInfo.lastName}`,
      html: htmlContent,
    });

    console.log('✅ Clinics booking notification sent to clinics@kirtisaxena.com');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Send clinics booking error:', error);
    return NextResponse.json(
      { error: 'Failed to send booking notification: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}
