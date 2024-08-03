import React, { useState, useEffect, useCallback} from 'react';
import { motion } from 'framer-motion';
import { Chess } from 'chess.js';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { FaTrophy, FaMedal} from 'react-icons/fa';

import Background from '@/components/Background';
import Sidebar from '@/components/sidebar/Sidebar';
import { fetchRandomGame } from '@/services/gamefetcher';
import noobAvatar from '@/assets/noob.jpg';
import bmAvatar from '@/assets/bm.jpg';

import ChessGameView from '../components/ChessGameView';
import GuessTheEloViewer from '@/components/GuessTheEloViewer';
import ComingSoonSection from '@/components/GTEcommingsoon';


const GuessTheElo: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [currentMove, setCurrentMove] = useState(0);
  const [guessedElo, setGuessedElo] = useState(1500);
  const [hasGuessed, setHasGuessed] = useState(false);
  const [actualElo, setActualElo] = useState(0);
  const [currentPgn, setCurrentPgn] = useState('');
  const [whitePlayer, setWhitePlayer] = useState('');
  const [blackPlayer, setBlackPlayer] = useState('');
  const [gameLink, setGameLink] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [bmMemberColor, setBMMemberColor] = useState<'white' | 'black' | null>(null);
  const [clockTimes, setClockTimes] = useState<string[]>([]);
  const [gameResult, setGameResult] = useState<string>('');
  const [showGuessPopup, setShowGuessPopup] = useState(false);
  const [showMoveTable] = useState(false);
  const [gameDate, setGameDate] = useState('');
  const [gameTime, setGameTime] = useState('');
  const [timeControl, setTimeControl] = useState('');
  const [currentClockIndex, setCurrentClockIndex] = useState(0);
  const [gameTermination, setGameTermination] = useState<string>('');
  const [gameStage, setGameStage] = useState<'initial' | 'guessing' | 'revealed'>('initial');
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');
 


  const handleNextGameWithReset = () => {
    handleNextGame();
    setGameStage('guessing');
  };

  const handlePreviousMove = useCallback(() => {
    setCurrentMove(prevMove => {
      const newMove = Math.max(0, prevMove - 1);
      setCurrentClockIndex(Math.max(0, Math.floor((newMove - 1) / 2)));
      return newMove;
    });
  }, []);

  const handleNextMove = useCallback(() => {
    setCurrentMove(prevMove => {
      const newMove = Math.min(game.history().length - 1, prevMove + 1);
      setCurrentClockIndex(Math.min(Math.floor(clockTimes.length / 2) - 1, Math.floor((newMove + 1) / 2)));
      return newMove;
    });
  }, [game, clockTimes]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePreviousMove();
      } else if (event.key === 'ArrowRight') {
        handleNextMove();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePreviousMove, handleNextMove]);


  const fetchNewGame = async () => {
    setIsLoading(true);
    try {
      const randomGame = await fetchRandomGame();
      const newGame = new Chess();
      newGame.loadPgn(randomGame.pgn);
      
      setGame(newGame);
      setCurrentMove(0);
      setCurrentClockIndex(0);
      setActualElo(Math.round((randomGame.whitePlayer.rating + randomGame.blackPlayer.rating) / 2));
      setCurrentPgn(randomGame.pgn);
      setHasGuessed(false);
      setGuessedElo(1500);
      setWhitePlayer(randomGame.whitePlayer.username);
      setBlackPlayer(randomGame.blackPlayer.username);
      setGameLink(randomGame.gameLink);
      const newBmMemberColor = randomGame.whitePlayer.isBMMember ? 'white' : 'black';
      setBMMemberColor(newBmMemberColor);
      setBoardOrientation(newBmMemberColor);
      setGameStarted(true);
      setClockTimes(randomGame.clockTimes);
      
      // Extract additional PGN information
      const header = newGame.header();
      setGameDate(header['Date'] || '');
      setGameTime(header['StartTime'] || '');
      setTimeControl(convertTimeControlToMinutes(header['TimeControl'] || ''));
      setGameResult(header['Result'] || '');
      
      // Extract termination information
      const terminationMatch = randomGame.pgn.match(/Termination\s+"(.+?)"/);
      let terminationMessage = terminationMatch ? terminationMatch[1] : '';

      // Replace usernames with "BM Member" or "Random Player"
      const bmMemberUsername = randomGame.whitePlayer.isBMMember ? randomGame.whitePlayer.username : randomGame.blackPlayer.username;
      const randomPlayerUsername = randomGame.whitePlayer.isBMMember ? randomGame.blackPlayer.username : randomGame.whitePlayer.username;

      terminationMessage = terminationMessage.replace(bmMemberUsername, "BM Member");
      terminationMessage = terminationMessage.replace(randomPlayerUsername, "Random Player");

      setGameTermination(terminationMessage);
    } catch (error) {
      console.error('Error fetching new game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const convertTimeControlToMinutes = (timeControl: string): string => {
    const seconds = parseInt(timeControl);
    if (!isNaN(seconds)) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} min`;
    }
    return timeControl; // Return original if not in seconds format
  };

  const handleMoveSelect = (moveIndex: number) => {
    setCurrentMove(moveIndex);
    setCurrentClockIndex(Math.floor(moveIndex / 2));
  };

  const handleGuess = () => {
    setHasGuessed(true);
    setGameStage('revealed');
  };

  const handleNextGame = () => {
    fetchNewGame();
  };

  const handleStartGuessing = async () => {
    await fetchNewGame();
    setGameStage('guessing');
  };

  const handleOpenGuessPopup = () => {
    setShowGuessPopup(true);
  };

  const handleCloseGuessPopup = () => {
    setShowGuessPopup(false);
  };

  const getCurrentClockTime = (position: 'top' | 'bottom') => {
    const isWhiteBottom = boardOrientation === 'white';
    const index = currentClockIndex * 2 + ((position === 'bottom') === isWhiteBottom ? 0 : 1);
    return clockTimes[index] || '00:00';
  };

  const getPlayerDisplayName = (position: 'top' | 'bottom') => {
    const isBmMemberBottom = boardOrientation === bmMemberColor;
    if (gameStage === 'initial') {
      return position === 'bottom' === isBmMemberBottom ? 'BM Member' : 'Random Noob';
    } else if (gameStage === 'guessing') {
      return position === 'bottom' === isBmMemberBottom ? 'BM Member' : 'Random Player';
    } else {
      return position === 'bottom' === isBmMemberBottom ? 
        (bmMemberColor === 'white' ? whitePlayer : blackPlayer) : 
        (bmMemberColor === 'white' ? blackPlayer : whitePlayer);
    }
  };

  const handleFlipBoard = () => {
    setBoardOrientation(prev => prev === 'white' ? 'black' : 'white');
  };

  const handleFenChange = useCallback((fen: string) => {
    // Use the FEN here if needed, but don't set it as state
    console.log("Current FEN:", fen);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col relative w-full">
        <Background />
        <main className="flex-1 p-4 md:p-6 lg:p-10 z-10 overflow-y-auto">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 md:gap-8 mb-6">
            <ChessGameView
            game={game} // Ensure game is properly passed
            boardOrientation={boardOrientation}
            bmMemberColor={bmMemberColor}
            bmAvatar={bmAvatar}
            noobAvatar={noobAvatar}
            getPlayerDisplayName={getPlayerDisplayName}
            currentPgn={currentPgn}
            currentMove={currentMove}
            handleMoveSelect={handleMoveSelect}
            handleFenChange={handleFenChange}
            gameStarted={gameStarted}
            showMoveTable={showMoveTable}
            getCurrentClockTime={getCurrentClockTime}
            handlePreviousMove={handlePreviousMove}
            handleNextMove={handleNextMove}
            handleFlipBoard={handleFlipBoard}
          />
          <GuessTheEloViewer
          bmAvatar={bmAvatar}
          noobAvatar={noobAvatar}
          bmMemberColor={bmMemberColor}
          whitePlayer={whitePlayer}
          blackPlayer={blackPlayer}
          gameStage={gameStage}
          isLoading={isLoading}
          gameStarted={gameStarted}
          isMobile={isMobile}
          guessedElo={guessedElo}
          setGuessedElo={setGuessedElo}
          hasGuessed={hasGuessed}
          handleStartGuessing={handleStartGuessing}
          handleOpenGuessPopup={handleOpenGuessPopup}
          handleGuess={handleGuess}
          handleNextGameWithReset={handleNextGameWithReset}
          gameDate={gameDate}
          gameTime={gameTime}
          timeControl={timeControl}
          gameResult={gameResult}
          gameTermination={gameTermination}
          gameLink={gameLink}
          actualElo={actualElo}
        />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:col-span-3 mt-8">
            <ComingSoonSection
            title="Your Score"
            icon={<FaTrophy className="mr-3 text-yellow-400" />}
          />
          <ComingSoonSection
            title="Leaderboard"
            icon={<FaMedal className="mr-3 text-yellow-400" />}
          />
            </div>
          </motion.div>
        </main>
      </div>

      {/* Guess Popup for Mobile */}
      {showGuessPopup && (
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
                onValueChange={(value) => setGuessedElo(value[0])}
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
                handleCloseGuessPopup();
              }} 
              className="w-full py-3 bg-gradient-to-r from-neon-green to-blue-500 text-black font-bold text-lg hover:from-blue-500 hover:to-neon-green transition-all duration-300"
            >
              Submit Guess
            </Button>
            <Button 
              onClick={handleCloseGuessPopup}
              className="w-full mt-2 py-3 bg-gray-700 text-white font-bold text-lg hover:bg-gray-600 transition-all duration-300"
            >
              Cancel
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GuessTheElo;