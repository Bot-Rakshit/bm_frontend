// GuessTheEloViewer.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaExternalLinkAlt, FaLink } from 'react-icons/fa';
import { Button } from '@/components/ui/button'; 
import { Slider } from '@/components/ui/slider';
// Adjust the import based on your project structure
 // Adjust the import based on your project structure

interface GuessTheEloViewerProps {
  bmAvatar: string;
  noobAvatar: string;
  bmMemberColor: 'white' | 'black';
  whitePlayer: string;
  blackPlayer: string;
  gameStage: 'revealed' | 'hidden';
  isLoading: boolean;
  gameStarted: boolean;
  isMobile: boolean;
  guessedElo: number;
  setGuessedElo: (value: number) => void;
  hasGuessed: boolean;
  handleStartGuessing: () => void;
  handleOpenGuessPopup: () => void;
  handleGuess: () => void;
  handleNextGameWithReset: () => void;
  gameDate: string;
  gameTime: string;
  timeControl: string;
  gameResult: string;
  gameTermination: string | null;
  gameLink: string;
  actualElo: number;
}

const GuessTheEloViewer: React.FC<GuessTheEloViewerProps> = ({
  bmAvatar,
  noobAvatar,
  bmMemberColor,
  whitePlayer,
  blackPlayer,
  gameStage,
  isLoading,
  gameStarted,
  isMobile,
  guessedElo,
  setGuessedElo,
  hasGuessed,
  handleStartGuessing,
  handleOpenGuessPopup,
  handleGuess,
  handleNextGameWithReset,
  gameDate,
  gameTime,
  timeControl,
  gameResult,
  gameTermination,
  gameLink,
  actualElo
}) => {
  return (
    <motion.div 
                className="bg-gray-800/50 p-4 md:p-6 rounded-2xl shadow-2xl border border-neon-green/20 xl:col-span-1"
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col items-center">
                    <img
                      src={bmAvatar}
                      alt="BM Member"
                      className="w-24 h-24 rounded-full mb-2"
                    />
                    <span className="font-semibold text-lg">
                      {gameStage === 'revealed' ? (bmMemberColor === 'white' ? whitePlayer : blackPlayer) : 'BM Member'}
                    </span>
                    <span className="text-sm text-gray-400">{bmMemberColor === 'white' ? 'White' : 'Black'}</span>
                  </div>
                  <div className="text-4xl font-bold text-neon-green">VS</div>
                  <div className="flex flex-col items-center">
                    <img
                      src={noobAvatar}
                      alt="Random Player"
                      className="w-24 h-24 rounded-full mb-2"
                    />
                    <span className="font-semibold text-lg">
                      {gameStage === 'revealed' ? (bmMemberColor === 'white' ? blackPlayer : whitePlayer) : 'Random Player'}
                    </span>
                    <span className="text-sm text-gray-400">{bmMemberColor === 'white' ? 'Black' : 'White'}</span>
                  </div>
                </div>
                {isLoading ? (
                  <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-green"></div>
                  </div>
                ) : !gameStarted ? (
                  <div>
                    <Button
                      onClick={handleStartGuessing}
                      className="w-full py-3 mb-4 bg-gradient-to-r from-neon-green to-blue-500 text-black font-bold text-lg hover:from-blue-500 hover:to-neon-green transition-all duration-300"
                    >
                      Start Guessing
                    </Button>
                    <div className="mt-4 p-4 bg-gray-700 rounded-lg shadow-lg">
                      <h3 className="text-xl font-bold text-neon-green mb-2">What is Guess the Elo?</h3>
                      <p className="text-white">
                        Guess the Elo is a fun game where you try to guess the average Elo rating of two chess players based on their gameplay.  Can you accurately estimate their skill level?
                      </p>
                      </div>
                      <div className="mt-8 p-6 bg-gray-700 rounded-lg shadow-xl">
         <h3 className="text-xl font-bold text-neon-green mb-4">Unlock Your Full Potential!</h3>
         <p className="text-white mb-4">
           Upgrade to Chess.com Diamond Membership to access exclusive features and
           Take your game to the next level today!
         </p>
        
         <motion.a
         href="https://go.chess.com/samay"
         target="_blank"
         rel="noopener noreferrer"
         className="inline-block bg-gradient-to-r from-neon-green to-blue-500 text-black font-bold py-3 px-6 rounded-full text-lg hover:from-white hover:to-gray-200 transition-all duration-300 shadow-lg hover:shadow-neon-green/50"
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
       >
         Get Diamond Membership <FaExternalLinkAlt className="inline ml-2" />
       </motion.a>
         
       
                    </div>
                  </div>
                ) : (
                  <AnimatePresence>
                    {!hasGuessed ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {isMobile ? (
                          <Button 
                            onClick={handleOpenGuessPopup} 
                            className="w-full py-3 bg-gradient-to-r from-neon-green to-blue-500 text-black font-bold text-lg hover:from-blue-500 hover:to-neon-green transition-all duration-300"
                          >
                            Guess Elo
                          </Button>
                        ) : (
                          <>
                            <div className="mb-4">
                              <Slider
                                value={[guessedElo]}
                                onValueChange={(value) => setGuessedElo(value[0])}
                                min={100}
                                max={3100}
                                step={25}
                                disabled={hasGuessed}
                              />
                              <p className="text-center mt-2">Guessed Elo: {guessedElo}</p>
                            </div>
                            <Button 
                              onClick={handleGuess} 
                              className="w-full py-3 bg-gradient-to-r from-neon-green to-blue-500 text-black font-bold text-lg hover:from-blue-500 hover:to-neon-green transition-all duration-300"
                            >
                              Submit Guess
                            </Button>
                          </>
                        )}
                        <div className="mt-4 p-4 bg-gray-700 rounded-lg shadow-lg">
                          <h3 className="text-xl font-bold text-neon-green mb-2">Game Info</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center">
                              <FaCalendarAlt className="text-neon-green mr-3" />
                              <span className="text-white">{gameDate}</span>
                            </div>
                            <div className="flex items-center">
                              <FaClock className="text-neon-green mr-3" />
                              <span className="text-white">{gameTime}</span>
                            </div>
                            <div className="flex items-center">
                              <FaClock className="text-neon-green mr-3" />
                              <span className="text-white">{timeControl}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-center text-gray-300 mt-4">
                          Guess the average Elo rating of the two players in this game. One player is a BM Member, and the other is a random player.
                        </p>
                        <p className="text-center text-neon-green mt-2">
                          Game Result: {gameResult}
                        </p>
                        {gameTermination && (
                          <p className="text-center text-gray-300 mt-1">
                            Termination: {gameTermination}
                          </p>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex flex-col items-center space-y-4">
                          <div className="p-4 bg-gray-700 rounded-lg shadow-lg w-full flex items-center justify-center">
                            <p className="text-2xl font-semibold text-neon-green">
                              Average Elo: {actualElo}
                            </p>
                          </div>
                          <div className="p-4 bg-gray-700 rounded-lg shadow-lg w-full flex items-center justify-center">
                            <p className="text-2xl font-semibold">
                              Difference: <span className="text-yellow-400">{Math.abs(guessedElo - actualElo)}</span>
                            </p>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <p className={`text-xl font-semibold ${Math.abs(guessedElo - actualElo) <= 100 ? 'text-green-500' : 'text-red-500'}`}>
                              {Math.abs(guessedElo - actualElo) <= 100 ? "Great guess!" : "Nice try, but not quite!"}
                            </p>
                            
                            <p className="text-sm text-gray-400">
                              {Math.abs(guessedElo - actualElo) <= 100 ? "You're getting good at this!" : "Keep practicing to improve your guesses!"}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={handleNextGameWithReset}
                          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                        >
                          Next Game
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
                {hasGuessed && (
                  <div className="mt-4 py-4 flex items-center justify-center">
                    <FaLink className="mr-2 text-neon-green" />
                    <a
                      href={gameLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 text-black bg-neon-green rounded hover:bg-green-700 transition duration-300"
                    >
                      View full game
                    </a>
                  </div>
                )}
              </motion.div>
  );
};

export default GuessTheEloViewer;
