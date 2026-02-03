'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const mainNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/promos', label: 'Promotions' },
    { href: '/contact', label: 'Contact' },
  ];

  const moreNavLinks = [
    { href: '/special-interests', label: 'Special Interests' },
    { href: '/group-travel', label: 'Group Travel' },
    { href: '/resources', label: 'Travel Resources' },
    { href: '/gallery', label: 'Photo Gallery' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="flex items-center z-10">
            <Image
              src="/Starborn_Travel_Agency_Logo_plain2.png"
              alt="Starborn Travel Agency"
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <ul className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-neutral-700 hover:text-primary font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* More Dropdown */}
            <li className="relative">
              <button
                className="text-neutral-700 hover:text-primary font-medium transition-colors duration-200 flex items-center"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                onMouseEnter={() => setMoreDropdownOpen(true)}
              >
                More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {moreDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50"
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                >
                  {moreNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-primary transition-colors duration-200"
                      onClick={() => setMoreDropdownOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-neutral-700 hover:text-primary focus:outline-none z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <ul className="md:hidden mt-4 space-y-2 pb-4">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-neutral-700 hover:text-primary font-medium transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-neutral-200 pt-2 mt-2">
              <div className="text-xs text-neutral-500 uppercase font-semibold mb-2 px-2">More</div>
              {moreNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 pl-4 text-neutral-700 hover:text-primary font-medium transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
