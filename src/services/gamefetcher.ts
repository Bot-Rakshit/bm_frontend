import axios from 'axios';
import { Chess } from 'chess.js';

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
  clockTimes: string[];
  result: string;
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

function formatClockTime(time: string): string {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  const totalSeconds = (hours || 0) * 3600 + minutes * 60 + Math.floor(seconds);
  const formattedMinutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const formattedSeconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

function extractClockTimes(pgn: string): string[] {
  const clockTimes: string[] = [];
  const moves = pgn.split(/\d+\./).slice(1); // Split by move numbers and remove the first empty element
  moves.forEach(move => {
    const clockMatches = move.match(/\[%clk (\d+:\d+:\d+(?:\.\d+)?)\]/g);
    if (clockMatches) {
      clockMatches.forEach(match => {
        const timeMatch = match.match(/\d+:\d+:\d+(?:\.\d+)?/);
        if (timeMatch && timeMatch[0]) {
          clockTimes.push(formatClockTime(timeMatch[0]));
        }
      });
    }
  });
  return clockTimes;
}

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

    const clockTimes = extractClockTimes(randomGame.pgn);

    const isBMMemberWhite = randomGame.white.username.toLowerCase() === chessUsername.toLowerCase();
    const playerRating = isBMMemberWhite ? randomGame.white.rating : randomGame.black.rating;

    return {
      pgn: randomGame.pgn,
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
      clockTimes: clockTimes,
      result: randomGame.result
    };
  } catch (error) {
    console.error('Error fetching random game:', error);
    throw error;
  }
}