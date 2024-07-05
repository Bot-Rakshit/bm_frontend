import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import bmuniverse from '@/assets/bmuniverse.jpg';
import Sidebar from '@/components/sidebar';
import { decodeJwt } from '@/lib/jwtDecoder';
import { Menu, Trophy, Target, Zap, BarChart2, Users, AlertCircle } from 'lucide-react';
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
  rapid: number;
  blitz: number;
  bullet: number;
}

export default function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [chessStats, setChessStats] = useState({ rapid: 0, blitz: 0, bullet: 0 });
  const [percentileRanking, setPercentileRanking] = useState<PercentileRanking | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (token) {
      const decoded = decodeJwt(token) as unknown as User;
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
      const ranking = await getPercentileRanking(chessUsername);
      setPercentileRanking(ranking);
    } catch (error) {
      console.error('Error fetching percentile ranking:', error);
    }
  };

  const handleCommunityStats = () => {
    navigate('/community');
  };

  return (
    <div className="dark:bg-black dark:text-white min-h-screen w-full flex overflow-hidden">
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
            <Menu />
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto bg-white/5 backdrop-filter backdrop-blur-md rounded-3xl p-8 border border-neon-green/20 shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neon-green mb-4 text-center md:text-left">
                  Congrats, {user?.chessUsername || 'demo name'}!
                </h1>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                  Welcome to the <span className="text-neon-green font-semibold">BM Samay</span> chess community! We're thrilled to have you here.
                </p>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                  As a token of our appreciation, we've given you <span className="text-neon-green font-semibold">100 BM Points</span> for early signup.
                </p>
                <div className="text-center md:text-left mt-8">
                  <Button 
                    variant="outline" 
                    className="text-neon-green border-neon-green hover:bg-neon-green hover:text-black transition-colors duration-300"
                    onClick={handleCommunityStats}
                  >
                    See Community Stats
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <div className="relative" style={{ paddingBottom: '110%' }}>
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
                <div className="flex justify-center mt-6 space-x-4">
                  <StatCard title="Rapid" value={chessStats.rapid} icon={<Zap className="w-6 h-6 text-neon-green" />} />
                  <StatCard title="Blitz" value={chessStats.blitz} icon={<Trophy className="w-6 h-6 text-neon-green" />} />
                  <StatCard title="Bullet" value={chessStats.bullet} icon={<Target className="w-6 h-6 text-neon-green" />} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<BarChart2 className="w-12 h-12 text-neon-green" />}
              title="Track Progress"
              description="Monitor your chess rating and BM Points in real-time."
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-neon-green" />}
              title="Community Events"
              description="Participate in exclusive tournaments and challenges."
            />
            <FeatureCard
              icon={<Target className="w-12 h-12 text-neon-green" />}
              title="Set Goals"
              description="Set personal chess goals and track your achievements."
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 bg-white/5 backdrop-filter backdrop-blur-md rounded-3xl p-8 border border-neon-green/20 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-neon-green mb-6">Look at where you stand</h2>
            {percentileRanking && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <AlertCircle className="w-6 h-6 text-yellow-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-neon-green">Rapid Percentile</h3>
                      <p className="text-gray-300">{percentileRanking.rapid}%</p>
                    </div>
                  </div>
                  <div className="text-gray-300">Top {percentileRanking.rapid}%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <AlertCircle className="w-6 h-6 text-blue-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-neon-green">Blitz Percentile</h3>
                      <p className="text-gray-300">{percentileRanking.blitz}%</p>
                    </div>
                  </div>
                  <div className="text-gray-300">Top {percentileRanking.blitz}%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <AlertCircle className="w-6 h-6 text-green-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-neon-green">Bullet Percentile</h3>
                      <p className="text-gray-300">{percentileRanking.bullet}%</p>
                    </div>
                  </div>
                  <div className="text-gray-300">Top {percentileRanking.bullet}%</div>
                </div>
              </div>
            )}
            <Alert className="mt-4">
              <AlertDescription>
                We're currently in beta! While percentile rankings are available, we're still working on exciting new features to enhance your experience. Stay tuned for updates!
              </AlertDescription>
            </Alert>
          </motion.div>

          <RecentActivity />
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

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-white/5 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-neon-green/20 shadow-lg hover:shadow-neon-green/20 transition-all duration-300">
    <div className="flex items-center space-x-4 mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-neon-green">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </div>
);

const RecentActivity = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="mt-16 bg-white/5 backdrop-filter backdrop-blur-md rounded-3xl p-8 border border-neon-green/20 shadow-xl"
  >
    <h2 className="text-2xl font-bold text-neon-green mb-6">Recent Activity</h2>
    <div className="space-y-4">
      <ActivityItem
        icon={<Trophy className="w-6 h-6 text-yellow-400" />}
        title="Won a Blitz match"
        description="You won against IM_"
      />
      <ActivityItem
        icon={<BarChart2 className="w-6 h-6 text-blue-400" />}
        title="Improved rating"
        description="Your rating increased by 100 points"
      />
      <ActivityItem
        icon={<Users className="w-6 h-6 text-green-400" />}
        title="Joined a tournament"
        description="You joined the 'Summer Blitz' tournament"
      />
    </div>
  </motion.div>
);

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ActivityItem = ({ icon, title, description }: ActivityItemProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      {icon}
      <div>
        <h3 className="text-lg font-semibold text-neon-green">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
    <div className="text-gray-300">2 hours ago</div>
  </div>
);
