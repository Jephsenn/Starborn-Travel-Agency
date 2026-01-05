import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
  ];

  const resourceLinks = [
    { href: '/promos', label: 'Promotions' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-neutral-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Business Info */}
          <div className="md:col-span-2">
            <Image
              src="/Starborn_Travel_Agency_Logo_plain.png"
              alt="Starborn Travel Agency"
              width={180}
              height={54}
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-neutral-300 mb-4">
              Your trusted partner for personalized travel planning. Creating unforgettable journeys, one trip at a time.
            </p>
            <p className="text-sm text-neutral-400">
              Expert travel services for vacations, cruises, Disney trips, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-secondary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-secondary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 mt-8 pt-8 text-center">
          <p className="text-neutral-400 text-sm">
            &copy; {currentYear} Starborn Travel Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
