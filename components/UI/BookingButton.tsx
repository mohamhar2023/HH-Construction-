import React from 'react';

interface BookingButtonProps {
  onClick: () => void;
}

const BookingButton: React.FC<BookingButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-red-500 text-white px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center gap-3 group"
      aria-label="Book Consultation"
    >
      <span className="font-bold tracking-[2px] text-xs md:text-sm uppercase">Book Consultation</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-5 h-5 group-hover:rotate-12 transition-transform"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    </button>
  );
};

export default BookingButton;