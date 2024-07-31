import axios from 'axios';
import { Chess } from 'chess.js';
import { PGNClockStripper } from './getclock';

interface Player {
  username: string;
  rating: number;
  isBMMember: boolean;
}

interface Game {
  pgn: string;
  elo: number;
  whitePlayer: Player;
  blackPlayer: Player;
  gameLink: string;
  result: string;
  clockTimes: string[];
}

interface ChessComGame {
  rules: string;
  time_class: string;
  pgn: string;
  white: {
    username: string;
    rating: number;
  };
  black: {
    username: string;
    rating: number;
  };
  url: string;
  result: string;
}

const API_BASE_URL = 'https://api.bmsamay.com/api/chess';

export async function fetchRandomGame(): Promise<Game> {
  try {
    const playerResponse = await axios.get(`${API_BASE_URL}/random-player`);
    const { chessUsername, ratings } = playerResponse.data;

    if (ratings.rapid < 10) {
      throw new Error('Player does not have enough rapid games');
    }

    const archivesResponse = await axios.get(`https://api.chess.com/pub/player/${chessUsername}/games/archives`);
    const archives = archivesResponse.data.archives;

    const validArchives = archives.filter((url: string) => 
      url.includes('2022') || url.includes('2023') || url.includes('2024')
    );

    if (validArchives.length === 0) {
      throw new Error('No games found from 2022, 2023, or 2024');
    }

    let randomGame: ChessComGame;
    let chess: Chess;

    do {
      const randomArchive = validArchives[Math.floor(Math.random() * validArchives.length)];
      const gamesResponse = await axios.get(randomArchive);
      const games = gamesResponse.data.games;

      const rapidGames = games.filter((game: ChessComGame) => 
        game.rules === 'chess' && 
        game.time_class === 'rapid' && 
        !game.pgn.includes('Abandoned')
      );

      if (rapidGames.length === 0) {
        throw new Error('No completed rapid games found in the selected archive');
      }

      randomGame = rapidGames[Math.floor(Math.random() * rapidGames.length)];
      chess = new Chess();
      chess.loadPgn(randomGame.pgn);
    } while (chess.history().length < 8); // Ensure at least 4 moves (8 half-moves)

    const isBMMemberWhite = randomGame.white.username.toLowerCase() === chessUsername.toLowerCase();
    const playerRating = isBMMemberWhite ? randomGame.white.rating : randomGame.black.rating;

    // Use PGNClockStripper to extract clock times
    const { strippedPgn, clockTimes } = PGNClockStripper(randomGame.pgn);

    return {
      pgn: strippedPgn,
      elo: playerRating,
      whitePlayer: {
        username: randomGame.white.username,
        rating: randomGame.white.rating,
        isBMMember: isBMMemberWhite
      },
      blackPlayer: {
        username: randomGame.black.username,
        rating: randomGame.black.rating,
        isBMMember: !isBMMemberWhite
      },
      gameLink: randomGame.url,
      result: randomGame.result,
      clockTimes: clockTimes
    };
  } catch (error) {
    console.error('Error fetching random game:', error);
    throw error;
  }
}