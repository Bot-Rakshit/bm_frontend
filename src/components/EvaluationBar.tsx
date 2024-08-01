import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface EvaluationBarProps {
  fen: string;
  isGameFetched: boolean;
  boardOrientation: 'white' | 'black';
  boardHeight: number;
}

const EvaluationBar: React.FC<EvaluationBarProps> = ({ 
  fen, 
  isGameFetched, 
  boardOrientation,
  boardHeight
}) => {
  const [evaluation, setEvaluation] = useState<number | null>(null);

  const getWhiteHeight = (evalScore: number | null) => {
    if (evalScore === null) return '50%';
    const normalizedEval = Math.max(-8, Math.min(8, evalScore));
    const percentage = ((normalizedEval + 8) / 16) * 100;
    return `${percentage}%`;
  };

  const displayEvaluation = (evalScore: number | null) => {
    if (evalScore === null) return '0.0';
    const absEval = Math.abs(evalScore);
    const sign = evalScore >= 0 ? '+' : '-';
    return `${sign}${absEval.toFixed(1)}`;
  };

  useEffect(() => {
    if (isGameFetched && fen) {
      const fetchEvaluation = async () => {
        try {
          const response = await axios.post('https://chess-api.com/v1', {
            fen: fen,
            depth: 12,
          });
          setEvaluation(response.data.eval !== undefined ? response.data.eval : null);
        } catch (error) {
          console.error('Error fetching evaluation:', error);
        }
      };

      fetchEvaluation();
    }
  }, [fen, isGameFetched]);

  return (
    <div 
      className="relative w-full bg-black overflow-hidden"
      style={{ height: `${boardHeight}px` }}
    >
      <motion.div 
        initial={{ height: getWhiteHeight(0) }}
        animate={{ height: getWhiteHeight(evaluation) }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className={`absolute ${boardOrientation === 'white' ? 'bottom-0' : 'top-0'} left-0 right-0 bg-white`}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="h-px w-full bg-gray-400 opacity-50"
          style={{ transform: 'translateY(-50%)' }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={evaluation}
          className="font-bold text-neon-green transform -rotate-90 whitespace-nowrap text-xs"
          style={{ 
            fontFamily: "'Roboto Mono', monospace",
            textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
          }}
        >
          {displayEvaluation(evaluation)}
        </motion.span>
      </div>
    </div>
  );
};

export default EvaluationBar;