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
import { Menu, Home, Users, Zap, Award, LogOut, Video, Newspaper, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import samayBM from '@/assets/SamayBM.png';
import profileIcon from '@/assets/profile.png';

const navItems = [
  { name: 'Welcome', path: '/welcome', icon: Home },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Chess News', path: '/chessnews', icon: Newspaper },
  { name: 'Chess Tutorials', path: '/chesstutorials', icon: BookOpen },
  { name: 'Integrations', path: '/comingsoon', icon: Zap, comingSoon: true },
  { name: 'BM Points', path: '/comingsoon', icon: Award, comingSoon: true },
  { name: 'Streamers', path: '/comingsoon', icon: Video, comingSoon: true },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token') || '';

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const NavItem = ({ item, isActive }: { item: typeof navItems[number]; isActive: boolean }) => (
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
        <item.icon className={`h-5 w-5 ${isCollapsed ? 'mr-0' : 'mr-3'}`} />
        {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.name}</span>}
      </motion.div>
      {!isCollapsed && item.comingSoon && (
        <span className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded-full ml-auto">
          Soon
        </span>
      )}
    </Link>
  );

  const NavContent = () => (
    <div className={`flex flex-col h-full bg-gray-900 ${isCollapsed ? 'w-20' : 'w-64'} shadow-xl transition-all duration-300`}>
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-6 border-b border-gray-800`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <img src={samayBM} alt="BM Samay Logo" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold text-neon-green">BM Samay</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-neon-green hover:bg-neon-green/5 rounded-full"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      <nav className="flex-1 py-6 space-y-1 px-3">
        {navItems.map((item) => (
          <NavItem key={item.name} item={item} isActive={location.pathname === item.path} />
        ))}
      </nav>
      <div className={`px-3 py-4 border-t border-gray-800 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={`w-full justify-start text-gray-400 hover:text-neon-green hover:bg-neon-green/5 rounded-lg ${isCollapsed ? 'px-0' : ''}`}>
              <Avatar className={`h-8 w-8 ${isCollapsed ? '' : 'mr-3'}`}>
                <AvatarImage src={profileIcon} alt="Profile" />
                <AvatarFallback>BM</AvatarFallback>
              </Avatar>
              {!isCollapsed && <span className="text-sm">Profile</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-gray-800 border border-gray-700">
            <DropdownMenuItem onClick={handleLogout} className="text-gray-300 hover:text-neon-green hover:bg-neon-green/5">
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
            className={`md:hidden fixed top-4 left-4 z-[60] text-neon-green bg-gray-900/50 backdrop-filter backdrop-blur-sm rounded-full ${isOpen ? 'hidden' : ''}`}
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
          initial={{ width: isCollapsed ? 80 : 256 }}
          animate={{ width: isCollapsed ? 80 : 256 }}
          exit={{ width: 80 }}
          transition={{ duration: 0.3 }}
          className="hidden md:block h-screen"
        >
          <NavContent />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Sidebar;