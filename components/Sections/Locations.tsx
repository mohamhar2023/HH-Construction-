import React from 'react';

const Locations: React.FC = () => {
  return (
    <>
      {/* Intro Text Block */}
      <section className="px-[5%] py-20 bg-[#f5f5f5]">
        <div className="w-full h-px bg-[#ccc] mb-12"></div>
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <span className="block w-[60px] h-[4px] bg-red-500 mb-4"></span>
            <span className="text-2xl font-display text-[#1c1c1c]">Service Area</span>
          </div>
          <div className="md:col-span-9">
            <p className="text-2xl md:text-3xl leading-relaxed text-[#1c1c1c]">
              Proudly serving <strong className="font-semibold text-red-500">London-Middlesex</strong> and expanding to <strong className="font-semibold text-red-500">Kitchener</strong>.
            </p>
            <p className="mt-6 text-gray-600 text-lg">
              Whether you are an investor looking to maximize BRRR returns or a homeowner creating a sanctuary, our in-house teams ensure quality across the region.
            </p>
          </div>
        </div>
      </section>

      {/* Featured CTA Section */}
      <section className="bg-[#1c1c1c] text-[#f5f5f5] py-32 text-center relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
             <path d="M0 100 L100 0 L100 100 Z" fill="#EF4444" />
           </svg>
        </div>

        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-display mb-6">Build Wealth.</h2>
          <p className="text-xl md:text-2xl font-light mb-12 text-gray-300">
            Turn your unfinished basement into <span className="text-red-500 font-semibold">$1,500+/month</span> passive income. 
            <br className="hidden md:block" />
            We handle permits, compliance, and construction.
          </p>
          
          <a 
            href="#" 
            className="inline-block border border-red-500 bg-red-500 text-white px-10 py-4 text-xs tracking-[2px] uppercase transition-all duration-300 hover:bg-transparent hover:text-red-500"
          >
            Get a Free Quote
          </a>
        </div>
      </section>
    </>
  );
};

export default Locations;