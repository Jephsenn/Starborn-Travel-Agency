import type { Metadata } from 'next';
import Link from 'next/link';
import PromotionCard from '@/components/PromotionCard';
import HeroImageGrid from '@/components/HeroImageGrid';
import { promotions, getPromotionsByCategory } from '@/data/promotions';

export const metadata: Metadata = {
  title: 'Current Promotions & Deals | Starborn Travel Agency',
  description: 'Browse our latest travel deals and promotions including airfare discounts, cruise specials, Disney packages, and exclusive vacation offers.',
};

export default function Promos() {
  const heroImages = [
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Amazing Travel Deals' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Cruise at Sunset' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Disney Fireworks Magic' },
  ];
  const airfarePromos = getPromotionsByCategory('airfare');
  const cruisePromos = getPromotionsByCategory('cruise');
  const disneyPromos = getPromotionsByCategory('disney');
  const generalPromos = getPromotionsByCategory('general');

  return (
    <>
      {/* Hero Section */}
      <HeroImageGrid
        images={heroImages}
        title="Current Promotions & Deals"
        subtitle="Exclusive travel offers to help you save on your next adventure"
        overlay="gradient"
        compact
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl text-center">
          <p className="text-lg text-neutral-700 mb-4 leading-relaxed">
            Take advantage of these limited-time offers on flights, cruises, Disney vacations, and more. 
            All promotions are subject to availability and terms may apply.
          </p>
          <p className="text-neutral-600">
            <strong>Want to book?</strong> Contact us with the promotion you&apos;re interested in, 
            and we&apos;ll handle all the details.
          </p>
        </div>
      </section>

      {/* Airfare Promotions */}
      {airfarePromos.length > 0 && (
        <section className="section-padding bg-neutral-100">
          <div className="container-custom">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <h2 className="heading-md">Airfare Deals</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {airfarePromos.map((promo) => (
                <PromotionCard key={promo.id} promotion={promo} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cruise Promotions */}
      {cruisePromos.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-cyan-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                <h2 className="heading-md">Cruise Specials</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cruisePromos.map((promo) => (
                <PromotionCard key={promo.id} promotion={promo} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Disney Promotions */}
      {disneyPromos.length > 0 && (
        <section className="section-padding bg-neutral-100">
          <div className="container-custom">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <h2 className="heading-md">Disney Magic Offers</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {disneyPromos.map((promo) => (
                <PromotionCard key={promo.id} promotion={promo} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* General Travel Promotions */}
      {generalPromos.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-amber-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <h2 className="heading-md">Special Travel Packages</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generalPromos.map((promo) => (
                <PromotionCard key={promo.id} promotion={promo} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Important Information */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Important Information
            </h3>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>All promotions are subject to availability and may have blackout dates or restrictions.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Prices shown are starting prices and may vary based on travel dates, room type, and availability.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Book early for best selection and pricing. Popular dates and destinations sell out quickly.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Contact us for complete terms and conditions, as well as specific pricing for your travel dates.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>We strongly recommend purchasing travel insurance to protect your investment.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-primary to-accent text-white">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book Your Deal?
          </h2>
          <p className="text-xl mb-8 text-neutral-100">
            Contact us today to secure one of these amazing promotions before they&apos;re gone!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-secondary">
              Contact Us Now
            </Link>
            <Link href="/services" className="bg-white text-primary hover:bg-neutral-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block">
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
