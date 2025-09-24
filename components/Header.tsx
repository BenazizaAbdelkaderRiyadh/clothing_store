import React from 'react';
import { MenuIcon, CartIcon, SearchIcon, XIcon } from './Icons';
import CategorySelector from './CategorySelector';

interface HeaderProps {
  cartCount: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onMenuClick: () => void;
  onCartClick: () => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  searchValue, 
  onSearchChange, 
  onMenuClick, 
  onCartClick,
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <header className="w-full flex justify-between items-center text-sm font-medium">
      <div className="flex items-center gap-6">
        <button 
          onClick={onMenuClick} 
          className="flex items-center gap-2 p-3 bg-white/80 shadow-md rounded-md hover:bg-white transition-all"
          aria-label="Open menu"
        >
          <MenuIcon />
          <span>MENU</span>
        </button>
        <button 
          onClick={onCartClick} 
          className="flex items-center gap-2"
          aria-label="Open cart"
        >
          <CartIcon />
          <span>CART ({cartCount})</span>
        </button>
      </div>

      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      <div className="relative flex items-center gap-2">
        <SearchIcon />
        <input 
          type="text" 
          placeholder="SEARCH" 
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent placeholder-[#4A4A4A] outline-none border-b border-[#4A4A4A]/50 pb-1 pr-6"
          aria-label="Search products"
        />
        {searchValue && (
          <button 
            onClick={() => onSearchChange('')} 
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-800"
            aria-label="Clear search"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;