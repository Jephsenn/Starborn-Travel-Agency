import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HeroImageGrid from '@/components/HeroImageGrid';

export const metadata: Metadata = {
  title: 'About Us | Starborn Travel Agency',
  description: 'Learn about Starborn Travel Agency, our mission to provide personalized travel planning, and meet Sara, our founder and travel specialist.',
};

export default function About() {
  const heroImages = [
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Travel Planning Excellence' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Happy Travelers' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'World Destinations' },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroImageGrid
        images={heroImages}
        title="About Starborn Travel Agency"
        subtitle="Where personalized service meets passion for travel"
        overlay="dark"
        compact
      />

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-lg mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-700 mb-6 leading-relaxed">
              Starborn Travel Agency was founded on a simple belief: travel should be inspiring, 
              stress-free, and tailored to your unique desires. What started as a passion for 
              exploring the world has grown into a full-service travel agency dedicated to creating 
              extraordinary journeys for our clients.
            </p>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              We understand that in today&apos;s digital age, you have countless options for booking 
              travel online. But we also know that the best trips aren&apos;t just about finding the 
              lowest price—they&apos;re about the experiences, the memories, and the peace of mind 
              that comes from having an expert in your corner.
            </p>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              That&apos;s why we take the time to get to know you, understand your travel style, and 
              craft itineraries that exceed your expectations. Whether you&apos;re planning a romantic 
              getaway, a family adventure, or a once-in-a-lifetime celebration, we&apos;re here to 
              handle every detail so you can focus on making memories.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom">
          <h2 className="heading-lg mb-12 text-center">Our Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized Service</h3>
              <p className="text-neutral-700">
                We treat every client like family. Your unique preferences, budget, and dreams guide 
                every recommendation we make. No cookie-cutter packages here—just personalized attention.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Trust & Transparency</h3>
              <p className="text-neutral-700">
                We believe in honest communication and transparent pricing. You&apos;ll always know what 
                you&apos;re getting, what it costs, and what to expect. No hidden fees, no surprises.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Excellence in Everything</h3>
              <p className="text-neutral-700">
                From the initial consultation to your return home, we&apos;re committed to excellence. 
                We stay updated on travel trends, maintain strong supplier relationships, and go the 
                extra mile to ensure your satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Sara - Expanded */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="heading-lg mb-12 text-center">Meet Sara, Your Travel Specialist</h2>
          
          <div className="bg-gradient-to-br from-primary-light/10 to-accent-light/10 rounded-2xl p-8 md:p-12 mb-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                {/* Sara's Headshot */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                    <Image
                      src="/sara-headshot.jpg"
                      alt="Sara - Founder & Travel Specialist"
                      fill
                      className="object-cover"
                      sizes="256px"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">Sara</h3>
                  <p className="text-lg text-neutral-600 font-medium">
                    Founder & Lead Travel Specialist
                  </p>
                </div>
                
                <div className="space-y-4 text-neutral-700">
                  <p className="leading-relaxed">
                    Travel isn&apos;t just my profession—it&apos;s my passion. I&apos;ve been fortunate 
                    enough to explore diverse destinations around the world, and each journey has taught 
                    me something new about the transformative power of travel.
                  </p>
                  <p className="leading-relaxed">
                    I started Starborn Travel Agency because I wanted to share that magic with others. 
                    Too often, people feel overwhelmed by the planning process or miss out on incredible 
                    experiences because they don&apos;t know where to start. My goal is to remove those 
                    barriers and make travel accessible, enjoyable, and unforgettable for everyone.
                  </p>
                  <p className="leading-relaxed">
                    When you work with me, you&apos;re getting more than a travel agent—you&apos;re getting 
                    a dedicated partner who genuinely cares about creating your perfect trip. I take the 
                    time to listen, ask the right questions, and craft experiences that reflect who you 
                    are and what you love.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-semibold text-lg mb-3 text-primary">Specialties</h4>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Disney Destinations (Walt Disney World, Disneyland, Disney Cruise Line)
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Caribbean & Mexico All-Inclusive Resorts
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Ocean & River Cruises
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      European Getaways
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Family & Multi-Generational Travel
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Destination Weddings & Honeymoons
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary/10 rounded-lg p-6">
                  <h4 className="font-semibold text-lg mb-3 text-neutral-900">My Promise to You</h4>
                  <p className="text-neutral-700 italic">
                    &ldquo;I will treat your vacation with the same care and attention I give my own. 
                    From our first conversation to the moment you return home with incredible memories, 
                    I&apos;ll be there every step of the way—ensuring everything is perfect.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-lg mb-12 text-center">Why Choose Starborn Travel Agency?</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md flex items-start">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">No Cost to You</h3>
                <p className="text-neutral-700">
                  Our services are completely free for clients. We earn commission from our travel partners, 
                  so you get expert planning without any fees—often with better prices than booking yourself.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md flex items-start">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Time Savings</h3>
                <p className="text-neutral-700">
                  Skip the endless research and comparison shopping. We know the ins and outs of destinations, 
                  suppliers, and deals, saving you hours (or days!) of planning time.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md flex items-start">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
                <p className="text-neutral-700">
                  Travel hiccups happen. When they do, you won&apos;t be navigating automated phone trees. 
                  You&apos;ll have direct access to Sara, who will advocate for you and resolve issues quickly.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md flex items-start">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Insider Access</h3>
                <p className="text-neutral-700">
                  Through our partnerships, we can often secure exclusive perks, upgrades, and amenities 
                  that aren&apos;t available to the general public—adding extra value to your trip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-primary to-accent text-white">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let&apos;s Create Your Perfect Journey Together
          </h2>
          <p className="text-xl mb-8 text-neutral-100">
            Ready to experience stress-free travel planning? Reach out today and let&apos;s start 
            building your dream vacation.
          </p>
          <Link href="/contact" className="btn-secondary">
            Contact Sara Today
          </Link>
        </div>
      </section>
    </>
  );
}
