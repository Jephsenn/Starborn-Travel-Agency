'use client';

import { useState } from 'react';

export default function EmailSignup() {
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
      setMessage('Thank you for signing up! Check your inbox for confirmation.');
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
    <section id="email-signup" className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container-custom max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-neutral-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4">
              <svg 
                className="w-8 h-8 text-white" 
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
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Never Miss a Deal!
            </h2>
            <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
              Want to be on our email list and receive personalized emails about deals that may interest you? 
              Sign up below to get exclusive offers, travel tips, and early access to our best promotions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={status === 'loading'}
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-neutral-100 disabled:cursor-not-allowed"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Signing Up...' : 'Sign Up Here'}
              </button>
            </div>

            {message && (
              <div
                className={`mt-4 p-3 rounded-lg text-center ${
                  status === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
                role="alert"
              >
                {message}
              </div>
            )}
          </form>

          <p className="text-xs text-neutral-500 text-center mt-6">
            By signing up, you agree to receive promotional emails from Starborn Travel Agency. 
            You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
