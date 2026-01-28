import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Product configurations
export const PRODUCTS = {
  // Artistry Products
  paintings: {
    'abstract-blue': {
      id: 'price_abstract_blue',
      name: 'Abstract Blue',
      price: 1200,
      description: 'Original acrylic painting on canvas, 24" x 36"',
      image: '/images/artistry/available-1.jpg'
    },
    'sunset-series': {
      id: 'price_sunset_series',
      name: 'Sunset Series #3',
      price: 800,
      description: 'Oil painting, 18" x 24"',
      image: '/images/artistry/available-2.jpg'
    },
    'geometric-modern': {
      id: 'price_geometric_modern',
      name: 'Geometric Modern',
      price: 950,
      description: 'Mixed media on canvas, 20" x 30"',
      image: '/images/artistry/available-3.jpg'
    },
    'nature-study': {
      id: 'price_nature_study',
      name: 'Nature Study',
      price: 650,
      description: 'Watercolor, 16" x 20"',
      image: '/images/artistry/available-4.jpg'
    }
  },
  
  // Clinic Services
  clinics: {
    'drop-in-wrestling': {
      id: 'price_drop_in_wrestling',
      name: 'Drop-In Wrestling Class',
      price: 25,
      description: '90-minute basic wrestling techniques and conditioning',
      type: 'service'
    },
    'advanced-wrestling': {
      id: 'price_advanced_wrestling',
      name: 'Advanced Wrestling',
      price: 35,
      description: '90-minute advanced techniques for experienced wrestlers',
      type: 'service'
    },
    'youth-wrestling': {
      id: 'price_youth_wrestling',
      name: 'Youth Wrestling (Ages 8-15)',
      price: 20,
      description: '60-minute wrestling fundamentals for young athletes',
      type: 'service'
    },
    'conditioning': {
      id: 'price_conditioning',
      name: 'Wrestling Conditioning',
      price: 20,
      description: '60-minute strength and conditioning focused session',
      type: 'service'
    },
    'individual-session': {
      id: 'price_individual_session',
      name: 'Individual Training Session',
      price: 150,
      description: '90-minute personalized training session',
      type: 'service'
    },
    'group-session': {
      id: 'price_group_session',
      name: 'Group Training Session',
      price: 75,
      description: '90-minute group training (max 6 people)',
      type: 'service'
    },
    'elite-clinic': {
      id: 'price_elite_clinic',
      name: 'Elite Training Clinic',
      price: 300,
      description: 'Half-day intensive training clinic',
      type: 'service'
    },
    'consultation': {
      id: 'price_consultation',
      name: 'Training Consultation',
      price: 75,
      description: '60-minute assessment and planning session',
      type: 'service'
    }
  }
};

// Clinic Programs for Checkout Page
export const CLINIC_PROGRAMS = {
  'self-defense': {
    id: 'self-defense',
    name: 'Self Defense Clinic',
    color: '#FFD700',
    requiresParticipantCount: true,
    minParticipants: 16,
    tiers: {
      mini: {
        id: 'self-defense-mini',
        name: 'Self Defense Mini Clinic',
        pricePerPerson: 12000, // $120.00 per person in cents
        description: '1 × 3 hours (3 hours total) - $120/person',
        format: '1 × 3 hours',
        participants: '16-30 people',
      },
      series: {
        id: 'self-defense-series',
        name: 'Self Defense Series Clinic',
        pricePerPerson: 15000, // $150.00 per person in cents
        description: '3 × 2 hours (6 hours total) - $150/person',
        format: '3 × 2 hours',
        participants: '16-30 people',
      },
    },
  },
  'mindset': {
    id: 'mindset',
    name: 'High-Performance Talk',
    color: '#A855F7',
    requiresParticipantCount: true,
    estimatedParticipants: {
      mini: [15, 30, 60],
      series: [30, 45, 60, 80],
    },
    tiers: {
      mini: {
        id: 'mindset-mini',
        name: 'High-Performance Mini Talk',
        price: 75000, // $750.00
        description: '1 × 60 minutes',
        format: '1 × 60 min',
        participants: '30-60 people',
      },
      series: {
        id: 'mindset-series',
        name: 'High-Performance Series Talk',
        price: 180000, // $1,800.00
        description: '3 × 60 minutes',
        format: '3 × 60 min',
        participants: '30-80 people',
      },
    },
  },
  'privates': {
    id: 'privates',
    name: 'Wrestling Private Training',
    color: '#F97316',
    requiresParticipantCount: true,
    minParticipants: 1,
    maxParticipants: 4,
    groupPricing: {
      mini: [
        { athletes: 1, total: 10000 }, // $100
        { athletes: 2, total: 15000 }, // $150
        { athletes: 3, total: 18000 }, // $180
        { athletes: 4, total: 20000 }, // $200
      ],
      series: [
        { athletes: 1, total: 50000, savings: 10000 }, // $500, Save $100
        { athletes: 2, total: 75000, savings: 15000 }, // $750, Save $150
        { athletes: 3, total: 90000, savings: 18000 }, // $900, Save $180
        { athletes: 4, total: 100000, savings: 20000 }, // $1000, Save $200
      ],
    },
    tiers: {
      mini: {
        id: 'privates-mini',
        name: 'Wrestling Mini Private',
        price: 10000, // Base price for 1 person
        description: '1 session (60 minutes)',
        format: '1 × 60 min',
      },
      series: {
        id: 'privates-series',
        name: 'Wrestling Series Private',
        price: 50000, // Base price for 1 person
        description: '6 sessions × 60 minutes',
        format: '6 × 60 min',
      },
    },
  },
  'founder': {
    id: 'founder',
    name: 'Innovate for a Purpose Talk',
    color: '#10B981',
    requiresParticipantCount: true,
    estimatedParticipants: {
      mini: [15, 30, 60],
      series: [30, 45, 60, 80],
    },
    tiers: {
      mini: {
        id: 'founder-mini',
        name: 'Innovate for a Purpose Mini Talk',
        price: 75000, // $750.00
        description: '1 × 60 minutes',
        format: '1 × 60 min',
        participants: '30-60 people',
      },
      series: {
        id: 'founder-series',
        name: 'Innovate for a Purpose Series Talk',
        price: 180000, // $1,800.00
        description: '3 × 60 minutes',
        format: '3 × 60 min',
        participants: '30-80 people',
      },
    },
  },
} as const;

export const DISCOUNT_CONFIG = {
  bundleThreshold: 2, // Minimum programs for bundle discount
  bundleDiscountPercent: 15,
  schoolDiscountPercent: 10,
};

// Type helpers
export type ProgramId = keyof typeof CLINIC_PROGRAMS;
export type TierType = 'mini' | 'series';

export interface SelectedProgram {
  programId: ProgramId;
  tier: TierType;
  participantCount?: number;
  quantity?: number;
}