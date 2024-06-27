
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
import { Menu, Home, Users, Zap, Award, LogOut } from 'lucide-react';
import samayBM from '@/assets/SamayBM.png';
import profileIcon from '@/assets/profile.png';

const navItems = [
  { name: 'Welcome', path: '/welcome', icon: Home },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Integrations', path: '#', icon: Zap, comingSoon: true },
  { name: 'BM Points', path: '#', icon: Award, comingSoon: true },
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
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-2 py-4">
        <img src={samayBM} alt="BM Samay Logo" className="h-10 w-10 object-contain" />
        <span className="text-lg font-bold">BM Samay</span>
      </div>
      <nav className="flex-1 px-2 py-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path + currentQueryParams}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              location.pathname === item.path
                ? 'bg-secondary text-secondary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
            {item.comingSoon && <span className="text-xs opacity-50">(coming soon)</span>}
          </Link>
        ))}
      </nav>
      <div className="px-2 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={profileIcon} alt="Profile" />
                <AvatarFallback>BM</AvatarFallback>
              </Avatar>
              <span>Profile</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogout}>
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
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <NavContent />
        </SheetContent>
      </Sheet>

      <div className="hidden md:flex h-screen w-64 flex-col border-r">
        <NavContent />
      </div>
    </>
  );
};

export default Sidebar;
