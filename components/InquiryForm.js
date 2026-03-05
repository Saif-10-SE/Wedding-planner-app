import { useState } from 'react';
import { Calendar, Users, Mail, Phone, Send, Check } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';

export default function InquiryForm({ venue, onSuccess }) {
  const { showNotification, submitInquiryRecord } = useWedding();
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
    try {
      setIsSubmitting(true);
      const result = await submitInquiryRecord({
        venueSlug: venue?.slug || null,
        venueName: venue?.name || 'General Inquiry',
        ...formData,
      });

      setIsSubmitted(true);
      showNotification(result?.deduplicated ? 'Duplicate inquiry detected - using existing record.' : 'Inquiry sent successfully! 📩 ✅');
      if (onSuccess) onSuccess(formData);
    } catch (error) {
      showNotification(error?.message || 'Unable to send inquiry right now.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return (
      <div className="bg-neutral-50 rounded-2xl p-8 text-center border border-neutral-200/60">
        <div className="w-16 h-16 bg-primary-950 rounded-full flex items-center justify-center mx-auto mb-4 shadow-luxury">
          <Check className="w-8 h-8 text-accent-400" />
        </div>
        <h3 className="text-xl font-serif text-primary-900 mb-2">Inquiry Sent!</h3>
        <p className="text-primary-500 mb-4 font-light">
          Thank you for your interest in {venue?.name || 'this venue'}.
          Our team will contact you within 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            if (onSuccess) onSuccess(formData);
          }}
          className="text-accent-600 hover:text-accent-700 font-medium transition-colors"
        >
          Send Another Inquiry →
        </button>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white text-primary-900 placeholder:text-primary-300 transition-all font-light";
  const iconInputClass = "w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white text-primary-900 placeholder:text-primary-300 transition-all font-light";
  const labelClass = "block text-sm font-medium text-primary-600 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Full Name *</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Email *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@email.com" className={iconInputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Phone *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+92 300 1234567" className={iconInputClass} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Event Date *</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
            <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required className={iconInputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Guest Count *</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
            <input type="number" name="guestCount" value={formData.guestCount} onChange={handleChange} required placeholder="500" min="50" className={iconInputClass} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Event Type</label>
          <select name="eventType" value={formData.eventType} onChange={handleChange} className={inputClass}>
            <option value="Wedding">Wedding</option>
            <option value="Mehndi">Mehndi</option>
            <option value="Walima">Walima</option>
            <option value="Engagement">Engagement</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Preferred Time</label>
          <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className={inputClass}>
            <option value="Morning">Morning (10 AM - 2 PM)</option>
            <option value="Evening">Evening (6 PM - 11 PM)</option>
            <option value="Night">Night (8 PM - 1 AM)</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Additional Details</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your event, special requirements, or questions..."
          className={`${inputClass} resize-none`}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-primary-950 hover:bg-primary-800 disabled:bg-neutral-200 text-white disabled:text-primary-400 font-medium rounded-xl transition-all duration-500 flex items-center justify-center gap-2 shadow-sm disabled:shadow-none"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" /> Send Inquiry
          </>
        )}
      </button>
    </form>
  );
}
