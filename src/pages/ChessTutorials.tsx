import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Sidebar from '@/components/sidebar';
import { FaChessKnight, FaExternalLinkAlt } from 'react-icons/fa';
import chessbaseLogo from '@/assets/cbi.svg';
import { useLocation } from 'react-router-dom';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

export default function ChessTutorials() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const API_KEY = '';
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: 'snippet',
            q: 'chess.com tutorials',
            maxResults: 20,
            type: 'video',
            key: API_KEY,
          },
        });
        const videoData = response.data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));
        setVideos(videoData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideos();

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token') || localStorage.getItem('token');
    setShowSidebar(!!token);
  }, [location.search]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {showSidebar && <Sidebar />}
      <div className={`flex-1 flex flex-col relative h-full min-h-full overflow-y-hidden ${!showSidebar ? 'w-full' : ''}`}>
        <div className='contain-paint h-full w-full absolute'>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 z-0">
            <div className="absolute inset-0 opacity-10 bg-[url('/chess-pattern.svg')] bg-repeat"></div>
          </div>

          <div className="absolute top-20 -left-20 w-96 h-96 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500 opacity-10 rounded-full filter blur-3xl"></div>
        </div>

        <header className="bg-black/50 backdrop-filter backdrop-blur-lg text-white px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between shadow-xl mt-4 sm:mt-6 mx-4 sm:mx-6 rounded-2xl z-10 border border-neon-green/20">
          <h1 className="text-3xl sm:text-4xl font-extrabold flex items-center mb-4 sm:mb-0">
            <FaChessKnight className="text-neon-green mr-2 sm:mr-4 text-4xl sm:text-5xl" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-blue-500">
              Chess Tutorials
            </span>
          </h1>
          <div className="flex items-center bg-white/10 rounded-full px-3 py-1 sm:px-4 sm:py-2">
            <span className="mr-2 text-xs sm:text-sm font-medium">powered by</span>
            <img src={chessbaseLogo} alt="ChessBase India" className="h-6 sm:h-8" />
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 z-10 overflow-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-neon-green"></div>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-extrabold mb-8">Chess Tutorials</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black/60 backdrop-filter backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-neon-green/30 transition-all duration-300 flex flex-col border border-neon-green/20"
                  >
                    <div className="relative h-64">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-4 text-neon-green hover:text-white transition-colors duration-300 line-clamp-3">{video.title}</h2>
                      </div>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-neon-green text-black px-4 py-2 rounded-full hover:bg-white transition-colors duration-300 text-base font-medium w-full"
                      >
                        Watch Video <FaExternalLinkAlt className="ml-2" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
