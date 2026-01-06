'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface PromoBarProps {
  promos: Array<{
    text: string;
    icon?: string;
  }>;
}

export default function PromoBar({ promos }: PromoBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promos.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [promos.length]);

  return (
    <div className="bg-secondary text-white py-2 pb-[0.6rem] text-center relative overflow-hidden">
      <div className="relative h-6 md:h-7">
        {promos.map((promo, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              index === currentIndex
                ? 'opacity-100 translate-y-0'
                : index < currentIndex
                ? 'opacity-0 -translate-y-full'
                : 'opacity-0 translate-y-full'
            }`}
          >
            <p className="text-sm md:text-base font-medium px-4">
              {promo.icon && <span className="mr-2">{promo.icon}</span>}
              {promo.text}{' '}
              <Link href="/promos" className="underline ml-2 hover:text-neutral-100">
                View Deals
              </Link>
            </p>
          </div>
        ))}
      </div>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-1.5 pb-0.5">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to promotion ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
