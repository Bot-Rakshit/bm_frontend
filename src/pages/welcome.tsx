import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import bmuniverse from '@/assets/bmuniverse.jpg';
import Sidebar from '@/components/sidebar';
import { decodeJwt } from '@/lib/jwtDecoder';
import { Menu } from 'lucide-react';

interface User {
  chessUsername: string;
  stats: {
    rapid: number;
    blitz: number;
    bullet: number;
  };
}

export default function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [chessStats, setChessStats] = useState({ rapid: 0, blitz: 0, bullet: 0 });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (token) {
      const decoded = decodeJwt(token) as unknown as User;
      if (decoded && decoded.stats) {
        setUser(decoded);
        setChessStats(decoded.stats);
      } else {
        navigate('/blunder');
      }
    } else {
      navigate('/blunder');
    }
  }, [location.search, navigate]);

  const handleCommunityStats = () => {
    navigate('/community');
  };

  return (
    <div className="dark:bg-black dark:text-white min-h-screen w-full flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white text-black px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg">
          <h1 className="text-xl font-bold">Welcome</h1>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </header>
        <div className="bg-black p-4 md:p-8 flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-center md:text-left">
                  congrats, {user?.chessUsername || 'demo name'}. you're in.
                </h1>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-4">
                  welcome to the <span className="text-[#00ff00] glow">BM Samay</span> chess community! we're thrilled to have you here. this is a big step, and we're extremely excited to have you join us.
                </p>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-4">
                  as a token of our appreciation, we've given you 100 <span className="text-[#00ff00] glow">BM Points</span> for early signup. use these points to earn rewards, make predictions, and get discounted offers on samay's merch, as well as a chance to win free show tickets.
                </p>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-4">
                  let's embark on this journey together and create something truly special. your participation and enthusiasm will help shape the future of this community.
                </p>
                <div className="text-center md:text-left">
                  <Button variant="outline" className="text-[#00ff00] border-[#00ff00] hover:bg-[#00ff00] hover:text-black transition-colors duration-300" onClick={handleCommunityStats}>
                    see community stats
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
                      border: '2px solid rgba(0, 255, 255, 0.5)', 
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                    }} 
                  />
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  <Button variant="outline" className="text-[#00ff00] border-[#00ff00] hover:bg-[#00ff00] hover:text-black transition-colors duration-300 text-sm">
                    Rapid: {chessStats.rapid}
                  </Button>
                  <Button variant="outline" className="text-[#00ff00] border-[#00ff00] hover:bg-[#00ff00] hover:text-black transition-colors duration-300 text-sm">
                    Blitz: {chessStats.blitz}
                  </Button>
                  <Button variant="outline" className="text-[#00ff00] border-[#00ff00] hover:bg-[#00ff00] hover:text-black transition-colors duration-300 text-sm">
                    Bullet: {chessStats.bullet}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
