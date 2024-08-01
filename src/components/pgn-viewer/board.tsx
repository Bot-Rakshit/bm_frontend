import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import EvaluationBar from '../EvaluationBar';
import bb from '../../assets/pieces/bb.png';
import bk from '../../assets/pieces/bk.png';
import bn from '../../assets/pieces/bn.png';
import bp from '../../assets/pieces/bp.png';
import bq from '../../assets/pieces/bq.png';
import br from '../../assets/pieces/br.png';
import wb from '../../assets/pieces/wb.png';
import wk from '../../assets/pieces/wk.png';
import wn from '../../assets/pieces/wn.png';
import wp from '../../assets/pieces/wp.png';
import wq from '../../assets/pieces/wq.png';
import wr from '../../assets/pieces/wr.png';

import moveSound from '../../assets/sounds/move-self.mp3';
import captureSound from '../../assets/sounds/move-capture.mp3';
import castleSound from '../../assets/sounds/move-castle.mp3';
import checkSound from '../../assets/sounds/move-check.mp3';
import promoteSound from '../../assets/sounds/move-promote.mp3'


interface ChessViewerProps {
  pgn: string;
  currentMove: number;
  onMoveChange: (moveIndex: number) => void;
  boardOrientation: 'white' | 'black';
  onFenChange: (fen: string) => void;
  isGameFetched: boolean;
  showMoveTable: boolean;
}

const ChessViewer: React.FC<ChessViewerProps> = ({
  pgn,
  currentMove,
  onMoveChange,
  boardOrientation,
  onFenChange,
  isGameFetched,
}) => {
  const [game, setGame] = useState(new Chess());
  const prevMoveRef = useRef<number>(-1);
  const boardRef = useRef<HTMLDivElement>(null);
  const [boardHeight, setBoardHeight] = useState(0);

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

  const playMoveSound = useCallback((move: string) => {
    let audio: HTMLAudioElement;
    if (move.includes("+") || move.includes("#")) {
      audio = new Audio(checkSound);
    } else if (move.includes("=")) {
      audio = new Audio(promoteSound);
    } else if (move.includes("x")) {
      audio = new Audio(captureSound);
    } else if (move === 'O-O' || move === 'O-O-O') {
      audio = new Audio(castleSound);
    } else {
      audio = new Audio(moveSound);
    }
    audio.play().catch(error => console.error("Error playing sound:", error));
  }, []);

  const updateBoardInfo = useCallback(() => {
    onFenChange(game.fen());
  }, [game, onFenChange]);

  useEffect(() => {
    if (pgn) {
      const newGame = new Chess();
      newGame.loadPgn(pgn);
      const moves = newGame.history();
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setGame(_prevGame => {
        const tempGame = new Chess();
        if (currentMove >= 0 && currentMove < moves.length) {
          for (let i = 0; i <= currentMove; i++) {
            tempGame.move(moves[i]);
          }
          if (currentMove !== prevMoveRef.current) {
            playMoveSound(moves[currentMove]);
            prevMoveRef.current = currentMove;
          }
          return tempGame;
        } else {
          return newGame;
        }
      });

      updateBoardInfo();
    }
  }, [pgn, currentMove, playMoveSound, updateBoardInfo]);

  useEffect(() => {
    const updateBoardHeight = () => {
      if (boardRef.current) {
        setBoardHeight(boardRef.current.clientHeight);
      }
    };

    updateBoardHeight();
    window.addEventListener('resize', updateBoardHeight);
    return () => window.removeEventListener('resize', updateBoardHeight);
  }, []);

  return (
    <div className={`w-full h-full flex`}>
      <div className="w-[4%] mr-2 h-full flex items-center">
        <div className="w-full h-[100%]">
          <EvaluationBar 
            fen={game.fen()} 
            isGameFetched={isGameFetched}
            boardOrientation={boardOrientation}
            boardHeight={boardHeight}  // Pass the boardHeight to EvaluationBar
          />
        </div>
      </div>
      <div className="w-[96%] aspect-square" ref={boardRef}>
        <Chessboard
          position={game.fen()}
          customPieces={customPieces}
          areArrowsAllowed={false}
          showBoardNotation={true}
          isDraggablePiece={() => false}
          customDarkSquareStyle={{ backgroundColor: '#769656' }}
          customLightSquareStyle={{ backgroundColor: '#eeeed2' }}
          boardOrientation={boardOrientation}
          onSquareClick={(square) => {
            const moves = game.history({ verbose: true });
            const clickedMoveIndex = moves.findIndex(move => move.to === square || move.from === square);
            if (clickedMoveIndex !== -1) {
              onMoveChange(clickedMoveIndex);
            }
          }}
        />
      </div>
    </div>
  );
}

export default ChessViewer;