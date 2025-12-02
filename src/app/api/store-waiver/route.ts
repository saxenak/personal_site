import { NextRequest, NextResponse } from 'next/server';

// In a real application, you'd want to store this in a database
// For now, we'll store it in memory (this will reset when the server restarts)
let waiverData: Array<{
  sessionId: string;
  participantName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalConditions: string;
  waiverSignedAt: string;
  ipAddress: string;
  userAgent: string;
}> = [];

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      sessionId,
      participantName,
      email,
      phone,
      emergencyContact,
      emergencyPhone,
      medicalConditions
    } = data;

    // Get client info for legal purposes
    const ipAddress = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Store waiver data
    const waiverRecord = {
      sessionId,
      participantName,
      email,
      phone,
      emergencyContact,
      emergencyPhone,
      medicalConditions: medicalConditions || 'None',
      waiverSignedAt: new Date().toISOString(),
      ipAddress,
      userAgent
    };

    waiverData.push(waiverRecord);

    console.log('✅ Waiver stored for:', participantName, 'Session:', sessionId);
    console.log('📋 Total waivers stored:', waiverData.length);

    return NextResponse.json({ 
      success: true, 
      message: 'Waiver information stored successfully' 
    });

  } catch (error) {
    console.error('❌ Error storing waiver:', error);
    return NextResponse.json(
      { error: 'Failed to store waiver information' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve waiver data (for admin purposes)
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('sessionId');
    const email = url.searchParams.get('email');

    if (sessionId) {
      const waiver = waiverData.find(w => w.sessionId === sessionId);
      return NextResponse.json(waiver || null);
    }

    if (email) {
      const waivers = waiverData.filter(w => w.email === email);
      return NextResponse.json(waivers);
    }

    // Return all waivers (admin access - you'd want to add authentication here)
    return NextResponse.json({
      total: waiverData.length,
      waivers: waiverData.map(w => ({
        ...w,
        // Hide sensitive info in bulk view
        phone: w.phone.replace(/\d{4}$/, '****'),
        emergencyPhone: w.emergencyPhone.replace(/\d{4}$/, '****')
      }))
    });

  } catch (error) {
    console.error('❌ Error retrieving waivers:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve waiver information' },
      { status: 500 }
    );
  }
}