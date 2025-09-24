

import React from 'react';
import { ColorVariant } from '../types';

interface ColorSelectorProps {
  colors: ColorVariant[];
  selectedColor: ColorVariant;
  onSelectColor: (color: ColorVariant) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onSelectColor }) => {
  const otherColors = colors.filter(c => c.id !== selectedColor.id).slice(0, 3);
  
  return (
    <div className="flex flex-col items-end w-full">
      <div className="space-y-4 mb-8">
        {otherColors.map(color => (
          <button 
            key={color.id} 
            onClick={() => onSelectColor(color)}
            className="block bg-white p-2 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <img src={color.mainImage} alt={color.name} className="w-28 h-auto"/>
          </button>
        ))}
      </div>
      <h3 className="text-sm font-semibold mb-4 tracking-wider self-start">SELECT A COLOR</h3>
      <div className="flex items-center gap-3 self-start">
        {colors.map(color => (
          <button 
            key={color.id}
            onClick={() => onSelectColor(color)}
            className={`w-6 h-6 rounded-full transition-all duration-200 ${selectedColor.id === color.id ? 'ring-2 ring-offset-2 ring-[#4A4A4A]' : ''}`}
            style={{ backgroundColor: color.colorHex }}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;