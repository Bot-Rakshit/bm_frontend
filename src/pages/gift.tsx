import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChess, FaRandom, FaExternalLinkAlt, FaCrown } from 'react-icons/fa';
import { GiDiamonds } from 'react-icons/gi';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/sidebar';
import axios from 'axios';
import confetti from 'canvas-confetti';

interface PlayerStats {
  name: string;
  chessUsername: string;
  ratings: {
    blitz: number;
    bullet: number;
    rapid: number;
    puzzle: number;
  };
}

const DiamondGift: React.FC = () => {
  const [player, setPlayer] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSidebar] = useState(true);

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF4500'],
    });
  }, []);

  const fetchRandomPlayer = useCallback(async () => {
    setLoading(true);
    setError(null);
    setPlayer(null);
    try {
      const response = await axios.get('https://api.bmsamay.com/api/chess/random-player');
      setPlayer(response.data);
      triggerConfetti();
    } catch (error) {
      console.error('Error fetching random player:', error);
      setError('Failed to fetch a random player. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [triggerConfetti]);

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col relative overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 z-0">
          <div className="absolute inset-0 opacity-10 bg-[url('/chess-pattern.svg')] bg-repeat"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-blue-500"
          >
            Diamond Membership Giveaway
          </motion.h1>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-filter backdrop-blur-sm rounded-3xl p-8 shadow-2xl w-full max-w-2xl border border-gray-700"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center h-64"
                >
                  <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-neon-green"></div>
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-red-400"
                >
                  <p>{error}</p>
                </motion.div>
              ) : player ? (
                <motion.div
                  key={player.chessUsername}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-4">
                    <FaCrown className="text-4xl text-yellow-400 mr-2" />
                    <h2 className="text-3xl font-bold text-neon-green">{player.name}</h2>
                  </div>
                  <a
                    href={`https://chess.com/member/${player.chessUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center justify-center mb-6"
                  >
                    {player.chessUsername}
                    <FaExternalLinkAlt className="ml-2" />
                  </a>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {Object.entries(player.ratings).map(([key, value]) => (
                      <div key={key} className="bg-gray-700/50 rounded-xl p-4 transform hover:scale-105 transition-transform duration-300">
                        <h3 className="text-lg font-semibold mb-2 capitalize text-gray-300">{key}</h3>
                        <p className="text-3xl font-bold text-neon-green">{value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="initial"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="text-2xl mb-6 text-gray-300">
                    Click the button below to select a lucky winner!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <Button
                onClick={fetchRandomPlayer}
                className="bg-gradient-to-r from-neon-green to-blue-500 hover:from-neon-green/80 hover:to-blue-500/80 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform transition duration-300 hover:scale-105 flex items-center"
                disabled={loading}
              >
                <FaRandom className="mr-2" />
                {loading ? 'Selecting...' : player ? 'Pick Another Lucky Winner' : 'Select Lucky Winner'}
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-xl mb-4 text-gray-300">
              The selected player will receive a free Diamond Membership!
            </p>
            <div className="flex items-center justify-center space-x-2">
              <GiDiamonds className="text-3xl text-neon-green" />
              <FaChess className="text-3xl text-blue-500" />
              <GiDiamonds className="text-3xl text-neon-green" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DiamondGift;