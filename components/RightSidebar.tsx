
import React from 'react';
import { Product, ColorVariant } from '../types';
import { PRODUCTS_DATA } from '../constants';
import ShopTheLook from './ShopTheLook';

interface RightSidebarProps {
  products: Product[];
  selectedProduct: Product;
  selectedColor: ColorVariant;
  onSelectProduct: (product: Product) => void;
  onSelectColor: (color: ColorVariant) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ 
  products, 
  selectedProduct, 
  selectedColor, 
  onSelectProduct, 
  onSelectColor,
  selectedCategory,
  onSelectCategory,
}) => {
  const otherProducts = products.filter(p => p.id !== selectedProduct.id);
  
  return (
    <>
      {}
      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
        <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4 tracking-wider self-start">SELECT A COLOR</h3>
            <div className="flex items-center gap-3 self-start">
            {selectedProduct.colors.map(color => (
                <button 
                key={color.id}
                onClick={() => onSelectColor(color)}
                className={`w-6 h-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${selectedColor.id === color.id ? 'ring-2 ring-offset-2 ring-[#4A4A4A] scale-110' : ''}`}
                style={{ backgroundColor: color.colorHex }}
                aria-label={`Select ${color.name} color`}
                />
            ))}
            </div>
        </div>

        {otherProducts.length > 0 && (
            <div>
                <h3 className="text-sm font-semibold mb-4 tracking-wider text-left">OTHER STYLES</h3>
                <div className="space-y-4 flex flex-col items-end">
                    {otherProducts.map(product => (
                    <button 
                        key={product.id} 
                        onClick={() => onSelectProduct(product)}
                        className="block bg-white p-2 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        <img src={product.colors[0].mainImage} alt={product.name} className="w-28 h-auto"/>
                    </button>
                    ))}
                </div>
            </div>
        )}
      </div>

      {}
      {selectedCategory === 'Outfits' && (
        <div className="absolute bottom-0 right-0">
          <ShopTheLook
            onSelectCategory={() => onSelectCategory('Vests')}
            image={PRODUCTS_DATA['Vests'][0].colors[0].mainImage}
            label="SHOP THE VEST"
            direction="right"
          />
        </div>
      )}
    </>
  );
};

export default RightSidebar;
