'use client';

import { useEffect, useState, useRef } from 'react';
import HeroSingle from '@/components/HeroSingle';

export default function Contact() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Listen for messages from the Google Form iframe
    const handleMessage = (event: MessageEvent) => {
      // Google Forms may send various messages when submitted
      if (event.origin === 'https://docs.google.com' || event.origin.includes('google.com')) {
        console.log('Message received from Google:', event.data);
        // Check various indicators of form submission
        if (
          (typeof event.data === 'string' && (
            event.data.includes('formResponse') || 
            event.data.includes('submitSuccess') ||
            event.data.includes('confirmation')
          )) ||
          (typeof event.data === 'object' && event.data?.type === 'formSubmitted')
        ) {
          setIsFormSubmitted(true);
          // Scroll to the top of the section smoothly
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Polling mechanism to check for form submission
    // Google Forms typically shows "Your response has been recorded" after submission
    const checkInterval = setInterval(() => {
      try {
        const iframe = iframeRef.current;
        if (iframe?.contentWindow) {
          // Note: We can't directly access iframe content due to CORS,
          // but we can try to send a message asking for status
          iframe.contentWindow.postMessage({ type: 'checkStatus' }, '*');
        }
      } catch (e) {
        // Cross-origin access will fail, which is expected
      }
    }, 1000);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(checkInterval);
    };
  }, []);

  return (
    <>
      {/* Preload hero image */}
      <link rel="preload" as="image" href="/images/image (14).webp" />

      {/* Hero Section */}
      <HeroSingle
        imageSrc="/images/image (14).webp"
        imageAlt="Let's Plan Your Perfect Trip"
        title="Let's Plan Your Perfect Trip"
        subtitle="Ready to turn your travel dreams into reality? We're here to help!"
        overlay="gradient"
        compact
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="heading-md mb-6">How to Get Started</h2>
          <p className="text-lg text-neutral-700 leading-relaxed">
            Fill out the form below with as much detail as possible about your travel plans. 
            Sara will personally review your request and reach out within 24-48 hours to begin 
            creating your perfect itinerary.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom max-w-3xl mx-auto">
          
          {!isFormSubmitted ? (
            <>
              {/* Google Form Embed - Responsive heights for different viewports */}
              <div className="mb-8">
                <iframe 
                  ref={iframeRef}
                  src="https://docs.google.com/forms/d/e/1FAIpQLSckVZ_Q3roXdmSyfUVzqPQZUGoKHm5QaaBMIYWbVdlI-W2jNQ/viewform?embedded=true" 
                  width="100%" 
                  frameBorder="0" 
                  scrolling="no"
                  className="w-full h-[1700px] md:h-[1300px]"
                  style={{ border: 'none', overflow: 'hidden' }}
                >
                  Loading…
                </iframe>
              </div>

              {/* Manual submission button as fallback */}
              <div className="text-center">
                <p className="text-sm text-neutral-600 mb-3">
                  Already submitted? Click below to see what happens next.
                </p>
                <button
                  onClick={() => {
                    setIsFormSubmitted(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-outline text-sm"
                >
                  I&apos;ve Submitted the Form
                </button>
              </div>
            </>
          ) : (
            /* What Happens Next - Shown after form submission */
            <div className="max-w-2xl mx-auto animate-fadeIn">
              <h4 className="font-semibold text-2xl mb-6 text-primary text-center">What Happens Next?</h4>
              
              {/* Thank You Message */}
              <div className="mb-8 p-6 bg-secondary/10 border-l-4 border-secondary rounded">
                <p className="text-neutral-700 leading-relaxed">
                  <strong>Thank you for your submission!</strong> I will contact you in the next 24-48 hours. 
                  If this is an urgent last minute planning please contact{' '}
                  <a 
                    href="mailto:saraculleny@starborntravels.com" 
                    className="text-primary hover:text-primary-dark underline"
                  >
                    saraculleny@starborntravels.com
                  </a>
                  . Happy Traveling!
                </p>
              </div>

              <ol className="space-y-6">
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-base font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-lg">You Submit</p>
                    <p className="text-neutral-600">Complete the form with your travel details</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-base font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-lg">We Review</p>
                    <p className="text-neutral-600">Sara reviews your request within 24-48 hours</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-base font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-lg">We Connect</p>
                    <p className="text-neutral-600">Sara reaches out to discuss your trip</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-base font-semibold">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-lg">We Plan</p>
                    <p className="text-neutral-600">We create your custom itinerary</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-base font-semibold">
                    5
                  </div>
                  <div>
                    <p className="font-medium text-lg">You Travel</p>
                    <p className="text-neutral-600">Enjoy your perfectly planned vacation!</p>
                  </div>
                </li>
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="heading-md mb-6">Have Questions First?</h2>
          <p className="text-lg text-neutral-700 mb-8">
            Check out our comprehensive FAQ page for answers to common questions about 
            our services, pricing, and the booking process.
          </p>
          <a href="/faq" className="btn-outline">
            View FAQs
          </a>
        </div>
      </section>

      {/* Testimonial Snippet */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-xl text-neutral-700 italic mb-6">
              &ldquo;Sara planned our family&apos;s first Disney vacation and it was absolutely magical! 
              Every detail was perfect, from our resort to our dining reservations. She knew exactly 
              what we needed and saved us so much stress. We&apos;ll never plan a trip without her again!&rdquo;
            </blockquote>
            <p className="font-semibold text-neutral-900">Jennifer M.</p>
            <p className="text-neutral-600">Tampa, FL</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-gradient-to-r from-primary-dark via-primary to-accent text-white">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Adventure Awaits
          </h2>
          <p className="text-xl text-neutral-100">
            Don&apos;t wait to start planning the trip of a lifetime. Contact us today and let&apos;s 
            create something extraordinary together!
          </p>
        </div>
      </section>
    </>
  );
}
