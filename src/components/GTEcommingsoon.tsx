// ComingSoonSection.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaTrophy, FaMedal } from 'react-icons/fa';

interface ComingSoonSectionProps {
  title: string;
  icon: React.ReactNode;
}

const ComingSoonSection: React.FC<ComingSoonSectionProps> = ({ title, icon }) => {
  return (
    <motion.div
      className="bg-gray-800/50 p-6 rounded-2xl shadow-2xl border border-neon-green/20"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-2xl font-semibold mb-4 flex items-center text-neon-green">
        {icon}
        {title}
      </h3>
      <div className="flex items-center justify-center">
        <FaLock className="text-4xl text-gray-500 mr-4" />
        <p className="text-xl text-gray-400">Coming Soon</p>
      </div>
    </motion.div>
  );
};

export default ComingSoonSection;
