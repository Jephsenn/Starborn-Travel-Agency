import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSingle from '@/components/HeroSingle';
import FadeInSection from '@/components/FadeInSection';

export const metadata: Metadata = {
  title: 'Group Travel | Starborn Travel Agency',
  description: 'Expert planning for group travel including weddings, reunions, corporate retreats, and milestone celebrations.',
};

export default function GroupTravel() {
  const groupTypes = [
    {
      id: 'weddings',
      icon: '💍',
      title: 'Destination Weddings',
      description: 'Say "I do" in paradise with our expert wedding travel coordination. We handle every detail from guest accommodations to ceremony venues.',
      benefits: [
        'All-inclusive wedding packages',
        'Guest room blocks and group discounts',
        'Coordination with wedding planners and venues',
        'Bachelor/bachelorette trip planning',
        'Welcome events and group activities',
      ],
    },
    {
      id: 'reunions',
      icon: '👨‍👩‍👧‍👦',
      title: 'Family Reunions',
      description: 'Bring the whole family together for an unforgettable reunion. Perfect for milestone celebrations and creating lasting memories.',
      benefits: [
        'Multi-room accommodations and villas',
        'All-ages activities and entertainment',
        'Group dining arrangements',
        'Transportation coordination',
        'Custom itineraries for different age groups',
      ],
    },
    {
      id: 'corporate',
      icon: '💼',
      title: 'Corporate Retreats',
      description: 'Strengthen your team with a productive and relaxing corporate retreat. Combine business with leisure at stunning locations.',
      benefits: [
        'Meeting room facilities and AV equipment',
        'Team-building activities and excursions',
        'Business center access and WiFi',
        'Group transportation and transfers',
        'Customized catering and networking events',
      ],
    },
    {
      id: 'celebrations',
      icon: '🎉',
      title: 'Milestone Celebrations',
      description: 'Celebrate birthdays, anniversaries, graduations, and other special occasions with a group getaway everyone will remember.',
      benefits: [
        'Surprise planning and special arrangements',
        'Private event spaces and entertainment',
        'Customized celebration packages',
        'Photography and videography coordination',
        'Gift and amenity arrangements',
      ],
    },
    {
      id: 'friends',
      icon: '✈️',
      title: 'Friends Getaways',
      description: 'Plan the ultimate friends\' trip with our group travel expertise. From beach weekends to adventure expeditions.',
      benefits: [
        'Shared accommodations and cost savings',
        'Group activity planning and bookings',
        'Nightlife and entertainment recommendations',
        'Flexible payment plans',
        'Travel insurance for groups',
      ],
    },
    {
      id: 'special-interest',
      icon: '🎯',
      title: 'Special Interest Groups',
      description: 'Organize trips for clubs, hobby groups, or special interests. Golf trips, wine tours, sports events, and more.',
      benefits: [
        'Specialized activity coordination',
        'Expert guides and instructors',
        'Equipment rentals and logistics',
        'VIP access and exclusive experiences',
        'Flexible group sizes',
      ],
    },
  ];

  return (
    <>
      {/* Preload hero image */}
      <link rel="preload" as="image" href="/images/image (19).webp" />

      {/* Hero Section */}
      <HeroSingle
        imageSrc="/images/image (19).webp"
        imageAlt="Group Travel Planning"
        title="Group Travel Made Easy"
        subtitle="Weddings, reunions, corporate retreats, and celebrations"
        overlay="gradient"
        compact
      />

      {/* Introduction */}
      <FadeInSection>
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl text-center">
            <h2 className="heading-lg mb-6">Travel Better Together</h2>
            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              Planning group travel can be complicated, but it doesn&apos;t have to be. We handle all the 
              details, coordinate with everyone, and secure group discounts so you can focus on 
              enjoying time with your loved ones or colleagues.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-100 p-6 rounded-lg">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-semibold text-lg mb-2">Group Savings</h3>
                <p className="text-neutral-700">Exclusive discounts and perks for group bookings</p>
              </div>
              <div className="bg-neutral-100 p-6 rounded-lg">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-semibold text-lg mb-2">One Point of Contact</h3>
                <p className="text-neutral-700">We coordinate everything so you don&apos;t have to</p>
              </div>
              <div className="bg-neutral-100 p-6 rounded-lg">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-semibold text-lg mb-2">Stress-Free Planning</h3>
                <p className="text-neutral-700">Expert handling of all logistics and details</p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Group Types */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">What Type of Group Trip Are You Planning?</h2>
            <p className="text-lg text-neutral-700">We specialize in all types of group travel experiences</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupTypes.map((type, index) => (
              <FadeInSection key={type.id} delay={index * 100}>
                <div className="bg-white rounded-lg shadow-lg p-8 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="text-5xl mb-4">{type.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-neutral-900">{type.title}</h3>
                  <p className="text-neutral-700 mb-6 leading-relaxed">
                    {type.description}
                  </p>
                  <div>
                    <h4 className="font-semibold mb-3">We Handle:</h4>
                    <ul className="space-y-2">
                      {type.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start text-sm">
                          <svg className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-neutral-700">{benefit}</span>
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

      {/* How It Works */}
      <FadeInSection>
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl">
            <h2 className="heading-lg text-center mb-12">How Group Travel Planning Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="font-semibold text-lg mb-2">Tell Us Your Vision</h3>
                <p className="text-neutral-700">Share your group size, dates, budget, and preferences</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="font-semibold text-lg mb-2">Get Custom Proposals</h3>
                <p className="text-neutral-700">We research options and present tailored recommendations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="font-semibold text-lg mb-2">Coordinate Details</h3>
                <p className="text-neutral-700">We handle bookings, payments, and communication with your group</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
                <h3 className="font-semibold text-lg mb-2">Enjoy Your Trip!</h3>
                <p className="text-neutral-700">Relax knowing every detail is handled perfectly</p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection>
        <section className="section-padding bg-primary text-white">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Group Trip?</h2>
            <p className="text-xl mb-8 text-neutral-100">
              Let us handle the details while you focus on making memories with your group. 
              Contact us today to get started!
            </p>
            <Link href="/contact" className="btn-secondary">
              Request a Group Quote
            </Link>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
