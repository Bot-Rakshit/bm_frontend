import {FaChessKnight } from 'react-icons/fa';
import chessbaseLogo from '@/assets/cbi.svg';
import chesscomLogo from '@/assets/chesscomlogo.webp';


export default function Header({headerTitle,lastUpdated,showChessbase,showChesscom}:{headerTitle:string,lastUpdated?:Date,showChessbase?:boolean,showChesscom?:boolean}){
    return (
        <header className="bg-white/10 backdrop-filter backdrop-blur-lg text-white px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg z-10">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">{headerTitle}</h1>
          </div>
          {lastUpdated && (
            <p className="text-sm text-gray-300">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
          <div className="flex items-center space-x-4">
            {showChessbase &&  (
               <div className="flex items-center bg-white/10 rounded-full px-3 py-1 sm:px-4 sm:py-2">
                <span className="mr-2 text-xs sm:text-sm font-medium">powered by</span>
                <img src={chessbaseLogo} alt="ChessBase India" className="h-6 sm:h-8" />
              </div>
            )}
            {showChesscom &&  (
                <div className="flex items-center bg-white/10 rounded-full px-3 py-1 sm:px-4 sm:py-2">
                    <span className="mr-2 text-xs sm:text-sm font-medium">and</span>
                    <img src={chesscomLogo} alt="Chess.com" className="h-6 sm:h-8" />
                </div>
            )}
          </div>
          { !lastUpdated && !showChesscom && !showChessbase && (
             <FaChessKnight className="w-8 h-8 text-neon-green" />
          )}
        </header>
    )
}