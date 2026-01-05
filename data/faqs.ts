export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How much does it cost to use a travel agent?',
    answer: 'Our services are completely free for you! We earn commission from our travel partners, so you get expert planning and support at no additional cost. In many cases, we can even save you money with exclusive deals and insider knowledge.',
  },
  {
    id: 'faq-2',
    question: 'Why should I book through Starborn Travel instead of booking online myself?',
    answer: 'While you can certainly book online, working with us means you get personalized service, expert destination knowledge, and someone in your corner if anything goes wrong. We handle all the details, find you the best deals, and provide support before, during, and after your trip.',
  },
  {
    id: 'faq-3',
    question: 'How far in advance should I book my trip?',
    answer: 'For the best selection and pricing, we recommend booking 6-12 months in advance for international travel and 3-6 months for domestic trips. However, we can also help with last-minute travel! Disney vacations should ideally be booked 6-11 months out, and cruises typically 9-12 months ahead.',
  },
  {
    id: 'faq-4',
    question: 'What happens if I need to cancel or change my trip?',
    answer: 'We\'re here to help! Cancellation and change policies vary by supplier, and we\'ll clearly explain your options when booking. If you need to make changes, just contact us and we\'ll handle the details with the airlines, hotels, or cruise lines on your behalf.',
  },
  {
    id: 'faq-5',
    question: 'Do you offer payment plans?',
    answer: 'Yes! Many of our travel packages, especially cruises and Disney vacations, can be booked with a deposit and paid over time. We\'ll work with you to create a payment schedule that fits your budget.',
  },
  {
    id: 'faq-6',
    question: 'What destinations do you specialize in?',
    answer: 'We can help you travel anywhere in the world! Our specialties include Disney destinations, Caribbean cruises, all-inclusive resorts, European getaways, and family vacations. Sara has extensive knowledge of popular destinations and can provide insider tips wherever you want to go.',
  },
  {
    id: 'faq-7',
    question: 'How do I get started planning my trip?',
    answer: 'Simply fill out our contact form with your travel ideas, budget, and preferences. Sara will review your request and reach out within 24-48 hours to start creating your perfect itinerary. You can also call or email us directly!',
  },
  {
    id: 'faq-8',
    question: 'Can you help with group travel?',
    answer: 'Absolutely! We specialize in group travel for family reunions, destination weddings, corporate retreats, and friend getaways. We\'ll coordinate all the details and often secure group discounts to make your trip more affordable.',
  },
  {
    id: 'faq-9',
    question: 'What if something goes wrong during my trip?',
    answer: 'You\'re never alone! We provide 24/7 support for our travelers. If you encounter any issues during your trip, you can reach out to us anytime and we\'ll work to resolve the problem quickly. This is one of the biggest advantages of booking through a travel agent.',
  },
  {
    id: 'faq-10',
    question: 'Do you book travel insurance?',
    answer: 'Yes, we strongly recommend travel insurance and can help you find the right coverage for your trip. Insurance can protect you from unexpected cancellations, medical emergencies, lost luggage, and more. We\'ll explain your options and help you choose a plan that fits your needs.',
  },
];
