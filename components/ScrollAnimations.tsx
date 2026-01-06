'use client';

import { useEffect, useState, useRef } from 'react';

export default function ScrollAnimations() {
  const [scrollY, setScrollY] = useState(0);
  const [airplaneVisible, setAirplaneVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      
      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);
      
      // Show airplane after scrolling a bit
      if (currentScrollY > 300 && currentScrollY < 3000) {
        setAirplaneVisible(true);
      } else {
        setAirplaneVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate airplane position based on scroll
  const airplaneProgress = Math.min((scrollY - 300) / 2000, 1);
  const airplaneX = airplaneProgress * 120; // Move from -20% to 100%
  const airplaneY = Math.sin(airplaneProgress * Math.PI * 2) * 10; // Slight wave motion

  return (
    <>
      {/* Parallax Clouds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        {/* Cloud 1 - Slow */}
        <div
          className="absolute top-20 opacity-10"
          style={{
            left: `${10 - scrollY * 0.02}%`,
            transform: 'translateY(0)',
          }}
        >
          <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
            <ellipse cx="50" cy="50" rx="40" ry="25" fill="#1E3A8A" />
            <ellipse cx="80" cy="45" rx="45" ry="28" fill="#1E3A8A" />
            <ellipse cx="110" cy="50" rx="38" ry="24" fill="#1E3A8A" />
            <ellipse cx="140" cy="52" rx="35" ry="22" fill="#1E3A8A" />
          </svg>
        </div>

        {/* Cloud 2 - Medium */}
        <div
          className="absolute top-40 opacity-10"
          style={{
            right: `${20 - scrollY * 0.03}%`,
            transform: 'translateY(0)',
          }}
        >
          <svg width="180" height="90" viewBox="0 0 180 90" fill="none">
            <ellipse cx="45" cy="45" rx="35" ry="22" fill="#1E3A8A" />
            <ellipse cx="70" cy="42" rx="40" ry="25" fill="#1E3A8A" />
            <ellipse cx="100" cy="45" rx="35" ry="22" fill="#1E3A8A" />
            <ellipse cx="125" cy="47" rx="30" ry="20" fill="#1E3A8A" />
          </svg>
        </div>

        {/* Cloud 3 - Fast */}
        <div
          className="absolute top-64 opacity-10"
          style={{
            left: `${60 - scrollY * 0.05}%`,
            transform: 'translateY(0)',
          }}
        >
          <svg width="160" height="80" viewBox="0 0 160 80" fill="none">
            <ellipse cx="40" cy="40" rx="32" ry="20" fill="#1E3A8A" />
            <ellipse cx="65" cy="38" rx="35" ry="22" fill="#1E3A8A" />
            <ellipse cx="90" cy="40" rx="30" ry="20" fill="#1E3A8A" />
            <ellipse cx="112" cy="42" rx="28" ry="18" fill="#1E3A8A" />
          </svg>
        </div>

        {/* Cloud 4 - Slow */}
        <div
          className="absolute top-96 opacity-10"
          style={{
            right: `${5 - scrollY * 0.025}%`,
            transform: 'translateY(0)',
          }}
        >
          <svg width="220" height="110" viewBox="0 0 220 110" fill="none">
            <ellipse cx="55" cy="55" rx="45" ry="28" fill="#1E3A8A" />
            <ellipse cx="90" cy="50" rx="50" ry="30" fill="#1E3A8A" />
            <ellipse cx="125" cy="55" rx="42" ry="26" fill="#1E3A8A" />
            <ellipse cx="158" cy="57" rx="38" ry="24" fill="#1E3A8A" />
          </svg>
        </div>

        {/* Cloud 5 - Medium */}
        <div
          className="absolute opacity-10"
          style={{
            top: `${500 - scrollY * 0.04}px`,
            left: `${30 - scrollY * 0.035}%`,
          }}
        >
          <svg width="190" height="95" viewBox="0 0 190 95" fill="none">
            <ellipse cx="48" cy="48" rx="38" ry="24" fill="#1E3A8A" />
            <ellipse cx="75" cy="45" rx="42" ry="26" fill="#1E3A8A" />
            <ellipse cx="105" cy="48" rx="36" ry="23" fill="#1E3A8A" />
            <ellipse cx="133" cy="50" rx="33" ry="21" fill="#1E3A8A" />
          </svg>
        </div>
      </div>

      {/* Flying Airplane */}
      {airplaneVisible && (
        <div
          className="fixed z-[1] pointer-events-none transition-opacity duration-500"
          style={{
            left: `${airplaneX - 20}%`,
            top: `${30 + airplaneY}vh`,
            opacity: airplaneProgress > 0.95 ? 1 - (airplaneProgress - 0.95) * 20 : 1,
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-lg transition-transform duration-300"
            style={{
              transform: scrollDirection === 'down' ? 'rotate(45deg)' : 'rotate(-45deg) scaleX(-1)',
            }}
          >
            {/* Airplane body */}
            <path
              d="M20.56 3.91C21.15 4.5 21.15 5.45 20.56 6.03L16.67 9.92L18.79 19.11L17.38 20.53L13.5 13.1L9.6 17L9.96 19.47L8.89 20.53L7.13 17.35L3.94 15.58L5 14.5L7.5 14.87L11.37 11L3.94 7.09L5.36 5.68L14.55 7.8L18.44 3.91C19.02 3.33 19.98 3.33 20.56 3.91Z"
              fill="#1E3A8A"
            />
            {/* Wing highlight */}
            <path
              d="M18.44 3.91L14.55 7.8L16.5 8.4L20.56 4.34C20.85 4.05 20.85 3.58 20.56 3.29C20.27 3 19.8 3 19.51 3.29L18.44 3.91Z"
              fill="#3B82F6"
              opacity="0.6"
            />
          </svg>
          {/* Contrail */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-blue-200 to-transparent transition-all duration-300"
            style={{
              right: scrollDirection === 'down' ? '100%' : 'auto',
              left: scrollDirection === 'up' ? '100%' : 'auto',
              width: '150px',
              opacity: 0.4,
            }}
          />
        </div>
      )}
    </>
  );
}
