import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Starborn Travel Agency',
  description: 'Get in touch with Starborn Travel Agency to start planning your perfect vacation. Fill out our contact form and Sara will respond within 24-48 hours.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
