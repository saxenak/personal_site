'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectNav from '@/components/ProjectNav';
import { CLINIC_PROGRAMS, DISCOUNT_CONFIG, type ProgramId, type TierType, type SelectedProgram } from '@/lib/stripe';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Program card component
function ProgramCard({
  programId,
  program,
  selected,
  onToggle,
}: {
  programId: ProgramId;
  program: typeof CLINIC_PROGRAMS[ProgramId];
  selected: SelectedProgram | undefined;
  onToggle: (programId: ProgramId, tier: TierType | null, participantCount?: number) => void;
}) {
  const [participantCount, setParticipantCount] = useState<number>(
    'minParticipants' in program ? program.minParticipants : 16
  );
  const requiresParticipants = 'requiresParticipantCount' in program && program.requiresParticipantCount;
  const minParticipants = 'minParticipants' in program ? program.minParticipants : 16;

  const getTierPrice = (tier: typeof program.tiers.mini | typeof program.tiers.series, tierKey?: 'mini' | 'series') => {
    if ('pricePerPerson' in tier) {
      // Calculate hourly rate based on format
      if (tierKey && program.tiers[tierKey].format) {
        const format = program.tiers[tierKey].format;
        const match = format.match(/(\d+)\s*×\s*(\d+)\s*hours?/);
        if (match) {
          const sessions = parseInt(match[1]);
          const hoursPerSession = parseInt(match[2]);
          const totalHours = sessions * hoursPerSession;
          const pricePerHour = Math.round((tier.pricePerPerson / totalHours));
          return `$${(pricePerHour / 100).toFixed(0)}/person/hour`;
        }
      }
      return `$${(tier.pricePerPerson / 100).toFixed(0)}/person`;
    }
    if ('price' in tier) {
      return `$${(tier.price / 100).toFixed(0)}`;
    }
    return 'TBD';
  };

  const getTotalPrice = () => {
    if (!selected) return 0;
    const tier = program.tiers[selected.tier];
    
    // Check if this is wrestling privates with group pricing
    if ('groupPricing' in program) {
      const groupPricingTier = program.groupPricing[selected.tier];
      const priceEntry = groupPricingTier?.find((p: any) => p.athletes === participantCount);
      return priceEntry ? priceEntry.total : 0;
    }
    
    // Regular per-person pricing
    if ('pricePerPerson' in tier) {
      return tier.pricePerPerson * participantCount;
    }
    
    // Flat pricing
    if ('price' in tier) {
      return tier.price;
    }
    
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-6 transition-all duration-300 ${
        selected ? 'ring-2 ring-offset-2 ring-offset-black' : 'opacity-70 hover:opacity-100'
      }`}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: `2px solid ${selected ? program.color : 'rgba(255,255,255,0.1)'}`,
        // @ts-expect-error CSS custom property
        '--tw-ring-color': program.color,
      }}
    >
      <h3 className="text-xl font-bold mb-4" style={{ color: program.color }}>
        {program.name}
      </h3>

      {/* Tier Selection Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Mini Tier */}
        <button
          onClick={() => onToggle(programId, selected?.tier === 'mini' ? null : 'mini', participantCount)}
          className={`p-4 rounded-lg transition-all text-left ${
            selected?.tier === 'mini' ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          <div className="font-semibold text-white">Mini</div>
          <div className="text-xs text-gray-400 mt-1">{program.tiers.mini.format}</div>
          <div className="mt-2 font-bold text-lg" style={{ color: program.color }}>
            {getTierPrice(program.tiers.mini, 'mini')}
          </div>
        </button>

        {/* Series Tier */}
        <button
          onClick={() => onToggle(programId, selected?.tier === 'series' ? null : 'series', participantCount)}
          className={`p-4 rounded-lg transition-all text-left ${
            selected?.tier === 'series' ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          <div className="font-semibold text-white">Series</div>
          <div className="text-xs text-gray-400 mt-1">{program.tiers.series.format}</div>
          <div className="mt-2 font-bold text-lg" style={{ color: program.color }}>
            {getTierPrice(program.tiers.series, 'series')}
          </div>
        </button>
      </div>

      {/* Participant count input for per-person pricing */}
      {requiresParticipants && selected && (
        <div className="mt-4">
          {'groupPricing' in program ? (
            // Wrestling privates - show pricing table
            <div>
              <label className="text-sm text-gray-400 block mb-2">Min 1 -- Max 4 People</label>
              <div className="grid grid-cols-4 gap-2">
                {program.groupPricing[selected.tier]?.map((pricing: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setParticipantCount(pricing.athletes);
                      onToggle(programId, selected.tier, pricing.athletes);
                    }}
                    className={`p-2 rounded-lg transition-all text-center text-xs ${
                      participantCount === pricing.athletes
                        ? 'bg-white/20 border-2'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    style={{
                      borderColor: participantCount === pricing.athletes ? program.color : undefined,
                    }}
                  >
                    <div className="font-semibold text-white">{pricing.athletes}</div>
                    <div className="text-gray-400 text-xs">${(pricing.total / 100).toFixed(0)}</div>
                    <div className="font-bold text-xs" style={{ color: program.color }}>
                      ${(pricing.total / pricing.athletes / 100).toFixed(0)}/ea
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : 'estimatedParticipants' in program ? (
            // Talks - show estimated participant options
            <div>
              <label className="text-sm text-gray-400 block mb-2">Estimated Audience Size</label>
              <div className={`grid gap-2 ${(program.estimatedParticipants[selected.tier]?.length || 0) > 2 ? 'grid-cols-4' : 'grid-cols-2'}`}>
                {program.estimatedParticipants[selected.tier]?.map((count: number, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setParticipantCount(Math.max(16, count));
                      onToggle(programId, selected.tier, count);
                    }}
                    className={`p-3 rounded-lg transition-all text-center text-sm ${
                      participantCount === count
                        ? 'bg-white/20 border-2'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    style={{
                      borderColor: participantCount === count ? program.color : undefined,
                    }}
                  >
                    <div className="font-semibold text-white">{count}</div>
                    <div className="text-xs text-gray-500">people</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">* Estimate — final count can be adjusted</p>
            </div>
          ) : (
            // Other programs - standard number input
            <>
              <label className="text-sm text-gray-400 block mb-2">
                Participants (min {minParticipants}
                {'maxParticipants' in program ? `, max ${program.maxParticipants}` : ''})
              </label>
              <input
                type="number"
                min={minParticipants}
                max={('maxParticipants' in program ? program.maxParticipants : undefined) as any}
                value={participantCount}
                onChange={(e) => {
                  const count = Math.max(
                    minParticipants,
                    'maxParticipants' in program
                      ? Math.min((program.maxParticipants as any) || minParticipants, parseInt(e.target.value) || minParticipants)
                      : parseInt(e.target.value) || minParticipants
                  );
                  setParticipantCount(count);
                  onToggle(programId, selected.tier, count);
                }}
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              />
              <p className="text-xs text-gray-500 mt-2">
                Total: ${(getTotalPrice() / 100).toFixed(0)}
              </p>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}

// Order summary component
function OrderSummary({
  selectedPrograms,
  pricing,
  promoCode,
  promoCodeValid,
  promoCodeLoading,
  promoDiscount,
  onPromoCodeChange,
  onValidatePromo,
  onCheckout,
  isCheckingOut,
}: {
  selectedPrograms: SelectedProgram[];
  pricing: { subtotal: number; bundleDiscount: number; schoolDiscount: number; total: number };
  promoCode: string;
  promoCodeValid: boolean | null;
  promoCodeLoading: boolean;
  promoDiscount: { percentOff?: number; name?: string } | null;
  onPromoCodeChange: (code: string) => void;
  onValidatePromo: () => void;
  onCheckout: () => void;
  isCheckingOut: boolean;
}) {
  const calculateItemPrice = (selected: SelectedProgram) => {
    const program = CLINIC_PROGRAMS[selected.programId];
    const tier = program.tiers[selected.tier];
    if ('pricePerPerson' in tier && selected.participantCount) {
      return tier.pricePerPerson * selected.participantCount;
    }
    return 'price' in tier ? tier.price : 0;
  };

  return (
    <div className="bg-white/5 rounded-xl p-6 sticky top-24">
      <h3 className="text-xl font-bold mb-6 text-white">Order Summary</h3>

      {/* Selected Programs List */}
      {selectedPrograms.length === 0 ? (
        <p className="text-gray-400 mb-6">No programs selected</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {selectedPrograms.map((selected) => {
            const program = CLINIC_PROGRAMS[selected.programId];
            return (
              <li key={selected.programId} className="flex justify-between items-start">
                <div>
                  <span className="font-medium text-white">{program.name}</span>
                  <span className="text-sm text-gray-400 ml-2 capitalize">({selected.tier})</span>
                  {selected.participantCount && (
                    <span className="text-xs text-gray-500 block">
                      {selected.participantCount} participants
                    </span>
                  )}
                </div>
                <span className="text-white">${(calculateItemPrice(selected) / 100).toFixed(2)}</span>
              </li>
            );
          })}
        </ul>
      )}

      {/* Pricing Breakdown */}
      <div className="border-t border-white/10 pt-4 space-y-2">
        <div className="flex justify-between text-gray-400">
          <span>Subtotal</span>
          <span>${(pricing.subtotal / 100).toFixed(2)}</span>
        </div>

        {/* Show combined discount if both bundle and promo applied */}
        {pricing.bundleDiscount > 0 && pricing.schoolDiscount > 0 && promoDiscount && (
          <div className="flex justify-between text-purple-400 font-semibold">
            <span>Combined Discount (20% + {promoDiscount.percentOff}%)</span>
            <span>-${((pricing.bundleDiscount + pricing.schoolDiscount) / 100).toFixed(2)}</span>
          </div>
        )}

        {/* Show bundle discount only if no promo */}
        {pricing.bundleDiscount > 0 && !promoDiscount && (
          <div className="flex justify-between text-green-400">
            <span>Bundle Discount (20% off)</span>
            <span>-${(pricing.bundleDiscount / 100).toFixed(2)}</span>
          </div>
        )}

        {/* Show school discount only if no bundle */}
        {pricing.bundleDiscount === 0 && pricing.schoolDiscount > 0 && promoDiscount && (
          <div className="flex justify-between text-blue-400">
            <span>{promoDiscount.name || 'School Discount'} ({promoDiscount.percentOff}% off)</span>
            <span>-${(pricing.schoolDiscount / 100).toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-xl font-bold pt-2 border-t border-white/10 text-white">
          <span>Total Cost</span>
          <span>${(pricing.total / 100).toFixed(2)} CAD</span>
        </div>

        <div className="flex justify-between text-yellow-400 font-semibold mt-3 pt-2 border-t border-yellow-400/30">
          <span>50% Deposit Due Today</span>
          <span>${((pricing.total / 2) / 100).toFixed(2)} CAD</span>
        </div>

        <div className="flex justify-between text-gray-400 text-sm">
          <span>Remaining Balance (Due after program)</span>
          <span>${((pricing.total / 2) / 100).toFixed(2)} CAD</span>
        </div>
      </div>

      {/* Promo Code Input */}
      <div className="mt-6">
        <label className="text-sm text-gray-400 block mb-2">Discount Code</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value.toUpperCase())}
            placeholder="Enter code"
            className="flex-1 p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
          />
          <button
            onClick={onValidatePromo}
            disabled={!promoCode || promoCodeLoading}
            className="px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-50 text-white transition-colors"
          >
            {promoCodeLoading ? '...' : 'Apply'}
          </button>
        </div>
        {promoCodeValid === true && (
          <p className="text-green-400 text-sm mt-2">
            {promoDiscount?.percentOff}% discount applied!
          </p>
        )}
        {promoCodeValid === false && (
          <p className="text-red-400 text-sm mt-2">Invalid promo code</p>
        )}
      </div>

      {/* Deposit Information */}
      {selectedPrograms.length > 0 && (
        <div className="mt-6 p-4 rounded-lg bg-yellow-400/10 border border-yellow-400/30">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h.01a1 1 0 100-2H10zm3 0a1 1 0 100 2h.01a1 1 0 100-2H13z" clipRule="evenodd" />
            </svg>
            <div className="text-sm">
              <p className="font-semibold text-yellow-400 mb-2">50% Deposit Required</p>
              <p className="text-white/80">
                Pay <span className="font-bold text-yellow-300">${((pricing.total / 2) / 100).toFixed(2)} CAD</span> today to confirm your booking.
              </p>
              <p className="text-white/60 text-xs mt-2">
                Remaining balance: <span className="font-semibold">${((pricing.total / 2) / 100).toFixed(2)} CAD</span> due within 14 days after delivery of program.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Consent Language */}
      {selectedPrograms.length > 0 && (
        <div className="mt-4 p-4 rounded-lg bg-white/5 border border-white/10">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1" required />
            <span className="text-xs text-white/70 leading-relaxed">
              By completing this booking, I authorize Kirti Saxena to store my payment method and to charge the remaining balance to the same payment method if the final invoice remains unpaid after program delivery. I agree to ensure the payment method remains valid.
            </span>
          </label>
        </div>
      )}

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={selectedPrograms.length === 0 || isCheckingOut}
        className="w-full mt-6 py-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: selectedPrograms.length > 0
            ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
            : 'rgba(255,255,255,0.1)',
          color: selectedPrograms.length > 0 ? '#000' : '#666',
        }}
      >
        {isCheckingOut ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </span>
        ) : (
          <div>
            <div className="text-sm font-medium">Pay 50% Deposit</div>
            <div className="text-lg font-bold">${((pricing.total / 2) / 100).toFixed(2)} CAD</div>
          </div>
        )}
      </button>

      {selectedPrograms.length >= 2 && (
        <p className="text-center text-sm text-green-400 mt-4">
          Bundle discount applied!
        </p>
      )}

      <p className="text-center text-xs text-gray-500 mt-4">
        Secure checkout powered by Stripe
      </p>
    </div>
  );
}

export default function ClinicsCheckout() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center"><p>Loading...</p></div>}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [selectedPrograms, setSelectedPrograms] = useState<SelectedProgram[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeValid, setPromoCodeValid] = useState<boolean | null>(null);
  const [promoCodeLoading, setPromoCodeLoading] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState<{ percentOff?: number; name?: string } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
  });

  // Pre-select program from URL query
  useEffect(() => {
    const programParam = searchParams?.get('program');
    if (programParam && programParam in CLINIC_PROGRAMS) {
      setSelectedPrograms([{ programId: programParam as ProgramId, tier: 'mini' }]);
    }
  }, [searchParams]);

  // Handle program toggle
  const handleToggle = (programId: ProgramId, tier: TierType | null, participantCount?: number) => {
    setSelectedPrograms((prev) => {
      if (tier === null) {
        return prev.filter((p) => p.programId !== programId);
      }

      const existing = prev.find((p) => p.programId === programId);
      if (existing) {
        return prev.map((p) =>
          p.programId === programId ? { ...p, tier, participantCount } : p
        );
      }

      return [...prev, { programId, tier, participantCount }];
    });
  };

  // Calculate pricing
  const pricing = useMemo(() => {
    let subtotal = 0;
    selectedPrograms.forEach((selected) => {
      const program = CLINIC_PROGRAMS[selected.programId];
      const tier = program.tiers[selected.tier];
      if ('pricePerPerson' in tier && selected.participantCount) {
        subtotal += tier.pricePerPerson * selected.participantCount;
      } else if ('price' in tier) {
        subtotal += tier.price;
      }
    });

    // Bundle discount (20% off when 2+ programs)
    const bundleDiscount =
      selectedPrograms.length >= DISCOUNT_CONFIG.bundleThreshold
        ? Math.round(subtotal * (DISCOUNT_CONFIG.bundleDiscountPercent / 100))
        : 0;

    // School discount from promo code - applied after bundle
    const afterBundle = subtotal - bundleDiscount;
    const schoolDiscount =
      promoCodeValid && promoDiscount?.percentOff
        ? Math.round(afterBundle * (promoDiscount.percentOff / 100))
        : 0;

    const total = subtotal - bundleDiscount - schoolDiscount;

    return { subtotal, bundleDiscount, schoolDiscount, total };
  }, [selectedPrograms, promoCodeValid, promoDiscount]);

  // Validate promo code
  const handleValidatePromo = async () => {
    if (!promoCode) return;

    setPromoCodeLoading(true);
    try {
      const res = await fetch('/api/validate-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode }),
      });
      const data = await res.json();

      if (data.valid) {
        setPromoCodeValid(true);
        setPromoDiscount(data.discount);
      } else {
        setPromoCodeValid(false);
        setPromoDiscount(null);
      }
    } catch {
      setPromoCodeValid(false);
      setPromoDiscount(null);
    } finally {
      setPromoCodeLoading(false);
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (selectedPrograms.length === 0) return;
    if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phone) {
      alert('Please fill in all required fields');
      return;
    }

    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/clinics-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedPrograms,
          promoCode: promoCodeValid ? promoCode : undefined,
          personalInfo,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert('Error: ' + data.error);
        setIsCheckingOut(false);
        return;
      }

      // Redirect to Stripe
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
        if (error) {
          alert('Error: ' + error.message);
        }
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <ProjectNav />

      <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Back Arrow */}
        <Link
          href="/projects/clinics"
          className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Build Your Package</h1>
          <p className="text-gray-400 mt-2">
            Get <span className="font-bold text-yellow-400">15% off</span> when you bundle 2 or more programs! If you are a school you automatically qualify for <span className="font-bold text-yellow-400">35% off</span> with a bundle.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Program Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {(Object.keys(CLINIC_PROGRAMS) as ProgramId[]).map((programId) => (
                <ProgramCard
                  key={programId}
                  programId={programId}
                  program={CLINIC_PROGRAMS[programId]}
                  selected={selectedPrograms.find((p: any) => p.programId === programId)}
                  onToggle={handleToggle}
                />
              ))}
            </div>

            {/* Info Note */}
            <div className="bg-white/5 rounded-lg p-4 text-sm text-gray-400">
              <p className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                
              </p>After payment, I will put your transaction on hold for 48 Hours and follow up via email about confirmation of location, timings & any special inquiries. Any additional costs that may be associated with travel if outside the Greater Toronto Area will be disclosed within email and added onto the final invoice. If no response is recieved, the deposit will be returned and the booking will be cancelled.
              <p className="mt-3 flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Have questions? Reach out to<a href="mailto:clinics@kirtisaxena.com" className="text-yellow-400 hover:text-yellow-300 font-semibold">clinics@kirtisaxena.com</a>
              </p>
            </div>

            {/* Personal Information Form */}
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Your Information</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last Name *"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email *"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Organization / School (if applicable)"
                  value={personalInfo.organization}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, organization: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
              <p className="text-xs text-gray-500 mt-4">* Required fields</p>
            </div>

            {/* Art Collection Section */}
            <div className="mt-12 hidden">
              {/* Heading */}
              <div className="flex items-center gap-4 mb-8">
                <Link
                  href="/projects/artistry"
                  className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                <h2 className="text-3xl md:text-4xl font-bold">Art Collection</h2>
              </div>

              {/* Art Category Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Raptors Art */}
                <div
                  className="rounded-xl p-6 h-full flex flex-col"
                  style={{
                    background: 'linear-gradient(135deg, rgba(220, 20, 60, 0.15) 0%, rgba(139, 0, 0, 0.15) 100%)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 0 40px rgba(220, 20, 60, 0.1)',
                  }}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-white mb-3 tracking-wide">RAPTORS ART</h3>
                    <p className="text-white/70 text-sm">Toronto inspired artwork collection</p>
                  </div>

                  <div className="text-center mb-6 flex-grow">
                    <div className="inline-block px-5 py-3 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)' }}>
                      <span className="text-lg font-black text-white">Coming Soon</span>
                    </div>
                    <p className="text-white/80 text-sm">
                      Limited edition Raptors-themed prints and canvas art
                    </p>
                  </div>

                  <div className="text-center mt-auto">
                    <Link
                      href="/projects/artistry"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      style={{
                        background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
                        color: '#fff',
                      }}
                    >
                      View Collection
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Modelling Paste Art */}
                <div
                  className="rounded-xl p-6 h-full flex flex-col"
                  style={{
                    background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 0 40px rgba(147, 51, 234, 0.1)',
                  }}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-white mb-3 tracking-wide">MODELLING PASTE ART</h3>
                    <p className="text-white/70 text-sm">Textured and dimensional artwork</p>
                  </div>

                  <div className="text-center mb-6 flex-grow">
                    <div className="inline-block px-5 py-3 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)' }}>
                      <span className="text-lg font-black text-white">Coming Soon</span>
                    </div>
                    <p className="text-white/80 text-sm">
                      Hand-crafted modelling paste art pieces
                    </p>
                  </div>

                  <div className="text-center mt-auto">
                    <Link
                      href="/projects/artistry"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      style={{
                        background: 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
                        color: '#fff',
                      }}
                    >
                      View Collection
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Canvas Art */}
                <div
                  className="rounded-xl p-6 h-full flex flex-col"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 0 40px rgba(16, 185, 129, 0.1)',
                  }}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-white mb-3 tracking-wide">CANVAS ART</h3>
                    <p className="text-white/70 text-sm">Premium canvas artwork collection</p>
                  </div>

                  <div className="text-center mb-6 flex-grow">
                    <div className="inline-block px-5 py-3 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #10B981 0%, #22C55E 100%)' }}>
                      <span className="text-lg font-black text-white">Coming Soon</span>
                    </div>
                    <p className="text-white/80 text-sm">
                      Original canvas paintings and prints
                    </p>
                  </div>

                  <div className="text-center mt-auto">
                    <Link
                      href="/projects/artistry"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      style={{
                        background: 'linear-gradient(135deg, #10B981 0%, #22C55E 100%)',
                        color: '#fff',
                      }}
                    >
                      View Collection
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Digital Art */}
                <div
                  className="rounded-xl p-6 h-full flex flex-col"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 0 40px rgba(59, 130, 246, 0.1)',
                  }}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-white mb-3 tracking-wide">DIGITAL ART</h3>
                    <p className="text-white/70 text-sm">High-quality digital artwork</p>
                  </div>

                  <div className="text-center mb-6 flex-grow">
                    <div className="inline-block px-5 py-3 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)' }}>
                      <span className="text-lg font-black text-white">Coming Soon</span>
                    </div>
                    <p className="text-white/80 text-sm">
                      Digital prints and downloadable artwork
                    </p>
                  </div>

                  <div className="text-center mt-auto">
                    <Link
                      href="/projects/artistry"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
                        color: '#fff',
                      }}
                    >
                      View Collection
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              selectedPrograms={selectedPrograms}
              pricing={pricing}
              promoCode={promoCode}
              promoCodeValid={promoCodeValid}
              promoCodeLoading={promoCodeLoading}
              promoDiscount={promoDiscount}
              onPromoCodeChange={(code) => {
                setPromoCode(code);
                setPromoCodeValid(null);
                setPromoDiscount(null);
              }}
              onValidatePromo={handleValidatePromo}
              onCheckout={handleCheckout}
              isCheckingOut={isCheckingOut}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
