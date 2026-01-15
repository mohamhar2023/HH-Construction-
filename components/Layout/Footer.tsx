import React from 'react';
import { LogoIcon, ArrowTopIcon, InstagramIcon } from '../Icons';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f0f0f] text-[#adaaaa] px-[5%] py-16 md:py-24 border-t border-[#222]">
      {/* Top Row */}
      <div className="flex justify-between items-start mb-16">
        <div className="text-red-600 w-24">
          <LogoIcon className="w-full h-auto" />
        </div>

        <button
          onClick={scrollToTop}
          className="group flex items-center gap-3 text-sm uppercase tracking-widest text-[#f5f5f5] hover:text-red-500 transition-colors"
        >
          Back to top
          <ArrowTopIcon className="w-2.5 h-auto transition-transform group-hover:-translate-y-1" />
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          {['Home', 'Services', 'Projects', 'Investors', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-3xl md:text-5xl font-display text-[#f5f5f5] hover:text-red-500 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Contact & Details */}
        <div className="flex flex-col justify-between">
          <div className="space-y-8">
            {/* Socials */}
            <div>
              <dt className="text-xs uppercase tracking-[2px] mb-4 text-[#adaaaa]">Connect</dt>
              <dd className="flex gap-4">
                <a href="https://www.instagram.com/hhconstruction__/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                  <InstagramIcon className="w-6 h-6" />
                </a>
              </dd>
            </div>

            {/* Contact Info */}
            <div>
              <dt className="text-xs uppercase tracking-[2px] mb-4 text-[#adaaaa]">Contact</dt>
              <dd className="flex flex-col gap-2 text-[#f5f5f5] font-light">
                <a href="tel:+15555555555" className="hover:text-red-500 transition-colors">
                  (555) 123-4567
                </a>
                <a href="mailto:info@hhconstruction.com" className="hover:text-red-500 transition-colors">
                  info@hhconstruction.com
                </a>
                <span className="text-gray-500 mt-2 block">London-Middlesex & Kitchener</span>
              </dd>
            </div>
          </div>

          <div className="mt-12 text-xs uppercase tracking-widest text-[#555]">
            <strong className="block text-[#adaaaa] mb-1 font-display">HH Construction</strong>
            &copy; {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;