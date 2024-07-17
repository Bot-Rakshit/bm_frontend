/*import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { FaChessKnight, FaTrophy, FaMedal, FaChevronLeft, FaChevronRight, FaStepBackward, FaStepForward } from 'react-icons/fa';
import Sidebar from '@/components/sidebar';

// Sample PGNs with corresponding Elo ratings
const sampleGames = [
  {
    pgn: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7',
    elo: 1850
  },
  {
    pgn: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Bd3 d5 6. Nf3 c5 7. O-O Nc6 8. a3 Bxc3 9. bxc3 dxc4 10. Bxc4 Qc7',
    elo: 2100
  },
  {
    pgn: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e6 7. f3 b5 8. Qd2 Nbd7 9. g4 h6 10. O-O-O Bb7',
    elo: 1650
  }
];

const GuessTheElo: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [currentMove, setCurrentMove] = useState(0);
  const [guessedElo, setGuessedElo] = useState(1500);
  const [hasGuessed, setHasGuessed] = useState(false);
  const [actualElo, setActualElo] = useState(0);
  const [score, setScore] = useState(0);
  const [gameHistory, setGameHistory] = useState<string[]>([]);
  const [currentPosition, setCurrentPosition] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetchNewGame();
  }, []);

  const fetchNewGame = () => {
    const randomGame = sampleGames[Math.floor(Math.random() * sampleGames.length)];
    const newGame = new Chess();
    newGame.loadPgn(randomGame.pgn);
    setGame(newGame);
    setGameHistory(newGame.history());
    setCurrentMove(0);
    setCurrentPosition(newGame.fen());
    setActualElo(randomGame.elo);
  };

  const goToMove = (moveIndex: number) => {
    if (moveIndex < 0 || moveIndex > gameHistory.length) return;

    const newGame = new Chess();
    newGame.loadPgn(game.pgn());
    for (let i = 0; i < moveIndex; i++) {
      newGame.move(gameHistory[i]);
    }
    setGame(newGame);
    setCurrentMove(moveIndex);
    setCurrentPosition(newGame.fen());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToMove(currentMove - 1);
    } else if (e.key === 'ArrowRight') {
      goToMove(currentMove + 1);
    }
  };

  const handleGuess = () => {
    setHasGuessed(true);
    const difference = Math.abs(guessedElo - actualElo);
    const points = Math.max(0, 100 - Math.floor(difference / 30));
    setScore(prevScore => prevScore + points);
  };

  const handleNextGame = () => {
    setHasGuessed(false);
    setGuessedElo(1500);
    fetchNewGame();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className={`flex-1 p-8 overflow-auto transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-blue-500 flex items-center justify-center">
            <FaChessKnight className="mr-4" /> Guess the Elo
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2 bg-gray-800/50 backdrop-filter backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-neon-green/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <div className="flex flex-col gap-8">
                <div className="flex-1 flex justify-center">
                  <Chessboard
                    position={currentPosition}
                    width={400}
                    draggable={false}
                    boardStyle={{
                      borderRadius: '0.5rem',
                      boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
                    }}
                  />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Button 
                    onClick={() => goToMove(currentMove - 1)} 
                    disabled={currentMove === 0}
                    className="bg-gray-700 hover:bg-gray-600"
                  >
                    <FaChevronLeft className="mr-2" /> Prev
                  </Button>
                  <Button 
                    onClick={() => goToMove(currentMove + 1)} 
                    disabled={currentMove === gameHistory.length}
                    className="bg-gray-700 hover:bg-gray-600"
                  >
                    Next <FaChevronRight className="ml-2" />
                  </Button>
                </div>
                <div className="flex-1 bg-gray-700/50 p-4 rounded-xl max-h-80 overflow-y-auto">
                  <h3 className="text-xl font-semibold mb-4 text-neon-green">Move History</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {gameHistory.map((move, index) => (
                      <motion.button
                        key={index}
                        className={`p-2 rounded ${currentMove === index + 1 ? 'bg-neon-green text-black' : 'bg-gray-600 hover:bg-gray-500'}`}
                        onClick={() => goToMove(index + 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {index % 2 === 0 ? `${Math.floor(index / 2) + 1}.` : ''} {move}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-8">
              <motion.div 
                className="bg-gray-800/50 backdrop-filter backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-neon-green/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl font-semibold mb-6 text-neon-green">Your Guess</h2>
                <Slider
                  min={100}
                  max={3100}
                  step={50}
                  value={[guessedElo]}
                  onValueChange={(value) => setGuessedElo(value[0])}
                  disabled={hasGuessed}
                  className="mb-4"
                />
                <p className="text-center text-2xl font-bold text-neon-green mb-6">{guessedElo}</p>
                <AnimatePresence>
                  {!hasGuessed ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button 
                        onClick={handleGuess} 
                        className="w-full py-3 bg-gradient-to-r from-neon-green to-blue-500 text-black font-bold text-lg hover:from-blue-500 hover:to-neon-green transition-all duration-300"
                      >
                        Submit Guess
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <p className="text-2xl font-semibold">Actual Elo: <span className="text-neon-green">{actualElo}</span></p>
                      <p className="text-xl">
                        Difference: <span className="text-yellow-400">{Math.abs(guessedElo - actualElo)}</span>
                      </p>
                      <Button 
                        onClick={handleNextGame} 
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                      >
                        Next Game
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                className="bg-gray-800/50 backdrop-filter backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-neon-green/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4 flex items-center text-neon-green">
                  <FaTrophy className="mr-3 text-yellow-400" /> Your Score
                </h3>
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-blue-500">
                  {score}
                </p>
              </motion.div>

              <motion.div 
                className="bg-gray-800/50 backdrop-filter backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-neon-green/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4 flex items-center text-neon-green">
                  <FaMedal className="mr-3 text-yellow-400" /> Leaderboard
                </h3>
                <p className="text-gray-400">Leaderboard coming soon...</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GuessTheElo; */