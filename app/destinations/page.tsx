import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HeroSingle from '@/components/HeroSingle';
import FadeInSection from '@/components/FadeInSection';

export const metadata: Metadata = {
  title: 'Popular Destinations | Starborn Travel Agency',
  description: 'Explore our most popular travel destinations including Caribbean beaches, European cities, Disney parks, tropical islands, and luxury cruises.',
};

export default function Destinations() {
  const destinations = [
    {
      id: 'caribbean',
      name: 'Caribbean Islands',
      image: '/images/image (5).webp',
      description: 'Crystal-clear waters, white sand beaches, and tropical paradise await. Explore Jamaica, Aruba, Bahamas, and more.',
      highlights: ['All-inclusive resorts', 'Snorkeling & diving', 'Island hopping', 'Luxury cruises'],
    },
    {
      id: 'disney',
      name: 'Disney Destinations',
      image: '/images/image (15).webp',
      description: 'Experience the magic at Walt Disney World, Disneyland, or Disney Cruise Line with our expert planning services.',
      highlights: ['Park hopper tickets', 'Character dining', 'FastPass+ planning', 'Resort packages'],
    },
    {
      id: 'europe',
      name: 'European Adventures',
      image: '/images/image (22).webp',
      description: 'From Paris to Rome, London to Barcelona - explore the history, culture, and cuisine of Europe.',
      highlights: ['Guided tours', 'River cruises', 'Multi-city packages', 'Cultural experiences'],
    },
    {
      id: 'alaska',
      name: 'Alaska Cruises',
      image: '/images/image (11).webp',
      description: 'Witness breathtaking glaciers, wildlife, and natural beauty on an unforgettable Alaskan cruise adventure.',
      highlights: ['Glacier viewing', 'Wildlife encounters', 'Shore excursions', 'Luxury cruise lines'],
    },
    {
      id: 'hawaii',
      name: 'Hawaiian Islands',
      image: '/images/image (18).webp',
      description: 'Discover paradise across Maui, Oahu, Kauai, and the Big Island with stunning beaches and volcanic landscapes.',
      highlights: ['Island hopping', 'Luau experiences', 'Volcano tours', 'Beach resorts'],
    },
    {
      id: 'mexico',
      name: 'Mexico & Riviera Maya',
      image: '/images/image (27).webp',
      description: 'Enjoy pristine beaches, ancient ruins, and world-class all-inclusive resorts in Cancun, Playa del Carmen, and beyond.',
      highlights: ['All-inclusive resorts', 'Mayan ruins', 'Cenote swimming', 'Vibrant nightlife'],
    },
  ];

  return (
    <>
      {/* Preload hero image */}
      <link rel="preload" as="image" href="/images/image (31).webp" />

      {/* Hero Section */}
      <HeroSingle
        imageSrc="/images/image (31).webp"
        imageAlt="Popular Travel Destinations"
        title="Explore the World"
        subtitle="Discover our most popular destinations and start planning your dream vacation"
        overlay="dark"
        compact
      />

      {/* Introduction */}
      <FadeInSection>
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl text-center">
            <h2 className="heading-lg mb-6">Where Will Your Journey Take You?</h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              From tropical beaches to European cities, from Disney magic to Alaskan wilderness, 
              we specialize in creating unforgettable experiences around the globe. Browse our 
              featured destinations below and let us help you plan the perfect getaway.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* Destinations Grid */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom">
          <div className="space-y-16">
            {destinations.map((destination, index) => (
              <FadeInSection key={destination.id} delay={index * 100}>
                <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <h3 className="heading-md mb-4">{destination.name}</h3>
                    <p className="text-neutral-700 mb-6 leading-relaxed">
                      {destination.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-lg mb-3">Highlights:</h4>
                      <ul className="space-y-2">
                        {destination.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start">
                            <svg className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-neutral-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href="/contact" className="btn-primary">
                      Plan Your Trip
                    </Link>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <FadeInSection>
        <section className="section-padding bg-primary text-white">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Don&apos;t See Your Dream Destination?</h2>
            <p className="text-xl mb-8 text-neutral-100">
              We can help you plan travel anywhere in the world. Contact us to discuss your unique travel goals!
            </p>
            <Link href="/contact" className="btn-secondary">
              Get Started Today
            </Link>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
