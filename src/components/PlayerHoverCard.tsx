import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegUser, FaExternalLinkAlt } from 'react-icons/fa';

interface Country {
  code: string;
  name: string;
}

interface PlayerInfo {
  avatar: string;
  url: string;
  name: string;
  followers: number;
  status: string;
  joined: number;
  last_online: number;
  country: Country;
}

interface PlayerHoverCardProps {
  username: string;
  playerInfo: Record<string, PlayerInfo | null>;
  loadingPlayerInfo: Record<string, boolean>;
  handleHover: (username: string) => void;
}

const PlayerHoverCard: React.FC<PlayerHoverCardProps> = ({ username, playerInfo, loadingPlayerInfo, handleHover }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <span
          className="text-gray-300 cursor-pointer relative group"
          onMouseEnter={() => handleHover(username)}
        >
          {username}
          <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-neon-green scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="bg-gray-800 text-gray-300 p-4 rounded-md shadow-lg border border-gray-700">
        {loadingPlayerInfo[username] ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          playerInfo[username] ? (
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 rounded-full border-2 border-neon-green">
                  <AvatarImage src={playerInfo[username]?.avatar} />
                  <AvatarFallback><FaRegUser /></AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-gray-300 text-sm">Country:</p>
                  <div className="flex items-center pt-2">
                  <span className="text-gray-300 mr-2">{playerInfo[username]?.country.name}</span>

                  <img
                    src={`https://flagcdn.com/24x18/${playerInfo[username]?.country.code.toLowerCase()}.webp`}
                    alt={playerInfo[username]?.country.name}
                    title={playerInfo[username]?.country.name}
                  />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-300">
                  Followers: {playerInfo[username]?.followers || 'Not Available'}
                </p>
                <p className="text-gray-300">
                  Status: {playerInfo[username]?.status || 'Not Available'}
                </p>
                <p className="text-gray-300">
                  Joined: {playerInfo[username]?.joined
                    ? new Date((playerInfo[username]?.joined ?? 0) * 1000).toLocaleDateString()
                    : 'Not Available'}
                </p>
                <p className="text-gray-300">
                  Last Online: {playerInfo[username]?.last_online
                    ? new Date((playerInfo[username]?.last_online ?? 0) * 1000).toLocaleString()
                    : 'Not Available'}
                </p>
                <a
                    href={playerInfo[username]?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-200 block mt-1"
                  >
                    <span>Chess.com Profile</span>
                    <FaExternalLinkAlt className="inline mb-1 ml-1 text-xs text-neon-green" />
                  </a>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No information available</p>
          )
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default PlayerHoverCard;