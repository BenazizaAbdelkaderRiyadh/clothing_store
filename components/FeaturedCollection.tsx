
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface FeaturedCollectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({ products, onSelectProduct }) => {
  return (
    <section className="py-16 px-12 bg-white/30">
      <h2 className="text-3xl font-bold text-[#4A4A4A] mb-2 text-center">Featured Collection</h2>
      <p className="text-center text-gray-600 mb-12">Handpicked styles for the season</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollection;
