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
        <div className="bg-black p-8 flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  congrats, {user?.chessUsername || 'demo name'}. you're in.
                </h1>
                <p className="text-gray-400 text-lg">
                  welcome to the <span className="text-[#00ff00] glow">BM Samay</span> chess community! we're thrilled to have you here. this is a big step, and we're extremely excited to have you join us. the bm community is still in its beta phase, so there's a long way to go, but together, we can make it amazing. as a token of our appreciation, we've given you 100 <span className="text-[#00ff00] glow">BM Points</span> for early signup. use these points to earn rewards, make predictions, and get discounted offers on samay's merch, as well as a chance to win free show tickets. let's embark on this journey together and create something truly special.
                </p>
                <Button variant="outline" className="text-[#00ff00] border-[#00ff00] mt-6" onClick={handleCommunityStats}>
                  see community stats
                </Button>
              </div>
              <div className="lg:w-1/2 lg:pl-8">
                <img src={bmuniverse} alt="BM Samay" className="rounded-lg object-cover w-full" style={{ maxHeight: '60vh', objectFit: 'cover', objectPosition: 'center', border: '2px solid rgba(0, 255, 255, 0.5)', boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }} />
                <div className="flex justify-center mt-4 space-x-4">
                  <Button variant="outline" className="text-[#00ff00] border-[#00ff00]">
                    Rapid: {chessStats.rapid}
                  </Button>
                  <Button variant="outline" className="text-[#00ff00] border-[#00ff00]">
                    Blitz: {chessStats.blitz}
                  </Button>
                  <Button variant="outline" className="text-[#00ff00] border-[#00ff00]">
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
