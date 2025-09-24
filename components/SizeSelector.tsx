
import React from 'react';

interface SizeSelectorProps {
  sizes: (string | number)[];
  selectedSize: string | number;
  onSelectSize: (size: string | number) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <div className="text-left">
      <h3 className="text-sm font-semibold mb-4 tracking-wider">SELECT A SIZE</h3>
      <div className="grid grid-cols-4 gap-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelectSize(size)}
            className={`
              p-2 text-center rounded-md text-sm font-bold transition-all duration-300 ease-in-out
              ${selectedSize === size 
                ? 'bg-white shadow-lg text-[#4A4A4A] scale-110' 
                : 'hover:bg-white/50 hover:scale-105'
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
