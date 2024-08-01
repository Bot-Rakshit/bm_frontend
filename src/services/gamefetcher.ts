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
  strippedPgn: string;
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

const frequentUsers = [
  'samayraina',
  'sagar_raina',
  'beaststats',
  'dq_555',
  'adg5',
  'anishnaik12'
];

export async function fetchRandomGame(): Promise<Game> {
  try {
    let chessUsername: string;
    let ratings: { rapid: number };


    if (Math.random() < 0.3) {
      chessUsername = frequentUsers[Math.floor(Math.random() * frequentUsers.length)];
      // For frequent users, we'll assume they have enough rapid games
      ratings = { rapid: 10 };
    } else {
      const playerResponse = await axios.get(`${API_BASE_URL}/random-player`);
      ({ chessUsername, ratings } = playerResponse.data);
    }

    if (ratings.rapid < 10) {
      throw new Error('Player does not have enough rapid games');
    }

    const archivesResponse = await axios.get(`https://api.chess.com/pub/player/${chessUsername}/games/archives`);
    const archives = archivesResponse.data.archives;

    const validArchives = archives.filter((url: string) => 
      url.includes('2022') || url.includes('2023') || url.includes('2024')
    );

    if (validArchives.length === 0) {
      throw new Error('No games found');
    }

    let randomGame: ChessComGame | null = null;
    let chess: Chess | null = null;
    let attempts = 0;
    const maxAttempts = 10;

    while (!randomGame || !chess || chess.history().length < 8) {
      if (attempts >= maxAttempts) {
        throw new Error('Failed to find a suitable game after multiple attempts');
      }

      const randomArchive = validArchives[Math.floor(Math.random() * validArchives.length)];
      const gamesResponse = await axios.get(randomArchive);
      const games = gamesResponse.data.games;

      const rapidGames = games.filter((game: ChessComGame) => 
        game.rules === 'chess' && 
        game.time_class === 'rapid' && 
        !game.pgn.includes('Abandoned')
      );

      if (rapidGames.length === 0) {
        attempts++;
        continue;
      }

      randomGame = rapidGames[Math.floor(Math.random() * rapidGames.length)];
      chess = new Chess();
      
      try {
        if (randomGame && randomGame.pgn) {
          chess.loadPgn(randomGame.pgn);
          if (chess.history().length < 8) {
            throw new Error('Game too short');
          }
        } else {
          throw new Error('Invalid game data');
        }
      } catch (error) {
        randomGame = null;
        chess = null;
        attempts++;
        continue;
      }
    }

    if (!randomGame || !chess) {
      throw new Error('Failed to find a suitable game');
    }

    const isBMMemberWhite = randomGame.white.username.toLowerCase() === chessUsername.toLowerCase();
    const playerRating = isBMMemberWhite ? randomGame.white.rating : randomGame.black.rating;

    const { strippedPgn, clockTimes } = PGNClockStripper(randomGame.pgn);

    return {
      pgn: randomGame.pgn,
      strippedPgn: strippedPgn,
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