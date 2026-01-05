export interface Promotion {
  id: string;
  title: string;
  description: string;
  category: 'airfare' | 'cruise' | 'disney' | 'general';
  discount?: string;
  validUntil?: string;
  terms?: string;
  featured?: boolean;
}

export const promotions: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Spring Break Flights - Save Up to $200',
    description: 'Book your spring break getaway early and save! Discounts on select domestic and international flights.',
    category: 'airfare',
    discount: 'Up to $200 off',
    validUntil: 'March 31, 2026',
    featured: true,
  },
  {
    id: 'promo-2',
    title: 'Caribbean Cruise Extravaganza',
    description: 'Sail away to paradise with exclusive rates on 7-night Caribbean cruises. Includes onboard credits!',
    category: 'cruise',
    discount: '$500 onboard credit',
    validUntil: 'June 30, 2026',
    terms: 'Based on double occupancy. Select sailings only.',
    featured: true,
  },
  {
    id: 'promo-3',
    title: 'Disney Magic Package',
    description: 'Experience the magic with discounted Disney World packages including park tickets and resort stays.',
    category: 'disney',
    discount: 'Up to 25% off',
    validUntil: 'December 20, 2026',
    featured: true,
  },
  {
    id: 'promo-4',
    title: 'Last-Minute European Adventures',
    description: 'Limited availability on flights to London, Paris, and Rome. Perfect for spontaneous travelers!',
    category: 'airfare',
    discount: 'Up to 30% off',
    validUntil: 'February 28, 2026',
  },
  {
    id: 'promo-5',
    title: 'Alaska Cruise Discovery',
    description: 'Explore the breathtaking beauty of Alaska with our curated cruise packages. Glacier views included!',
    category: 'cruise',
    discount: 'Free excursion package',
    validUntil: 'September 15, 2026',
    terms: 'Minimum 5-night sailing required.',
  },
  {
    id: 'promo-6',
    title: 'Disney Cruise Line Special',
    description: 'Set sail with Mickey and friends! Special rates on Disney Cruise Line to the Bahamas and Caribbean.',
    category: 'disney',
    discount: 'Kids sail free',
    validUntil: 'August 31, 2026',
    terms: 'Up to 2 kids free with 2 paying adults.',
  },
  {
    id: 'promo-7',
    title: 'All-Inclusive Resort Week',
    description: 'Escape to luxury all-inclusive resorts in Mexico, Jamaica, and the Dominican Republic.',
    category: 'general',
    discount: 'Save $300 per couple',
    validUntil: 'May 30, 2026',
  },
  {
    id: 'promo-8',
    title: 'Summer Travel Sale',
    description: 'Your summer adventure awaits! Special pricing on hotels, flights, and vacation packages worldwide.',
    category: 'general',
    discount: 'Up to 40% off',
    validUntil: 'July 31, 2026',
    featured: true,
  },
];

export const getFeaturedPromotions = () => {
  return promotions.filter(promo => promo.featured);
};

export const getPromotionsByCategory = (category: Promotion['category']) => {
  return promotions.filter(promo => promo.category === category);
};
