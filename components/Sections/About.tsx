import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: 'Zero Headaches',
      description: 'In-house permit specialists manage all applications. We guarantee legal, code-compliant results for your peace of mind.',
      icon: '🏛️'
    },
    {
      title: 'Real-Time Clarity',
      description: 'Daily automated updates with photos and progress reports. Real-time trade coordination eliminates delays.',
      icon: '📊'
    }
  ];

  return (
    <section ref={sectionRef} className="px-[5%] pb-20 bg-[#f5f5f5] relative overflow-hidden">
      {/* Animated Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-12 relative">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-1000"
          style={{ width: isVisible ? '100%' : '0%' }}
        />
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        {/* Label Column */}
        <div
          className={`md:col-span-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
        >
          <span
            className="block h-[4px] bg-gradient-to-r from-red-500 to-amber-500 mb-4 transition-all duration-700"
            style={{ width: isVisible ? '60px' : '0px' }}
          />
          <span className="text-2xl font-display text-[#1c1c1c]">Why Us</span>
        </div>

        {/* Content Column */}
        <div className="md:col-span-9">
          {/* Main Headline */}
          <h3
            className={`text-3xl md:text-5xl lg:text-6xl font-display text-[#1c1c1c] leading-none mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Streamlined Management. <br />
            <span className="italic font-serif text-gray-500 relative inline-block">
              Certified Execution.
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-red-500/30 to-transparent" />
            </span>
          </h3>

          {/* Feature Cards with Hover Effects */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group p-8 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-500 cursor-default hover-lift ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                {/* Icon with glow */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{feature.icon}</span>
                  <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 rounded-xl transition-colors duration-300" />
                </div>

                <h4 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-[#555] leading-relaxed">{feature.description}</p>

                {/* Hover indicator line */}
                <div className="mt-4 h-[2px] bg-gradient-to-r from-red-500 to-amber-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>

          {/* CTA Button with Glow */}
          <div
            className={`ml-auto transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <a
              href="#"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#1c1c1c] to-[#2a2a2a] text-white px-8 py-4 text-xs tracking-[2px] uppercase transition-all duration-300 hover:from-red-500 hover:to-red-600 hover:shadow-lg hover:shadow-red-500/25 rounded-sm"
            >
              <span>Start Your Project</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-br from-red-500/5 to-amber-500/5 rounded-full blur-3xl" />
    </section>
  );
};

export default About;