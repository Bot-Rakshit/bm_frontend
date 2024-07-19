import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Sidebar from '@/components/sidebar';
import { FaChessKnight, FaExternalLinkAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import chessbaseLogo from '@/assets/cbi.svg';
import { useLocation } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

interface Article {
  image: string;
  title: string;
  summary: string;
  url: string;
}

const truncateSummary = (summary: string, wordLimit: number) => {
  const words = summary.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return summary;
};

export default function ChessNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://api2.bmsamay.com/latest_articles');
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token') || localStorage.getItem('token');
    setShowSidebar(!!token);
  }, [location.search]);

  const navigateStory = useCallback((direction: number) => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + direction;
      if (newIndex < 0) newIndex = articles.length - 1;
      if (newIndex >= articles.length) newIndex = 0;
      return newIndex;
    });
  }, [articles.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        navigateStory(-1);
      } else if (event.key === 'ArrowRight') {
        navigateStory(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateStory]);

  const handlers = useSwipeable({
    onSwipedLeft: () => navigateStory(1),
    onSwipedRight: () => navigateStory(-1),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {showSidebar && <Sidebar />}
      <div className={`flex-1 flex flex-col relative h-full min-h-full overflow-hidden ${!showSidebar ? 'w-full' : ''}`}>
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
              Chess News
            </span>
          </h1>
          <div className="flex items-center bg-white/10 rounded-full px-3 py-1 sm:px-4 sm:py-2">
            <span className="mr-2 text-xs sm:text-sm font-medium">powered by</span>
            <img src={chessbaseLogo} alt="ChessBase India" className="h-6 sm:h-8" />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 z-10 overflow-hidden flex items-center justify-center" {...handlers}>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-neon-green"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3 }}
                className="bg-black/60 backdrop-filter backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-neon-green/20 max-w-4xl w-full h-[80vh] flex flex-col"
              >
                <div className="relative h-[70%] flex items-center justify-center overflow-hidden">
                  <img 
                    src={articles[currentIndex].image} 
                    alt={articles[currentIndex].title} 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between overflow-y-auto">
                  <div>
                    <h2 className="text-xl font-bold mb-2 text-neon-green">{articles[currentIndex].title}</h2>
                    <p className="text-gray-300 mb-4 text-sm">
                      {truncateSummary(articles[currentIndex].summary, 30)}
                    </p>
                  </div>
                  <a
                    href={articles[currentIndex].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-neon-green text-black px-4 py-2 rounded-full hover:bg-white transition-colors duration-300 text-sm font-medium mt-2"
                  >
                    Read Full Article <FaExternalLinkAlt className="ml-2" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </main>

        <div className="absolute bottom-4 left-0 right-0 hidden sm:flex justify-between px-8 z-20">
          <button onClick={() => navigateStory(-1)} className="bg-neon-green/20 hover:bg-neon-green/40 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110">
            <FaArrowLeft className="text-2xl" />
          </button>
          <button onClick={() => navigateStory(1)} className="bg-neon-green/20 hover:bg-neon-green/40 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110">
            <FaArrowRight className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}