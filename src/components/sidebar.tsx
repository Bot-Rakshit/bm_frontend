import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Home, Users, LogOut, Newspaper, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import samayBM from '@/assets/SamayBM.png';
import profileIcon from '@/assets/profile.png';

type NavItem = {
  name: string;
  path: string;
  icon: LucideIcon;
  comingSoon?: boolean;
};

const navItems: NavItem[] = [
  { name: 'Welcome', path: '/welcome', icon: Home },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Chess News', path: '/chessnews', icon: Newspaper },
  { name: 'Chess Tutorials', path: '/chesstutorials', icon: BookOpen },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token') || '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsDropdownOpen(false);
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

  const handleMouseLeave = (event: any) => {
    if (!isMobile) {
      if(event.relatedTarget && event.relatedTarget != window && event.currentTarget != event.relatedTarget){
        setIsHovered(false);
        setIsCollapsed(true);
      }
    }
  };

  const NavItem = ({ item, isActive }: { item: NavItem; isActive: boolean }) => (
    <Link
      to={`${item.path}?token=${token}`}
      className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
        isActive
          ? 'bg-neon-green/10 text-neon-green font-medium'
          : 'text-gray-400 hover:bg-neon-green/5 hover:text-neon-green'
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-4"
      >
        <item.icon className={`h-5 w-5 ${isCollapsed && !isHovered ? 'mr-0' : 'mr-3'}`} />
        {(!isCollapsed || isHovered) && <span className="text-sm whitespace-nowrap">{item.name}</span>}
      </motion.div>
      {(!isCollapsed || isHovered) && item.comingSoon && (
        <span className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded-full ml-auto">
          Soon
        </span>
      )}
    </Link>
  );

  const NavContent = () => (
    <div className={`flex flex-col h-full bg-gray-900 ${isCollapsed && !isHovered ? 'w-20' : 'w-64'} shadow-xl transition-all duration-300`}>
      <div className={`flex items-center ${isCollapsed && !isHovered ? 'justify-center' : 'justify-between'} px-4 py-6 border-b border-gray-800`}>
        {(!isCollapsed || isHovered) && (
          <div className="flex items-center gap-3">
            <img src={samayBM} alt="BM Samay Logo" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold text-neon-green">BM Samay</span>
          </div>
        )}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-neon-green hover:bg-neon-green/5 rounded-full"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        )}
      </div>
      <nav className="flex-1 py-6 space-y-1 px-3">
        {navItems.map((item) => (
          <NavItem key={item.name} item={item} isActive={location.pathname === item.path} />
        ))}
      </nav>
      <div className={`px-3 py-4 border-t border-gray-800 ${isCollapsed && !isHovered ? 'flex justify-center' : ''}`}>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={`w-full text-gray-400 hover:text-neon-green hover:bg-neon-green/5 rounded-lg ${isCollapsed && !isHovered ? 'justify-center px-0' : 'justify-start'}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Avatar className={`h-8 w-8 ${isCollapsed && !isHovered ? '' : 'mr-3'}`}>
                <AvatarImage src={profileIcon} alt="Profile" />
                <AvatarFallback>BM</AvatarFallback>
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
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`md:hidden fixed top-4 left-4 mt-3 ml-2 z-[60] text-neon-green bg-gray-900/50 backdrop-filter backdrop-blur-sm rounded-full ${isOpen ? 'hidden' : ''}`}
            onClick={() => setIsOpen(true)}
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-gray-900">
          <NavContent />
        </SheetContent>
      </Sheet>

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
    </>
  );
};

export default Sidebar;