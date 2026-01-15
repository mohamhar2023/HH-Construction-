import React, { useRef, useState, useEffect } from 'react';
import { SERVICE_TIERS } from '../../constants';

interface CarouselProps {
  onBookClick: () => void;
}

const Carousel: React.FC<CarouselProps> = ({ onBookClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [hasNudged, setHasNudged] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Update button visibility based on scroll position
  const updateControls = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeft(scrollLeft > 10);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateControls);
      updateControls();
      window.addEventListener('resize', updateControls);
    }
    return () => {
      if (container) container.removeEventListener('scroll', updateControls);
      window.removeEventListener('resize', updateControls);
    };
  }, []);

  // "The Lure": Initial nudge animation to indicate scrollability
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasNudged && containerRef.current) {
          setHasNudged(true);
          const container = containerRef.current;

          setTimeout(() => {
            container.scrollTo({ left: 120, behavior: 'smooth' });
            setTimeout(() => {
              container.scrollTo({ left: 0, behavior: 'smooth' });
            }, 800);
          }, 600);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [hasNudged]);

  const handleScrollClick = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.75;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  // 3D tilt effect handler
  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 10, y: y * -10 });
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="bg-gradient-to-b from-[#1c1c1c] via-[#252525] to-[#1c1c1c] text-[#f5f5f5] py-20 relative group overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-[15%] w-48 h-48 bg-amber-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="px-[5%] mb-12 flex justify-between items-end relative z-10">
        <div>
          <span className="text-gradient text-sm tracking-widest uppercase font-semibold block mb-2">Offerings</span>
          <h2 className="text-4xl md:text-5xl font-display">
            Service <span className="italic text-gray-400">Tiers</span>
          </h2>
        </div>
        <div className="hidden md:block text-sm text-gray-400 max-w-xs text-right">
          Flexible structures accommodating accelerated or financial slow-pace clients.
        </div>
      </div>

      <div className="relative">
        {/* Left Navigation Button */}
        <button
          onClick={() => handleScrollClick('left')}
          className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 glass text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-red-500/80 ${showLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}
          aria-label="Scroll Left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={() => handleScrollClick('right')}
          className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 glass text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-red-500/80 ${showRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
          aria-label="Scroll Right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div
          ref={containerRef}
          onWheel={handleWheel}
          className="flex overflow-x-auto gap-6 px-[5%] pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {SERVICE_TIERS.map((tier, index) => (
            <div
              key={tier.id}
              onClick={onBookClick}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              className="min-w-[320px] md:min-w-[450px] flex-shrink-0 cursor-pointer relative overflow-hidden snap-center rounded-xl"
              style={{
                transform: hoveredCard === index
                  ? `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg) scale(1.02)`
                  : 'perspective(1000px) rotateY(0) rotateX(0) scale(1)',
                transition: 'transform 0.3s ease'
              }}
            >
              {/* Glassmorphism card background */}
              <div className="absolute inset-0 glass rounded-xl" />

              {/* Card content */}
              <div className="relative">
                {/* Image with parallax */}
                <div className="h-[250px] md:h-[300px] overflow-hidden rounded-t-xl">
                  <img
                    src={tier.imageUrl}
                    alt={tier.name}
                    className="w-full h-full object-cover transition-all duration-700 opacity-80 hover:opacity-100"
                    style={{
                      transform: hoveredCard === index
                        ? `scale(1.1) translate(${mousePos.x * -2}px, ${mousePos.y * 2}px)`
                        : 'scale(1.05)'
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-transparent to-transparent" />
                </div>

                <div className="p-8 relative">
                  {/* Animated price badge */}
                  <div className="absolute top-0 right-0 transform -translate-y-1/2 mr-8">
                    <span className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-4 py-2 uppercase tracking-wider rounded-full shadow-lg shadow-red-500/30 animate-float" style={{ animationDuration: '3s' }}>
                      {tier.priceRange}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display mb-2 group-hover:text-gradient transition-colors">{tier.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed h-[40px]">{tier.description}</p>

                  <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="text-xs text-gray-300 flex items-center">
                        <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-amber-500 rounded-full mr-2 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* CTA with glow */}
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-red-400 group-hover:text-red-300 transition-colors">
                    <span className="border-b border-red-500 pb-1">Book Consultation</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
                style={{
                  boxShadow: hoveredCard === index ? '0 0 40px rgba(239, 68, 68, 0.2), inset 0 0 20px rgba(239, 68, 68, 0.05)' : 'none'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div className="px-[5%] mt-4">
        <div className="h-[2px] bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-500 to-amber-500 w-1/3 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Carousel;