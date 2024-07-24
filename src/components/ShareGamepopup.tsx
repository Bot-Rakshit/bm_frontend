import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaTimes, FaChess, FaPlay, FaEye } from 'react-icons/fa';

interface Game {
  id: number;
  title: string;
  timestamp: string;
  verdict: string;
}

const ShareGamePopup: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState<Game | null>(null);

  useEffect(() => {
    // Fetch recent games to populate dropdown
    axios.get('/api/recent-games') // Adjust the endpoint as needed
      .then(response => {
        setGames(response.data.games);
      })
      .catch(error => {
        console.error('Error fetching recent games:', error);
      });
  }, []);

  const handleSubmit = () => {
    if (selectedGame && title) {
      axios.post('/api/share-game', { gameId: selectedGame, title })
        .then(() => {
          alert('Game shared successfully!');
          // Reset form
          setSelectedGame(null);
          setTitle('');
          setPreview(null);
        })
        .catch(error => {
          console.error('Error sharing game:', error);
        });
    } else {
      alert('Please select a game and enter a title.');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= 120) {
      setTitle(input);
    }
  };

  const handlePreview = () => {
    if (selectedGame) {
      const game = games.find(game => game.id === selectedGame);
      setPreview(game || null);
    } else {
      alert('Please select a game to preview.');
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-lg relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <div className="absolute top-0 left-0 w-full bg-neon-green py-4 px-6 rounded-t-lg flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
            <FaChess className="mr-2 text-3xl" />
            Share Your Game
          </h2>
          <button
            className="text-gray-900 hover:text-white transition-colors"
            onClick={() => alert('Close button clicked')}
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>
        <div className="pt-16">
          <div className="mb-4">
            <label htmlFor="game-select" className="block text-sm font-medium mb-2">Select Game</label>
            <select
              id="game-select"
              className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white"
              value={selectedGame || ''}
              onChange={e => setSelectedGame(parseInt(e.target.value))}
            >
              <option value="" disabled>Select a game</option>
              {games.map(game => (
                <option key={game.id} value={game.id}>
                  {game.title} - {game.timestamp} - {game.verdict}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-2">Title (Max 120 characters)</label>
            <textarea
              id="title"
              className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white"
              rows={6}
              maxLength={120}
              value={title}
              onChange={handleTitleChange}
              placeholder="Add a Title ..."
            />
            <p className="text-xs text-gray-400 mt-1">{title.length} / 120 characters</p>
          </div>
          {preview && (
            <div className="mb-4 p-3 border border-gray-600 rounded bg-gray-700">
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <p><strong>Title:</strong> {preview.title}</p>
              <p><strong>Timestamp:</strong> {preview.timestamp}</p>
              <p><strong>Verdict:</strong> {preview.verdict}</p>
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-neon-green text-gray-900 p-3 rounded hover:bg-green-700 transition-colors flex items-center"
              onClick={handlePreview}
            >
              <FaEye className="mr-2" />
              Preview
            </button>
            <button
              type="button"
              className="bg-neon-green text-gray-900 p-3 rounded hover:bg-green-700 transition-colors flex items-center"
              onClick={handleSubmit}
            >
              <FaPlay className="mr-2" />
              Share
            </button>
            <button
              type="button"
              className="bg-gray-700 text-white p-3 rounded hover:bg-gray-600 transition-colors"
              onClick={() => alert('Close button clicked')}
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShareGamePopup;
