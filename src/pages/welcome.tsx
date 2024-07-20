import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import bmuniverse from '@/assets/bmuniverse.webp';
import Sidebar from '@/components/sidebar';
import { decodeJwt } from '@/lib/jwtDecoder';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { getPercentileRanking } from '@/services/chessApi';
import { FaTrophy, FaBolt, FaCrosshairs, FaChessKnight } from 'react-icons/fa';

interface User {
  chessUsername: string;
  stats: {
    rapid: number;
    blitz: number;
    bullet: number;
  };
}

interface PercentileRanking {
  blitzPercentile: number;
  bulletPercentile: number;
  rapidPercentile: number;
}

export default function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [chessStats, setChessStats] = useState({ rapid: 0, blitz: 0, bullet: 0 });
  const [percentiles, setPercentiles] = useState<PercentileRanking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showSidebar] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromQuery = queryParams.get('token');
    if (tokenFromQuery) {
      setToken(tokenFromQuery);
      try {
        const decoded = decodeJwt(tokenFromQuery) as unknown as User;
        if (decoded && decoded.stats) {
          setUser(decoded);
          setChessStats(decoded.stats);
          fetchPercentileRanking(decoded.chessUsername);
        } else {
          throw new Error('Invalid user data');
        }
      } catch (err) {
        console.error('Error decoding token:', err);
        navigate('/blunder');
      }
    } else {
      navigate('/blunder');
    }
  }, [location.search, navigate]);

  const fetchPercentileRanking = async (chessUsername: string) => {
    try {
      const data = await getPercentileRanking(chessUsername);
      setPercentiles(data);
    } catch (err) {
      setError('Failed to fetch percentile rankings');
      console.error(err);
    }
  };

  const handleCommunityStats = () => {
    if (token) {
      navigate(`/community?token=${encodeURIComponent(token)}`);
    } else {
      navigate('/community');
    }
  };

  const getMotivationalMessage = (percentile: number) => {
    if (percentile >= 90) return "Exceptional! You're among the elite!";
    if (percentile >= 70) return "Impressive! You're well above average!";
    if (percentile >= 50) return "Great job! You're above average!";
    return "Keep practicing! You're on your way up!";
  };

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}
      <div className={`flex-1 flex flex-col relative ${!showSidebar ? 'w-full' : ''}`}>
        <div className='contain-paint h-full w-full absolute'>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 z-0">
            <div className="absolute inset-0 opacity-10 bg-[url('/chess-pattern.svg')] bg-repeat"></div>
          </div>

          {/* Depth elements */}
          <div className="absolute top-20 -left-20 w-64 h-64 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-80 h-80 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>
        </div>
        <header className="bg-white/10 backdrop-filter backdrop-blur-lg text-white px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg z-10">
          <div className="flex items-center">
            <div className="w-8 mr-4"></div> {/* Spacer for hamburger menu */}
            <h1 className="text-xl font-bold">Welcome to BM Samay</h1>
          </div>
          <FaChessKnight className="w-8 h-8 text-neon-green" />
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto bg-white/5 backdrop-filter backdrop-blur-md rounded-3xl p-6 md:p-8 border border-neon-green/20 shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-neon-green mb-6 text-center md:text-left"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Glad to have you here, {user?.chessUsername || 'Chess Master'}!
                </motion.h1>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                  You've just joined the most exciting <span className="text-neon-green font-semibold">BM Samay</span> chess community! We're thrilled to have you here.
                </p>
                <motion.p
                  className="text-gray-300 text-base md:text-lg leading-relaxed mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  As a special welcome gift, we've credited your account with <span className="text-neon-green font-semibold">100 BM Points</span>. Use them wisely in upcoming events and predictions!
                </motion.p>
                <div className="flex justify-center md:justify-start mt-6 space-x-4">
                  <StatCard title="Rapid" value={chessStats.rapid} icon={<FaBolt className="w-6 h-6 text-neon-green" />} />
                  <StatCard title="Blitz" value={chessStats.blitz} icon={<FaTrophy className="w-6 h-6 text-neon-green" />} />
                  <StatCard title="Bullet" value={chessStats.bullet} icon={<FaCrosshairs className="w-6 h-6 text-neon-green" />} />
                </div>
              </div>
              <div className="w-full md:w-1/2 md:pl-8">
                <div className="relative" style={{ paddingBottom: '120%' }}>
                  <img
                    src={bmuniverse}
                    alt="BM Samay"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    style={{
                      objectPosition: 'center 20%',
                      border: '2px solid rgba(0, 255, 0, 0.5)',
                      boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="text-neon-green border-neon-green hover:bg-neon-green hover:text-black transition-colors duration-300"
                onClick={handleCommunityStats}
              >
                See Community Stats
              </Button>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-neon-green mb-6">Your Chess Prowess</h2>
              {percentiles ? (
                <div className="space-y-6">
                  <PercentileItem
                    title="Blitz"
                    percentile={Math.round(percentiles.blitzPercentile)}
                    description="blitz players"
                    message={getMotivationalMessage(percentiles.blitzPercentile)}
                  />
                  <PercentileItem
                    title="Rapid"
                    percentile={Math.round(percentiles.rapidPercentile)}
                    description="rapid players"
                    message={getMotivationalMessage(percentiles.rapidPercentile)}
                  />
                  <PercentileItem
                    title="Bullet"
                    percentile={Math.round(percentiles.bulletPercentile)}
                    description="bullet players"
                    message={getMotivationalMessage(percentiles.bulletPercentile)}
                  />
                </div>
              ) : error ? (
                <Alert>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <Alert>
                  <AlertDescription>Loading percentile rankings...</AlertDescription>
                </Alert>
              )}
            </div>

            <Alert className="mt-8">
              <AlertDescription>
                We're currently in beta! While Signups are available, we're still working on exciting new features to enhance your experience. Stay tuned for updates!
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <motion.div
    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 flex flex-col items-center shadow-lg hover:shadow-neon-green/20 transition-all duration-300"
    whileHover={{ scale: 1.05 }}
  >
    <div className="text-4xl text-neon-green mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-3xl font-bold text-neon-green">{value}</p>
  </motion.div>
);

interface PercentileItemProps {
  title: string;
  percentile: number;
  description: string;
  message: string;
}

const PercentileItem = ({ title, percentile, description, message }: PercentileItemProps) => (
  <motion.div
    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-neon-green/20 transition-all duration-300"
    whileHover={{ scale: 1.02 }}
  >
    <h3 className="text-2xl font-semibold text-neon-green mb-2">{title}</h3>
    <div className="flex items-center mb-4">
      <div className="w-16 h-16 p-2 rounded-full bg-neon-green/20 flex items-center justify-center mr-4"  
      style={{
        border: '2px solid rgba(0, 255, 0, 0.5)',
        boxShadow: '0 0 5px rgba(0, 255, 0, 0.5)'
      }}>
        <span className="text-2xl font-bold text-neon-green">{percentile}%</span>
      </div>
      <p className="text-white">
        You're better than {percentile}% of {description} in the BM Samay community!
      </p>
    </div>
    <p className="text-gray-300 italic">{message}</p>
  </motion.div>
);
