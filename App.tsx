import React, { useState } from 'react';
import Loader from './components/UI/Loader';
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import Intro from './components/Sections/Intro';
import About from './components/Sections/About';
import Carousel from './components/Sections/Carousel';
import VideoShowcase from './components/Sections/VideoShowcase';
import Locations from './components/Sections/Locations';
import Footer from './components/Layout/Footer';
import BookingButton from './components/UI/BookingButton';
import BookingModal from './components/UI/BookingModal';
import VoiceAssistant from './components/UI/VoiceAssistant';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="font-body bg-[#ece8e8] min-h-screen antialiased selection:bg-[#1c1c1c] selection:text-[#ece8e8]">
      <Loader />
      <Header />
      
      <main>
        <Hero />
        <Intro />
        <About />
        <Carousel onBookClick={() => setIsModalOpen(true)} />
        <VideoShowcase />
        <Locations />
      </main>
      
      <Footer />

      {/* Booking CTA */}
      <BookingButton onClick={() => setIsModalOpen(true)} />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Voice Assistant */}
      <VoiceAssistant onOpenBooking={() => setIsModalOpen(true)} />
    </div>
  );
};

export default App;