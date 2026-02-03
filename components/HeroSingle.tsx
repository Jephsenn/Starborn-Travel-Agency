import Image from 'next/image';

interface HeroSingleProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  overlay?: 'dark' | 'light' | 'gradient';
  compact?: boolean;
  children?: React.ReactNode;
}

export default function HeroSingle({ 
  imageSrc,
  imageAlt,
  title, 
  subtitle, 
  overlay = 'gradient',
  compact = false,
  children 
}: HeroSingleProps) {
  const overlayClass = overlay === 'dark' 
    ? 'bg-black/60'
    : overlay === 'light'
    ? 'bg-white/30'
    : 'bg-gradient-to-r from-black/70 via-black/50 to-black/30';

  const heightClass = compact 
    ? 'h-[250px] md:h-[300px]'
    : 'h-[calc(100vh-130px)] min-h-[450px] max-h-[750px]';

  return (
    <section className={`relative ${heightClass} overflow-hidden bg-neutral-800`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
          unoptimized={false}
        />
      </div>
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClass}`}></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-100">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
