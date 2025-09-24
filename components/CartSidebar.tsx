import React, { useState } from 'react';
import { CartItem } from '../types';
import { XIcon, TrashIcon, CartIcon } from './Icons';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (itemId: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cartItems, onRemoveItem }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const [removingItems, setRemovingItems] = useState<string[]>([]);

  const handleRemoveClick = (itemId: string) => {

    setRemovingItems(prev => [...prev, itemId]);
    

    setTimeout(() => {
      onRemoveItem(itemId);

      setRemovingItems(prev => prev.filter(id => id !== itemId));
    }, 300); 
  };


  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {}
      <div 
        className={`absolute top-0 right-0 flex flex-col w-full max-w-md h-full bg-white shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-[#3A3F4F]">Your Cart</h2>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-800" aria-label="Close cart">
            <XIcon />
          </button>
        </div>

        {cartItems.length > 0 ? (
          <>
            <div className="flex-grow p-6 overflow-y-auto">
              <div className="space-y-4">
                {cartItems.map((item, index) => {
                  const isRemoving = removingItems.includes(item.id);
                  return (
                    <div 
                      key={item.id} 
                      className={`
                        flex items-start gap-4 
                        transition-all duration-300 ease-in-out
                        ${isRemoving 
                          ? 'opacity-0 scale-95 -translate-x-4 max-h-0 py-0' 
                          : 'opacity-100 scale-100 translate-x-0 max-h-24 py-0'
                        }
                        ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}
                      `}
                      style={{ transitionDelay: `${isOpen && !isRemoving ? index * 75 + 150 : 0}ms` }}
                    >
                      <div className="w-24 h-24 bg-gray-100 rounded-lg p-1 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-grow text-sm">
                        <h3 className="font-bold text-[#3A3F4F]">{item.name}</h3>
                        <p className="text-gray-500">{item.tagline}</p>
                        <p className="text-gray-500">Color: {item.colorName}</p>
                        <p className="text-gray-500">Size: {item.size}</p>
                        <p className="font-bold mt-1">${item.price.toFixed(2)}</p>
                      </div>
                      <button onClick={() => handleRemoveClick(item.id)} className="text-gray-400 hover:text-red-500 p-1" aria-label={`Remove ${item.name} from cart`}>
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border-t">
                <div className="flex justify-between items-center font-bold text-lg mb-4">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => alert('Checkout functionality is not yet implemented.')}
                  className="w-full bg-[#3A3F4F] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#2c303a] transition-colors"
                >
                  Proceed to Checkout
                </button>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
            <CartIcon className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700">Your cart is empty</h3>
            <p className="text-gray-500">Looks like you haven't added anything yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
