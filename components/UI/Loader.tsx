import React, { useEffect, useState } from 'react';

const Loader: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    // Start fading out after 1.5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ease-in-out pointer-events-none ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 50%, #f5f5f5 100%)'
      }}
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #EF4444 0%, transparent 70%)',
            transform: `scale(${1 + progress / 100})`
          }}
        />
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
            transform: `scale(${1 + progress / 100})`
          }}
        />
      </div>

      <div className="text-center text-[#1c1c1c] flex flex-col items-center relative z-10">
        {/* Logo with scale animation */}
        <div
          className="transition-transform duration-500"
          style={{ transform: `scale(${0.8 + progress / 500})` }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
            <span className="text-gradient">HH</span>
          </h1>
          <span className="block text-3xl md:text-5xl font-cursive text-gradient mt-2">
            Construction
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-48 h-[2px] bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <p className="mt-4 text-xs text-gray-400 uppercase tracking-widest">
          Loading Experience
        </p>
      </div>
    </div>
  );
};

export default Loader;