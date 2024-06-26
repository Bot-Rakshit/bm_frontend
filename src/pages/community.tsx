import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import samayBM from '@/assets/SamayBM.png';
import profileIcon from '@/assets/profile.png';
import { Menu, X } from 'react-feather';
import Sidebar from '@/components/Sidebar';

export default function Community() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate(process.env.REACT_APP_FRONTEND_URL || "/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dark:bg-black dark:text-white h-screen w-full flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <header className="bg-white text-black px-4 lg:px-6 h-16 flex items-center justify-center shadow-md mt-4 mx-4 rounded-lg">
          <h1 className="text-xl font-bold">Community Statistics</h1>
        </header>
        <div className="bg-black p-8 flex flex-col gap-8 items-center justify-center flex-1">
          <div className="text-center md:text-left w-full max-w-4xl">
            <h1 className="text-5xl font-bold text-white">Welcome to the BM Samay Community Dashboard</h1>
            <p className="text-gray-400 font-mono mt-4">
              Here you can find all the statistics and leaderboards of our vibrant chess community. Stay updated with the latest numbers and see where you stand among the best!
            </p>
            <p className="text-gray-400 font-mono mt-2">
              Note: The average rating displayed is for rapid games.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-white">Total Users</h2>
              <p className="text-[#00ff00] text-4xl mt-4">1,234</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-white">Average Rating</h2>
              <p className="text-[#00ff00] text-4xl mt-4">1500</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-white">Highest Rapid Rating</h2>
              <p className="text-[#00ff00] text-4xl mt-4">2000</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-white">Highest Blitz Rating</h2>
              <p className="text-[#00ff00] text-4xl mt-4">1900</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-white">Highest Bullet Rating</h2>
              <p className="text-[#00ff00] text-4xl mt-4">1800</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-white">Total Games</h2>
              <p className="text-[#00ff00] text-4xl mt-4">5,678</p>
            </div>
          </div>
          <div className="w-full max-w-4xl mt-8">
            <h2 className="text-3xl font-bold text-white text-center">Leaderboards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-[#00ff00]">
                <h3 className="text-2xl font-bold text-white text-center">Top 10 Bullet</h3>
                <ul className="mt-4 text-white">
                  {Array.from({ length: 10 }, (_, i) => (
                    <li key={i} className="flex justify-between py-2 border-b border-gray-700">
                      <span>Player {i + 1}</span>
                      <span>{1800 - i * 10}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-[#00ff00]">
                <h3 className="text-2xl font-bold text-white text-center">Top 10 Blitz</h3>
                <ul className="mt-4 text-white">
                  {Array.from({ length: 10 }, (_, i) => (
                    <li key={i} className="flex justify-between py-2 border-b border-gray-700">
                      <span>Player {i + 1}</span>
                      <span>{1900 - i * 10}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-[#00ff00]">
                <h3 className="text-2xl font-bold text-white text-center">Top 10 Rapid</h3>
                <ul className="mt-4 text-white">
                  {Array.from({ length: 10 }, (_, i) => (
                    <li key={i} className="flex justify-between py-2 border-b border-gray-700">
                      <span>Player {i + 1}</span>
                      <span>{2000 - i * 10}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
