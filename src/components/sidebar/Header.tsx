import { FaChessKnight } from 'react-icons/fa';
import chessbaseLogo from '@/assets/cbi.svg';
import chesscomLogo from '@/assets/chesscomlogo.webp';
import MobileMenu from './MobileMenu'
import { navItems } from './Sidebar';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
    headerTitle: string;
    lastUpdated?: Date | null;
    showChessbase?: boolean;
    showChesscom?: boolean;
    className?: string;
}

export default function Header({ headerTitle, lastUpdated, showChessbase, showChesscom, className = '' }: HeaderProps) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token') || '';

    const renderEndContent = () => {
        if (showChessbase || showChesscom) {
            return (
                <div className="flex items-center bg-white/10 rounded-full px-2 py-1 sm:px-3 sm:py-2">
                    <span className="mr-1 text-xs sm:text-sm font-medium">  powered by</span>
                    {showChessbase && (
                        <img src={chessbaseLogo} alt="ChessBase India" className="h-5 sm:h-6" />
                    )}
                    {showChessbase && showChesscom && (
                        <span className="mx-1 text-xs sm:text-sm font-medium">&</span>
                    )}
                    {showChesscom && (
                        <img src={chesscomLogo} alt="Chess.com" className="h-5 sm:h-6" />
                    )}
                </div>
            );
        } else if (lastUpdated) {
            return (
                <p className="text-sm text-gray-300">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
            );
        } else {
            return (
                <FaChessKnight className="w-8 h-8 text-neon-green" />
            );
        }
    };

    return (
        <header className={`bg-white/10 backdrop-filter backdrop-blur-lg text-white px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg z-10 ${className}`}>
            <div className="flex items-center">
                <div className="w-8 mr-4">
                    <MobileMenu navItems={navItems} token={token} />
                </div>
                <h1 className="text-xl font-bold">{headerTitle}</h1>
            </div>
            {renderEndContent()}
        </header>
    )
}