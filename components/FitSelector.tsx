
import React from 'react';

interface FitSelectorProps {
  fits: string[];
  selectedFit: string;
  onSelectFit: (fit: string) => void;
}

const FitSelector: React.FC<FitSelectorProps> = ({ fits, selectedFit, onSelectFit }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      {fits.map((fit) => (
        <button
          key={fit}
          onClick={() => onSelectFit(fit)}
          className={`
            px-4 py-2 text-xs font-semibold rounded-md transition-all duration-200
            ${selectedFit === fit 
              ? 'bg-white shadow-md text-[#4A4A4A]' 
              : 'text-gray-500 hover:text-[#4A4A4A]'
            }
          `}
        >
          {fit.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default FitSelector;
