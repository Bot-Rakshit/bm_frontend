import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: number; // in seconds
  isRunning: boolean;
}

const Timer: React.FC<TimerProps> = ({ initialTime, isRunning }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-2xl font-bold text-neon-green">
      {formatTime(time)}
    </div>
  );
};

export default Timer;