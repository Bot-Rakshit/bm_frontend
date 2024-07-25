import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/sidebar/Sidebar';
import PlayerHoverCard from '@/components/PlayerHoverCard';
import { getDashboardStats } from '@/services/communityApi';
import { motion } from 'framer-motion';
import { FaUsers, FaChessKnight, FaChessQueen, FaChessRook, FaChessPawn, FaPuzzlePiece } from 'react-icons/fa';
import Background from '@/components/Background';
import Header from '@/components/sidebar/Header';

interface User {
  chessUsername: string;
}

interface PlayerStats {
  user: User;
  bullet?: number;
  blitz?: number;
  rapid?: number;
}

interface DashboardData {
  totalUsers: number;
  averageRapid: number;
  highestRapid: { rating: number; chessUsername: string };
  highestBlitz: { rating: number; chessUsername: string };
  highestBullet: { rating: number; chessUsername: string };
  highestPuzzleRush: { rating: number; chessUsername: string };
  top10Bullet: PlayerStats[];
  top10Blitz: PlayerStats[];
  top10Rapid: PlayerStats[];
  [key: `top10${string}`]: PlayerStats[];
}

interface PlayerInfo {
  name: string;
  username: string;
  followers: number;
  country: { code: string; name: string };
  avatar: string;
  status: string;
  joined: number;
  last_online: number;
  url: string;
}

const CACHE_KEY = 'dashboardData';
const UPDATE_INTERVAL = 60000; // 1 minute in milliseconds

export default function Community() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [playerInfo, setPlayerInfo] = useState<Record<string, PlayerInfo | null>>({});
  const [loadingPlayerInfo, setLoadingPlayerInfo] = useState<Record<string, boolean>>({});
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

  const fetchCountryInfo = async (countryUrl: string): Promise<{ code: string; name: string }> => {
    const response = await fetch(countryUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { code: data.code, name: data.name };
  };

  const fetchPlayerInfo = async (username: string): Promise<PlayerInfo> => {
    const response = await fetch(`https://api.chess.com/pub/player/${username}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    let countryInfo = { code: 'Unknown', name: 'Unknown' }
    if (data.country) {
      try {
        countryInfo = await fetchCountryInfo(data.country)
      } catch (error) {
        console.error('Error fetching country info: ', error)
      }
    }
    return {
      ...data,
      country: countryInfo
    }
  };

  const handleHover = async (username: string) => {
    if (!playerInfo[username] && !loadingPlayerInfo[username]) {
      setLoadingPlayerInfo((prev) => ({ ...prev, [username]: true }));
      try {
        const info = await fetchPlayerInfo(username);
        setPlayerInfo((prev) => ({ ...prev, [username]: info }));
      } catch (error) {
        console.error('Error fetching player info:', error);
        setPlayerInfo((prev) => ({ ...prev, [username]: null }));
      } finally {
        setLoadingPlayerInfo((prev) => ({ ...prev, [username]: false }));
      }
    }
  };

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
      <Sidebar />
      <div className="flex-1 flex flex-col relative w-full">
        <Background />
        <Header
          headerTitle="Community Dashboard"
          lastUpdated={lastUpdated}
        />
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
                  <p className="text-sm text-gray-400 cursor-default">
                    {card.username}
                  </p>
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
                      {dashboardData[`top10${category}`].map((player) => (
                        <li className="flex justify-between items-center py-2 border-b border-gray-700">
                          <PlayerHoverCard
                            username={player.user.chessUsername}
                            playerInfo={playerInfo}
                            loadingPlayerInfo={loadingPlayerInfo}
                            handleHover={handleHover}
                          />
                          <span className="font-semibold text-neon-green">{player[category.toLowerCase() as 'bullet' | 'blitz' | 'rapid'] || 'N/A'}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div >
    </div >
  );
}