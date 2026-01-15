import React, { useEffect, useRef, useState } from 'react';

const Locations: React.FC = () => {
  const ctaRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Intro Text Block */}
      <section className="px-[5%] py-20 bg-[#f5f5f5] relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(#1c1c1c 1px, transparent 1px), linear-gradient(90deg, #1c1c1c 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-12 relative" />

        <div className="grid md:grid-cols-12 gap-8 relative">
          <div className="md:col-span-3">
            <span className="block w-[60px] h-[4px] bg-gradient-to-r from-red-500 to-amber-500 mb-4" />
            <span className="text-2xl font-display text-[#1c1c1c]">Service Area</span>
          </div>
          <div className="md:col-span-9">
            <p className="text-2xl md:text-3xl leading-relaxed text-[#1c1c1c]">
              Proudly serving{' '}
              <strong className="font-semibold text-gradient">London-Middlesex</strong>
              {' '}and expanding to{' '}
              <strong className="font-semibold text-gradient">Kitchener</strong>.
            </p>
            <p className="mt-6 text-gray-600 text-lg">
              Whether you are an investor looking to maximize BRRR returns or a homeowner creating a sanctuary, our in-house teams ensure quality across the region.
            </p>

            {/* Location badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              {['London', 'Middlesex', 'Kitchener', 'GTA'].map((loc, i) => (
                <span
                  key={loc}
                  className="px-4 py-2 bg-white rounded-full text-sm border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 hover:text-red-500 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-amber-500" />
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured CTA Section */}
      <section
        ref={ctaRef}
        className="bg-[#1c1c1c] text-[#f5f5f5] py-32 text-center relative overflow-hidden"
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 animate-gradient opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.4) 0%, transparent 40%, rgba(212, 175, 55, 0.3) 100%)',
            backgroundSize: '200% 200%'
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-red-500/20 animate-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i}s`
              }}
            />
          ))}
        </div>

        {/* Abstract Background Element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
            <path d="M0 100 L100 0 L100 100 Z" fill="url(#ctaGradient)" />
          </svg>
        </div>

        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h2
            className={`text-4xl md:text-7xl font-display mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Build <span className="text-shimmer">Wealth.</span>
          </h2>
          <p
            className={`text-xl md:text-2xl font-light mb-12 text-gray-300 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Turn your unfinished basement into{' '}
            <span className="text-gradient font-semibold text-2xl md:text-3xl">$1,500+/month</span>
            {' '}passive income.
            <br className="hidden md:block" />
            We handle permits, compliance, and construction.
          </p>

          {/* Glowing CTA Button */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a
              href="#"
              className="group inline-flex items-center gap-3 relative overflow-hidden"
            >
              {/* Glow effect behind button */}
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-amber-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />

              <span className="relative inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-amber-500 text-white px-10 py-5 text-sm tracking-[2px] uppercase transition-all duration-300 rounded-sm font-medium">
                Get a Free Quote
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </a>
          </div>

          {/* Trust indicators */}
          <div className={`flex justify-center items-center gap-8 mt-12 text-gray-500 text-sm transition-all duration-700 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              Fully Licensed
            </span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              5-Star Reviews
            </span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Insured
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Locations;