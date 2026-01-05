import { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
      <div className="flex items-center mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-secondary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <p className="text-neutral-700 mb-4 italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      
      <div className="border-t border-neutral-200 pt-4">
        <p className="font-semibold text-neutral-900">
          {testimonial.name}
        </p>
        {testimonial.location && (
          <p className="text-sm text-neutral-500">
            {testimonial.location}
          </p>
        )}
        {testimonial.tripType && (
          <p className="text-sm text-primary mt-1">
            {testimonial.tripType}
          </p>
        )}
      </div>
    </div>
  );
}
