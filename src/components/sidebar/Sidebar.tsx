import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, Users, LogOut, Newspaper, BookOpen, ChevronRight, GraduationCap, Dices, Share2 } from 'lucide-react';
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

// eslint-disable-next-line react-refresh/only-export-components
export const navItems: NavItem[] = [
  { name: 'Welcome', path: '/welcome', icon: Home },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Chess News', path: '/chessnews', icon: Newspaper },
  { name: 'Chess Tutorials', path: '/chesstutorials', icon: BookOpen },
  { name: 'Guess the Elo', path: '/gte', icon: Dices},
  { name: 'Learn', path: '/learn', icon: GraduationCap },
  { name: 'Share Your Games', path: '/', icon: Share2, comingSoon: true }
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
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
      setIsCollapsed(mobile ? false : true);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
      setIsCollapsed(false);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile) {
      if (event.relatedTarget && event.relatedTarget !== window && event.currentTarget !== event.relatedTarget) {
        setIsHovered(false);
        setIsCollapsed(true);
      }
    }
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  const NavItem = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
    const content = (
      <div
        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
          ? 'bg-neon-green/10 text-neon-green font-medium'
          : 'text-gray-400 hover:bg-neon-green/5 hover:text-neon-green'
          } ${item.comingSoon ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <motion.div
          whileHover={{ scale: item.comingSoon ? 1 : 1.05 }}
          whileTap={{ scale: item.comingSoon ? 1 : 0.95 }}
          className="flex items-center gap-4"
        >
          <item.icon className={`h-5 w-5 ${isCollapsed && !isHovered ? 'mr-0' : 'mr-3'}`} aria-hidden="true"/>
          {(!isCollapsed || isHovered) && <span className="text-sm whitespace-nowrap">{item.name}</span>}
        </motion.div>
        {(!isCollapsed || isHovered) && item.comingSoon && (
          <span className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded-full ml-auto">
            Soon
          </span>
        )}
      </div>
    );

    return item.comingSoon ? (
      <div>{content}</div>
    ) : (
      <Link to={`${item.path}?token=${token}`}>{content}</Link>
    );
  };

  const NavContent = () => (
    <div className={`flex flex-col h-full bg-gray-900 ${isCollapsed && !isHovered ? 'w-20' : 'w-64'} shadow-xl transition-all duration-300`}>
      <div className={`flex items-center ${isCollapsed && !isHovered ? 'justify-center' : 'justify-between'} px-4 py-6 border-b border-gray-800`}>
        {(!isCollapsed || isHovered) && (
          <div className="flex items-center gap-2">
            <img src={samayBM} alt="BM Samay Logo" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold text-neon-green">BM Samay</span>
          </div>
        )}
        {!isMobile && !isHovered && isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleCollapse}
            className="text-gray-400 hover:text-neon-green hover:bg-neon-green/5 rounded-full"
          >
            <ChevronRight size={20} />
          </Button>
        )}
      </div>
      <nav className="flex-1 py-10 space-y px-3">
        {navItems.map((item) => (
          <NavItem key={item.name} item={item} isActive={location.pathname === item.path} />
        ))}
      </nav>
      <div className={`px-3 py-4 border-t border-gray-800 ${isCollapsed && !isHovered ? 'flex justify-center' : ''}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full text-gray-400 hover:text-neon-green hover:bg-neon-green/5 rounded-lg ${isCollapsed && !isHovered ? 'justify-center px-0' : 'justify-start'}`}
            >
              <Avatar className={`h-8 w-8 ${isCollapsed && !isHovered ? '' : 'mr-3'}`}>
                <AvatarImage src={profileIcon} alt="Profile" />
              </Avatar>
              {(!isCollapsed || isHovered) && <span className="text-sm">Profile</span>}
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
        initial={{ width: 80 }}
        animate={{ width: isCollapsed && !isHovered ? 80 : 256 }}
        exit={{ width: 80 }}
        transition={{ duration: 0.3 }}
        className="hidden md:block h-screen"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NavContent />
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
