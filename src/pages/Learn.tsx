import ccl from '../assets/chesscomlogo.png';
import { FaChessKnight, FaExternalLinkAlt, FaChessBoard, FaPuzzlePiece, FaTrophy, FaChartLine, FaAward, FaBan } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Learn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-4 sm:p-8">
      <header className="bg-black/50 backdrop-filter backdrop-blur-lg px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between shadow-xl mb-6 rounded-2xl z-10 border border-neon-green/20">
        <h1 className="text-3xl sm:text-4xl font-extrabold flex items-center mb-4 sm:mb-0">
          <FaChessKnight className="text-neon-green mr-2 sm:mr-4 text-4xl sm:text-5xl" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-blue-500">
            Chess Learn
          </span>
        </h1>
        <div className="flex items-center bg-white/10 rounded-full px-3 py-1 sm:px-4 sm:py-2">
          <span className="mr-2 text-xs sm:text-sm font-medium">powered by</span>
          <img src={ccl} alt="Chess.com" className="h-6 sm:h-8" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-blue-500 mb-6">
            Elevate Your Chess Game with Chess.com
          </h1>
          <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto mt-6">
            Unlock your full potential with Chess.com's Diamond Membership. Get access to premium features and take your chess skills to the next level!
          </p>
          <a 
            href="https://go.chess.com/samay"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-neon-green text-black font-bold py-3 px-6 rounded-full text-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
          >
            Get Diamond Membership <FaExternalLinkAlt className="inline ml-2" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={FaChessBoard}
            title="Unlimited Game Analysis"
            description="Get detailed insights into your games with unlimited access to the Game Review tool. Understand your mistakes and learn from them."
          />
          <FeatureCard
            icon={FaChartLine}
            title="Unlimited Lessons"
            description="Access all video lessons and courses from top coaches and grandmasters. Follow structured courses designed for all skill levels."
          />
          <FeatureCard
            icon={FaPuzzlePiece}
            title="Unlimited Puzzles"
            description="Improve your tactical skills with unlimited access to Puzzle Rush and Puzzle Battle. Practice without restrictions."
          />
          <FeatureCard
            icon={FaTrophy}
            title="Advanced Insights"
            description="Study openings with the extensive explorer tool. Practice specific positions and endgames with tailored exercises."
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center bg-black/40 backdrop-filter backdrop-blur-md rounded-2xl p-8 border border-neon-green/20"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Chess Journey?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join Chess.com's Diamond Membership today and experience the difference. Samay Raina recommends it!
          </p>
          <a 
            href="https://go.chess.com/samay"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-neon-green text-black font-bold py-3 px-6 rounded-full text-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
          >
            Support Samay & Get Diamond Membership <FaExternalLinkAlt className="inline ml-2" />
          </a>
        </motion.div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="bg-black/60 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/20"
  >
    <Icon className="text-4xl text-neon-green mb-4" />
    <h3 className="text-2xl font-bold mb-4 text-neon-green">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

export default Learn;