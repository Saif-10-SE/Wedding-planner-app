import { useWedding } from '@/context/WeddingContext';
import { useState } from 'react';
import { Calendar, X, Sparkles } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

export default function WeddingDateModal({ isOpen, onClose }) {
  const { weddingDate, setWeddingDate, getDaysUntilWedding } = useWedding();
  const [selectedDate, setSelectedDate] = useState(
    weddingDate ? new Date(weddingDate).toISOString().split('T')[0] : ''
  );

  if (!isOpen) return null;

  const handleSave = () => {
    if (selectedDate) {
      setWeddingDate(new Date(selectedDate));
      onClose();
    }
  };

  const handleClear = () => {
    setWeddingDate(null);
    setSelectedDate('');
  };

  const daysLeft = getDaysUntilWedding();

  return (
    <div
      className="fixed inset-0 z-50 bg-primary-950/60 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-luxury-xl overflow-hidden animate-fadeIn border border-neutral-200/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-primary-950 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-500 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <Sparkles className="w-10 h-10 mb-3 text-accent-400" />
          <h2 className="text-2xl font-serif relative z-10">Wedding Date</h2>
          <p className="text-white/40 text-sm mt-1 relative z-10 font-light">Set your date and watch the countdown</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-primary-600 mb-2">
              <Calendar className="inline w-4 h-4 mr-2 text-accent-500" />
              Select Your Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent text-lg text-primary-900 transition-all"
            />
          </div>

          {selectedDate && (
            <div className="bg-neutral-50 rounded-xl p-6 mb-6 border border-neutral-200/60">
              <p className="text-center text-sm text-primary-400 mb-4 font-light">Countdown to Your Day</p>
              <CountdownTimer targetDate={selectedDate} />
            </div>
          )}

          {daysLeft !== null && daysLeft > 0 && (
            <div className="bg-accent-50 border border-accent-200 rounded-xl p-4 mb-6 text-center">
              <p className="text-primary-700">
                <span className="font-serif font-semibold text-2xl text-accent-600">{daysLeft}</span> days until your wedding!
                {daysLeft < 30 && ' 🎉 How exciting!'}
                {daysLeft > 365 && ' Plenty of time to plan! 📋'}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            {weddingDate && (
              <button
                onClick={handleClear}
                className="px-6 py-3 border border-neutral-300 text-primary-500 hover:bg-neutral-50 font-medium rounded-xl transition-all duration-500"
              >
                Clear
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={!selectedDate}
              className="flex-1 py-3 bg-primary-950 hover:bg-primary-800 disabled:bg-neutral-200 text-white disabled:text-primary-400 font-medium rounded-xl transition-all duration-500 shadow-sm disabled:shadow-none"
            >
              Save Date
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
