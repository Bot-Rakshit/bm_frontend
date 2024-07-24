import React, { useEffect, useMemo, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

import bb from '../assets/pieces/bb.png';
import bk from '../assets/pieces/bk.png';
import bn from '../assets/pieces/bn.png';
import bp from '../assets/pieces/bp.png';
import bq from '../assets/pieces/bq.png';
import br from '../assets/pieces/br.png';
import wb from '../assets/pieces/wb.png';
import wk from '../assets/pieces/wk.png';
import wn from '../assets/pieces/wn.png';
import wp from '../assets/pieces/wp.png';
import wq from '../assets/pieces/wq.png';
import wr from '../assets/pieces/wr.png';

interface ChessViewerProps {
  pgn: string;
  currentMove: number;
  onMoveChange: (moveIndex: number) => void;
}

const ChessViewer: React.FC<ChessViewerProps> = ({ pgn, currentMove}) => {
  const [game, setGame] = useState(new Chess());

  const customPieces = useMemo(() => {
    const pieceComponents: { [piece: string]: React.FC<{ squareWidth: number }> } = {};
    const pieces = ['wP', 'wN', 'wB', 'wR', 'wQ', 'wK', 'bP', 'bN', 'bB', 'bR', 'bQ', 'bK'];
    const pieceImages = { wp, wn, wb, wr, wq, wk, bp, bn, bb, br, bq, bk };

    pieces.forEach((p) => {
      pieceComponents[p] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(${pieceImages[p.toLowerCase() as keyof typeof pieceImages]})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
      );
    });

    return pieceComponents;
  }, []);

  useEffect(() => {
    const newGame = new Chess();
    if (pgn) {
      newGame.loadPgn(pgn);
      const moves = newGame.history();
      if (currentMove >= 0 && currentMove < moves.length) {
        const tempGame = new Chess();
        for (let i = 0; i <= currentMove; i++) {
          tempGame.move(moves[i]);
        }
        setGame(tempGame);
      } else {
        setGame(newGame);
      }
    }
  }, [pgn, currentMove]);

  return (
    <div className="flex justify-center items-center">
      <div style={{ width: '100%' }}>
        <Chessboard
          position={game.fen()}
          customPieces={customPieces}
          areArrowsAllowed={false}
          showBoardNotation={true}
          isDraggablePiece={() => false}
          customDarkSquareStyle={{ backgroundColor: '#769656' ,'width':'100%'}}
          customLightSquareStyle={{ backgroundColor: '#eeeed2','width':'100%' }}
        />
      </div>
    </div>
  );
}

export default ChessViewer;