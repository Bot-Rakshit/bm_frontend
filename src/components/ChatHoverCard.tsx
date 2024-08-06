import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { FaChessKnight } from 'react-icons/fa';

interface UserRating {
  chessUsername: string;
  ratings: {
    blitz: number;
    bullet: number;
    rapid: number;
  };
}

interface ChatHoverCardProps {
  username: string;
  userRating?: UserRating;
}

const ChatHoverCard: React.FC<ChatHoverCardProps> = ({ username, userRating }) => {
  const handleClick = () => {
    if (userRating) {
      window.open(`https://www.chess.com/member/${userRating.chessUsername}`, '_blank');
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger>
        <span
          className="text-gray-300 cursor-pointer relative group flex items-center"
          onClick={handleClick}
        >
          <FaChessKnight className="text-neon-green mr-1" />
          {username}
          <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-neon-green scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="bg-gray-800 text-gray-300 p-4 rounded-md shadow-lg border border-gray-700 z-[9999]" side="right">
        {userRating ? (
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4">
              <FaChessKnight className="text-neon-green" />
              <div className="flex-1">
                <p className="text-gray-300 text-sm">Chess Username:</p>
                <p className="text-gray-300">{userRating.chessUsername}</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-300">Blitz: {userRating.ratings.blitz}</p>
              <p className="text-gray-300">Bullet: {userRating.ratings.bullet}</p>
              <p className="text-gray-300">Rapid: {userRating.ratings.rapid}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No ratings available</p>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default ChatHoverCard;