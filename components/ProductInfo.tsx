
import React from 'react';

interface ProductInfoProps {
  name: string;
  tagline: string;
  price: number;
  onAddToCart: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ name, tagline, price, onAddToCart }) => {
  return (
    <div className="text-center mt-6">
      <h1 className="text-4xl font-bold text-[#3A3F4F] tracking-[0.5em]">{name}</h1>
      <p className="text-sm font-medium text-gray-600 mb-4">{tagline}</p>
      <div className="flex items-center justify-center gap-6">
        <p className="text-4xl font-bold text-[#4A4A4A]">${price.toFixed(2)}</p>
        <button 
          onClick={onAddToCart}
          className="bg-[#3A3F4F] text-white font-semibold text-sm px-6 py-3 rounded-md shadow-lg flex items-center gap-2 hover:bg-[#2c303a] transition-colors"
        >
          <span className="text-lg">+</span> ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
