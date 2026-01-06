import Image from 'next/image';
import Link from 'next/link';
import PromotionCard from '@/components/PromotionCard';
import TestimonialCard from '@/components/TestimonialCard';
import FAQAccordionItem from '@/components/FAQAccordionItem';
import HeroImageGrid from '@/components/HeroImageGrid';
import PromoBar from '@/components/PromoBar';
import ScrollAnimations from '@/components/ScrollAnimations';
import FadeInSection from '@/components/FadeInSection';
import { promotions } from '@/data/promotions';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';

export default function Home() {
  const allPromos = promotions;
  const previewFAQs = faqs.slice(0, 4);
  const featuredTestimonials = testimonials.slice(0, 3);

  const heroImages = [
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Luxury Cruise Ship at Sea' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Disney Castle Magic Kingdom' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Caribbean Beach Paradise' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Florida Sunset Beach' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Family Vacation Memories' },
    { src: '/Starborn_Travel_Agency_Banner.png', alt: 'Luxury Resort Experience' },
  ];

  const promoBarMessages = [
    { text: 'Limited Time: Save up to 40% on Summer Travel!', icon: '🌟' },
    { text: 'Spring Break Flights - Save Up to $200!', icon: '✈️' },
    { text: 'Caribbean Cruise Extravaganza - $500 Onboard Credit!', icon: '🚢' },
    { text: 'Disney Magic Package - Up to 25% Off!', icon: '🏰' },
    { text: 'All-Inclusive Resort Week - Save $300 per Couple!', icon: '🌴' },
  ];

  return (
    <>
      {/* Scroll Animations */}
      <ScrollAnimations />

      {/* Promo Bar */}
      <PromoBar promos={promoBarMessages} />

      {/* Hero Section with Image Grid */}
      <HeroImageGrid 
        images={heroImages}
        title="Your Journey Begins Here"
        subtitle="Personalized travel planning for unforgettable experiences"
        layout="2x3"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-secondary">
            Start Planning Your Trip
          </Link>
          <Link href="/services" className="btn-outline bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
            Explore Our Services
          </Link>
        </div>
      </HeroImageGrid>

      {/* Introduction */}
      <FadeInSection>
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl text-center">
            <h2 className="heading-lg mb-6">Welcome to Starborn Travel Agency</h2>
            <p className="text-lg text-neutral-700 leading-relaxed mb-4">
              At Starborn Travel Agency, we believe every journey should be as unique as you are. 
              Whether you&apos;re dreaming of a magical Disney vacation, a relaxing cruise, or an 
              exotic international adventure, we&apos;re here to make it happen.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed">
              With personalized service, expert knowledge, and a genuine passion for travel, 
              we handle every detail so you can focus on creating memories that last a lifetime.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* Services Overview */}
      <FadeInSection delay={100}>
        <section className="section-padding bg-neutral-100">
          <div className="container-custom">
            <h2 className="heading-lg text-center mb-12">How We Can Help You Travel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 relative z-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Vacation Planning</h3>
              <p className="text-neutral-600">
                Custom itineraries tailored to your interests, budget, and travel style.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 relative z-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Cruises</h3>
              <p className="text-neutral-600">
                Explore the world by sea with our curated cruise packages and exclusive deals.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 relative z-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Disney Travel</h3>
              <p className="text-neutral-600">
                Experience the magic with our Disney vacation expertise and planning services.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Link href="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* Owner Highlight */}
      <FadeInSection delay={100}>
        <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                {/* Sara's Headshot */}
                <div className="flex justify-center md:justify-start mb-6">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary shadow-xl">
                    <Image
                      src="/sara-headshot.jpg"
                      alt="Sara - Founder & Travel Specialist"
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                </div>
                
                <h2 className="heading-md mb-4">Meet Sara</h2>
                <p className="text-lg text-primary font-semibold mb-4">
                  Founder & Travel Specialist
                </p>
                <p className="text-neutral-700 mb-4 leading-relaxed">
                  With a lifelong passion for travel and years of industry experience, Sara founded 
                  Starborn Travel Agency to help others discover the joy of stress-free travel planning.
                </p>
                <p className="text-neutral-700 mb-4 leading-relaxed">
                  Sara personally works with each client to understand their dreams, preferences, and 
                  budget to create perfectly tailored travel experiences. Her dedication to exceptional 
                  service and attention to detail ensures every trip is truly special.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  &ldquo;I believe travel has the power to transform lives. My goal is to make planning 
                  your journey as enjoyable as the destination itself.&rdquo;
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-light rounded-lg p-8 text-white relative z-10">
                <h3 className="text-2xl font-bold mb-6">Why Work With Sara?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Personalized attention to every detail</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Expert knowledge of destinations worldwide</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Access to exclusive deals and promotions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>24/7 support during your travels</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Completely free service for you</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* Featured Promotions */}
      <FadeInSection delay={100}>
      <section className="section-padding bg-gradient-to-b from-neutral-100 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Current Promotions & Deals</h2>
            <p className="text-lg text-neutral-600">
              Don&apos;t miss out on these incredible travel offers
            </p>
          </div>
          
          {/* Horizontal Scrolling Container */}
          <div className="relative mb-8">
            <div className="overflow-x-auto scrollbar-hide pb-4">
              <div className="flex gap-6 min-w-max px-4 md:px-0">
                {allPromos.map((promo) => (
                  <div key={promo.id} className="w-[300px] flex-shrink-0">
                    <PromotionCard promotion={promo} />
                  </div>
                ))}
              </div>
            </div>
            {/* Scroll hint gradient */}
            <div className="absolute top-0 right-0 bottom-4 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none hidden md:block"></div>
          </div>
          
          <div className="text-center">
            <Link href="/promos" className="btn-primary">
              View All Promotions
            </Link>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* FAQ Preview */}
      <FadeInSection delay={100}>
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-neutral-600">
              Quick answers to common questions about our services
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden mb-8">
            {previewFAQs.map((faq) => (
              <FAQAccordionItem key={faq.id} faq={faq} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/faq" className="btn-outline">
              See All FAQs
            </Link>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* Testimonials */}
      <FadeInSection delay={100}>
      <section className="section-padding bg-neutral-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">What Our Clients Say</h2>
            <p className="text-lg text-neutral-600">
              Real experiences from travelers we&apos;ve helped
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <FadeInSection delay={100}>
      <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 text-neutral-100">
            Let&apos;s turn your travel dreams into reality. Contact us today for a free consultation!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-secondary">
              Get Started Now
            </Link>
            <Link href="/about" className="bg-white text-primary hover:bg-neutral-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
      </FadeInSection>
      </FadeInSection>
    </>
  );
}
