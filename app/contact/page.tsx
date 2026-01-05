import type { Metadata } from 'next';
import HeroImageGrid from '@/components/HeroImageGrid';

export const metadata: Metadata = {
  title: 'Contact Us | Starborn Travel Agency',
  description: 'Get in touch with Starborn Travel Agency to start planning your perfect vacation. Fill out our contact form and Sara will respond within 24-48 hours.',
};

export default function Contact() {
  const heroImages = [
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Planning Together' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Adventure Awaits' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Travel Dreams Come True' },
  ];
  return (
    <>
      {/* Hero Section */}
      <HeroImageGrid
        images={heroImages}
        title="Let's Plan Your Perfect Trip"
        subtitle="Ready to turn your travel dreams into reality? We're here to help!"
        overlay="gradient"
        compact
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="heading-md mb-6">How to Get Started</h2>
          <p className="text-lg text-neutral-700 leading-relaxed mb-4">
            Fill out the form below with as much detail as possible about your travel plans. 
            Sara will personally review your request and reach out within 24-48 hours to begin 
            creating your perfect itinerary.
          </p>
          <p className="text-neutral-600">
            The more information you provide, the better we can tailor your experience to match 
            your preferences and budget!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Container */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Trip Request Form</h3>
                
                {/* Google Form Embed */}
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSckVZ_Q3roXdmSyfUVzqPQZUGoKHm5QaaBMIYWbVdlI-W2jNQ/viewform?embedded=true" 
                  width="100%" 
                  height="1200" 
                  frameBorder="0" 
                  marginHeight={0} 
                  marginWidth={0}
                  className="rounded-lg"
                >
                  Loading…
                </iframe>
              </div>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* What to Expect */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="font-semibold text-lg mb-4 text-primary">What Happens Next?</h4>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">You Submit</p>
                      <p className="text-sm text-neutral-600">Complete the form with your travel details</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">We Review</p>
                      <p className="text-sm text-neutral-600">Sara reviews your request within 24-48 hours</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">We Connect</p>
                      <p className="text-sm text-neutral-600">Sara reaches out to discuss your trip</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-semibold">
                      4
                    </div>
                    <div>
                      <p className="font-medium">We Plan</p>
                      <p className="text-sm text-neutral-600">We create your custom itinerary</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-semibold">
                      5
                    </div>
                    <div>
                      <p className="font-medium">You Travel</p>
                      <p className="text-sm text-neutral-600">Enjoy your perfectly planned vacation!</p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg shadow-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Other Ways to Reach Us</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <p className="text-sm text-neutral-100">info@starborntravel.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-medium mb-1">Phone</p>
                      <p className="text-sm text-neutral-100">(555) 123-4567</p>
                      <p className="text-xs text-neutral-200 mt-1">Mon-Fri: 9am-6pm EST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-6">
                <h4 className="font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Helpful Tips
                </h4>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>• Include flexible dates if possible</li>
                  <li>• Share your budget range</li>
                  <li>• Mention any special occasions</li>
                  <li>• List must-have experiences</li>
                  <li>• Note any accessibility needs</li>
                </ul>
              </div>
            </div>
          </div>
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
