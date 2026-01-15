import React from 'react';

const VideoShowcase: React.FC = () => {
    return (
        <section className="bg-[#1c1c1c] py-24 border-t border-[#333] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="px-[5%] mb-16 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="h-px w-8 bg-red-500"></span>
                            <span className="text-red-500 uppercase tracking-widest text-xs font-semibold">Media Spotlight</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display text-[#f5f5f5]">Experience the Process</h2>
                    </div>
                    <p className="text-gray-400 text-sm max-w-xs text-left md:text-right">
                        Watch how we transform spaces and create value through our systematic approach.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-[5%] grid md:grid-cols-2 gap-12 md:gap-16 relative z-10">

                {/* Video 1 */}
                <div className="group">
                    <div className="relative">
                        {/* Frame / Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-red-500/40 via-[#333] to-[#1c1c1c] rounded-lg opacity-60 group-hover:opacity-100 blur-[2px] transition-all duration-500"></div>

                        {/* Video Container */}
                        <div className="relative rounded-lg overflow-hidden border border-[#333] bg-black shadow-2xl aspect-video">
                            <video
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                controls
                                preload="metadata"
                                poster="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2662&auto=format&fit=crop"
                            >
                                <source src="/videos/hh-intro-ad.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-start">
                        <div>
                            <h3 className="text-[#f5f5f5] text-xl font-display mb-1 group-hover:text-red-500 transition-colors">The HH Standard</h3>
                            <p className="text-gray-500 text-xs uppercase tracking-wider">System & Precision</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-500 group-hover:border-red-500 group-hover:text-red-500 transition-all">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Video 2 */}
                <div className="group">
                    <div className="relative">
                        {/* Frame / Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-bl from-red-500/40 via-[#333] to-[#1c1c1c] rounded-lg opacity-60 group-hover:opacity-100 blur-[2px] transition-all duration-500"></div>

                        {/* Video Container */}
                        <div className="relative rounded-lg overflow-hidden border border-[#333] bg-black shadow-2xl aspect-video">
                            <video
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                controls
                                preload="metadata"
                                poster="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                            >
                                <source src="/videos/hh-wall-addon.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-start">
                        <div>
                            <h3 className="text-[#f5f5f5] text-xl font-display mb-1 group-hover:text-red-500 transition-colors">Client Transformations</h3>
                            <p className="text-gray-500 text-xs uppercase tracking-wider">Before & After</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-500 group-hover:border-red-500 group-hover:text-red-500 transition-all">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VideoShowcase;