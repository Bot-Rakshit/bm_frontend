import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import { getDashboardStats } from '@/services/communityApi';
import { motion } from 'framer-motion';

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
}

const CACHE_KEY = 'dashboardData';
const UPDATE_INTERVAL = 60000; // 1 minute in milliseconds

export default function Community() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const location = useLocation();

  const fetchDashboardData = useCallback(async () => {
    try {
      const data = await getDashboardStats();
      setDashboardData(data);
      const now = new Date();
      setLastUpdated(now);
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: now.getTime() }));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }, []);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      const searchParams = new URLSearchParams(location.search);
      const queryToken = searchParams.get('token');
      return !!(token || queryToken);
    };

    setShowSidebar(checkToken());

    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const now = new Date().getTime();
      if (now - timestamp < UPDATE_INTERVAL) {
        setDashboardData(data);
        setLastUpdated(new Date(timestamp));
      } else {
        fetchDashboardData();
      }
    } else {
      fetchDashboardData();
    }

    const intervalId = setInterval(() => {
      fetchDashboardData();
    }, UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [fetchDashboardData, location.search]);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dark:bg-black dark:text-white h-screen w-full flex overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
    <div className="dark:bg-black dark:text-white min-h-screen w-full flex">
      {showSidebar && <Sidebar />}
      <div className={`flex-1 flex flex-col relative ${!showSidebar ? 'w-full' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a1f0a] to-[#1a3a1a] z-0">
          <div className="absolute inset-0 opacity-20 bg-[url('/chess-pattern.svg')] bg-repeat"></div>
        </div>
        
        {/* Depth elements */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>
        
        <header className="bg-white/10 backdrop-filter backdrop-blur-lg text-white px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg z-10">
          <h1 className="text-xl font-bold">Community Statistics</h1>
          {lastUpdated && (
            <p className="text-sm text-gray-300">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-neon-green mb-4">Welcome to the BM Samay Community Dashboard</h1>
              <p className="text-gray-300 font-mono">
                Here you can find all the statistics and leaderboards of our vibrant chess community. Stay updated with the latest numbers and see where you stand among the best!
              </p>
              <p className="text-gray-300 font-mono mt-2">
                Note: The average rating displayed is for rapid games.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold text-white">Total Users</h2>
                <p className="text-[#00ff00] text-4xl mt-4">{dashboardData.totalUsers}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold text-white">Average Rating</h2>
                <p className="text-[#00ff00] text-4xl mt-4">{Math.round(dashboardData.averageRapid)}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold text-white">Highest Rapid Rating</h2>
                <p className="text-[#00ff00] text-4xl mt-4">{dashboardData.highestRapid.rating}</p>
                <p className="text-gray-400 mt-2">{dashboardData.highestRapid.chessUsername}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold text-white">Highest Blitz Rating</h2>
                <p className="text-[#00ff00] text-4xl mt-4">{dashboardData.highestBlitz.rating}</p>
                <p className="text-gray-400 mt-2">{dashboardData.highestBlitz.chessUsername}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold text-white">Highest Bullet Rating</h2>
                <p className="text-[#00ff00] text-4xl mt-4">{dashboardData.highestBullet.rating}</p>
                <p className="text-gray-400 mt-2">{dashboardData.highestBullet.chessUsername}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold text-white">Highest Puzzle Rush</h2>
                <p className="text-[#00ff00] text-4xl mt-4">{dashboardData.highestPuzzleRush.rating}</p>
                <p className="text-gray-400 mt-2">{dashboardData.highestPuzzleRush.chessUsername}</p>
              </div>
            </div>
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-neon-green text-center mb-6">Leaderboards</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-[#00ff00]">
                  <h3 className="text-2xl font-bold text-white text-center">Top 10 Bullet</h3>
                  <ul className="mt-4 text-white">
                    {dashboardData.top10Bullet.map((player, i) => (
                      <li key={i} className="flex justify-between py-2 border-b border-gray-700">
                        <span>{player.user.chessUsername}</span>
                        <span>{player.bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-[#00ff00]">
                  <h3 className="text-2xl font-bold text-white text-center">Top 10 Blitz</h3>
                  <ul className="mt-4 text-white">
                    {dashboardData.top10Blitz.map((player, i) => (
                      <li key={i} className="flex justify-between py-2 border-b border-gray-700">
                        <span>{player.user.chessUsername}</span>
                        <span>{player.blitz}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-[#00ff00]">
                  <h3 className="text-2xl font-bold text-white text-center">Top 10 Rapid</h3>
                  <ul className="mt-4 text-white">
                    {dashboardData.top10Rapid.map((player, i) => (
                      <li key={i} className="flex justify-between py-2 border-b border-gray-700">
                        <span>{player.user.chessUsername}</span>
                        <span>{player.rapid}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
     
  );
}
