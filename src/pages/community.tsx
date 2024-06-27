import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import { getDashboardStats } from '@/services/communityApi';
import { Menu } from 'react-feather';

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

export default function Community() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardStats();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dark:bg-black dark:text-white h-screen w-full flex flex-col md:flex-row">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-64' : ''}`}>
        <header className="bg-white text-black px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg">
          <h1 className="text-xl font-bold">Community Statistics</h1>
          <button onClick={toggleSidebar} className="text-black md:hidden">
            <Menu size={24} />
          </button>
        </header>
        <div className="bg-black p-8 flex flex-col gap-8 items-center justify-center flex-1">
          <div className="text-center md:text-left w-full max-w-4xl">
            <h1 className="text-5xl font-bold text-white">Welcome to the BM Samay Community Dashboard</h1>
            <p className="text-gray-400 font-mono mt-4">
              Here you can find all the statistics and leaderboards of our vibrant chess community. Stay updated with the latest numbers and see where you stand among the best!
            </p>
            <p className="text-gray-400 font-mono mt-2">
              Note: The average rating displayed is for rapid games.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
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
          <div className="w-full max-w-4xl mt-8">
            <h2 className="text-3xl font-bold text-white text-center">Leaderboards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
        </div>
      </div>
    </div>
  );
}
