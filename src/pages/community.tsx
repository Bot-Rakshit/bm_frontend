import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import { getDashboardStats } from '@/services/communityApi';
import { motion } from 'framer-motion';
import { FaUsers, FaChessKnight, FaChessQueen, FaChessRook, FaChessPawn, FaPuzzlePiece } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';

interface DashboardData {
  totalUsers: number;
  averageRapid: number;
  highestRapid: { rating: number; chessUsername: string };
  highestBlitz: { rating: number; chessUsername: string };
  highestBullet: { rating: number; chessUsername: string };
  highestPuzzleRush: { rating: number; chessUsername: string };
  top10Bullet: { user: { chessUsername: string }; bullet: number }[];
  top10Blitz: { user: { chessUsername: string }; blitz: number }[];
  top10Rapid: { user: { chessUsername: string }; rapid: number }[];
  [key: `top10${string}`]: { user: { chessUsername: string }; [key: string]: number | { chessUsername: string } }[];
}

const CACHE_KEY = 'dashboardData';
const UPDATE_INTERVAL = 60000; // 1 minute in milliseconds

export default function Community() {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation();

  const { data: dashboardData } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const data = (await getDashboardStats()) as DashboardData;

      const now = new Date();
      setLastUpdated(now);
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data, timestamp: now.getTime() }),
      );
      return data;
    },
    initialData: () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const now = new Date().getTime();
        if (now - timestamp < UPDATE_INTERVAL) {
          setLastUpdated(new Date(timestamp));

          return data as DashboardData;
        }
      }
    },
    refetchInterval: UPDATE_INTERVAL,
  });

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      const searchParams = new URLSearchParams(location.search);
      const queryToken = searchParams.get('token');
      return !!(token || queryToken);
    };

    setShowSidebar(checkToken());
  }, [location.search]);

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neon-green"></div>
      </div>
    );
  }

  const statsCards = [
    { title: 'Total Users', value: dashboardData.totalUsers, icon: FaUsers },
    { title: 'Average Rating', value: Math.round(dashboardData.averageRapid), icon: FaChessKnight },
    { title: 'Highest Rapid', value: dashboardData.highestRapid.rating, username: dashboardData.highestRapid.chessUsername, icon: FaChessQueen },
    { title: 'Highest Blitz', value: dashboardData.highestBlitz.rating, username: dashboardData.highestBlitz.chessUsername, icon: FaChessRook },
    { title: 'Highest Bullet', value: dashboardData.highestBullet.rating, username: dashboardData.highestBullet.chessUsername, icon: FaChessPawn },
    { title: 'Highest Puzzle Rush', value: dashboardData.highestPuzzleRush.rating, username: dashboardData.highestPuzzleRush.chessUsername, icon: FaPuzzlePiece },
  ];

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}
      <div className={`flex-1 flex flex-col relative overflow-y-auto ${!showSidebar ? 'w-full' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 z-0">
          <div className="absolute inset-0 opacity-10 bg-[url('/chess-pattern.svg')] bg-repeat"></div>
        </div>

        <header className="bg-white/10 backdrop-filter backdrop-blur-lg text-white px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg z-10">
          <div className="flex items-center">
            <div className="w-8 mr-4"></div> {/* Spacer for hamburger menu */}
            <h1 className="text-xl font-bold">Community Dashboard</h1>
          </div>
          {lastUpdated && (
            <p className="text-sm text-gray-300">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 md:pl-20 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-blue-500 mb-6">
                BM Samay Community
              </h1>
              <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
                Explore our vibrant chess community's statistics and leaderboards. See where you stand among the best!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {statsCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-filter backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 hover:border-neon-green transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-200">{card.title}</h2>
                    <card.icon className="text-3xl text-neon-green" />
                  </div>
                  <p className="text-4xl font-bold text-neon-green mb-2">{card.value}</p>
                  {card.username && (
                    <p className="text-sm text-gray-400">{card.username}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-16">
              <h2 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-blue-500">
                Leaderboards
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {['Bullet', 'Blitz', 'Rapid'].map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="bg-gray-800/50 backdrop-filter backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700"
                  >
                    <h3 className="text-2xl font-bold text-center mb-6 text-neon-green">Top 10 {category}</h3>
                    <ul className="space-y-3">
                      {dashboardData[`top10${category}`].map((player, i) => (
                        <li key={i} className="flex justify-between items-center py-2 border-b border-gray-700">
                          <span className="text-gray-300">{player.user.chessUsername}</span>
                          <span className="font-semibold text-neon-green">{player[category.toLowerCase()] as number}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
