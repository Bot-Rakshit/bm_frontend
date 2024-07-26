import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import BMSamayLogo from '../../assets/SamayBM.webp';
import { Youtube, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const getToken = () => {
      const storedToken = localStorage.getItem('token');
      const urlParams = new URLSearchParams(location.search);
      const urlToken = urlParams.get('token');
      
      if (urlToken) {
        localStorage.setItem('token', urlToken);
        return urlToken;
      }
      return storedToken;
    };

    const currentToken = getToken();
    setToken(currentToken);
  }, [location.search]);

  const handleGoToApp = () => {
    if (token) {
      window.location.href = `/welcome?token=${token}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-6">
      <nav className="max-w-7xl mx-auto bg-black/20 backdrop-filter backdrop-blur-lg border border-neon-green/30 rounded-full px-6 py-3 shadow-lg shadow-neon-green/20">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={BMSamayLogo} alt="BM Samay Logo" className="h-12 w-auto" />
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {token ? (
              <Button 
                className="bg-neon-green text-black hover:bg-neon-green/80 transition-all duration-300 rounded-full px-6 py-2 font-semibold text-sm flex items-center"
                onClick={handleGoToApp}
              >
                Go to App
              </Button>
            ) : (
              <Button variant="outline" className="border-2 border-neon-green/50 text-white hover:bg-neon-green/20 hover:border-neon-green transition-all duration-300 rounded-full px-6 py-2 font-semibold text-sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            )}
            <Button className="bg-neon-green text-black hover:bg-neon-green/80 transition-all duration-300 rounded-full px-6 py-2 font-semibold text-sm flex items-center shadow-md shadow-neon-green/30" asChild>
              <a href="https://www.youtube.com/channel/UCAov2BBv1ZJav0c_yHEciAw/streams" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-4 w-4 mr-2" />
                <span>Live</span>
              </a>
            </Button>
          </div>
          <motion.button
            className="md:hidden text-white hover:text-neon-green transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 bg-black/80 backdrop-filter backdrop-blur-lg rounded-3xl overflow-hidden border border-neon-green/50 shadow-lg shadow-neon-green/30"
          >
            <div className="p-6 space-y-4">
              {token ? (
                <Button 
                  className="w-full bg-neon-green text-black hover:bg-neon-green/80 transition-all duration-300 rounded-full py-3 font-semibold text-base flex items-center justify-center"
                  onClick={handleGoToApp}
                >
                  Go to App
                </Button>
              ) : (
                <Button variant="outline" className="w-full border-2 border-neon-green/50 text-white hover:bg-neon-green/20 hover:border-neon-green transition-all duration-300 rounded-full py-3 font-semibold text-base" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}