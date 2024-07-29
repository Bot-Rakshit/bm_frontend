import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, LogOut } from 'lucide-react';
import { NavItem } from './Sidebar';
import samayBM from '@/assets/SamayBM.webp';

type MobileMenuProps = {
    navItems: NavItem[];
    token: string;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, token }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        setIsOpen(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-neon-green bg-gray-900/50 backdrop-filter backdrop-blur-sm rounded-full"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 bg-gray-900 flex flex-col">
                <div className="flex items-center gap-3 px-4 py-6 border-b border-gray-800">
                    <img src={samayBM} alt="BM Samay Logo" className="h-8 w-8 object-contain" />
                    <span className="text-lg font-bold text-neon-green">BM Samay</span>
                </div>
                <nav className="flex-1 py-6 space-y-1 px-3 overflow-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={`${item.path}?token=${token}`}
                            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                                location.pathname === item.path
                                    ? 'bg-neon-green/10 text-neon-green font-medium'
                                    : 'text-gray-400 hover:bg-neon-green/5 hover:text-neon-green'
                            } ${item.comingSoon ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <item.icon className="h-5 w-5 mr-3" />
                            <span className="text-sm">{item.name}</span>
                            {item.comingSoon && (
                                <span className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded-full ml-auto">
                                    Soon
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>
                <div className="px-3 py-4 border-t border-gray-800">
                    <Button
                        variant="ghost"
                        className="w-full text-gray-400 hover:text-neon-green hover:bg-neon-green/5 rounded-lg justify-start"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-5 w-5 mr-3" />
                        <span className="text-sm">Log out</span>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;