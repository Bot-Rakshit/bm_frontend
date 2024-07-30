import React from 'react';

interface TimerProps {
  clockTime: string;
}

const Timer: React.FC<TimerProps> = ({ clockTime }) => {
  const formatTime = (timeString: string) => {
    const [minutes, seconds] = timeString.split(':');
    const formattedMinutes = minutes.padStart(2, '0');
    const formattedSeconds = seconds.padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="text-2xl font-bold text-neon-green">
      {formatTime(clockTime)}
    </div>
  );
};

export default Timer;