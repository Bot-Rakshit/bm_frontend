import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, Users, LogOut, Newspaper, BookOpen, GraduationCap, Dices, Share2, MessageSquare } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import samayBM from '@/assets/SamayBM.webp';
import profileIcon from '@/assets/profile.webp';

export type NavItem = {
  name: string;
  path: string;
  icon: LucideIcon;
  comingSoon?: boolean;
};

export const navItems: NavItem[] = [
  { name: 'Welcome', path: '/welcome', icon: Home },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Chess News', path: '/chessnews', icon: Newspaper },
  { name: 'Chess Tutorials', path: '/chesstutorials', icon: BookOpen },
  { name: 'Bulletin Board', path: '/bulletinboard', icon: MessageSquare },
  { name: 'Learn', path: '/learn', icon: GraduationCap },
  { name: 'Guess the Elo', path: '/', icon: Dices, comingSoon: true },
  { name: 'Share Your Games', path: '/', icon: Share2, comingSoon: true },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token') || '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const NavItem = ({ item, isActive }: { item: NavItem; isActive: boolean }) => (
    <div
      className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
        ? 'bg-neon-green/10 text-neon-green font-medium'
        : 'text-gray-400'
        } ${item.comingSoon ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <item.icon className={`h-5 w-5 mr-3`} />
      <span className="text-sm whitespace-nowrap">{item.name}</span>
      {item.comingSoon && (
        <span className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded-full ml-auto">
          Soon
        </span>
      )}
    </div>
  );

  const NavContent = () => (
    <div className={`flex flex-col h-full bg-gray-900 w-64 shadow-xl transition-all duration-300`}>
      <div className={`flex items-center justify-between px-4 py-6 border-b border-gray-800`}>
        <div className="flex items-center gap-3">
          <img src={samayBM} alt="BM Samay Logo" className="h-8 w-8 object-contain" />
          <span className="text-lg font-bold text-neon-green">BM Samay</span>
        </div>
      </div>
      <nav className="flex-1 py-6 space-y-1 px-3">
        {navItems.map((item) => (
          <Link key={item.name} to={`${item.path}?token=${token}`}>
            <NavItem item={item} isActive={location.pathname === item.path} />
          </Link>
        ))}
      </nav>
      <div className={`px-3 py-4 border-t border-gray-800 flex justify-center`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full text-gray-400 hover:text-neon-green hover:bg-neon-green/5 rounded-lg`}
            >
              <Avatar className={`h-8 w-8`}>
                <AvatarImage src={profileIcon} alt="Profile" />
                <AvatarFallback>BM</AvatarFallback>
              </Avatar>
              <span className="text-sm">Profile</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-gray-800 border border-gray-700">
            <DropdownMenuItem onClick={handleLogout} className="text-gray-300 hover:text-neon-green hover:bg-neon-green/5 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: 256 }}
        animate={{ width: 256 }}
        exit={{ width: 256 }}
        transition={{ duration: 0.3 }}
        className="hidden md:block h-screen"
      >
        <NavContent />
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
