import { useEffect, useState } from 'react';

const PrizeInfo = () => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date();
    target.setUTCHours(24, 0, 0, 0);

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft());
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative group w-full max-w-[368px]">
      <div className="flex flex-col items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-fuchsia-600/20 rounded-2xl backdrop-blur-sm border border-violet-400/30">
        <div className="whitespace-nowrap">
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 via-violet-700 to-fuchsia-700 text-transparent bg-clip-text">
            Rank up to win Telegram Stars everyday
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <span className="text-blue-700">Next reward in</span>
          <div className="flex items-center gap-1">
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-2 py-0.5 rounded font-bold flex items-center w-[2.75rem] justify-center">
              {String(timeLeft.hours).padStart(2, '0')}
              <span className="ml-0.5 opacity-80 text-[10px]">h</span>
            </div>
            <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-2 py-0.5 rounded font-bold flex items-center w-[2.75rem] justify-center">
              {String(timeLeft.minutes).padStart(2, '0')}
              <span className="ml-0.5 opacity-80 text-[10px]">m</span>
            </div>
            <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-2 py-0.5 rounded font-bold flex items-center w-[2.75rem] justify-center">
              {String(timeLeft.seconds).padStart(2, '0')}
              <span className="ml-0.5 opacity-80 text-[10px]">s</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-violet-500/30 to-fuchsia-500/30 blur-2xl -z-10 opacity-25 group-hover:opacity-35 transition-opacity" />
    </div>
  );
};

export default PrizeInfo; 