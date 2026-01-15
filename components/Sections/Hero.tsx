import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section
      className="relative h-screen w-full bg-[#1c1c1c] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-300 ease-out scale-110"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')",
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px) scale(1.1)`
        }}
      />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
      <div
        className="absolute inset-0 z-[2] opacity-60 animate-gradient"
        style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, transparent 40%, rgba(212, 175, 55, 0.2) 100%)',
          backgroundSize: '200% 200%'
        }}
      />

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 right-[15%] w-32 h-32 rounded-full bg-red-500/10 blur-3xl animate-float z-[3]" />
      <div className="absolute bottom-1/3 left-[10%] w-48 h-48 rounded-full bg-amber-500/10 blur-3xl animate-float z-[3]" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-[30%] w-24 h-24 rounded-full bg-red-500/5 blur-2xl animate-float z-[3]" style={{ animationDelay: '2s' }} />

      {/* Decorative Lines */}
      <div className="absolute top-0 left-[20%] w-px h-[30vh] bg-gradient-to-b from-transparent via-red-500/30 to-transparent z-[3]" />
      <div className="absolute top-[20%] right-[25%] w-px h-[40vh] bg-gradient-to-b from-transparent via-amber-500/20 to-transparent z-[3]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-[5%]">
        {/* Main Headline with Staggered Reveal */}
        <h1 className="font-display text-[#f5f5f5] leading-[1.1] text-[10vw] md:text-[8vw] mb-8">
          <span
            className={`block font-semibold transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            Luxury Basement
          </span>
          <span
            className={`block italic text-gradient font-cursive transform -translate-y-2 md:-translate-y-4 transition-all duration-1000 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            style={{
              textShadow: '0 0 40px rgba(239, 68, 68, 0.3)'
            }}
          >
            Transformations
          </span>
        </h1>

        {/* Value Proposition with Enhanced Styling */}
        <div
          className={`text-[#f5f5f5] space-y-2 md:text-xl font-light tracking-wide max-w-2xl border-l-2 border-red-500 pl-6 transition-all duration-1000 ease-out delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="font-medium text-shimmer text-2xl md:text-3xl">$1,500+/month rental income</div>
          <div className="opacity-80 text-base md:text-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Delivered in 8 weeks
          </div>
          <div className="opacity-60 text-sm md:text-base">London-Middlesex | Kitchener | GTA</div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f5f5f5] to-transparent z-[5]" />
    </section>
  );
};

export default Hero;