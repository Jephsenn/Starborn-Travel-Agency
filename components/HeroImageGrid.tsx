import Image from 'next/image';

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroImageGridProps {
  images: HeroImage[];
  title: string;
  subtitle?: string;
  overlay?: 'dark' | 'light' | 'gradient';
  layout?: '2x3' | '1x3';
  compact?: boolean;
  children?: React.ReactNode;
}

export default function HeroImageGrid({ 
  images, 
  title, 
  subtitle, 
  overlay = 'gradient',
  layout = '1x3',
  compact = false,
  children 
}: HeroImageGridProps) {
  const gridClass = layout === '2x3' 
    ? 'grid grid-cols-3 grid-rows-2' 
    : 'grid grid-cols-1 md:grid-cols-3';
  
  const overlayClass = overlay === 'dark' 
    ? 'bg-black/60'
    : overlay === 'light'
    ? 'bg-white/30'
    : 'bg-gradient-to-r from-black/70 via-black/50 to-black/30';

  const heightClass = compact 
    ? 'h-[250px] md:h-[300px]'
    : 'h-[500px] md:h-[600px]';

  return (
    <section className={`relative ${heightClass} overflow-hidden`}>
      {/* Image Grid */}
      <div className={`absolute inset-0 ${gridClass}`}>
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-full overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
              priority={index < 3}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClass}`}></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl mb-8 text-neutral-100">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
