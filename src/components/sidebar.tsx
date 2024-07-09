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
import { Menu, Home, Users, Zap, Award, LogOut, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import samayBM from '@/assets/SamayBM.png';
import profileIcon from '@/assets/profile.png';

const navItems = [
  { name: 'Welcome', path: '/welcome', icon: Home },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Integrations', path: '/comingsoon', icon: Zap, comingSoon: true },
  { name: 'BM Points', path: '/comingsoon', icon: Award, comingSoon: true },
  { name: 'Streamers', path: '/comingsoon', icon: Video, comingSoon: true },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token') || '';

  const handleLogout = () => {
    navigate('/');
  };

  const NavItem = ({ item, isActive }: { item: typeof navItems[number]; isActive: boolean }) => (
    <Link
      to={`${item.path}?token=${token}`}
      className={`flex items-center gap-4 px-6 py-3 transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-neon-green/20 to-transparent text-neon-green font-medium'
          : 'text-gray-300 hover:bg-neon-green/5 hover:text-neon-green'
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-4"
      >
        <item.icon className="h-5 w-5" />
        <span className="text-sm">{item.name}</span>
      </motion.div>
      {item.comingSoon && (
        <span className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded-full ml-auto">
          Soon
        </span>
      )}
    </Link>
  );

  const NavContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-black/95 to-gray-900/95 backdrop-blur-lg w-64 shadow-xl">
      <div className="flex items-center gap-4 px-6 py-8 border-b border-neon-green/10">
        <img src={samayBM} alt="BM Samay Logo" className="h-12 w-12 object-contain" />
        <span className="text-2xl font-bold text-neon-green">BM Samay</span>
      </div>
      <nav className="flex-1 py-6 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.name} item={item} isActive={location.pathname === item.path} />
        ))}
      </nav>
      <div className="px-6 py-6 border-t border-neon-green/10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-neon-green hover:bg-neon-green/5 rounded-lg">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={profileIcon} alt="Profile" />
                <AvatarFallback>BM</AvatarFallback>
              </Avatar>
              <span className="text-sm">Profile</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-black/95 border border-neon-green/10">
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
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50 text-neon-green">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-black/95 backdrop-blur-lg">
          <NavContent />
        </SheetContent>
      </Sheet>

      <div className="hidden md:block h-screen">
        <NavContent />
      </div>
    </>
  );
};

export default Sidebar;
