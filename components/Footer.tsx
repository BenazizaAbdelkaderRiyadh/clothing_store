
import React from 'react';
import { NikeSwooshIcon, TwitterIcon, InstagramIcon, FacebookIcon } from './Icons';

const Footer: React.FC = () => {
  const socialLinks = [
    { Icon: TwitterIcon, href: '#', name: 'Twitter' },
    { Icon: InstagramIcon, href: '#', name: 'Instagram' },
    { Icon: FacebookIcon, href: '#', name: 'Facebook' },
  ];

  const footerLinks = [
    { title: 'Company', links: ['About Us', 'Careers', 'News', 'Contact'] },
    { title: 'Support', links: ['Help Center', 'Shipping', 'Returns', 'FAQ'] },
    { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
  ];

  return (
    <footer className="bg-[#3A3F4F] text-white py-16 px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <NikeSwooshIcon className="w-24 h-auto mb-4" />
          <p className="text-sm text-gray-400">Bringing inspiration and innovation to every athlete in the world.</p>
          <div className="flex space-x-4 mt-6">
            {socialLinks.map(({ Icon, href, name }) => (
              <a key={name} href={href} aria-label={name} className="text-gray-400 hover:text-white transition-colors">
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
        <div className="md:col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map(({ title, links }) => (
            <div key={title}>
                <h3 className="font-semibold tracking-wider uppercase mb-4 text-sm">{title}</h3>
                <ul className="space-y-3">
                {links.map(link => (
                    <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{link}</a>
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Made by Benaziza Abdelkader riyadh.</p>
      </div>
    </footer>
  );
};

export default Footer;
