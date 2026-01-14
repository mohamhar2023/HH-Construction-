import React from 'react';

const About: React.FC = () => {
  return (
    <section className="px-[5%] pb-20 bg-[#f5f5f5]">
      {/* Divider */}
      <div className="w-full h-px bg-[#ccc] mb-12 relative"></div>

      <div className="grid md:grid-cols-12 gap-12">
        {/* Label Column */}
        <div className="md:col-span-3">
          <span className="block w-[60px] h-[4px] bg-red-500 mb-4"></span>
          <span className="text-2xl font-display text-[#1c1c1c]">Why Us</span>
        </div>

        {/* Content Column */}
        <div className="md:col-span-9">
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-display text-[#1c1c1c] leading-none mb-12">
            Streamlined Management. <br/>
            <span className="italic font-serif text-gray-500">Certified Execution.</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h4 className="text-xl font-bold mb-2">Zero Headaches</h4>
              <p className="text-[#555]">In-house permit specialists manage all applications. We guarantee legal, code-compliant results for your peace of mind.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Real-Time Clarity</h4>
              <p className="text-[#555]">Daily automated updates with photos and progress reports. Real-time trade coordination eliminates delays.</p>
            </div>
          </div>
          
          <div className="ml-auto">
            <a 
              href="#" 
              className="inline-block bg-[#1c1c1c] text-white px-8 py-4 text-xs tracking-[2px] uppercase transition-all duration-300 hover:bg-red-500"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;