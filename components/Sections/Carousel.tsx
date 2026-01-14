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

  // Update button visibility based on scroll position
  const updateControls = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      // Show left if we've scrolled a bit
      setShowLeft(scrollLeft > 10);
      // Show right if we haven't reached the end (with a small buffer)
      setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateControls);
      updateControls(); // Initial check
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
          
          // Wait a moment after appearing, then nudge
          setTimeout(() => {
            // Scroll right
            container.scrollTo({ left: 120, behavior: 'smooth' });
            
            // Scroll back
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

  // Convert vertical mouse wheel to horizontal scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section className="bg-[#1c1c1c] text-[#f5f5f5] py-20 relative group">
      <div className="px-[5%] mb-12 flex justify-between items-end">
        <div>
           <span className="text-red-500 text-sm tracking-widest uppercase font-semibold block mb-2">Offerings</span>
           <h2 className="text-4xl md:text-5xl font-display">Service Tiers</h2>
        </div>
        <div className="hidden md:block text-sm text-gray-400 max-w-xs text-right">
          Flexible structures accommodating accelerated or financial slow-pace clients.
        </div>
      </div>

      <div className="relative">
        {/* Left Navigation Button */}
        <button 
          onClick={() => handleScrollClick('left')}
          className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-red-600/90 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-red-500 ${showLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}
          aria-label="Scroll Left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Right Navigation Button */}
        <button 
          onClick={() => handleScrollClick('right')}
          className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-red-600/90 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-red-500 ${showRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
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
          {SERVICE_TIERS.map((tier) => (
            <div 
              key={tier.id} 
              onClick={onBookClick}
              className="min-w-[320px] md:min-w-[450px] flex-shrink-0 group cursor-pointer relative bg-[#2a2a2a] overflow-hidden snap-center"
            >
              <div className="h-[250px] md:h-[300px] overflow-hidden">
                <img 
                  src={tier.imageUrl} 
                  alt={tier.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>
              
              <div className="p-8 relative">
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 transform -translate-y-1/2 mr-8 uppercase tracking-wider">
                  {tier.priceRange}
                </div>
                
                <h3 className="text-2xl font-display mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed h-[40px]">{tier.description}</p>
                
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="text-xs text-gray-300 flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <span className="inline-block text-xs uppercase tracking-widest border-b border-red-500 pb-1 group-hover:text-red-500 transition-colors">
                  Book Consultation
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;