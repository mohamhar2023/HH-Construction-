import React from 'react';
import { LogoIcon, MenuIcon } from '../Icons';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 px-[5%] py-6 md:py-8 flex justify-between items-center text-[#f5f5f5] mix-blend-difference">
      <a href="#" aria-label="Home" className="block text-red-500">
        <LogoIcon className="h-16 md:h-[80px] w-auto" />
      </a>
      <button 
        aria-label="Menu" 
        className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity text-white"
      >
        <MenuIcon className="w-full h-full fill-current" />
      </button>
    </header>
  );
};

export default Header;