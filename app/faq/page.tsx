import type { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordionItem from '@/components/FAQAccordionItem';
import HeroImageGrid from '@/components/HeroImageGrid';
import { faqs } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Starborn Travel Agency',
  description: 'Find answers to common questions about our travel planning services, booking process, pricing, and more.',
};

export default function FAQ() {
  const heroImages = [
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Expert Customer Service' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Travel Consultation' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Peace of Mind Travel' },
  ];
  return (
    <>
      {/* Hero Section */}
      <HeroImageGrid
        images={heroImages}
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about working with Starborn Travel Agency"
        overlay="dark"
        compact
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl text-center">
          <p className="text-lg text-neutral-700 leading-relaxed">
            We&apos;ve compiled answers to the most common questions we receive. If you don&apos;t 
            see your question here, please don&apos;t hesitate to <Link href="/contact" className="text-primary hover:underline font-medium">contact us</Link> directly!
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden">
            {faqs.map((faq) => (
              <FAQAccordionItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="heading-md text-center mb-12">Still Have Questions?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-neutral-50 rounded-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-3">Send Us a Message</h3>
              <p className="text-neutral-600 mb-4">
                Fill out our contact form and we&apos;ll respond within 24-48 hours.
              </p>
              <Link href="/contact" className="text-primary hover:underline font-medium">
                Contact Form →
              </Link>
            </div>

            <div className="text-center p-6 bg-neutral-50 rounded-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-3">Learn More About Us</h3>
              <p className="text-neutral-600 mb-4">
                Discover our story, mission, and what makes us different.
              </p>
              <Link href="/about" className="text-primary hover:underline font-medium">
                About Us →
              </Link>
            </div>

            <div className="text-center p-6 bg-neutral-50 rounded-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-3">Explore Our Services</h3>
              <p className="text-neutral-600 mb-4">
                See the full range of travel planning services we offer.
              </p>
              <Link href="/services" className="text-primary hover:underline font-medium">
                Our Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-md text-center mb-8">Quick Travel Planning Tips</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Best Time to Book
                </h3>
                <ul className="space-y-2 text-neutral-700 text-sm">
                  <li>• International trips: 6-12 months ahead</li>
                  <li>• Domestic travel: 3-6 months ahead</li>
                  <li>• Disney vacations: 6-11 months ahead</li>
                  <li>• Cruises: 9-12 months ahead</li>
                  <li>• Last-minute deals: Within 2-4 weeks</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  What to Prepare
                </h3>
                <ul className="space-y-2 text-neutral-700 text-sm">
                  <li>• Travel dates (with some flexibility)</li>
                  <li>• Approximate budget per person</li>
                  <li>• Destination preferences or ideas</li>
                  <li>• Number of travelers (ages if children)</li>
                  <li>• Special occasions or celebrations</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Travel Insurance
                </h3>
                <ul className="space-y-2 text-neutral-700 text-sm">
                  <li>• Highly recommended for all trips</li>
                  <li>• Covers cancellations, medical emergencies</li>
                  <li>• Protection for lost luggage</li>
                  <li>• Trip interruption coverage</li>
                  <li>• We can help you choose the right plan</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Documents Needed
                </h3>
                <ul className="space-y-2 text-neutral-700 text-sm">
                  <li>• Valid passport (international travel)</li>
                  <li>• Check passport expiration dates</li>
                  <li>• Visas may be required for some countries</li>
                  <li>• Birth certificates for cruises (children)</li>
                  <li>• We&apos;ll guide you through requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-accent to-primary-dark text-white">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-neutral-100">
            Don&apos;t let questions hold you back. Contact Sara today and let&apos;s discuss your travel dreams!
          </p>
          <Link href="/contact" className="btn-secondary">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
