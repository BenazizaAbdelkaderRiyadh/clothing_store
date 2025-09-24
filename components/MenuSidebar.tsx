import React from 'react';
import { XIcon } from './Icons';

interface MenuSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({ isOpen, onClose }) => {
  const links = ['New Arrivals', 'Men', 'Women', 'Kids', 'Collections', 'Sale'];
  
  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Sidebar Content */}
      <div 
        className={`relative flex flex-col w-80 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-[#3A3F4F]">Menu</h2>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-800" aria-label="Close menu">
            <XIcon />
          </button>
        </div>
        <nav className="flex-grow p-6">
          <ul className="space-y-4">
            {links.map((link, index) => (
              <li 
                key={link}
                className={`transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
                style={{ transitionDelay: `${isOpen ? index * 50 + 100 : 0}ms` }}
              >
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); alert(`Navigating to ${link}...`); onClose(); }}
                  className="text-lg font-medium text-gray-700 hover:text-[#3A3F4F] transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-6 border-t text-sm text-gray-500">
            <a href="#" className="hover:underline">Account</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:underline">Settings</a>
        </div>
      </div>
    </div>
  );
};

export default MenuSidebar;
