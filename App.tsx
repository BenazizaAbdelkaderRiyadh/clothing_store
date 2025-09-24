import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS_DATA } from './constants';
import { ColorVariant, Product, CartItem } from './types';
import Header from './components/Header';
import ShopTheLook from './components/ShopTheLook';
import SizeSelector from './components/SizeSelector';
import CategorySelector from './components/CategorySelector';
import ProductImage from './components/ProductImage';
import ProductInfo from './components/ProductInfo';
import RightSidebar from './components/RightSidebar';
import YouMightAlsoLike from './components/YouMightAlsoLike';
import FeaturedCollection from './components/FeaturedCollection';
import Footer from './components/Footer';
import MenuSidebar from './components/MenuSidebar';
import CartSidebar from './components/CartSidebar';

// --- COLOR UTILITY FUNCTIONS ---

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(r: number, g: number, b: number): string {
  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// --- SEARCH RESULTS COMPONENT ---
const SearchResults: React.FC<{ results: Product[]; onSelectProduct: (product: Product) => void; }> = ({ results, onSelectProduct }) => {
  return (
    <div className="absolute top-20 right-12 w-80 bg-white rounded-lg shadow-2xl z-50 overflow-hidden border border-gray-200">
      <ul className="max-h-[60vh] overflow-y-auto">
        {results.map(product => (
          <li key={product.id} className="border-b last:border-b-0">
            <button
              onClick={() => onSelectProduct(product)}
              className="w-full flex items-center gap-4 p-3 text-left hover:bg-gray-100 transition-colors"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 p-1">
                <img src={product.colors[0].mainImage} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#3A3F4F]">{product.name}</p>
                <p className="text-xs text-gray-500">{product.tagline}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};


// --- APP COMPONENT ---

const App: React.FC = () => {
  const categories = Object.keys(PRODUCTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS_DATA[selectedCategory][0]);
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(selectedProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState<(string | number)>(selectedProduct.sizes[1] || selectedProduct.sizes[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { // Cleanup on unmount
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, isCartOpen]);
  
  useEffect(() => {
    if (searchValue.trim() === '') {
        setSearchResults([]);
        return;
    }

    const allProducts = Object.values(PRODUCTS_DATA).flat();
    const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchValue]);

  const handleProductSwitch = (productToSwitchTo: Product) => {
    if (productToSwitchTo.id === selectedProduct.id || isTransitioning) return;

    setIsTransitioning(true); // Start fade out

    setTimeout(() => {
        const categoryName = Object.keys(PRODUCTS_DATA).find(cat =>
            PRODUCTS_DATA[cat].some(p => p.id === productToSwitchTo.id)
        );

        if (categoryName) {
            if (categoryName !== selectedCategory) {
                setSelectedCategory(categoryName);
            }
            setSelectedProduct(productToSwitchTo);
            setSelectedColor(productToSwitchTo.colors[0]);
            setSelectedSize(productToSwitchTo.sizes[1] || productToSwitchTo.sizes[0]);
        }
        
        setTimeout(() => {
            setIsTransitioning(false); // Start fade in
        }, 10);

    }, 500); // Must match the CSS transition duration
  };

  const handleSelectFromSearch = (product: Product) => {
    handleProductSwitch(product);
    setSearchValue('');
  };

  const handleSelectProductFromCard = (product: Product) => {
    handleProductSwitch(product);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSelectCategory = (category: string) => {
    const newProduct = PRODUCTS_DATA[category][0];
    handleProductSwitch(newProduct);
  };

  const handleSelectProduct = (product: Product) => {
    handleProductSwitch(product);
  };
  
  const handleSelectColor = (color: ColorVariant) => {
    if (color.id === selectedColor.id || isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
        setSelectedColor(color);
        setTimeout(() => {
            setIsTransitioning(false);
        }, 10);
    }, 500); // match CSS duration
  };

  const handleAddToCart = () => {
    const newItemId = `${selectedProduct.id}-${selectedColor.id}-${selectedSize}`;
    const existingItem = cart.find(item => item.id === newItemId);

    if (existingItem) {
        alert("This item (with the same color and size) is already in your cart.");
        setIsCartOpen(true);
        return;
    }

    const newItem: CartItem = {
      name: selectedProduct.name,
      tagline: selectedProduct.tagline,
      colorName: selectedColor.name,
      size: selectedSize,
      price: selectedProduct.price,
      id: newItemId,
      image: selectedColor.mainImage,
    };
    setCart(prevCart => [...prevCart, newItem]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const productsForCategory = PRODUCTS_DATA[selectedCategory];

  const getShopTheLookProps = () => {
    switch (selectedCategory) {
      case 'Shoes':
        return {
          label: 'SHOP THE LOOK',
          image: PRODUCTS_DATA['Outfits'][0].colors[0].mainImage,
          targetCategory: 'Outfits',
        };
      case 'Outfits':
        return {
          label: 'SHOP THE SHOES',
          image: PRODUCTS_DATA['Shoes'][0].colors[0].mainImage,
          targetCategory: 'Shoes',
        };
      case 'Vests':
        return {
          label: 'SHOP THE SHOES',
          image: PRODUCTS_DATA['Shoes'][0].colors[0].mainImage,
          targetCategory: 'Shoes',
        };
      default: // Fallback for any new categories
        return {
          label: 'SHOP THE LOOK',
          image: PRODUCTS_DATA['Outfits'][0].colors[0].mainImage,
          targetCategory: 'Outfits',
        };
    }
  };

  const shopTheLookProps = getShopTheLookProps();

  const generateBackgroundColors = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return { bgAccent: '#EAE3E0', bgMain: '#F5F0EE' }; // Default fallback

    const [h, s, l] = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    // Handle grayscale colors (low saturation)
    if (s < 0.1) { 
      // Create lighter shades of the gray
      const accentL = Math.min(1, l + (1 - l) * 0.75);
      const mainL = Math.min(1, l + (1 - l) * 0.9);
      
      const accentRgb = hslToRgb(h, 0, accentL);
      const bgAccent = rgbToHex(accentRgb[0], accentRgb[1], accentRgb[2]);

      const mainRgb = hslToRgb(h, 0, mainL);
      const bgMain = rgbToHex(mainRgb[0], mainRgb[1], mainRgb[2]);
      
      return { bgAccent, bgMain };
    }

    // For colored backgrounds
    const accentRgb = hslToRgb(h, Math.min(1, s * 1.2), 0.85);
    const bgAccent = rgbToHex(accentRgb[0], accentRgb[1], accentRgb[2]);

    const mainRgb = hslToRgb(h, Math.min(1, s * 0.8), 0.93);
    const bgMain = rgbToHex(mainRgb[0], mainRgb[1], mainRgb[2]);

    return { bgAccent, bgMain };
  }

  const { bgAccent, bgMain } = generateBackgroundColors(selectedColor.colorHex);
  
  const featuredProducts = useMemo(() => [
    PRODUCTS_DATA['Outfits'][1],
    PRODUCTS_DATA['Shoes'][1],
    PRODUCTS_DATA['Vests'][0]
  ].filter(Boolean), []);

  return (
    <div style={{ backgroundColor: bgMain }} className="w-full text-[#4A4A4A] transition-colors duration-500">
      <MenuSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
      />
      
      <section className="relative w-full h-screen flex overflow-hidden">
        <div 
          style={{ backgroundColor: bgAccent }} 
          className="absolute top-0 left-0 w-[45%] h-full z-0 transition-colors duration-500"
        ></div>
        
        <div className="relative z-10 w-full flex flex-col px-12 py-8">
          <Header 
            cartCount={cart.length}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onMenuClick={() => setIsMenuOpen(true)}
            onCartClick={() => setIsCartOpen(true)}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
          {searchResults.length > 0 && (
            <SearchResults 
              results={searchResults}
              onSelectProduct={handleSelectFromSearch}
            />
          )}
          <main className="flex-grow grid grid-cols-12 gap-8 mt-4">
            <div className="col-span-3 flex flex-col justify-between py-16">
              <ShopTheLook
                onSelectCategory={() => handleSelectCategory(shopTheLookProps.targetCategory)}
                image={shopTheLookProps.image}
                label={shopTheLookProps.label}
              />
              <SizeSelector
                sizes={selectedProduct.sizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />
            </div>

            <div className="col-span-6 flex flex-col justify-center items-center">
              <div className={`transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} w-full flex flex-col items-center`}>
                <div className="group relative p-4 md:p-8 my-4 w-full max-w-2xl aspect-[4/3] flex items-center justify-center transform hover:rotate-[-2deg] transition-transform duration-500 ease-in-out">
                    <ProductImage 
                      image={selectedColor.mainImage} 
                      brandText={selectedProduct.brandText} 
                      category={selectedCategory}
                    />
                </div>
                <ProductInfo
                  name={selectedProduct.name}
                  tagline={selectedProduct.tagline}
                  price={selectedProduct.price}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>

            <div className="col-span-3 relative py-16">
              <RightSidebar
                products={productsForCategory}
                selectedProduct={selectedProduct}
                selectedColor={selectedColor}
                onSelectProduct={handleSelectProduct}
                onSelectColor={handleSelectColor}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
              />
            </div>
          </main>
        </div>
      </section>

      <YouMightAlsoLike selectedProductId={selectedProduct.id} onSelectProduct={handleSelectProductFromCard} />
      <FeaturedCollection products={featuredProducts} onSelectProduct={handleSelectProductFromCard} />
      <Footer />
    </div>
  );
};

export default App;