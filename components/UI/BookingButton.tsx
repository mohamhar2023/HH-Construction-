import React, { useState, useRef, useEffect } from 'react';

interface BookingButtonProps {
  onClick: () => void;
}

const BookingButton: React.FC<BookingButtonProps> = ({ onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic hover effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * 0.2;
    const y = (e.clientY - centerY) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Book Consultation"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {/* Glow effect behind button */}
      <span
        className={`absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-amber-500 blur-xl transition-all duration-300 ${isHovered ? 'opacity-60 scale-110' : 'opacity-40 scale-100'}`}
      />

      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-full border-2 border-red-500/50 animate-ping" />

      {/* Main button */}
      <span className="relative flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-amber-500 text-white px-8 py-4 rounded-full shadow-2xl transition-all duration-300">
        <span className="font-bold tracking-[2px] text-xs md:text-sm uppercase">Book Consultation</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-5 h-5 transition-all duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      </span>
    </button>
  );
};

export default BookingButton;