import React from 'react';
import { Move } from 'chess.js';

interface MoveTableProps {
  moves: Move[];
  currentMove: number;
  onMoveSelect: (index: number) => void;
}

const MoveTable: React.FC<MoveTableProps> = ({ moves, currentMove, onMoveSelect }) => {
  return (
    <div className="overflow-auto h-[480px] bg-gray-800/50 backdrop-filter backdrop-blur-sm rounded-lg p-2">
      <div className="grid grid-cols-2 gap-1">
        {moves.map((move, index) => (
          <div
            key={index}
            className={`cursor-pointer p-2 rounded text-sm ${
              index === currentMove
                ? 'bg-neon-green text-black font-bold'
                : 'text-white hover:bg-gray-700/50'
            }`}
            onClick={() => onMoveSelect(index)}
          >
            {index % 2 === 0 && (
              <span className="text-gray-400 mr-1">{Math.floor(index / 2) + 1}.</span>
            )}
            {move.san}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoveTable;