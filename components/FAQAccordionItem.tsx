'use client';

import { FAQItem } from '@/data/faqs';
import { useState } from 'react';

interface FAQAccordionItemProps {
  faq: FAQItem;
}

export default function FAQAccordionItem({ faq }: FAQAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-neutral-50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-neutral-900 pr-8">
          {faq.question}
        </span>
        <svg
          className={`w-5 h-5 text-primary transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-neutral-700 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}
