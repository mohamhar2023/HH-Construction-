import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Arc */}
    <path d="M40 120 C 20 80, 20 50, 60 20" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    
    {/* Right Arc */}
    <path d="M160 120 C 180 80, 180 50, 140 20" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    
    {/* Left H */}
    <line x1="60" y1="40" x2="60" y2="110" stroke="currentColor" strokeWidth="8" />
    <line x1="85" y1="40" x2="85" y2="110" stroke="currentColor" strokeWidth="8" />
    <line x1="60" y1="75" x2="85" y2="75" stroke="currentColor" strokeWidth="8" />

    {/* Right H */}
    <line x1="115" y1="40" x2="115" y2="110" stroke="currentColor" strokeWidth="8" />
    <line x1="140" y1="40" x2="140" y2="110" stroke="currentColor" strokeWidth="8" />
    <line x1="115" y1="75" x2="140" y2="75" stroke="currentColor" strokeWidth="8" />

    {/* Center House Roof */}
    <path d="M85 110 L100 90 L115 110" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    
    {/* House Walls */}
    <line x1="90" y1="110" x2="90" y2="135" stroke="currentColor" strokeWidth="8" />
    <line x1="110" y1="110" x2="110" y2="135" stroke="currentColor" strokeWidth="8" />

    {/* Text */}
    <text x="100" y="165" fontFamily="'Great Vibes', cursive" fontSize="36" fill="currentColor" textAnchor="middle">Construction</text>
  </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 50 50" className={className} fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M21 21h-6v-2h6v2Zm14 0H24v-2h11v2ZM29 26h6v-2h-6v2Zm-14 0h11v-2H15v2ZM21 31h-6v-2h6v2Zm14 0H24v-2h11v2Z"></path>
  </svg>
);

export const ArrowTopIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 12 18" className={className} stroke="currentColor" fill="none" strokeWidth="2">
    <path d="M6 18v-3m0-2V2m0 0L1 7m5-5 5 5"></path>
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);