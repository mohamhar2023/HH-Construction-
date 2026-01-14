import React from 'react';

const Intro: React.FC = () => {
  return (
    <section className="bg-[#f5f5f5] px-[5%] py-24 md:py-32">
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-12 bg-red-500"></span>
          <span className="text-red-500 uppercase tracking-widest text-sm font-semibold">Our Promise</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-[#1c1c1c] leading-tight mb-8">
          Luxury results. <br/>
          <span className="italic text-gray-500">Accessible investments.</span>
        </h2>
        <p className="text-xl md:text-2xl font-light leading-relaxed text-[#555]">
          We leverage intelligent project management systems to deliver high-end living spaces with <strong className="text-red-500 font-medium">30% faster timelines</strong> than traditional contractors. From legal income suites to home theaters, we handle full compliance so you never deal with city bureaucracy.
        </p>
      </div>
    </section>
  );
};

export default Intro;