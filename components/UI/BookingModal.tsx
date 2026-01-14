import React, { useState, useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isFlexible, setIsFlexible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dates, setDates] = useState<Date[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Generate next 14 days
  useEffect(() => {
    const nextDates = Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i + 1); // Start tomorrow
      return d;
    });
    setDates(nextDates);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We have received your request for ${selectedDate?.toDateString() || 'flexible dates'}.`);
    onClose();
  };

  const formatDateDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatDateNum = (date: Date) => {
    return date.getDate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#1c1c1c] text-[#f5f5f5] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl border border-gray-800 flex flex-col">
        
        {/* Header */}
        <div className="p-8 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-[#1c1c1c] z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-display">Start Your Transformation</h2>
            <p className="text-gray-400 text-sm mt-1">Free consultation & estimate.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-transparent border-b border-gray-700 py-2 focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">Phone</label>
                <input 
                  type="tel" 
                  required
                  className="w-full bg-transparent border-b border-gray-700 py-2 focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500">Email</label>
              <input 
                type="email" 
                required
                className="w-full bg-transparent border-b border-gray-700 py-2 focus:border-red-500 focus:outline-none transition-colors"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Priority / Flexible Option */}
          <div 
            className={`p-6 border rounded-lg cursor-pointer transition-all duration-300 flex items-start gap-4 ${isFlexible ? 'border-red-500 bg-red-500/10' : 'border-gray-700 hover:border-gray-500'}`}
            onClick={() => setIsFlexible(!isFlexible)}
          >
            <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center shrink-0 ${isFlexible ? 'bg-red-500 border-red-500' : 'border-gray-500'}`}>
              {isFlexible && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-white">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div>
              <h4 className={`font-medium ${isFlexible ? 'text-red-500' : 'text-white'}`}>Join Priority Standby List</h4>
              <p className="text-sm text-gray-400 mt-1">I'm flexible on the start date—fit me into the next available opening for a faster turnaround.</p>
            </div>
          </div>

          {/* Calendar Selection */}
          <div className={isFlexible ? 'opacity-50 pointer-events-none filter blur-[1px] transition-all' : 'transition-all'}>
            <label className="text-xs uppercase tracking-widest text-gray-500 block mb-4">Select Preferred Start Date (2 Weeks Out)</label>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {dates.map((date, i) => {
                const isSelected = selectedDate?.toDateString() === date.toDateString();
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded text-center border transition-all hover:border-gray-500 ${isSelected ? 'bg-red-500 border-red-500 text-white' : 'border-gray-800 bg-[#2a2a2a] text-gray-300'}`}
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
            className="w-full bg-white text-black font-bold uppercase tracking-[2px] py-4 hover:bg-red-500 hover:text-white transition-colors duration-300"
          >
            Confirm Request
          </button>

        </form>
      </div>
    </div>
  );
};

export default BookingModal;