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
import { Home, Users, LogOut, Newspaper, BookOpen, ChevronLeft, ChevronRight, GraduationCap, Dices, Share2, MessageSquare } from 'lucide-react';
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
          <item.icon className={`h-5 w-5 ${isCollapsed && !isHovered ? 'mr-0' : 'mr-3'}`} />
          {(!isCollapsed || isHovered) && <span className="text-sm whitespace-nowrap">{item.name}</span>}
          {item.comingSoon && !isCollapsed && !isHovered && (
            <span className="text-xs text-gray-400 ml-auto">(Coming Soon)</span>
          )}
        </motion.div>
      </div>
    );

    return item.comingSoon ? (
      <div className="opacity-50 cursor-not-allowed">{content}</div>
    ) : (
      <Link to={item.path}>{content}</Link>
    );
  };

  return (
    <div
      className={`h-full ${isCollapsed ? 'w-20' : 'w-64'} bg-sidebar-blue text-white flex flex-col justify-between transition-all duration-300 ${isHovered ? 'shadow-lg' : ''
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <img
              src={samayBM}
              alt="Samay BM"
              className="h-12 w-auto transition-all duration-300"
            />
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="focus:outline-none"
          >
            <ChevronLeft
              className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'
                }`}
            />
          </button>
        </div>
        <nav className="flex flex-col space-y-2 mt-8">
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              isActive={location.pathname === item.path}
            />
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-800">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full flex justify-between items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profileIcon} alt="User profile" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <span className="ml-2 flex-1 text-left text-sm">User Name</span>
              )}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
