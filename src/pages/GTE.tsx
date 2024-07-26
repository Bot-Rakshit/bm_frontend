import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chess } from 'chess.js';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { FaChessKnight, FaTrophy, FaMedal, FaLock, FaArrowLeft, FaArrowRight, FaLink} from 'react-icons/fa';
import Sidebar from '@/components/sidebar/Sidebar';
import ChessViewer from '@/components/board';
import MoveTable from '@/components/movetable';
import { useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Timer from '@/components/timer';

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
  const [, setScore] = useState(0);
  const [currentPgn, setCurrentPgn] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const [whitePlayer, setWhitePlayer] = useState('');
  const [blackPlayer, setBlackPlayer] = useState('');
  const [gameLink, setGameLink] = useState('');

  const handlePreviousMove = useCallback(() => {
    setCurrentMove(prevMove => Math.max(0, prevMove - 1));
  }, []);

  const handleNextMove = useCallback(() => {
    setCurrentMove(prevMove => Math.min(game.history().length - 1, prevMove + 1));
  }, [game]);

  useEffect(() => {
    fetchNewGame();

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token') || localStorage.getItem('token');
    setShowSidebar(!!token);
  }, [location.search]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          handlePreviousMove();
          break;
        case 'ArrowRight':
          handleNextMove();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePreviousMove, handleNextMove]);

  const fetchNewGame = () => {
    const randomGame = sampleGames[Math.floor(Math.random() * sampleGames.length)];
    const newGame = new Chess();
    newGame.loadPgn(randomGame.pgn);
    setGame(newGame);
    setCurrentMove(0);
    setActualElo(randomGame.elo);
    setCurrentPgn(randomGame.pgn);
    setHasGuessed(false);
    setGuessedElo(1500);
    setWhitePlayer('Random Player');
    setBlackPlayer('BM Member');
    setGameLink(`https://lichess.org/game/export/${randomGame.pgn}`);
  };

  const handleMoveSelect = (moveIndex: number) => {
    setCurrentMove(moveIndex);
  };

  const handleGuess = () => {
    setHasGuessed(true);
    const difference = Math.abs(guessedElo - actualElo);
    const points = Math.max(0, 100 - Math.floor(difference / 30));
    setScore(prevScore => prevScore + points);
  };

  const handleNextGame = () => {
    fetchNewGame();
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {showSidebar && <Sidebar />}
      <div className={`flex-1 flex flex-col relative h-full min-h-full overflow-y-auto ${!showSidebar ? 'w-full' : ''}`}>
        <main className="flex-1 p-6 md:p-10 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-blue-500 flex items-center justify-center">
              <FaChessKnight className="mr-4" /> Guess the Elo
            </h1>
            <p className="text-center text-gray-300 mb-8">
              Test your skills by guessing the Elo rating of rapid games played by our community members!
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <motion.div 
                className="lg:col-span-2 bg-gray-800/50 backdrop-filter backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-neon-green/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-lg">{blackPlayer}</span>
                    <Timer initialTime={600} isRunning={currentMove % 2 !== 0} />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start justify-center gap-8">
                  <div className="w-full">
                    <ChessViewer 
                      pgn={currentPgn} 
                      currentMove={currentMove}
                      onMoveChange={handleMoveSelect}
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-lg">{whitePlayer}</span>
                        <Timer initialTime={600} isRunning={currentMove % 2 === 0} />
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-4 space-x-4">
                      <Button 
                        onClick={handlePreviousMove} 
                        disabled={currentMove === 0}
                        className="bg-transparent hover:bg-gray-700 text-neon-green font-bold py-2 px-4 rounded"
                      >
                        <FaArrowLeft />
                      </Button>
                      <Button 
                        onClick={handleNextMove} 
                        disabled={currentMove === game.history().length - 1}
                        className="bg-transparent hover:bg-gray-700 text-neon-green font-bold py-2 px-4 rounded"
                      >
                        <FaArrowRight />
                      </Button>
                    </div>
                  </div>
                  <div className="w-full sm:w-48">
                    <MoveTable 
                      moves={game.history({ verbose: true })} 
                      currentMove={currentMove} 
                      onMoveSelect={handleMoveSelect} 
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gray-800/50 backdrop-filter backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-neon-green/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-neon-green">Guess the Elo</h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-2">
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${whitePlayer}`} />
                      <AvatarFallback>{whitePlayer[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-lg">{hasGuessed ? 'Player 1' : 'Random Player'}</span>
                    <span className="text-sm text-gray-400">(White)</span>
                  </div>
                  <div className="text-4xl font-bold text-neon-green">VS</div>
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-2">
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${blackPlayer}`} />
                      <AvatarFallback>{blackPlayer[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-lg">{hasGuessed ? 'Player 2' : 'BM Member'}</span>
                    <span className="text-sm text-gray-400">(Black)</span>
                  </div>
                </div>
                <div className="mb-4">
                  <Slider
                    value={[guessedElo]}
                    onValueChange={(value) => setGuessedElo(value[0])}
                    min={500}
                    max={3000}
                    step={50}
                    disabled={hasGuessed}
                  />
                  <p className="text-center mt-2">Guessed Elo: {guessedElo}</p>
                </div>
                {hasGuessed && (
                  <div className="mt-4 flex items-center justify-center">
                    <FaLink className="mr-2 text-neon-green" />
                    <a href={gameLink} target="_blank" rel="noopener noreferrer" className="text-neon-green hover:underline">
                      View full game
                    </a>
                  </div>
                )}
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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div 
                className="bg-gray-800/50 backdrop-filter backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-neon-green/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4 flex items-center text-neon-green">
                  <FaTrophy className="mr-3 text-yellow-400" /> Your Score
                </h3>
                <div className="flex items-center justify-center">
                  <FaLock className="text-4xl text-gray-500 mr-4" />
                  <p className="text-xl text-gray-400">Coming Soon</p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gray-800/50 backdrop-filter backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-neon-green/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4 flex items-center text-neon-green">
                  <FaMedal className="mr-3 text-yellow-400" /> Leaderboard
                </h3>
                <div className="flex items-center justify-center">
                  <FaLock className="text-4xl text-gray-500 mr-4" />
                  <p className="text-xl text-gray-400">Coming Soon</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default GuessTheElo;