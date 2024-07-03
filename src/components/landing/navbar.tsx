import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import BMSamayLogo from '../../assets/SamayBM.png';
import { Youtube, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${isScrolled ? 'bg-black/80' : ''}`}>
      <nav className={`max-w-7xl mx-auto ${isScrolled ? '' : 'bg-black/20 backdrop-filter backdrop-blur-lg border border-neon-green/30 rounded-full'} px-4 sm:px-6 py-2 sm:py-3 shadow-lg shadow-neon-green/20`}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={BMSamayLogo} alt="BM Samay Logo" className="h-8 sm:h-10 w-auto" />
          </Link>
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <NavLink to="/community">Community</NavLink>
            <Button variant="outline" className="border-2 border-neon-green/50 text-white hover:bg-neon-green/20 hover:border-neon-green transition-all duration-300 rounded-full px-4 lg:px-6 py-1 lg:py-2 text-xs lg:text-sm font-semibold" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button className="bg-neon-green text-black hover:bg-neon-green/80 transition-all duration-300 rounded-full px-4 lg:px-6 py-1 lg:py-2 text-xs lg:text-sm font-semibold flex items-center shadow-md shadow-neon-green/30" asChild>
              <a href="https://www.youtube.com/channel/UCAov2BBv1ZJav0c_yHEciAw/streams" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                <span>Live</span>
              </a>
            </Button>
          </div>
          <button className="md:hidden text-white hover:text-neon-green transition-colors duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-black/80 backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden border border-neon-green/30 shadow-lg shadow-neon-green/20">
          <div className="px-4 py-3 space-y-2">
            <NavLink to="/community" mobile>Community</NavLink>
            <Button variant="outline" className="w-full border-2 border-neon-green/50 text-white hover:bg-neon-green/20 hover:border-neon-green transition-all duration-300 rounded-full py-2 text-sm font-semibold" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button className="w-full bg-neon-green text-black hover:bg-neon-green/80 transition-all duration-300 rounded-full py-2 text-sm font-semibold flex items-center justify-center shadow-md shadow-neon-green/30" asChild>
              <a href="https://www.youtube.com/channel/UCAov2BBv1ZJav0c_yHEciAw/streams" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-4 w-4 mr-2" />
                <span>Live</span>
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children, mobile = false }: { to: string; children: React.ReactNode; mobile?: boolean }) {
  const baseClasses = "text-white hover:text-neon-green transition-colors duration-300 font-medium text-sm";
  const mobileClasses = mobile ? "block py-2" : "";
  return (
    <Link to={to} className={`${baseClasses} ${mobileClasses}`}>
      {children}
    </Link>
  );
}
