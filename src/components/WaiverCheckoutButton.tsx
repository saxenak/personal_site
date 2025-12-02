'use client';

import { useState } from 'react';
import CheckoutButton from './CheckoutButton';

interface WaiverCheckoutButtonProps {
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

export default function WaiverCheckoutButton(props: WaiverCheckoutButtonProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<'booking' | 'waiver' | 'payment'>('booking');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmittingWaiver, setIsSubmittingWaiver] = useState(false);
  const [waiverData, setWaiverData] = useState({
    participantName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    agreement: false
  });

  const handleBookingClick = () => {
    if (props.productType === 'clinics') {
      setShowBookingModal(true);
      setCurrentStep('booking');
    }
  };

  const handleDateTimeSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }
    setCurrentStep('waiver');
  };

  const handleWaiverSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!waiverData.agreement) {
      alert('Please agree to the waiver terms to continue.');
      return;
    }

    setIsSubmittingWaiver(true);

    try {
      const response = await fetch('/api/store-waiver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: `${props.productId}-${Date.now()}`,
          ...waiverData,
          bookingDate: selectedDate,
          bookingTime: selectedTime
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit waiver');
      }

      setCurrentStep('payment');
    } catch (error) {
      console.error('Error submitting waiver:', error);
      alert('Error submitting waiver. Please try again.');
    } finally {
      setIsSubmittingWaiver(false);
    }
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setCurrentStep('booking');
    setSelectedDate('');
    setSelectedTime('');
  };

  // Simple checkout button for non-clinic products
  if (props.productType !== 'clinics') {
    return <CheckoutButton {...props} />;
  }

  // Initial booking button with clear expectations
  return (
    <>
      <button
        onClick={handleBookingClick}
        disabled={props.disabled}
        className={`w-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${props.className}`}
        style={{
          backgroundColor: props.disabled ? '#6b7280' : '#ffffff',
          color: props.disabled ? 'white' : '#000000',
          padding: '1rem 2rem',
          border: 'none',
          fontSize: '1rem',
          fontWeight: '400',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          if (!props.disabled) {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
          }
        }}
        onMouseLeave={(e) => {
          if (!props.disabled) {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
          }
        }}
      >
        {props.children}
      </button>

      {/* Unified Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-200 text-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-300">
            <div className="p-6">
              {/* Header with Progress */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-light text-gray-800">Book Training Session</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      currentStep === 'booking' ? 'bg-gray-700 text-white' : 
                      currentStep === 'waiver' || currentStep === 'payment' ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'
                    }`}>1</div>
                    <span className="text-sm text-gray-600">Schedule</span>
                    <div className="w-8 h-0.5 bg-gray-400"></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      currentStep === 'waiver' ? 'bg-gray-700 text-white' : 
                      currentStep === 'payment' ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'
                    }`}>2</div>
                    <span className="text-sm text-gray-600">Waiver</span>
                    <div className="w-8 h-0.5 bg-gray-400"></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      currentStep === 'payment' ? 'bg-gray-700 text-white' : 'bg-gray-400 text-white'
                    }`}>3</div>
                    <span className="text-sm text-gray-600">Payment</span>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-600 hover:text-gray-800 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  title="Close booking form"
                >
                  ×
                </button>
              </div>

              {/* Step 1: Booking/Scheduling */}
              {currentStep === 'booking' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Calendar Selection */}
                    <div className="border rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-4">📅 Select Date & Time</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Preferred Date</label>
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Preferred Time</label>
                          <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select time...</option>
                            <option value="9:00 AM">9:00 AM</option>
                            <option value="10:30 AM">10:30 AM</option>
                            <option value="12:00 PM">12:00 PM</option>
                            <option value="1:30 PM">1:30 PM</option>
                            <option value="3:00 PM">3:00 PM</option>
                            <option value="4:30 PM">4:30 PM</option>
                            <option value="6:00 PM">6:00 PM</option>
                          </select>
                        </div>

                        <button
                          onClick={handleDateTimeSubmit}
                          disabled={!selectedDate || !selectedTime}
                          className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continue to Waiver →
                        </button>
                      </div>
                    </div>

                    {/* Session Details */}
                    <div className="border rounded-lg p-6 bg-gray-50">
                      <h3 className="text-lg font-medium mb-4">Session Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Session Type:</span>
                          <span className="font-medium">{props.children}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="font-medium">${props.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>90 minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Location:</span>
                          <span>TBD after booking</span>
                        </div>
                        {selectedDate && selectedTime && (
                          <div className="pt-2 border-t">
                            <div className="flex justify-between font-medium">
                              <span>Selected:</span>
                              <span>{selectedDate} at {selectedTime}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Waiver */}
              {currentStep === 'waiver' && (
                <form onSubmit={handleWaiverSubmit} className="space-y-4">
                  <div className="mb-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                    <p className="text-blue-800 text-sm">
                      📅 <strong>Selected:</strong> {selectedDate} at {selectedTime}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={waiverData.participantName}
                        onChange={(e) => setWaiverData(prev => ({ ...prev, participantName: e.target.value }))}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={waiverData.email}
                        onChange={(e) => setWaiverData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={waiverData.phone}
                        onChange={(e) => setWaiverData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Emergency Contact *</label>
                      <input
                        type="text"
                        required
                        value={waiverData.emergencyContact}
                        onChange={(e) => setWaiverData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none text-gray-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Emergency Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      value={waiverData.emergencyPhone}
                      onChange={(e) => setWaiverData(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Medical Conditions</label>
                    <textarea
                      value={waiverData.medicalConditions}
                      onChange={(e) => setWaiverData(prev => ({ ...prev, medicalConditions: e.target.value }))}
                      placeholder="Please list any medical conditions, injuries, or limitations we should be aware of..."
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none text-gray-800 h-20"
                    />
                  </div>

                  {/* Waiver Text */}
                  <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg text-sm text-gray-700">
                    <h3 className="font-medium mb-2 text-gray-800">LIABILITY WAIVER AND ASSUMPTION OF RISK</h3>
                    <p className="mb-2">
                      I acknowledge that participation in athletic training involves inherent risks of injury. I voluntarily assume all risks associated with participation and release Kirti Saxena and associated parties from any liability for injuries or damages.
                    </p>
                    <p className="mb-2">
                      I confirm that I am physically capable of participating and have disclosed all relevant medical conditions. I agree to follow all safety instructions and training protocols.
                    </p>
                    <p>
                      By signing this waiver, I agree to these terms and conditions for participation in training sessions.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="agreement"
                      checked={waiverData.agreement}
                      onChange={(e) => setWaiverData(prev => ({ ...prev, agreement: e.target.checked }))}
                      className="w-4 h-4 accent-gray-700"
                    />
                    <label htmlFor="agreement" className="text-sm text-gray-700">
                      I have read and agree to the liability waiver and assumption of risk *
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('booking')}
                      className="flex-1 px-4 py-3 border border-gray-400 rounded-lg hover:border-gray-600 transition-colors text-gray-700"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={!waiverData.agreement || isSubmittingWaiver}
                      className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmittingWaiver ? 'Submitting...' : 'Continue to Payment →'}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Payment */}
              {currentStep === 'payment' && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="text-green-600 mr-3">✅</div>
                      <div>
                        <h3 className="font-medium text-green-800">Waiver Completed</h3>
                        <p className="text-green-700 text-sm">Ready for payment and final booking confirmation</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
                    <div className="space-y-2 text-sm mb-6">
                      <div className="flex justify-between">
                        <span>Date & Time:</span>
                        <span className="font-medium">{selectedDate} at {selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Participant:</span>
                        <span className="font-medium">{waiverData.participantName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium">{waiverData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Session:</span>
                        <span className="font-medium">{props.children}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>${props.price}</span>
                      </div>
                    </div>

                    <CheckoutButton
                      {...props}
                      bookingData={{
                        date: selectedDate,
                        time: selectedTime,
                        location: 'TBD',
                        notes: `Participant: ${waiverData.participantName}, Email: ${waiverData.email}`
                      }}
                      className="w-full"
                    >
                      Complete Payment - ${props.price}
                    </CheckoutButton>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => setCurrentStep('waiver')}
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      ← Back to Waiver
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}