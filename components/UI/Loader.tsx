import React, { useEffect, useState } from 'react';

const Loader: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Start fading out after 1.5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#f5f5f5] transition-opacity duration-1000 ease-in-out pointer-events-none ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="text-center text-[#1c1c1c] flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">HH</h1>
        <span className="block text-2xl md:text-4xl font-cursive text-red-500 mt-2">Construction</span>
      </div>
    </div>
  );
};

export default Loader;