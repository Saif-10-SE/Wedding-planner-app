import { useWedding } from '@/context/WeddingContext';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotificationToast() {
  const { notification } = useWedding();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 2800);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!notification || !isVisible) return null;

  const isSuccess = notification.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-luxury-lg backdrop-blur-sm ${
        isSuccess ? 'bg-primary-950 border border-accent-500/20' : 'bg-rose-600'
      } text-white`}>
        {isSuccess ? (
          <CheckCircle className="w-5 h-5 text-accent-400" />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
        <span className="font-medium">{notification.message}</span>
        <button onClick={() => setIsVisible(false)} className="ml-2 hover:opacity-75">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
