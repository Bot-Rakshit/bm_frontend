import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import bmuniverse from '@/assets/bmuniverse.jpg';
import samayBM from '@/assets/SamayBM.png';
import profileIcon from '@/assets/profile.png';
import { Menu, X } from 'react-feather';
import Sidebar from '@/components/Sidebar';

export default function Welcome() {
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
      <div className="bg-black p-8 flex flex-col gap-8 items-center justify-center flex-1 ml-64">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl">
          <div className="text-center md:text-left md:w-1/2 md:pr-8">
            <h1 className="text-6xl font-bold text-white">congrats, demo name. you're in.</h1>
            <p className="text-gray-400 text-lg mt-4">
              welcome to the <span className="text-[#00ff00] glow">BM Samay</span> chess community! we're thrilled to have you here. this is a big step, and we're extremely excited to have you join us. the bm community is still in its beta phase, so there's a long way to go, but together, we can make it amazing. as a token of our appreciation, we've given you 100 <span className="text-[#00ff00] glow">BM Points</span> for early signup. use these points to earn rewards, make predictions, and get discounted offers on samay's merch, as well as a chance to win free show tickets. let's embark on this journey together and create something truly special.
            </p>
            <Button variant="outline" className="text-[#00ff00] border-[#00ff00] mt-6">
              see community stats
            </Button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img src={bmuniverse} alt="BM Samay" className="rounded-lg object-cover w-full" style={{ height: '70vh', objectFit: 'cover', objectPosition: 'center', border: '2px solid rgba(0, 255, 255, 0.5)', boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
