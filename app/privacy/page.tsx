import type { Metadata } from 'next';
import HeroSingle from '@/components/HeroSingle';

export const metadata: Metadata = {
  title: 'Privacy Policy | Starborn Travel Agency',
  description: 'Learn how Starborn Travel Agency collects, uses, and protects your personal information.',
};

export default function Privacy() {
  return (
    <>
      {/* Preload hero image */}
      <link rel="preload" as="image" href="/images/image (9).webp" />

      {/* Hero Section */}
      <HeroSingle
        imageSrc="/images/image (9).webp"
        imageAlt="Privacy Policy"
        title="Privacy Policy"
        subtitle="Your privacy and security matter to us"
        overlay="dark"
        compact
      />

      {/* Privacy Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-600 mb-8">
              <strong>Last Updated:</strong> February 2, 2026
            </p>

            <h2 className="heading-md mb-4">Introduction</h2>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              Starborn Travel Agency (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our services.
            </p>

            <h2 className="heading-md mb-4 mt-8">Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
            <p className="text-neutral-700 mb-4 leading-relaxed">
              When you contact us or request our services, we may collect:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-700">
              <li>Name and contact information (email, phone number, address)</li>
              <li>Travel preferences and requirements</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Passport and identification details (when required for bookings)</li>
              <li>Emergency contact information</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-700">
              <li>Browser type and version</li>
              <li>IP address and location data</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website information</li>
            </ul>

            <h2 className="heading-md mb-4 mt-8">How We Use Your Information</h2>
            <p className="text-neutral-700 mb-4 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-700">
              <li>Process your travel bookings and reservations</li>
              <li>Communicate with you about your trips and services</li>
              <li>Send promotional offers and travel deals (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations and regulations</li>
              <li>Prevent fraud and enhance security</li>
            </ul>

            <h2 className="heading-md mb-4 mt-8">Information Sharing</h2>
            <p className="text-neutral-700 mb-4 leading-relaxed">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-700">
              <li><strong>Travel suppliers:</strong> Airlines, hotels, cruise lines, and tour operators to complete your bookings</li>
              <li><strong>Payment processors:</strong> Secure third-party services to process transactions</li>
              <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
              <li><strong>Service providers:</strong> Companies that help us operate our business (email services, analytics, etc.)</li>
            </ul>

            <h2 className="heading-md mb-4 mt-8">Data Security</h2>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. However, 
              no method of transmission over the Internet is 100% secure, and we cannot guarantee 
              absolute security.
            </p>

            <h2 className="heading-md mb-4 mt-8">Your Rights</h2>
            <p className="text-neutral-700 mb-4 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-700">
              <li>Access the personal information we hold about you</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to certain types of data processing</li>
            </ul>

            <h2 className="heading-md mb-4 mt-8">Cookies and Tracking</h2>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience on our website. 
              You can control cookie settings through your browser preferences. Note that disabling cookies 
              may limit some functionality of our site.
            </p>

            <h2 className="heading-md mb-4 mt-8">Third-Party Links</h2>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the 
              privacy practices of these external sites. We encourage you to review their privacy 
              policies before providing any personal information.
            </p>

            <h2 className="heading-md mb-4 mt-8">Children&apos;s Privacy</h2>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              Our services are not directed to children under 13. We do not knowingly collect personal 
              information from children. If you believe we have collected information from a child, 
              please contact us immediately.
            </p>

            <h2 className="heading-md mb-4 mt-8">Changes to This Policy</h2>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page 
              with an updated &quot;Last Updated&quot; date. We encourage you to review this policy periodically.
            </p>

            <h2 className="heading-md mb-4 mt-8">Contact Us</h2>
            <p className="text-neutral-700 mb-4 leading-relaxed">
              If you have questions about this Privacy Policy or how we handle your information, please contact us:
            </p>
            <div className="bg-neutral-100 p-6 rounded-lg mb-6">
              <p className="text-neutral-700 mb-2"><strong>Starborn Travel Agency</strong></p>
              <p className="text-neutral-700 mb-2">Email: privacy@starborntravel.com</p>
              <p className="text-neutral-700">Or use our <a href="/contact" className="text-primary hover:underline">contact form</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
