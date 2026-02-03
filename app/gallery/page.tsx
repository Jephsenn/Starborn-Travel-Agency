import type { Metadata } from 'next';
import Image from 'next/image';
import HeroSingle from '@/components/HeroSingle';
import FadeInSection from '@/components/FadeInSection';

export const metadata: Metadata = {
  title: 'Photo Gallery | Starborn Travel Agency',
  description: 'Browse stunning photos from destinations around the world and get inspired for your next adventure.',
};

export default function Gallery() {
  const galleryImages = [
    { src: '/images/image (1).webp', alt: 'Tropical Paradise', category: 'Beach' },
    { src: '/images/image (2).webp', alt: 'Mountain Adventure', category: 'Adventure' },
    { src: '/images/image (3).webp', alt: 'Cruise Experience', category: 'Cruise' },
    { src: '/images/image (4).webp', alt: 'City Exploration', category: 'City' },
    { src: '/images/image (5).webp', alt: 'Beach Resort', category: 'Beach' },
    { src: '/images/image (6).webp', alt: 'Cultural Experience', category: 'Culture' },
    { src: '/images/image (7).webp', alt: 'Ocean Views', category: 'Beach' },
    { src: '/images/image (10).webp', alt: 'Luxury Cruise', category: 'Cruise' },
    { src: '/images/image (11).webp', alt: 'Mountain Getaway', category: 'Adventure' },
    { src: '/images/image (12).webp', alt: 'Island Paradise', category: 'Beach' },
    { src: '/images/image (15).webp', alt: 'Theme Park Magic', category: 'Disney' },
    { src: '/images/image (18).webp', alt: 'Tropical Island', category: 'Beach' },
    { src: '/images/image (20).webp', alt: 'Scenic Landscape', category: 'Adventure' },
    { src: '/images/image (23).webp', alt: 'Mountain Resort', category: 'Adventure' },
    { src: '/images/image (27).webp', alt: 'Sunset Beach', category: 'Beach' },
    { src: '/images/image (30).webp', alt: 'Luxury Destination', category: 'Luxury' },
  ];

  return (
    <>
      {/* Preload hero image */}
      <link rel="preload" as="image" href="/images/image (26).webp" />

      {/* Hero Section */}
      <HeroSingle
        imageSrc="/images/image (26).webp"
        imageAlt="Travel Photo Gallery"
        title="Wanderlust Gallery"
        subtitle="Get inspired by breathtaking destinations from around the world"
        overlay="gradient"
        compact
      />

      {/* Introduction */}
      <FadeInSection>
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl text-center">
            <h2 className="heading-lg mb-6">Dream. Explore. Discover.</h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Browse our collection of stunning travel photography showcasing the incredible 
              destinations we can help you explore. Let these images inspire your next adventure!
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* Gallery Grid */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <FadeInSection key={index} delay={index * 50}>
                <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-square">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold text-lg">{image.alt}</p>
                      <p className="text-neutral-200 text-sm">{image.category}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <FadeInSection>
        <section className="section-padding bg-white">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="heading-md mb-6">Ready to Create Your Own Memories?</h2>
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
              These destinations are waiting for you. Let us help you plan an unforgettable journey 
              that you&apos;ll treasure forever.
            </p>
            <a href="/contact" className="btn-primary">
              Start Planning Your Adventure
            </a>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
