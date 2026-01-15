import React, { useEffect, useRef, useState } from 'react';

const Intro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate the percentage counter
          let current = 0;
          const target = 30;
          const increment = target / 40;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 50);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f5f5f5] px-[5%] py-24 md:py-32 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #1c1c1c 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-4xl relative">
        {/* Animated Label */}
        <div
          className={`flex items-center gap-4 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
        >
          <span
            className="h-[3px] bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-700"
            style={{ width: isVisible ? '48px' : '0px' }}
          />
          <span className="text-red-500 uppercase tracking-widest text-sm font-semibold">Our Promise</span>
        </div>

        {/* Main Headline with Staggered Reveal */}
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-display text-[#1c1c1c] leading-tight mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Luxury results. <br />
          <span className="italic text-gray-500 relative">
            Accessible investments.
            {/* Underline accent */}
            <span
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-500/50 to-transparent transition-all duration-1000 delay-500"
              style={{ width: isVisible ? '100%' : '0%' }}
            />
          </span>
        </h2>

        {/* Description with Animated Counter */}
        <p
          className={`text-xl md:text-2xl font-light leading-relaxed text-[#555] transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          We leverage intelligent project management systems to deliver high-end living spaces with{' '}
          <strong className="text-gradient font-semibold relative inline-flex items-center gap-1">
            <span className="text-3xl md:text-4xl">{count}%</span>
            <span className="text-base">faster timelines</span>
            {/* Glow effect */}
            <span className="absolute -inset-2 bg-red-500/10 blur-xl rounded-full -z-10" />
          </strong>
          {' '}than traditional contractors. From legal income suites to home theaters, we handle full compliance so you never deal with city bureaucracy.
        </p>

        {/* Feature Pills */}
        <div
          className={`flex flex-wrap gap-3 mt-8 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {['Permit Specialists', '8-Week Delivery', 'Code Compliant', 'Full Warranty'].map((item, i) => (
            <span
              key={item}
              className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 hover:text-red-500 transition-all duration-300 cursor-default"
              style={{ transitionDelay: `${600 + i * 100}ms` }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M100 0 L100 100 L0 100 Z" fill="url(#gradient1)" />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Intro;