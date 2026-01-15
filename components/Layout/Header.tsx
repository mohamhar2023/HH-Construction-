import React, { useEffect, useState } from 'react';
import { LogoIcon, MenuIcon } from '../Icons';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 px-[5%] py-6 md:py-8 flex justify-between items-center transition-all duration-500 ${scrolled
          ? 'glass py-4 md:py-5'
          : 'bg-transparent'
        }`}
    >
      {/* Logo with hover effect */}
      <a
        href="#"
        aria-label="Home"
        className="block text-red-500 transition-transform duration-300 hover:scale-105"
      >
        <LogoIcon className="h-16 md:h-[80px] w-auto drop-shadow-lg" />
      </a>

      {/* Menu button with animation */}
      <button
        aria-label="Menu"
        className="relative w-12 h-12 flex items-center justify-center transition-all duration-300 group"
        onMouseEnter={() => setMenuHovered(true)}
        onMouseLeave={() => setMenuHovered(false)}
      >
        {/* Glow effect on hover */}
        <span
          className={`absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/20 transition-all duration-300 ${menuHovered ? 'scale-100' : 'scale-75'}`}
        />

        {/* Menu lines */}
        <div className="relative w-6 h-4 flex flex-col justify-between">
          <span
            className={`block h-[2px] bg-white transition-all duration-300 origin-right ${menuHovered ? 'w-full bg-red-400' : 'w-full'}`}
          />
          <span
            className={`block h-[2px] bg-white transition-all duration-300 ${menuHovered ? 'w-3/4 bg-red-400' : 'w-3/4'}`}
          />
          <span
            className={`block h-[2px] bg-white transition-all duration-300 origin-right ${menuHovered ? 'w-1/2 bg-red-400' : 'w-1/2'}`}
          />
        </div>
      </button>
    </header>
  );
};

export default Header;