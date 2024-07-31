import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface EvaluationBarProps {
  fen: string;
  height: number;
  isGameFetched: boolean;
}

const useResponsiveStyles = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return useMemo(() => {
    let barWidth = '2vw';
    let fontSize = '0.8vw';

    if (windowWidth <= 480) {
      barWidth = '6vw';
      fontSize = '1.5vw';
    } else if (windowWidth <= 768) {
      barWidth = '5vw';
      fontSize = '1.2vw';
    } else if (windowWidth <= 1200) {
      barWidth = '4vw';
      fontSize = '1vw';
    }

    return {
      barStyle: {
        width: barWidth,
        minWidth: '10px',
        maxWidth: '30px',
      },
      textStyle: {
        fontSize: fontSize,
      },
    };
  }, [windowWidth]);
};

const EvaluationBar: React.FC<EvaluationBarProps> = ({ fen, height, isGameFetched }) => {
  const [evaluation, setEvaluation] = useState<number | null>(null);
  const { barStyle, textStyle } = useResponsiveStyles();

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

  const getWhiteHeight = () => {
    if (evaluation === null) return '50%';
    const normalizedEval = Math.max(-8, Math.min(8, evaluation));
    const percentage = ((normalizedEval + 8) / 16) * 100;
    return `${percentage}%`;
  };

  return (
    <div className="relative" style={{ ...barStyle, height: `${height }px`, margin: 0, padding: 0 }}>
      <div className="absolute inset-0 bg-black rounded-lg overflow-hidden">
        <AnimatePresence>
          <motion.div 
            key={evaluation}
            initial={{ height: '50%' }}
            animate={{ height: getWhiteHeight() }}
            exit={{ height: '50%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-b-lg"
          />
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="h-px w-full bg-gray-400 opacity-50"
          style={{ transform: 'translateY(-50%)' }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className="font-bold text-neon-green transform -rotate-90 whitespace-nowrap"
          style={{ 
            ...textStyle,
            fontFamily: "'Roboto Mono', monospace",
            textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
          }}
        >
          {evaluation !== null ? evaluation.toFixed(1) : '0.0'}
        </span>
      </div>
    </div>
  );
};

export default EvaluationBar;