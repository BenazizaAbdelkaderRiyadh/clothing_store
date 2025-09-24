import React from 'react';
import { Product } from '../types';
import { PRODUCTS_DATA } from '../constants';
import ProductScroller from './ProductScroller';

interface YouMightAlsoLikeProps {
  onSelectProduct: (product: Product) => void;

  selectedProductId: string;
}

const YouMightAlsoLike: React.FC<YouMightAlsoLikeProps> = ({ onSelectProduct, selectedProductId }) => {

  const shoes = (PRODUCTS_DATA['Shoes'] || []).filter(p => p.id !== selectedProductId);
  const outfits = (PRODUCTS_DATA['Outfits'] || []).filter(p => p.id !== selectedProductId);
  const vests = (PRODUCTS_DATA['Vests'] || []).filter(p => p.id !== selectedProductId);

  return (
    <section className="h-screen flex flex-col justify-center bg-gray-100 overflow-hidden">
      <div className="w-full space-y-8">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#3A3F4F] mb-2">You Might Also Like</h2>
          <p className="text-gray-600">Discover your next favorite style from our curated collection.</p>
        </div>
        
        <div className="space-y-4">
          {shoes.length > 0 && (
            <ProductScroller 
              products={shoes} 
              direction="left" 
              onProductClick={onSelectProduct} 
            />
          )}
          {outfits.length > 0 && (
            <ProductScroller 
              products={outfits} 
              direction="right" 
              onProductClick={onSelectProduct} 
            />
          )}
          {vests.length > 0 && (
            <ProductScroller 
              products={vests} 
              direction="left" 
              onProductClick={onSelectProduct} 
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default YouMightAlsoLike;
