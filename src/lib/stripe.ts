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