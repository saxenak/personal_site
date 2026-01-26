'use client';

import { useState } from 'react';
import ProjectNav from '@/components/ProjectNav';
import Link from 'next/link';

export default function ClinicsInquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    program: '',
    groupSize: '',
    preferredDate: '',
    message: '',
  });

  const programs = [
    { value: 'self-defense', label: 'Self Defense Clinic' },
    { value: 'high-performance', label: 'High-Performance Talk' },
    { value: 'ai-sustainability', label: 'Innovate for a Purpose Talk' },
    { value: 'wrestling-private', label: 'Wrestling Private Training' },
    { value: 'bundle', label: 'Custom Bundle (2+ programs)' },
    { value: 'other', label: 'Other / General Inquiry' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build the email body
    const subject = encodeURIComponent(`Program Inquiry: ${formData.program || 'General'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email || 'Not provided'}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Organization: ${formData.organization}\n` +
      `Program Interest: ${formData.program}\n` +
      `Group Size: ${formData.groupSize}\n` +
      `Preferred Date: ${formData.preferredDate}\n\n` +
      `Message:\n${formData.message}`
    );

    // Open email client
    window.location.href = `mailto:clinics@kirtisaxena.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <ProjectNav title="KIRTI SAXENA" />

      <div className="pt-20 md:pt-32 px-4 md:px-8 max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/projects/clinics"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Clinics & Talks
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Send a Message
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Interested in booking a program? Fill out the form below and I&apos;ll get back to you within 48 hours.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FFD700] transition-colors"
              placeholder="John Smith"
            />
          </div>

          {/* Email & Phone Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FFD700] transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FFD700] transition-colors"
                placeholder="(416) 555-1234"
              />
            </div>
          </div>

          {/* Organization */}
          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-white/80 mb-2">
              Organization / Company
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FFD700] transition-colors"
              placeholder="Your company or school name"
            />
          </div>

          {/* Program Selection */}
          <div>
            <label htmlFor="program" className="block text-sm font-medium text-white/80 mb-2">
              Program Interest *
            </label>
            <select
              id="program"
              name="program"
              required
              value={formData.program}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
            >
              <option value="" className="bg-black">Select a program</option>
              {programs.map(prog => (
                <option key={prog.value} value={prog.label} className="bg-black">
                  {prog.label}
                </option>
              ))}
            </select>
          </div>

          {/* Group Size & Date Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="groupSize" className="block text-sm font-medium text-white/80 mb-2">
                Estimated Group Size
              </label>
              <input
                type="text"
                id="groupSize"
                name="groupSize"
                value={formData.groupSize}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FFD700] transition-colors"
                placeholder="e.g., 30-60 people"
              />
            </div>
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-white/80 mb-2">
                Preferred Date / Timeframe
              </label>
              <input
                type="text"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FFD700] transition-colors"
                placeholder="e.g., March 2026"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
              Additional Details
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
              placeholder="Tell me about your goals, any specific requirements, or questions you have..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: '#FFD700',
              color: '#000',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
            }}
          >
            Send Inquiry
          </button>

          <p className="text-center text-sm text-white/50">
            This will open your email client with the form details pre-filled.
          </p>
        </form>
      </div>
    </main>
  );
}
