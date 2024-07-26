import React from 'react';
import diamondImage from '../assets/diamond.webp';
import { FaExternalLinkAlt, FaChessBoard, FaPuzzlePiece, FaTrophy, FaChartLine, FaAward, FaBan } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Sidebar from '@/components/sidebar/Sidebar';
import Background from '@/components/Background';
import Header from '@/components/sidebar/Header';

const Learn = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col relative w-full">
        <Background />
        <Header
          headerTitle="Chess Learn"
          showChesscom
        />
        <main className="flex-1 p-6 md:p-10 z-10 overflow-auto overflow-x-hidden">
          <HeroSection />
          <FeaturesSection />
          <CTASection />
        </main>
      </div>
    </div>
  );
};

const HeroSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-24 relative py-24"
  >
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <img src={diamondImage} alt="Diamond Background" className="w-full h-full object-contain" />
      </motion.div>
    </div>
    <div className="relative z-10">
      <motion.h1
        className="text-7xl md:text-8xl font-extrabold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-green via-blue-500 to-purple-500">
          Elevate
        </span>
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-neon-green">
          Your Chess Game
        </span>
      </motion.h1>
      <motion.p
        className="text-xl text-gray-300 font-light max-w-3xl mx-auto mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Unlock your full potential with Chess.com's Diamond Membership. Get access to premium features and take your chess skills to the next level!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <DiamondMembershipButton />
      </motion.div>
    </div>
  </motion.div>
);

const FeaturesSection = () => (
  <div className="mb-24">
    <h2 className="text-4xl font-bold text-center mb-12 text-neon-green">Premium Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.img
          src={diamondImage}
          alt="Diamond Membership"
          className="w-96 h-96 object-contain opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <FeatureCard
        icon={FaChessBoard}
        title="Unlimited Game Analysis"
        description="Get detailed insights into your games with unlimited access to the Game Review tool."
      />
      <FeatureCard
        icon={FaChartLine}
        title="Unlimited Lessons"
        description="Access all video lessons and courses from top coaches and grandmasters."
      />
      <FeatureCard
        icon={FaPuzzlePiece}
        title="Unlimited Puzzles"
        description="Improve your tactical skills with unlimited access to Puzzle Rush and Puzzle Battle."
      />
      <FeatureCard
        icon={FaTrophy}
        title="Advanced Insights"
        description="Study openings with the extensive explorer tool and practice specific positions."
      />
      <FeatureCard
        icon={FaAward}
        title="Premium Tournaments"
        description="Participate in exclusive Diamond member-only tournaments and events."
      />
      <FeatureCard
        icon={FaBan}
        title="Ad-Free Experience"
        description="Enjoy an uninterrupted chess experience with no advertisements."
      />
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/20 group relative z-10"
  >
    <div className="bg-neon-green/10 rounded-full p-4 inline-block mb-4 group-hover:bg-neon-green/20 transition-all duration-300">
      <Icon className="text-3xl text-neon-green" />
    </div>
    <h3 className="text-2xl font-bold mb-4 text-neon-green group-hover:text-white transition-all duration-300">{title}</h3>
    <p className="text-gray-300 group-hover:text-white transition-all duration-300">{description}</p>
  </motion.div>
);

const CTASection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="text-center bg-black/40 backdrop-filter backdrop-blur-md rounded-2xl p-8 border border-neon-green/20"
  >
    <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Chess Journey?</h2>
    <p className="text-xl text-gray-300 mb-8">
      Join Chess.com's Diamond Membership today and experience the difference. Samay Raina recommends it, and your support through this link helps fuel more great chess content!
    </p>
    <DiamondMembershipButton />
  </motion.div>
);

const DiamondMembershipButton = () => (
  <motion.a
    href="https://go.chess.com/samay"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-8 bg-gradient-to-r from-neon-green to-blue-500 text-black font-bold py-3 px-6 rounded-full text-lg hover:from-white hover:to-gray-200 transition-all duration-300 shadow-lg hover:shadow-neon-green/50"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Get Diamond Membership <FaExternalLinkAlt className="inline ml-2" />
  </motion.a>
);

export default Learn;