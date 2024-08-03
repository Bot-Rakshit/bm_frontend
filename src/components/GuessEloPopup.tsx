// GuessEloPopup.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { FaTimes } from 'react-icons/fa'; 

interface GuessEloPopupProps {
  guessedElo: number;
  setGuessedElo: (value: number) => void;
  handleGuess: () => void;
  handleClose: () => void;
  hasGuessed: boolean;
}

const GuessEloPopup: React.FC<GuessEloPopupProps> = ({
  guessedElo,
  setGuessedElo,
  handleGuess,
  handleClose,
  hasGuessed
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-neon-green/20 w-11/12 max-w-md"
      >
        <h2 className="text-2xl font-bold text-neon-green mb-4">Guess the Elo</h2>
        <div className="mb-4">
          <Slider
            value={[guessedElo]}
            onChange={(event, value) => setGuessedElo(value as number)}
            min={100}
            max={3100}
            step={25}
            disabled={hasGuessed}
          />
          <p className="text-center mt-2">Guessed Elo: {guessedElo}</p>
        </div>
        <Button
          onClick={() => {
            handleGuess();
            handleClose();
          }}
          className="w-full py-3 bg-gradient-to-r from-neon-green to-blue-500 text-black font-bold text-lg hover:from-blue-500 hover:to-neon-green transition-all duration-300"
        >
          Submit Guess
        </Button>
        <Button
          onClick={handleClose}
          className="w-full mt-2 py-3 bg-gray-700 text-white font-bold text-lg hover:bg-gray-600 transition-all duration-300"
        >
          Cancel
        </Button>
      </motion.div>
    </div>
  );
};

export default GuessEloPopup;
