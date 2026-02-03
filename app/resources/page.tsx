import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSingle from '@/components/HeroSingle';
import FadeInSection from '@/components/FadeInSection';

export const metadata: Metadata = {
  title: 'Travel Resources | Starborn Travel Agency',
  description: 'Helpful travel resources including packing tips, visa requirements, travel insurance information, and TSA guidelines.',
};

export default function Resources() {
  const resources = [
    {
      id: 'packing',
      icon: '🧳',
      title: 'Packing Tips',
      description: 'Smart packing strategies for different trip types',
      tips: [
        'Use packing cubes to organize and maximize space',
        'Roll clothes instead of folding to prevent wrinkles',
        'Pack heaviest items at the bottom near wheels',
        'Keep essentials and valuables in carry-on',
        'Check airline baggage policies before you pack',
        'Bring a reusable water bottle (empty through security)',
      ],
    },
    {
      id: 'documents',
      icon: '📋',
      title: 'Travel Documents',
      description: 'Essential paperwork for international and domestic travel',
      tips: [
        'Passport must be valid 6 months beyond return date',
        'Make copies of all important documents',
        'Store digital copies in cloud storage',
        'Check visa requirements for your destination',
        'Carry vaccination records when required',
        'Have emergency contact information accessible',
      ],
    },
    {
      id: 'insurance',
      icon: '🛡️',
      title: 'Travel Insurance',
      description: 'Protect your investment and travel with peace of mind',
      tips: [
        'Purchase insurance within 14 days of booking for full coverage',
        'Read policy details carefully - know what\'s covered',
        'Medical coverage is crucial for international travel',
        'Consider "cancel for any reason" options',
        'Check if your credit card provides travel insurance',
        'Keep insurance contact info readily available',
      ],
    },
    {
      id: 'security',
      icon: '✈️',
      title: 'TSA & Airport Security',
      description: 'Navigate airport security smoothly',
      tips: [
        'Arrive 2 hours early for domestic, 3 for international flights',
        'Liquids in carry-on must be 3.4oz or less in quart-size bag',
        'Electronics larger than phones must be separate for screening',
        'Consider TSA PreCheck or Clear for faster screening',
        'Remove shoes, belts, and jackets at checkpoint',
        'Have ID and boarding pass ready',
      ],
    },
    {
      id: 'health',
      icon: '💊',
      title: 'Health & Safety',
      description: 'Stay healthy and safe while traveling',
      tips: [
        'Check CDC recommendations for destination vaccinations',
        'Pack prescription medications in original containers',
        'Bring extra medication in case of delays',
        'Research local health facilities at your destination',
        'Purchase medical evacuation insurance for remote locations',
        'Stay hydrated during flights and in hot climates',
      ],
    },
    {
      id: 'money',
      icon: '💰',
      title: 'Money & Banking',
      description: 'Financial tips for stress-free travel',
      tips: [
        'Notify your bank and credit cards of travel dates',
        'Carry multiple payment methods (cards + some cash)',
        'Use ATMs for better exchange rates than currency exchanges',
        'Avoid foreign transaction fees with travel-friendly cards',
        'Keep emergency cash separate from daily money',
        'Know your card\'s chip & PIN vs chip & signature',
      ],
    },
  ];

  const usefulLinks = [
    {
      category: 'Government Resources',
      links: [
        { name: 'U.S. State Department Travel', url: 'https://travel.state.gov' },
        { name: 'TSA Security Guidelines', url: 'https://www.tsa.gov' },
        { name: 'CDC Travel Health Notices', url: 'https://wwwnc.cdc.gov/travel' },
        { name: 'CBP - U.S. Customs', url: 'https://www.cbp.gov' },
      ],
    },
    {
      category: 'Travel Tools',
      links: [
        { name: 'Flight Status Tracker', url: '#' },
        { name: 'Currency Converter', url: '#' },
        { name: 'World Time Zones', url: '#' },
        { name: 'Weather Forecasts', url: '#' },
      ],
    },
  ];

  return (
    <>
      {/* Preload hero image */}
      <link rel="preload" as="image" href="/images/image (13).webp" />

      {/* Hero Section */}
      <HeroSingle
        imageSrc="/images/image (13).webp"
        imageAlt="Travel Resources"
        title="Travel Resources & Tips"
        subtitle="Everything you need to know for stress-free travel"
        overlay="dark"
        compact
      />

      {/* Introduction */}
      <FadeInSection>
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl text-center">
            <h2 className="heading-lg mb-6">Travel Smarter, Not Harder</h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Whether you&apos;re a seasoned traveler or planning your first big trip, these resources 
              will help you prepare, pack, and navigate your journey with confidence.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* Resource Cards */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <FadeInSection key={resource.id} delay={index * 100}>
                <div className="bg-white rounded-lg shadow-lg p-8 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="text-5xl mb-4">{resource.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-neutral-900">{resource.title}</h3>
                  <p className="text-neutral-600 mb-6 italic">{resource.description}</p>
                  <ul className="space-y-3">
                    {resource.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-neutral-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Useful Links */}
      <FadeInSection>
        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl">
            <h2 className="heading-lg text-center mb-12">Helpful External Resources</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {usefulLinks.map((section) => (
                <div key={section.category}>
                  <h3 className="text-2xl font-bold mb-6 text-neutral-900">{section.category}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a 
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Download Section */}
      <FadeInSection>
        <section className="section-padding bg-neutral-100">
          <div className="container-custom max-w-4xl text-center">
            <h2 className="heading-md mb-6">Printable Travel Checklists</h2>
            <p className="text-lg text-neutral-700 mb-8">
              Download our comprehensive packing lists and travel prep checklists to ensure 
              you don&apos;t forget anything important.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="font-semibold mb-2">Beach Vacation Checklist</h3>
                <button className="text-primary hover:underline text-sm">Download PDF</button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="font-semibold mb-2">International Travel Checklist</h3>
                <button className="text-primary hover:underline text-sm">Download PDF</button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="font-semibold mb-2">Family Vacation Checklist</h3>
                <button className="text-primary hover:underline text-sm">Download PDF</button>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection>
        <section className="section-padding bg-primary text-white">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Personalized Travel Advice?</h2>
            <p className="text-xl mb-8 text-neutral-100">
              Our travel experts are here to answer your questions and help you prepare for your journey.
            </p>
            <Link href="/contact" className="btn-secondary">
              Contact Our Team
            </Link>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
