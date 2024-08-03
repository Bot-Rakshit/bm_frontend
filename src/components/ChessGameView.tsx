import React from 'react';
import { Chess } from 'chess.js';
import { motion, AnimatePresence } from 'framer-motion';
import Timer from './pgn-viewer/timer';
import ChessViewer from '@/components/pgn-viewer/board';
import { Button } from '@/components/ui/button';
import { FaTrophy, FaMedal, FaLock, FaArrowLeft, FaArrowRight, FaLink, FaCalendarAlt, FaClock} from 'react-icons/fa';

interface ChessGameViewProps {
  game: Chess;
  boardOrientation: string;
  bmMemberColor: string;
  bmAvatar: string;
  noobAvatar: string;
  getPlayerDisplayName: (player: string) => string;
  currentPgn: string;
  currentMove: string;
  handleMoveSelect: (move: string) => void;
  handleFenChange: (fen: string) => void;
  gameStarted: boolean;
  showMoveTable: boolean;
  getCurrentClockTime: () => string;
  handlePreviousMove: () => void;
  handleNextMove: () => void;
  handleFlipBoard: () => void;
}

const ChessGameView: React.FC<ChessGameViewProps> = ({
  game,
  boardOrientation,
  bmMemberColor,
  bmAvatar,
  noobAvatar,
  getPlayerDisplayName,
  currentPgn,
  currentMove,
  handleMoveSelect,
  handleFenChange,
  gameStarted,
  showMoveTable,
  getCurrentClockTime,
  handlePreviousMove,
  handleNextMove,
  handleFlipBoard,
}) => {
    const history = game?.history(); // Ensure game is defined

  if (!history) {
    console.error('Game history is not defined');
    return <div>Error: Unable to load game history</div>;
  }
  return (

    <motion.div
      className="col-span-1 xl:col-span-2 bg-gray-800/50 p-4 md:p-6 rounded-2xl shadow-2xl border border-neon-green/20"
    >
      <div className="flex flex-col xl:flex-row items-start justify-center gap-4 md:gap-8">
        <div className="w-full">
          <div className="max-w-[95vw] sm:max-w-[80vw] md:max-w-[640px] w-full mx-auto">
            <div className="w-full">
              <div className="relative w-full" style={{ paddingTop: '100%' }}>
                <div className="absolute inset-0 flex flex-col">
                  <div className="h-12 sm:h-14 flex justify-between items-center p-2 bg-gray-700/90 rounded-t-lg">
                    <div className="flex items-center space-x-2">
                      <img
                        src={boardOrientation === 'white' ? (bmMemberColor === 'black' ? bmAvatar : noobAvatar) : (bmMemberColor === 'white' ? bmAvatar : noobAvatar)}
                        alt={getPlayerDisplayName('top')}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-neon-green"
                      />
                      <span className="font-semibold text-white text-xs sm:text-sm md:text-base truncate max-w-[80px] sm:max-w-[120px] md:max-w-[150px]">{getPlayerDisplayName('top')}</span>
                    </div>
                    <div className="bg-gray-800 px-2 py-1 rounded-full text-xs sm:text-sm text-neon-green font-bold">
                      <Timer clockTime={getCurrentClockTime('top')} />
                    </div>
                  </div>
                  <div className="flex-grow relative">
                    <ChessViewer
                      pgn={currentPgn}
                      currentMove={currentMove}
                      onMoveChange={handleMoveSelect}
                      boardOrientation={boardOrientation}
                      onFenChange={handleFenChange}
                      isGameFetched={gameStarted}
                      showMoveTable={showMoveTable}
                    />
                  </div>
                  <div className="h-12 sm:h-14 flex justify-between items-center p-2 bg-gray-700/90 rounded-b-lg">
                    <div className="flex items-center space-x-2">
                      <img
                        src={boardOrientation === 'white' ? (bmMemberColor === 'white' ? bmAvatar : noobAvatar) : (bmMemberColor === 'black' ? bmAvatar : noobAvatar)}
                        alt={getPlayerDisplayName('bottom')}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-neon-green"
                      />
                      <span className="font-semibold text-white text-xs sm:text-sm md:text-base truncate max-w-[80px] sm:max-w-[120px] md:max-w-[150px]">{getPlayerDisplayName('bottom')}</span>
                    </div>
                    <div className="bg-gray-800 px-2 py-1 rounded-full text-xs sm:text-sm text-neon-green font-bold">
                      <Timer clockTime={getCurrentClockTime('bottom')} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-24 sm:mt-6 md:mt-8 flex justify-center items-center space-x-2 sm:space-x-4 relative z-10">
              <Button
                onClick={handlePreviousMove}
                disabled={currentMove === 0}
                className="bg-gray-700 hover:bg-gray-600 text-neon-green font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-full transition-all duration-300 text-sm sm:text-base"
              >
                <FaArrowLeft />
              </Button>
              <Button
                onClick={handleNextMove}
                disabled={currentMove === game.history().length - 1}
                className="bg-gray-700 hover:bg-gray-600 text-neon-green font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-full transition-all duration-300 text-sm sm:text-base"
              >
                <FaArrowRight />
              </Button>
              <Button
                onClick={handleFlipBoard}
                className="bg-gray-700 hover:bg-gray-600 text-neon-green font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-full transition-all duration-300 text-sm sm:text-base"
              >
                Flip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChessGameView;
