import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChess, FaRandom, FaExternalLinkAlt, FaDrum, FaBolt, FaCrosshairs, FaChessKnight, FaPuzzlePiece } from 'react-icons/fa';
import { GiDiamonds, GiPartyPopper } from 'react-icons/gi';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { IconType } from 'react-icons';

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

interface StatCardProps {
  title: string;
  value: number;
  icon: IconType;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => (
  <div className="bg-gray-700/50 rounded-xl p-4 flex flex-col items-center justify-center">
    <Icon className="text-3xl text-neon-green mb-2" />
    <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
    <p className="text-2xl font-bold text-neon-green">{value}</p>
  </div>
);

const DiamondGift: React.FC = () => {
  const [player, setPlayer] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revealStage, setRevealStage] = useState(0);
  const [countdown, setCountdown] = useState(3);

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
    setRevealStage(0);
    setCountdown(3);

    try {
      const response = await axios.get<PlayerStats>('https://api.bmsamay.com/api/chess/random-player');
      setPlayer(response.data);
    } catch (error) {
      console.error('Error fetching random player:', error);
      setError('Failed to fetch a random player. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (revealStage === 1 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (revealStage === 1 && countdown === 0) {
      setRevealStage(2);
      triggerConfetti();
    }
  }, [revealStage, countdown, triggerConfetti]);

  const startReveal = () => {
    setRevealStage(1);
  };

  const viewChessProfile = () => {
    if (player) {
      window.open(`https://www.chess.com/member/${player.chessUsername}`, '_blank');
    }
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-y-auto h-screen">
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
            ) : player && revealStage === 2 ? (
              <motion.div
                key={player.chessUsername}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <h2 className="text-4xl font-bold text-white mb-6">Congratulations!</h2>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-8 shadow-lg border border-neon-green/30">
                  <p className="text-3xl font-semibold text-neon-green mb-4">{player.name}</p>
                  <p className="text-xl text-gray-300 mb-6">Chess.com Username: {player.chessUsername}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <StatCard title="Blitz" value={player.ratings.blitz} icon={FaBolt} />
                    <StatCard title="Bullet" value={player.ratings.bullet} icon={FaCrosshairs} />
                    <StatCard title="Rapid" value={player.ratings.rapid} icon={FaChessKnight} />
                    <StatCard title="Puzzle" value={player.ratings.puzzle} icon={FaPuzzlePiece} />
                  </div>
                </div>
                <p className="text-2xl text-white mb-6">You've won a free Diamond Membership!</p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button onClick={viewChessProfile} className="bg-neon-green text-gray-900 font-bold py-3 px-6 rounded-full text-lg hover:bg-white transition-colors duration-300">
                    View Chess.com Profile <FaExternalLinkAlt className="ml-2 inline" />
                  </Button>
                  <Button
                    onClick={fetchRandomPlayer}
                    className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    Pick Another Winner <FaRandom className="ml-2 inline" />
                  </Button>
                </div>
              </motion.div>
            ) : player && revealStage === 1 ? (
              <motion.div
                key="countdown"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="text-center py-20"
              >
                <FaDrum className="text-6xl text-neon-green mx-auto mb-4 animate-bounce" />
                <h2 className="text-4xl font-bold text-white mb-4">Revealing winner in...</h2>
                <p className="text-6xl font-bold text-neon-green">{countdown}</p>
              </motion.div>
            ) : player ? (
              <motion.div
                key="pre-reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <GiPartyPopper className="text-6xl text-neon-green mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl font-bold text-white mb-6">A winner has been selected!</h2>
                <Button
                  onClick={startReveal}
                  className="bg-gradient-to-r from-neon-green to-blue-500 hover:from-neon-green/80 hover:to-blue-500/80 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform transition duration-300 hover:scale-105"
                >
                  Reveal Winner
                </Button>
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
          {!player && (
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
                {loading ? 'Selecting...' : 'Select Lucky Winner'}
              </Button>
            </motion.div>
          )}
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
  );
};

export default DiamondGift;