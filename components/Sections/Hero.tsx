import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full bg-[#1c1c1c] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" 
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-[5%]">
        <h1 className="font-display text-[#f5f5f5] leading-[1.1] text-[10vw] md:text-[8vw] mb-8">
          <span className="block font-semibold">Luxury Basement</span>
          <span className="block italic text-red-500 font-cursive transform -translate-y-2 md:-translate-y-4">Transformations</span>
        </h1>
        
        <div className="text-[#f5f5f5] space-y-2 md:text-xl font-light tracking-wide max-w-2xl border-l-2 border-red-500 pl-6">
          <div className="font-medium">$1,500+/month rental income in 8 weeks</div>
          <div className="opacity-80 text-base md:text-lg">London-Middlesex | Kitchener | GTA</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;