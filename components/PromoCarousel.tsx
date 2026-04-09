'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import PromotionCard from '@/components/PromotionCard';
import { type Promotion } from '@/data/promotions';

interface PromoCarouselProps {
  promos: Promotion[];
}

const CARD_WIDTH = 300;
const CARD_GAP = 24; // gap-6

export default function PromoCarousel({ promos }: PromoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollability();
    el.addEventListener('scroll', checkScrollability, { passive: true });
    window.addEventListener('resize', checkScrollability);

    return () => {
      el.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [checkScrollability]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === 'right' ? CARD_WIDTH + CARD_GAP : -(CARD_WIDTH + CARD_GAP),
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative mb-8">
      {/* Left arrow */}
      <button
        onClick={() => scroll('left')}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md hover:shadow-lg rounded-full p-2.5 transition-all duration-200 hover:bg-neutral-50 ${
          canScrollLeft ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
        aria-label="Scroll promotions left"
      >
        <svg className="w-5 h-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Left edge fade — only visible when there's content to the left */}
      <div
        className={`absolute top-0 left-0 bottom-4 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 transition-opacity duration-200 ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Scroll container */}
      <div ref={scrollRef} className="overflow-x-auto scrollbar-hide pb-4">
        <div className="flex gap-6 min-w-max px-4 md:px-0">
          {promos.map((promo) => (
            <div key={promo.id} className="w-[300px] flex-shrink-0">
              <PromotionCard promotion={promo} />
            </div>
          ))}
        </div>
      </div>

      {/* Right edge fade — always visible as scroll hint */}
      <div
        className={`absolute top-0 right-0 bottom-4 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 transition-opacity duration-200 ${
          canScrollRight ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Right arrow */}
      <button
        onClick={() => scroll('right')}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md hover:shadow-lg rounded-full p-2.5 transition-all duration-200 hover:bg-neutral-50 ${
          canScrollRight ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
        aria-label="Scroll promotions right"
      >
        <svg className="w-5 h-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
