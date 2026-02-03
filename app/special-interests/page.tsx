import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSingle from '@/components/HeroSingle';
import FadeInSection from '@/components/FadeInSection';

export const metadata: Metadata = {
  title: 'Special Interest Travel | Starborn Travel Agency',
  description: 'Specialized travel planning for honeymoons, adventure travel, luxury getaways, family vacations, and accessible travel needs.',
};

export default function SpecialInterests() {
  const specialties = [
    {
      id: 'honeymoons',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Honeymoons & Romance',
      description: 'Celebrate your love with a perfectly planned honeymoon. From tropical beaches to European getaways, we create intimate, unforgettable experiences.',
      features: [
        'Adults-only resorts and couples retreats',
        'Private villa rentals and overwater bungalows',
        'Romantic dining and spa experiences',
        'Anniversary trip planning',
        'Surprise upgrades and special touches',
      ],
    },
    {
      id: 'adventure',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Adventure Travel',
      description: 'For thrill-seekers and outdoor enthusiasts, we plan exciting adventures from safaris to mountain treks, diving expeditions to zip-lining tours.',
      features: [
        'Safari and wildlife expeditions',
        'Hiking and trekking adventures',
        'Scuba diving and snorkeling trips',
        'Extreme sports destinations',
        'Eco-tourism and nature tours',
      ],
    },
    {
      id: 'luxury',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Luxury Travel',
      description: 'Experience the finest in travel with exclusive resorts, private jets, yacht charters, and VIP experiences tailored to your preferences.',
      features: [
        'Five-star hotels and luxury resorts',
        'Private jet and yacht charters',
        'VIP access and concierge services',
        'Exclusive culinary experiences',
        'Personalized butler and guide services',
      ],
    },
    {
      id: 'family',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Multigenerational & Family Travel',
      description: 'Create lasting memories with travel that brings the whole family together, from grandparents to grandchildren.',
      features: [
        'Kid-friendly resorts and activities',
        'Family suites and connecting rooms',
        'Educational and cultural experiences',
        'All-inclusive family packages',
        'Childcare and kids\' clubs',
      ],
    },
    {
      id: 'accessible',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Accessible Travel',
      description: 'Travel should be for everyone. We specialize in planning accessible trips with accommodations and activities for all mobility levels.',
      features: [
        'Wheelchair-accessible accommodations',
        'Adaptive tour and activity options',
        'Medical equipment and assistance coordination',
        'Accessible cruise cabins and shore excursions',
        'Special dietary and health needs support',
      ],
    },
    {
      id: 'wellness',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Wellness & Spa Retreats',
      description: 'Rejuvenate your body and mind with wellness-focused travel including yoga retreats, spa resorts, and meditation getaways.',
      features: [
        'Luxury spa resorts and thermal baths',
        'Yoga and meditation retreats',
        'Holistic wellness programs',
        'Detox and fitness boot camps',
        'Ayurvedic and alternative healing',
      ],
    },
  ];

  return (
    <>
      {/* Preload hero image */}
      <link rel="preload" as="image" href="/images/image (24).webp" />

      {/* Hero Section */}
      <HeroSingle
        imageSrc="/images/image (24).webp"
        imageAlt="Special Interest Travel"
        title="Travel Tailored to Your Passions"
        subtitle="Specialized planning for unique travel experiences"
        overlay="dark"
        compact
      />

      {/* Introduction */}
      <FadeInSection>
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl text-center">
            <h2 className="heading-lg mb-6">Your Journey, Your Way</h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Every traveler is unique, and your vacation should reflect your interests, needs, and dreams. 
              We specialize in creating customized experiences for specific travel styles and requirements.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* Specialties */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialties.map((specialty, index) => (
              <FadeInSection key={specialty.id} delay={index * 100}>
                <div className="bg-white rounded-lg shadow-lg p-8 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                    {specialty.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-neutral-900">{specialty.title}</h3>
                  <p className="text-neutral-700 mb-6 leading-relaxed">
                    {specialty.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-3 text-neutral-900">What We Offer:</h4>
                    <ul className="space-y-2">
                      {specialty.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <svg className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-neutral-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Perfect Trip?</h2>
            <p className="text-xl mb-8 text-neutral-100">
              Tell us about your interests and travel style, and we&apos;ll create a personalized 
              itinerary that exceeds your expectations.
            </p>
            <Link href="/contact" className="btn-secondary">
              Contact Us Today
            </Link>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
