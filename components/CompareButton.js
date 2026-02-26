import { GitCompare } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';

export default function CompareButton({ slug, className = '', size = 'md' }) {
  const { isInCompareList, toggleCompare } = useWedding();
  const inCompare = isInCompareList(slug);

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCompare(slug);
      }}
      className={`${sizes[size]} rounded-full flex items-center justify-center transition-all ${
        inCompare 
          ? 'bg-mehndi-500 text-maroon-900 scale-110 shadow-mehndi' 
          : 'bg-white/90 backdrop-blur-sm text-maroon-500 hover:bg-mehndi-50 hover:text-mehndi-600'
      } shadow-lg hover:shadow-xl ${className}`}
      title={inCompare ? 'Compare se hatayein' : 'Compare mein shamil karein'}
    >
      <GitCompare className={iconSizes[size]} />
    </button>
  );
}
