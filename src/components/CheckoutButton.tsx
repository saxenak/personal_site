'use client';

import { useState } from 'react';

interface CheckoutButtonProps {
  productType: 'paintings' | 'clinics';
  productId: string;
  price: number;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  bookingData?: {
    date: string;
    time: string;
    location: string;
    notes?: string;
  };
}

export default function CheckoutButton({ 
  productType, 
  productId, 
  price, 
  disabled = false,
  className = '',
  children,
  bookingData
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    
    try {
      console.log('🛒 Starting checkout for:', { productType, productId, price });
      
      const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productType,
            productId,
            bookingData
          }),
        });

      console.log('📡 API Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 API Response data:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.sessionId) {
        throw new Error('No session ID received from server');
      }

      console.log('🔗 Redirecting to checkout with session:', data.sessionId);
      
      // For live mode, try different redirect approaches
      const sessionId = data.sessionId;
      
      console.log('🚀 Attempting Stripe checkout redirect...');
      
      // Method 1: Try the official Stripe.js redirect first
      try {
        const { loadStripe } = await import('@stripe/stripe-js');
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        
        if (stripe) {
          console.log('Using Stripe.js redirect method');
          const result = await (stripe as any).redirectToCheckout({ sessionId });
          
          if (result.error) {
            throw new Error(result.error.message);
          }
          return; // Success, no need to try other methods
        }
      } catch (stripeError) {
        console.log('Stripe.js redirect failed, trying direct URL:', stripeError);
      }
      
      // Method 2: Direct URL redirect as fallback
      const checkoutUrl = `https://checkout.stripe.com/c/pay/${sessionId}`;
      console.log('� Using direct URL redirect:', checkoutUrl);
      
      // Try window.open first (in case of popup blockers)
      const newWindow = window.open(checkoutUrl, '_blank');
      
      if (!newWindow || newWindow.closed) {
        // If popup blocked, use location.href
        console.log('Popup blocked, using same-window redirect');
        window.location.href = checkoutUrl;
      } else {
        console.log('Opened in new window');
      }
      
    } catch (error) {
      console.error('❌ Checkout error:', error);
      
      // More specific error messages
      let errorMessage = 'Payment system error. ';
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Unknown error occurred.';
      }
      
      alert(errorMessage + '\n\nPlease try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || isLoading}
      className={`
        transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isLoading ? 'cursor-wait' : ''}
        ${className}
      `}
      style={{
        backgroundColor: disabled || isLoading ? '#6b7280' : '#ffffff',
        color: disabled || isLoading ? 'white' : '#000000',
        padding: '1rem 2rem',
        border: 'none',
        fontSize: '1rem',
        fontWeight: '400',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
      }}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
}