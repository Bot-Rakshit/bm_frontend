import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import bmuniverse from '@/assets/bmuniverse.jpg';
import Sidebar from '@/components/sidebar';
import { decodeJwt } from '@/lib/jwtDecoder';
import { Trophy, Target, Zap, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { getPercentileRanking } from '@/services/chessApi';

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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromQuery = queryParams.get('token');
    if (tokenFromQuery) {
      setToken(tokenFromQuery);
      const decoded = decodeJwt(tokenFromQuery) as unknown as User;
      if (decoded && decoded.stats) {
        setUser(decoded);
        setChessStats(decoded.stats);
        fetchPercentileRanking(decoded.chessUsername);
      } else {
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

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a1f0a] to-[#1a3a1a] z-0">
          <div className="absolute inset-0 opacity-20 bg-[url('/chess-pattern.svg')] bg-repeat"></div>
        </div>
        
        {/* Depth elements */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>
        
        <header className="bg-white/10 backdrop-filter backdrop-blur-lg text-white px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg z-10">
          <h1 className="text-xl font-bold">Welcome</h1>
          <Button variant="ghost" size="icon" className="md:hidden">
          </Button>
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neon-green mb-4 text-center md:text-left">
                  Congrats, {user?.chessUsername || 'demo name'}!
                </h1>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                  Welcome to the <span className="text-neon-green font-semibold">BM Samay</span> chess community! We're thrilled to have you here.
                </p>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                  As a token of our appreciation, we've given you <span className="text-neon-green font-semibold">100 BM Points</span> for early signup.
                </p>
                <div className="flex justify-center md:justify-start mt-6 space-x-4">
                  <StatCard title="Rapid" value={chessStats.rapid} icon={<Zap className="w-6 h-6 text-neon-green" />} />
                  <StatCard title="Blitz" value={chessStats.blitz} icon={<Trophy className="w-6 h-6 text-neon-green" />} />
                  <StatCard title="Bullet" value={chessStats.bullet} icon={<Target className="w-6 h-6 text-neon-green" />} />
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
                  />
                  <PercentileItem 
                    title="Rapid" 
                    percentile={Math.round(percentiles.rapidPercentile)}
                    description="rapid players"
                  />
                  <PercentileItem 
                    title="Bullet" 
                    percentile={Math.round(percentiles.bulletPercentile)}
                    description="bullet players"
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
  <div className="bg-white/10 backdrop-filter backdrop-blur-md rounded-xl p-4 flex flex-col items-center">
    {icon}
    <h3 className="text-lg font-semibold text-neon-green mt-2">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

interface PercentileItemProps {
  title: string;
  percentile: number;
  description: string;
}

const PercentileItem = ({ title, percentile, description }: PercentileItemProps) => (
  <div className="flex items-center space-x-4">
    <div className={`text-${percentile >= 90 ? 'green' : percentile >= 70 ? 'blue' : percentile >= 50 ? 'yellow' : 'red'}-400 w-6 h-6`}>
      <AlertCircle />
    </div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-neon-green">
        You're better than {percentile}% of {description} in the BM Samay community!
      </p>
    </div>
  </div>
);
