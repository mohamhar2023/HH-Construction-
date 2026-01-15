import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isFlexible, setIsFlexible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dates, setDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Generate next 14 days
  useEffect(() => {
    const nextDates = Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i + 1);
      return d;
    });
    setDates(nextDates);
  }, []);

  // Handle visibility animation
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        preferred_date: selectedDate ? selectedDate.toISOString() : null,
        is_flexible: isFlexible,
      };

      console.log('Submitting payload:', payload);

      const { data: dbData, error } = await supabase
        .from('bookings')
        .insert([payload]);

      console.log('Database insert result:', { dbData, error });

      if (error) throw error;

      try {
        const { data: funcData, error: funcError } = await supabase.functions.invoke('handle-booking', {
          body: payload
        });
        if (funcError) console.error('Edge function error:', funcError);
        console.log('Edge function response:', funcData);
      } catch (invokeErr) {
        console.error('Failed to invoke edge function:', invokeErr);
      }

      alert(`Thank you ${formData.name}! We have received your request.`);
      onClose();
      setFormData({ name: '', phone: '', email: '' });
      setSelectedDate(null);
      setIsFlexible(false);

    } catch (error: any) {
      console.error('Error submitting booking:', error);
      alert(`Error: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatDateNum = (date: Date) => {
    return date.getDate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Modal Content with glassmorphism */}
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col transition-all duration-500 ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}
        style={{
          background: 'linear-gradient(135deg, rgba(28, 28, 28, 0.95) 0%, rgba(42, 42, 42, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Decorative gradient corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-500/10 to-transparent rounded-tr-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-bl-2xl pointer-events-none" />

        {/* Header */}
        <div className="p-8 border-b border-white/10 flex justify-between items-center sticky top-0 z-10" style={{ background: 'rgba(28, 28, 28, 0.9)', backdropFilter: 'blur(10px)' }}>
          <div>
            <h2 className="text-2xl md:text-3xl font-display text-white">
              Start Your <span className="text-gradient">Transformation</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Free consultation & estimate
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:rotate-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 relative z-10 text-white">

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within:text-red-400 transition-colors">Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:border-red-500 focus:bg-white/10 focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within:text-red-400 transition-colors">Phone</label>
                <input
                  type="tel"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:border-red-500 focus:bg-white/10 focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2 group">
              <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within:text-red-400 transition-colors">Email</label>
              <input
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:border-red-500 focus:bg-white/10 focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Priority / Flexible Option */}
          <div
            className={`p-6 rounded-xl cursor-pointer transition-all duration-300 flex items-start gap-4 border ${isFlexible ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
            onClick={() => setIsFlexible(!isFlexible)}
          >
            <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${isFlexible ? 'bg-gradient-to-r from-red-500 to-amber-500 border-transparent' : 'border-gray-500'}`}>
              {isFlexible && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div>
              <h4 className={`font-medium transition-colors ${isFlexible ? 'text-gradient' : 'text-white'}`}>Join Priority Standby List</h4>
              <p className="text-sm text-gray-400 mt-1">I'm flexible on the start date—fit me into the next available opening for a faster turnaround.</p>
            </div>
          </div>

          {/* Calendar Selection */}
          <div className={`transition-all duration-300 ${isFlexible ? 'opacity-30 pointer-events-none blur-[2px]' : ''}`}>
            <label className="text-xs uppercase tracking-widest text-gray-500 block mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Select Preferred Start Date
            </label>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {dates.map((date, i) => {
                const isSelected = selectedDate?.toDateString() === date.toDateString();
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-xl text-center transition-all duration-300 hover:scale-105 ${isSelected
                        ? 'bg-gradient-to-br from-red-500 to-amber-500 text-white shadow-lg shadow-red-500/30'
                        : 'bg-white/5 border border-white/10 text-gray-300 hover:border-red-500/50 hover:bg-white/10'
                      }`}
                  >
                    <span className="block text-[10px] uppercase opacity-70">{formatDateDay(date)}</span>
                    <span className="block text-lg font-bold">{formatDateNum(date)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full relative overflow-hidden group py-4 rounded-xl font-bold uppercase tracking-[2px] transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {/* Glow effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-amber-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

            <span className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-white to-gray-100 group-hover:from-red-500 group-hover:to-amber-500 text-black group-hover:text-white py-4 rounded-xl transition-all duration-300">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Confirm Request
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </span>
          </button>

        </form>
      </div>
    </div>
  );
};

export default BookingModal;