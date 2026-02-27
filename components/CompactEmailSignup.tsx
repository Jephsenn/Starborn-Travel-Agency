'use client';

import { useState } from 'react';

export default function CompactEmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate API call - replace with actual API endpoint
    try {
      // TODO: Replace with actual API call to your email service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Thank you for signing up!');
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="section-padding bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      <div className="container-custom max-w-3xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-3">
            <svg 
              className="w-6 h-6 text-primary mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Get Exclusive Deals in Your Inbox
            </h2>
          </div>
          <p className="text-neutral-700 mb-6 max-w-2xl mx-auto">
            Join our mailing list for personalized travel deals, early access to promotions, and insider travel tips.
          </p>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={status === 'loading'}
                className="flex-1 px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-neutral-100 disabled:cursor-not-allowed text-base"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
              >
                {status === 'loading' ? 'Joining...' : 'Join Now'}
              </button>
            </div>

            {message && (
              <div
                className={`mt-3 p-2 rounded-lg text-sm text-center ${
                  status === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
                role="alert"
              >
                {message}
              </div>
            )}
          </form>

          <p className="text-xs text-neutral-500 mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
