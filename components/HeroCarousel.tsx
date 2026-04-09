'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroImage {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

interface HeroCarouselProps {
  images: HeroImage[];
  title: string;
  subtitle?: string;
  autoPlayInterval?: number;
  children?: React.ReactNode;
}

export default function HeroCarousel({
  images,
  title,
  subtitle,
  autoPlayInterval = 5000,
  children
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Each slot gets an incrementing key — bumped when that slot becomes active,
  // which forces the animation div to remount and restart Ken Burns from scratch.
  const [slideAnimKeys, setSlideAnimKeys] = useState<number[]>(() =>
    images.map(() => 0)
  );

  // Increments on every slide change to remount the text block and replay the
  // staggered entrance animation for each new slide.
  const [textKey, setTextKey] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, images.length, autoPlayInterval]);

  useEffect(() => {
    setSlideAnimKeys((prev) => {
      const next = [...prev];
      next[currentIndex] = prev[currentIndex] + 1;
      return next;
    });
    setTextKey((k) => k + 1);
  }, [currentIndex]);

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden bg-neutral-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Images with Ken Burns ───────────────────────────────────────── */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/*
              Key bumps when this slide becomes active → remounts → animation
              restarts at scale(1.05). animation-fill-mode: forwards keeps
              inactive slides at their last zoomed position so there's no
              snap-back during the outgoing crossfade.
            */}
            <div
              key={slideAnimKeys[index]}
              className="absolute inset-0"
              style={{
                animation: `kenBurns ${autoPlayInterval}ms ease-in-out forwards`,
                willChange: 'transform',
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                quality={85}
                sizes="100vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Gradient overlays ───────────────────────────────────────────── */}
      {/* Left-to-right cinematic tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      {/* Top-edge fade so transparent nav links stay legible */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />

      {/* ── Animated text content ───────────────────────────────────────── */}
      {/*
        key={textKey} remounts the whole block on every slide change.
        animation-fill-mode: both = "backwards" holds the `from` state during
        the delay (no opacity flash) and "forwards" holds `to` after it ends.
      */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div key={textKey} className="text-center text-white px-4 max-w-4xl">
          <h1
            className="text-4xl md:text-6xl font-bold font-display mb-6"
            style={{ animation: 'slideUpFade 0.7s ease-out both' }}
          >
            {images[currentIndex].title ?? title}
          </h1>
          {(images[currentIndex].subtitle ?? subtitle) && (
            <p
              className="text-xl md:text-2xl mb-8 text-neutral-100"
              style={{ animation: 'slideUpFade 0.7s ease-out 150ms both' }}
            >
              {images[currentIndex].subtitle ?? subtitle}
            </p>
          )}
          {children && (
            <div style={{ animation: 'slideUpFade 0.7s ease-out 300ms both' }}>
              {children}
            </div>
          )}
        </div>
      </div>

      {/* ── Navigation arrows ───────────────────────────────────────────── */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
        aria-label="Next image"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/70">
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
