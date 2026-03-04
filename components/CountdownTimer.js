import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate, className = '' }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.expired) {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-2xl font-serif text-accent-500">🎉 Congratulations! 🎊</p>
        <p className="text-primary-500">Your special day is here! 💖</p>
      </div>
    );
  }

  const TimeUnit = ({ value, label }) => (
    <div className="text-center">
      <div className="relative">
        <div className="bg-white/10 backdrop-blur-sm text-white text-3xl md:text-5xl font-serif font-light rounded-xl px-4 py-3 min-w-[80px] md:min-w-[100px] shadow-luxury border border-white/10">
          {String(value).padStart(2, '0')}
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-1/2 bg-black/5 rounded-b-xl"></div>
      </div>
      <p className="text-[10px] md:text-xs text-white/40 mt-2 uppercase tracking-[0.2em] font-light">{label}</p>
    </div>
  );

  return (
    <div className={`flex gap-3 md:gap-6 justify-center ${className}`}>
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="text-3xl md:text-5xl text-white/20 self-start mt-3 font-light">:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="text-3xl md:text-5xl text-white/20 self-start mt-3 font-light">:</div>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <div className="text-3xl md:text-5xl text-white/20 self-start mt-3 font-light">:</div>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
}
