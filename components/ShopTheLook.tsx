import React from 'react';

interface ShopTheLookProps {
  onSelectCategory: () => void;
  image: string;
  label: string;
  direction?: 'left' | 'right';
}

const ShopTheLook: React.FC<ShopTheLookProps> = ({ onSelectCategory, image, label, direction = 'left' }) => {
  const isRight = direction === 'right';
  return (
    <div className={`flex items-center gap-4 ${isRight ? 'flex-row-reverse' : ''}`}>
      <div className="w-28 h-32 bg-white rounded-lg shadow-xl p-1">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <button 
        onClick={onSelectCategory}
        className={`bg-[#4A4A4A] text-white text-xs font-semibold py-2 px-4 rounded-md shadow-lg transform hover:bg-[#333] hover:scale-105 transition-all duration-300 ease-in-out ${isRight ? 'translate-x-6' : '-translate-x-6'}`}
      >
        {label}
      </button>
    </div>
  );
};

export default ShopTheLook;
