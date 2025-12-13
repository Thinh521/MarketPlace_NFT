import {useEffect, useState} from 'react';

export const useAuctionCountdown = endTime => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const end = endTime * 1000;
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('Ended');
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      let text = '';

      if (days > 0) text = `${days}d ${hours}h ${minutes}m`;
      else if (hours > 0) text = `${hours}h ${minutes}m ${seconds}s`;
      else text = `${minutes}m ${seconds}s`;

      setTimeLeft(text);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return timeLeft;
};
