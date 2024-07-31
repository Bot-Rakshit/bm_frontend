import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
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
  onBoardHeightChange: (height: number) => void;
}

const ChessViewer: React.FC<ChessViewerProps> = ({
  pgn,
  currentMove,
  onMoveChange,
  boardOrientation,
  onFenChange,
  onBoardHeightChange,
}) => {
  const [game, setGame] = useState(new Chess());
  const boardRef = useRef<HTMLDivElement>(null);
  const prevMoveRef = useRef<number>(-1);

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
    if (boardRef.current) {
      onBoardHeightChange(boardRef.current.clientHeight);
    }
  }, [game, onFenChange, onBoardHeightChange]);

  useEffect(() => {
    if (boardRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (boardRef.current) {
          onBoardHeightChange(boardRef.current.clientHeight);
        }
      });

      resizeObserver.observe(boardRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [onBoardHeightChange]);

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
        if (currentMove !== prevMoveRef.current) {
          playMoveSound(moves[currentMove]);
          prevMoveRef.current = currentMove;
        }
        setGame(tempGame);
      } else {
        setGame(newGame);
      }
      updateBoardInfo();
    }
  }, [pgn, currentMove, updateBoardInfo, playMoveSound]);

  return (
    <div ref={boardRef} className="flex justify-center items-center">
      <div style={{ width: '100%' }}>
        <Chessboard
          position={game.fen()}
          customPieces={customPieces}
          areArrowsAllowed={false}
          showBoardNotation={true}
          isDraggablePiece={() => false}
          customDarkSquareStyle={{ backgroundColor: '#769656', 'width': '100%' }}
          customLightSquareStyle={{ backgroundColor: '#eeeed2', 'width': '100%' }}
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