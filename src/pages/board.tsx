import React, { useEffect, useMemo, useState } from 'react';

import { Chess, Move } from 'chess.js';
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

function ChessViewer() {
  const [game, setGame] = useState(new Chess());
  const [currentMove, setCurrentMove] = useState(0);
  const [moves, setMoves] = useState<Move[]>([]);

  const boardWidth = 800;

  const pieces = [
    'wP',
    'wN',
    'wB',
    'wR',
    'wQ',
    'wK',
    'bP',
    'bN',
    'bB',
    'bR',
    'bQ',
    'bK',
  ];

  const customPieces = useMemo(() => {
    const pieceComponents: {
      [key: string]: React.FC<{ squareWidth: number }>;
    } = {};
    const pieceImages: { [key: string]: string } = {
      wP: wp,
      wN: wn,
      wB: wb,
      wR: wr,
      wQ: wq,
      wK: wk,
      bP: bp,
      bN: bn,
      bB: bb,
      bR: br,
      bQ: bq,
      bK: bk,
    };

    pieces.forEach((piece) => {
      pieceComponents[piece] = ({ squareWidth }: { squareWidth: number }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(${pieceImages[piece]})`,
            backgroundSize: '100%',
          }}
        />
      );
    });
    return pieceComponents;
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const pgn = e.target?.result;
      if (typeof pgn !== 'string') return;
      const newGame = new Chess();
      newGame.loadPgn(pgn);
      setGame(newGame);
      setMoves(newGame.history({ verbose: true }));
      setCurrentMove(0);
    };
    reader.readAsText(file);
  };

  // need to add up and down arrow keys logic
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      setCurrentMove((prev) => Math.max(0, prev - 1));
    } else if (event.key === 'ArrowRight') {
      setCurrentMove((prev) => Math.min(moves.length, prev + 1));
    }
  };

  useEffect(() => {
    const newGame = new Chess();
    for (let i = 0; i < currentMove; i++) {
      newGame.move(moves[i]);
    }
    setGame(newGame);
  }, [currentMove, moves]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moves]);

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <input
        type="file"
        onChange={handleFileUpload}
        accept=".pgn"
        className="mt-10"
      />
      <div style={{ width: `${boardWidth}px`, margin: 'auto' }}>
        <Chessboard
          position={game.fen()}
          boardWidth={boardWidth}
          customDarkSquareStyle={{ backgroundColor: '#769656' }}
          customLightSquareStyle={{ backgroundColor: '#edeed2' }}
          customPieces={customPieces}
        />
      </div>
      <p>
        Current move: {currentMove} / {moves.length}
      </p>
    </div>
  );
}

export default ChessViewer;
