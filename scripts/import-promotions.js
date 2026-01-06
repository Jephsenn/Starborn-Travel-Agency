// Import Script for Sample Promotions
// Run this with: node scripts/import-promotions.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'cvgvxkgf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const samplePromotions = [
  {
    _type: 'promotion',
    title: 'Spring Break Flights - Save Up to $200',
    description: 'Book your spring break getaway early and save! Discounts on select domestic and international flights.',
    category: 'airfare',
    discount: 'Up to $200 off',
    validUntil: 'March 31, 2026',
    featured: true,
    active: true,
  },
  {
    _type: 'promotion',
    title: 'Caribbean Cruise Extravaganza',
    description: 'Sail away to paradise with exclusive rates on 7-night Caribbean cruises. Includes onboard credits!',
    category: 'cruise',
    discount: '$500 onboard credit',
    validUntil: 'June 30, 2026',
    terms: 'Based on double occupancy. Select sailings only.',
    featured: true,
    active: true,
  },
  {
    _type: 'promotion',
    title: 'Disney Magic Package',
    description: 'Experience the magic with discounted Disney World packages including park tickets and resort stays.',
    category: 'disney',
    discount: 'Up to 25% off',
    validUntil: 'December 20, 2026',
    featured: true,
    active: true,
  },
  {
    _type: 'promotion',
    title: 'Last-Minute European Adventures',
    description: 'Limited availability on flights to London, Paris, and Rome. Perfect for spontaneous travelers!',
    category: 'airfare',
    discount: 'Up to 30% off',
    validUntil: 'February 28, 2026',
    featured: false,
    active: true,
  },
  {
    _type: 'promotion',
    title: 'Alaska Cruise Discovery',
    description: 'Explore the breathtaking beauty of Alaska with our curated cruise packages. Glacier views included!',
    category: 'cruise',
    discount: 'Free excursion package',
    validUntil: 'September 15, 2026',
    terms: 'Minimum 5-night sailing required.',
    featured: false,
    active: true,
  },
  {
    _type: 'promotion',
    title: 'Disney Cruise Line Special',
    description: 'Set sail with Mickey and friends! Special rates on Disney Cruise Line to the Bahamas and Caribbean.',
    category: 'disney',
    discount: 'Kids sail free',
    validUntil: 'August 31, 2026',
    terms: 'Up to 2 kids free with 2 paying adults.',
    featured: false,
    active: true,
  },
  {
    _type: 'promotion',
    title: 'All-Inclusive Resort Week',
    description: 'Escape to luxury all-inclusive resorts in Mexico, Jamaica, and the Dominican Republic.',
    category: 'general',
    discount: 'Save $300 per couple',
    validUntil: 'May 30, 2026',
    featured: true,
    active: true,
  },
  {
    _type: 'promotion',
    title: 'Summer Travel Sale',
    description: 'Your summer adventure awaits! Special pricing on hotels, flights, and vacation packages worldwide.',
    category: 'general',
    discount: 'Up to 40% off',
    validUntil: 'July 31, 2026',
    featured: true,
    active: true,
  },
];

async function importPromotions() {
  try {
    console.log('Starting import of sample promotions...');
    
    for (const promo of samplePromotions) {
      const result = await client.create(promo);
      console.log(`✓ Created: ${promo.title}`);
    }
    
    console.log('\n✅ Successfully imported all sample promotions!');
    console.log('You can now view and edit them at http://localhost:3000/studio');
  } catch (error) {
    console.error('❌ Error importing promotions:', error.message);
  }
}

importPromotions();
