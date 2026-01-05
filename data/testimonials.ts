export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  rating: number;
  text: string;
  tripType?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Jennifer M.',
    location: 'Tampa, FL',
    rating: 5,
    text: 'Sara planned our family\'s first Disney vacation and it was absolutely magical! Every detail was perfect, from our resort to our dining reservations. She knew exactly what we needed and saved us so much stress. We\'ll never plan a trip without her again!',
    tripType: 'Disney Vacation',
  },
  {
    id: 'testimonial-2',
    name: 'Robert & Linda K.',
    location: 'Chicago, IL',
    rating: 5,
    text: 'Our Caribbean cruise was the trip of a lifetime! Sara found us an incredible deal and the onboard credits she secured made it even better. Her recommendations for excursions were spot-on. Highly recommend Starborn Travel!',
    tripType: 'Caribbean Cruise',
  },
  {
    id: 'testimonial-3',
    name: 'The Patterson Family',
    location: 'Denver, CO',
    rating: 5,
    text: 'We had a family reunion with 15 people and Sara coordinated everything seamlessly. From flights to accommodations to activities, she handled it all. Everyone had an amazing time and we got a great group discount. Thank you, Sara!',
    tripType: 'Group Travel',
  },
  {
    id: 'testimonial-4',
    name: 'Michelle S.',
    location: 'Austin, TX',
    rating: 5,
    text: 'I wanted to surprise my husband with a European getaway but had no idea where to start. Sara listened to what we love and created the perfect Italy itinerary. The hotel choices were excellent and she even arranged a special anniversary dinner. It was flawless!',
    tripType: 'European Vacation',
  },
  {
    id: 'testimonial-5',
    name: 'David L.',
    location: 'Seattle, WA',
    rating: 5,
    text: 'Best travel agent experience ever! Sara is knowledgeable, responsive, and genuinely cares about making your trip perfect. She saved us money and time, and we actually got to enjoy planning our vacation instead of stressing over details.',
    tripType: 'All-Inclusive Resort',
  },
  {
    id: 'testimonial-6',
    name: 'Emily R.',
    location: 'Miami, FL',
    rating: 5,
    text: 'When our flight got cancelled during our trip, Sara was on it immediately. She rebooked us, found us a hotel, and made sure we didn\'t miss our cruise. That kind of support is priceless. We\'re customers for life!',
    tripType: 'Crisis Support',
  },
];
