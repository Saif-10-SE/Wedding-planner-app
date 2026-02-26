import { useState } from 'react';
import { Calendar, Users, Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';

export default function InquiryForm({ venue, onSuccess }) {
  const { showNotification } = useWedding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    eventType: 'Wedding',
    message: '',
    preferredTime: 'Morning'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    showNotification('Inquiry bhej di gayi! 📩 ✅');
    if (onSuccess) onSuccess(formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return (
      <div className="bg-cream-50 rounded-2xl p-8 text-center border border-mehndi-200">
        <div className="w-16 h-16 bg-gradient-to-r from-mehndi-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-mehndi">
          <Check className="w-8 h-8 text-maroon-900" />
        </div>
        <h3 className="text-xl font-serif text-maroon-800 mb-2">📩 Inquiry Bhej Di Gayi!</h3>
        <p className="text-maroon-500 mb-4">
          {venue?.name || 'is venue'} mein aapki dilchaspi ka shukriya.
          Hamari team 24 ghante mein aapse raabta karegi 🤝
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-mehndi-600 hover:text-mehndi-700 font-medium"
        >
          Aik Aur Inquiry Bhejein →
        </button>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 border border-maroon-200 rounded-xl focus:ring-2 focus:ring-mehndi-500 focus:border-transparent bg-white text-maroon-800 placeholder:text-maroon-300";
  const iconInputClass = "w-full pl-11 pr-4 py-3 border border-maroon-200 rounded-xl focus:ring-2 focus:ring-mehndi-500 focus:border-transparent bg-white text-maroon-800 placeholder:text-maroon-300";
  const labelClass = "block text-sm font-medium text-maroon-600 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>👤 Poora Naam *</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Apna naam likhein" className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>📧 Email *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon-300" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@email.com" className={iconInputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>📞 Phone *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon-300" />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+92 300 1234567" className={iconInputClass} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>📅 Taqreeb Ki Tareekh *</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon-300" />
            <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required className={iconInputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>👥 Mehmaan *</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon-300" />
            <input type="number" name="guestCount" value={formData.guestCount} onChange={handleChange} required placeholder="500" min="50" className={iconInputClass} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>🎊 Taqreeb Ki Qism</label>
          <select name="eventType" value={formData.eventType} onChange={handleChange} className={inputClass}>
            <option value="Wedding">💒 Shaadi</option>
            <option value="Mehndi">🟡 Mehndi</option>
            <option value="Walima">🍽️ Walima</option>
            <option value="Engagement">💍 Engagement</option>
            <option value="Other">✨ Kuch Aur</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>🕐 Pasandeedah Waqt</label>
          <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className={inputClass}>
            <option value="Morning">☀️ Subah (10 AM - 2 PM)</option>
            <option value="Evening">🌆 Shaam (6 PM - 11 PM)</option>
            <option value="Night">🌙 Raat (8 PM - 1 AM)</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>📝 Mazeed Tafseelat</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Apni taqreeb ke baare mein bataein, khaas zarooratein, ya sawaalat..."
          className={`${inputClass} resize-none`}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-mehndi-500 to-gold-500 hover:from-mehndi-600 hover:to-gold-600 disabled:from-cream-300 disabled:to-cream-400 text-maroon-900 disabled:text-maroon-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-mehndi disabled:shadow-none"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-maroon-400 border-t-transparent rounded-full animate-spin"></div>
            Bhej rahe hain...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" /> 📩 Inquiry Bhejein
          </>
        )}
      </button>
    </form>
  );
}
