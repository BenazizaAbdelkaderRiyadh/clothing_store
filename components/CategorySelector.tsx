
import React from 'react';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`
            px-4 py-2 text-xs font-semibold rounded-md transition-all duration-300 ease-in-out transform
            ${selectedCategory === category
              ? 'bg-white shadow-md text-[#4A4A4A] scale-105'
              : 'text-gray-500 hover:text-[#4A4A4A] hover:bg-white/50 hover:scale-105'
            }
          `}
        >
          {category.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;