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
      className="fixed inset-0 z-50 bg-maroon-900/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fadeIn border border-mehndi-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-maroon-800 to-maroon-900 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-mehndi-500 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <Sparkles className="w-10 h-10 mb-3 text-mehndi-400" />
          <h2 className="text-2xl font-serif relative z-10">📅 Shaadi Ki Tareekh</h2>
          <p className="text-white/50 text-sm mt-1 relative z-10">Tareekh lagayein aur countdown dekhein 🎊</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-maroon-600 mb-2">
              <Calendar className="inline w-4 h-4 mr-2 text-mehndi-500" />
              Shaadi Ki Tareekh Chunein
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border-2 border-maroon-200 rounded-xl focus:ring-2 focus:ring-mehndi-500 focus:border-transparent text-lg text-maroon-800"
            />
          </div>

          {selectedDate && (
            <div className="bg-cream-50 rounded-xl p-6 mb-6 border border-mehndi-200">
              <p className="text-center text-sm text-maroon-500 mb-4">⏰ Aapke Khaas Din Tak</p>
              <CountdownTimer targetDate={selectedDate} />
            </div>
          )}

          {daysLeft !== null && daysLeft > 0 && (
            <div className="bg-mehndi-50 border border-mehndi-200 rounded-xl p-4 mb-6 text-center">
              <p className="text-maroon-700">
                <span className="font-bold text-2xl text-mehndi-600">{daysLeft}</span> din baaqi hain shaadi mein!
                {daysLeft < 30 && ' 🎉 Kitna exciting hai!'}
                {daysLeft > 365 && ' Planning ke liye kaafi waqt hai! 📋'}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            {weddingDate && (
              <button
                onClick={handleClear}
                className="px-6 py-3 border-2 border-maroon-200 text-maroon-500 hover:bg-cream-50 font-semibold rounded-xl transition-all"
              >
                🗑️ Hatayein
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={!selectedDate}
              className="flex-1 py-3 bg-gradient-to-r from-mehndi-500 to-gold-500 hover:from-mehndi-600 hover:to-gold-600 disabled:from-cream-300 disabled:to-cream-400 text-maroon-900 disabled:text-maroon-400 font-bold rounded-xl transition-all shadow-mehndi disabled:shadow-none"
            >
              💖 Tareekh Save Karein
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
