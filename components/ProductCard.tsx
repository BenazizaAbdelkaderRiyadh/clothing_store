
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="bg-white/50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col h-full"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      onKeyPress={(e) => e.key === 'Enter' && onSelectProduct(product)}
    >
      <div className="p-4 flex-grow flex items-center justify-center">
        <img src={product.colors[0].mainImage} alt={product.name} className="w-full h-40 object-contain rounded-lg" />
      </div>
      <div className="p-4 bg-white rounded-b-xl text-left">
        <h3 className="font-bold text-lg text-[#3A3F4F] truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2 truncate">{product.tagline}</p>
        <p className="font-bold text-lg text-[#4A4A4A]">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;