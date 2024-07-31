import React from 'react';

interface TimerProps {
  clockTime: string;
}

const Timer: React.FC<TimerProps> = ({ clockTime }) => {
  return (
    <div className="text-2xl font-bold text-neon-green">
      {clockTime}
    </div>
  );
};

export default Timer;