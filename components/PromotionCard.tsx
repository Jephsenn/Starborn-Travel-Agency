import { Promotion } from '@/data/promotions';

interface PromotionCardProps {
  promotion: Promotion;
}

export default function PromotionCard({ promotion }: PromotionCardProps) {
  const categoryColors = {
    airfare: 'bg-blue-100 text-blue-800',
    cruise: 'bg-cyan-100 text-cyan-800',
    disney: 'bg-purple-100 text-purple-800',
    general: 'bg-amber-100 text-amber-800',
  };

  const categoryLabels = {
    airfare: 'Airfare',
    cruise: 'Cruise',
    disney: 'Disney',
    general: 'Travel Deal',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-neutral-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[promotion.category]}`}>
            {categoryLabels[promotion.category]}
          </span>
          {promotion.featured && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-white">
              Featured
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-neutral-900 mb-3">
          {promotion.title}
        </h3>
        
        <p className="text-neutral-600 mb-4">
          {promotion.description}
        </p>
        
        {promotion.discount && (
          <div className="bg-primary-light bg-opacity-10 rounded-lg p-3 mb-3">
            <p className="text-primary font-semibold text-lg">
              {promotion.discount}
            </p>
          </div>
        )}
        
        {promotion.validUntil && (
          <p className="text-sm text-neutral-500 mb-2">
            <span className="font-medium">Valid until:</span> {promotion.validUntil}
          </p>
        )}
        
        {promotion.terms && (
          <p className="text-xs text-neutral-400 italic">
            {promotion.terms}
          </p>
        )}
      </div>
    </div>
  );
}
