// import React from 'react';
import cbiimg from '../assets/cbi.svg';
import ccl from '../assets/chesscomlogo.png';

const Learn = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(to bottom right, #1a202c, #2d3748, #4a5568)',
        minHeight: '100vh',
        padding: '2rem', // Adjusted padding for overall margins
       

      }}
    >
      <header className="bg-black/50 backdrop-filter backdrop-blur-lg text-white px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between shadow-xl mb-6 rounded-2xl z-10 border border-neon-green/20">
        <h1 className="text-3xl sm:text-4xl font-extrabold flex items-center mb-4 sm:mb-0">
          <svg
            aria-label="Chess Learn"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 384 512"
            className="text-neon-green mr-2 sm:mr-4 text-4xl sm:text-5xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 272.47l40.63 18.06a32 32 0 0 0 24.88.47l12.78-5.12a32 32 0 0 0 18.76-20.5l9.22-30.65a24 24 0 0 1 12.55-15.65L159.94 208v50.33a48 48 0 0 1-26.53 42.94l-57.22 28.65A80 80 0 0 0 32 401.48V416h319.86V224c0-106-85.92-192-191.92-192H12A12 12 0 0 0 0 44a16.9 16.9 0 0 0 1.79 7.58L16 80l-9 9a24 24 0 0 0-7 17v137.21a32 32 0 0 0 19 29.26zM52 128a20 20 0 1 1-20 20 20 20 0 0 1 20-20zm316 320H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
          </svg>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-blue-500">
            Chess Learn
          </span>
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white/10 rounded-full px-3 py-1 sm:px-4 sm:py-2">
            <span className="mr-2 text-xs sm:text-sm font-medium">
              powered by
            </span>
            <img src={cbiimg} alt="ChessBase India" className="h-6 sm:h-8" />
          </div>
          <div className="flex items-center bg-white/10 rounded-full px-3 py-1 sm:px-4 sm:py-2">
            <span className="mr-2 text-xs sm:text-sm font-medium">and</span>
            <img src={ccl} alt="Chess.com" className="h-6 sm:h-8" />
          </div>
          {/* New Affiliate Link Button */}
          <a 
            href="https://go.chess.com/samay"
            target="_blank"
            rel="noopener noreferrer"
           className= "flex items-center bg-white/10 rounded-full px-3 py-1 sm:px-4 sm:py-2"
          >
            Support Samay
          </a>
        </div>
      </header>
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-blue-500 mb-6">
          Why Diamond Membership?
        </h1>
        <hr
          className="border-gray-600"
          style={{ borderTop: '1px solid #4a5568' }}
        />
        <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto mt-6">
          Upgrading to a Diamond Membership on Chess.com provides you with a
          comprehensive suite of tools and resources to significantly improve
          your chess skills. Whether you're a beginner or an advanced player,
          the Diamond Membership offers unmatched value with unlimited access to
          lessons, puzzles, and game analysis, helping you to become a better
          chess player faster.
        </p>
      </div>
      <div className="mb-12">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
          Chess.com Diamond Membership Features
        </h3>
        <h2 className="text-2xl font-bold mb-4 text-neon-green hover:text-white transition-colors duration-300">
          1. Unlimited Game Analysis:
        </h2>
        <p className="text-gray-300 mb-6 text-base">
          In-Depth Analysis: Get detailed insights into your games with
          unlimited access to the Game Review tool, which helps you understand
          your mistakes and learn from them.
        </p>
        <p className="text-gray-300 mb-6 text-base">
          Blunders and Mistakes: Pinpoint your errors and see suggested
          improvements.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-neon-green hover:text-white transition-colors duration-300">
          2. Unlimited Lessons:
        </h2>
        <p className="text-gray-300 mb-6 text-base">
          Access to All Lessons: Unlock all video lessons and courses from top
          coaches and grandmasters.
        </p>
        <p className="text-gray-300 mb-6 text-base">
          Tailored Learning Paths: Follow structured courses designed for
          various skill levels, from beginner to advanced players.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-neon-green hover:text-white transition-colors duration-300">
          3. Unlimited Puzzles:
        </h2>
        <p className="text-gray-300 mb-6 text-base">
          Puzzle Rush and Puzzle Battle: Compete against yourself and others in
          fast-paced puzzle-solving competitions.
        </p>
        <p className="text-gray-300 mb-6 text-base">
          Unlimited Attempts: Practice with puzzles without any restrictions to
          improve your tactical skills.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-neon-green hover:text-white transition-colors duration-300">
          4. Priority Support:
        </h2>
        <p className="text-gray-300 mb-6 text-base">
          Faster Response Times: Receive priority assistance from Chess.com's
          support team.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-neon-green hover:text-white transition-colors duration-300">
          5. No Ads:
        </h2>
        <p className="text-gray-300 mb-6 text-base">
          Ad-Free Experience: Enjoy an uninterrupted chess experience with no
          advertisements.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-neon-green hover:text-white transition-colors duration-300">
          6. Access to All Videos:
        </h2>
        <p className="text-gray-300 mb-6 text-base">
          Video Library: Watch exclusive videos on various chess topics,
          strategies, and tactics from renowned chess instructors.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-neon-green hover:text-white transition-colors duration-300">
          7. Advanced Insights:
        </h2>
        <p className="text-gray-300 mb-6 text-base">
          Opening Explorer: Study various openings with the extensive opening
          explorer tool.
        </p>
        <p className="text-gray-300 mb-6 text-base">
          Drills and Exercises: Practice specific positions and endgames with
          tailored exercises.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-neon-green hover:text-white transition-colors duration-300">
          8. Premium Tournaments:
        </h2>
        <p className="text-gray-300 mb-6 text-base">
          Exclusive Events: Participate in Diamond member-only tournaments and
          events.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-neon-green hover:text-white transition-colors duration-300">
          9. Connect with a Community:
        </h2>
        <p className="text-gray-300 mb-6 text-base">
          Clubs and Teams: Join exclusive clubs and teams to connect with other
          serious chess players.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-neon-green hover:text-white transition-colors duration-300">
          10. Enhanced Social Features:
        </h2>
        <p className="text-gray-300 mb-6 text-base">
          Extended Friends List: Add more friends to your list and easily
          connect with other chess enthusiasts.
        </p>
      </div>

    </div>
  );
};

export default Learn;
