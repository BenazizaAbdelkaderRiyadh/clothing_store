import React from 'react';

interface ProductImageProps {
  image: string;
  brandText: string;
  category: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ image, brandText, category }) => {
  const isShoe = category === 'Shoes';

  return (
    // Outer group for parallax effect on background elements
    <div className="group relative w-full flex items-center justify-center my-4 cursor-pointer">
      <span className="absolute text-[9rem] font-bold text-gray-200/50 tracking-[1rem] select-none uppercase transition-transform duration-500 ease-out group-hover:-translate-x-4">
        {brandText}
      </span>

      {/* Inner group for effects on the shoe */}
      <div className={`group relative w-full max-w-2xl transition-transform duration-500 ease-in-out ${isShoe ? 'transform -rotate-15 hover:rotate-0 hover:scale-105' : 'hover:scale-105'}`}>
        <img 
          src={image} 
          alt="Displayed Product" 
          className="w-full h-auto drop-shadow-2xl transition-all duration-500 ease-in-out group-hover:drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)]" 
        />
      </div>
    </div>
  );
};

export default ProductImage;
