import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Starborn Travel Agency | Expert Travel Planning & Vacation Packages",
  description:
    "Your trusted partner for personalized travel planning. Specializing in vacations, cruises, Disney trips, and custom itineraries. Let us create your perfect getaway.",
  keywords: [
    "travel agency",
    "vacation planning",
    "cruises",
    "Disney travel",
    "travel packages",
    "personalized travel",
  ],
  icons: {
    icon: "/Starborn_Travel_Agency_favicon.png",
    apple: "/Starborn_Travel_Agency_favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans flex flex-col min-h-screen">
        <ScrollToTop />
        <Header />
        <main className="flex-grow relative z-0 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
