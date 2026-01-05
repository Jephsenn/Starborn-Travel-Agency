import type { Metadata } from 'next';
import Link from 'next/link';
import HeroImageGrid from '@/components/HeroImageGrid';

export const metadata: Metadata = {
  title: 'Our Services | Starborn Travel Agency',
  description: 'Explore our comprehensive travel services including vacation planning, cruises, Disney travel, airfare, hotels, group travel, and custom itineraries.',
};

export default function Services() {
  const heroImages = [
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Cruise Ship Deck Views' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Disney Park Experience' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Beach Paradise Destination' },
  ];
  const services = [
    {
      id: 'vacation-planning',
      title: 'Custom Vacation Planning',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Personalized itineraries designed around your interests, budget, and travel style. From romantic getaways to family adventures, we craft the perfect trip for you.',
      benefits: [
        'In-depth consultation to understand your preferences',
        'Curated destination recommendations',
        'Detailed day-by-day itineraries',
        'Restaurant and activity reservations',
        'Accommodation matching your style and budget',
        'Insider tips and local recommendations',
      ],
    },
    {
      id: 'cruises',
      title: 'Cruise Vacations',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      description: 'Sail away to paradise with expertly planned cruise vacations. We work with all major cruise lines to find the perfect voyage for your needs.',
      benefits: [
        'Access to all major cruise lines (Royal Caribbean, Carnival, Norwegian, Princess, Disney, and more)',
        'Caribbean, Alaska, Mediterranean, and worldwide destinations',
        'Cabin selection assistance and upgrades when available',
        'Shore excursion planning and booking',
        'Onboard credit opportunities',
        'Group cruise coordination',
      ],
    },
    {
      id: 'disney',
      title: 'Disney Vacations',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      description: 'Experience the magic with our Disney vacation expertise. We specialize in Walt Disney World, Disneyland, Disney Cruise Line, and Adventures by Disney.',
      benefits: [
        'Authorized Disney vacation planner',
        'Resort selection to match your family\'s needs',
        'Park ticket options and dining plan guidance',
        'Advance dining reservations (60 days out)',
        'Lightning Lane and Genie+ strategy',
        'Special event tickets (Mickey\'s Not-So-Scary, etc.)',
        'Disney Cruise Line planning',
      ],
    },
    {
      id: 'airfare-hotels',
      title: 'Airfare & Hotels',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      description: 'Get competitive rates on flights and accommodations worldwide. We monitor prices and find the best deals to fit your budget.',
      benefits: [
        'Domestic and international flight booking',
        'Multi-city and complex routing assistance',
        'Hotel and resort reservations worldwide',
        'Price monitoring and alerts',
        'Seat selection and upgrade opportunities',
        'Loyalty program integration',
      ],
    },
    {
      id: 'group-travel',
      title: 'Group Travel',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: 'Planning travel for a large group? We coordinate all the details for family reunions, destination weddings, corporate retreats, and friend getaways.',
      benefits: [
        'Dedicated group coordinator',
        'Negotiated group rates and discounts',
        'Rooming list management',
        'Payment collection assistance',
        'Group amenities and perks',
        'Custom activity planning',
        'On-site support for large groups',
      ],
    },
    {
      id: 'custom-itineraries',
      title: 'Custom Itineraries',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      description: 'Have a unique vision for your trip? We create completely customized itineraries for complex multi-destination journeys and special experiences.',
      benefits: [
        'Multi-destination trip planning',
        'Private tours and exclusive experiences',
        'Special occasion celebrations',
        'Adventure and expedition travel',
        'Cultural immersion experiences',
        'Luxury travel curation',
        'Accessible travel accommodations',
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroImageGrid
        images={heroImages}
        title="Our Travel Services"
        subtitle="Comprehensive planning for every type of journey"
        overlay="gradient"
        compact
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="heading-md mb-6">Why Book Through Starborn Travel?</h2>
          <p className="text-lg text-neutral-700 mb-4 leading-relaxed">
            In a world where you can book anything online with a few clicks, you might wonder: 
            why use a travel agent? The answer is simple—we add value that you can&apos;t get on your own.
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed">
            From insider knowledge and exclusive deals to personalized service and 24/7 support, 
            we ensure your trip is not just booked, but thoughtfully planned and perfectly executed.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom max-w-7xl">
          <h2 className="heading-lg text-center mb-12">What We Offer</h2>
          <div className="space-y-8">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } md:flex`}
              >
                <div className="md:w-1/3 bg-gradient-to-br from-primary to-primary-dark p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <p className="text-neutral-700 mb-6 text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <h4 className="font-semibold text-lg mb-3 text-primary">What&apos;s Included:</h4>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-neutral-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Added Value Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <h2 className="heading-lg text-center mb-12">The Starborn Difference</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">No Fees</h3>
              <p className="text-neutral-600 text-sm">
                Our services cost you nothing. We&apos;re paid by our travel partners.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Best Price Guarantee</h3>
              <p className="text-neutral-600 text-sm">
                We match or beat online prices, plus add exclusive perks.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="text-neutral-600 text-sm">
                We&apos;re available anytime you need us, before, during, and after your trip.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">VIP Perks</h3>
              <p className="text-neutral-600 text-sm">
                Upgrades, amenities, and special touches you won&apos;t find booking alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom max-w-5xl">
          <h2 className="heading-lg text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
              <p className="text-neutral-600 text-sm">
                Fill out our contact form or reach out directly with your travel ideas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Consultation</h3>
              <p className="text-neutral-600 text-sm">
                We discuss your preferences, budget, and vision for the perfect trip.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Planning</h3>
              <p className="text-neutral-600 text-sm">
                We research, curate options, and present a customized proposal.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2">Book & Travel</h3>
              <p className="text-neutral-600 text-sm">
                We handle all bookings and support you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-accent to-primary text-white">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Planning?
          </h2>
          <p className="text-xl mb-8 text-neutral-100">
            Let&apos;s discuss your travel dreams and create an unforgettable experience together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-secondary">
              Request a Quote
            </Link>
            <Link href="/promos" className="bg-white text-primary hover:bg-neutral-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block">
              Browse Current Deals
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
