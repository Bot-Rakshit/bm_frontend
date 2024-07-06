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
import samayBM from '@/assets/SamayBM.png';
import profileIcon from '@/assets/profile.png';

const navItems = [
  { name: 'Welcome', path: '/welcome', icon: Home },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Integrations', path: '#', icon: Zap, comingSoon: true },
  { name: 'BM Points', path: '#', icon: Award, comingSoon: true },
  { name: 'Streamers', path: '#', icon: Video, comingSoon: true },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentQueryParams = location.search;

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/');
  };

  const NavContent = () => (
    <div className="flex flex-col h-full bg-black/80 backdrop-blur-md">
      <div className="flex items-center gap-2 px-4 py-4 border-b border-neon-green/10">
        <img src={samayBM} alt="BM Samay Logo" className="h-8 w-8 object-contain" />
        <span className="text-lg font-semibold text-neon-green">BM Samay</span>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path + currentQueryParams}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              location.pathname === item.path
                ? 'bg-neon-green/10 text-neon-green font-medium'
                : 'text-gray-300 hover:bg-neon-green/5 hover:text-neon-green'
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
            {item.comingSoon && <span className="text-xs opacity-50 ml-auto">(soon)</span>}
          </Link>
        ))}
      </nav>
      <div className="px-2 py-4 border-t border-neon-green/10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-neon-green hover:bg-neon-green/5">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={profileIcon} alt="Profile" />
                <AvatarFallback>BM</AvatarFallback>
              </Avatar>
              <span className="text-sm">Profile</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-black/90 border border-neon-green/10">
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
    <div className='flex'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50 text-neon-green">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-56 bg-black/80 backdrop-blur-md">
          <NavContent />
        </SheetContent>
      </Sheet>

      <div className="hidden md:block fixed w-56 h-screen bg-black/80 backdrop-blur-md border-r border-neon-green/10">
        <NavContent />
      </div>

      <div className="flex-1 ml-56 overflow-y-auto">
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
