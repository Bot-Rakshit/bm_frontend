import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCrown, FaShieldAlt, FaDollarSign, FaCheck, FaTimes, FaChessKnight, FaStar} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import axios from 'axios';
import io from 'socket.io-client';
import ChatHoverCard from '@/components/ChatHoverCard';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const socket = io(SERVER_URL);
const Backend_URL = import.meta.env.VITE_BACKEND_URL;

interface ChatItem {
  author: {
    name: string;
    thumbnail?: {
      url: string;
      alt: string;
    };
    channelId: string;
    badge?: {
      thumbnail: {
        url: string;
        alt: string;
      };
      label: string;
    };
  };
  message: Array<{ text: string } | { url: string; alt: string; emojiText: string }>;
  superchat?: {
    amount: string;
    color: string;
    sticker?: {
      url: string;
      alt: string;
    };
  };
  isMembership: boolean;
  isVerified: boolean;
  isOwner: boolean;
  isModerator: boolean;
  timestamp: Date;
}

interface RatingResponse {
  youtubeChannelId: string;
  chessUsername: string;
  ratings: {
    blitz: number | null;
    bullet: number | null;
    rapid: number | null;
  };
}

interface ChatUserRating {
  chessUsername: string;
  ratings: {
    blitz: number;
    bullet: number;
    rapid: number;
  };
}

export default function Chat() {
  const [streamUrl, setStreamUrl] = useState('');
  const [comments, setComments] = useState<ChatItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<string[]>([]);
  const [userRatings, setUserRatings] = useState<{ [key: string]: ChatUserRating }>({});
  const [openPanels, setOpenPanels] = useState<string[]>(['all', 'superchats', 'chess']);

  const chatRefs = useMemo(() => ({
    all: React.createRef<HTMLDivElement>(),
    superchats: React.createRef<HTMLDivElement>(),
    chess: React.createRef<HTMLDivElement>(),
  }), []);

  const scrollToBottom = useCallback((panel: string) => {
    const ref = chatRefs[panel as keyof typeof chatRefs];
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [chatRefs]);

  const getRatingBand = (rating: number): string => {
    if (rating >= 2000) return '2000+';

    if (rating >= 1500) return '1500+';
    if (rating >= 1000) return '1000+';
    if (rating >= 800) return '800+';
    if (rating >= 400) return '800+';
    

    return '';
  };

  const getUsernameWithRating = (username: string, userRating: ChatUserRating | undefined): string => {
    if (!userRating || userRating.ratings.rapid === 0) return username;
    const ratingBand = getRatingBand(userRating.ratings.rapid);
    return ratingBand ? `${username} [${ratingBand}]` : username;
  };

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const response = await axios.get(`${Backend_URL}/api/chess/registered-users`);
        setRegisteredUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch registered users', error);
      }
    };

    fetchRegisteredUsers();
  }, []);

  const fetchUserRatings = async (channelIds: string[]) => {
    try {
      const newRatings: { [key: string]: ChatUserRating } = {};

      for (const channelId of channelIds) {
        const response = await axios.get<RatingResponse>(`${Backend_URL}/api/chess/ratings/${channelId}`);
        newRatings[channelId] = {
          chessUsername: response.data.chessUsername,
          ratings: {
            blitz: response.data.ratings.blitz ?? 0,
            bullet: response.data.ratings.bullet ?? 0,
            rapid: response.data.ratings.rapid ?? 0
          }
        };
      }

      setUserRatings(prevRatings => ({
        ...prevRatings,
        ...newRatings
      }));
    } catch (error) {
      console.error(`Failed to fetch user ratings`, error);
    }
  };

  useEffect(() => {
    socket.on('chatMessage', (chatItem: ChatItem) => {
      setComments((prevComments) => {
        const newComments = [...prevComments, chatItem].slice(-1000);
        
        const newRegisteredUsers = newComments
          .filter(comment => registeredUsers.includes(comment.author.channelId) && !userRatings[comment.author.channelId])
          .map(comment => comment.author.channelId);

        if (newRegisteredUsers.length > 0) {
          fetchUserRatings(newRegisteredUsers);
        }
        
        setTimeout(() => {
          openPanels.forEach(scrollToBottom);
        }, 0);

        return newComments;
      });
    });

    socket.on('error', (err: string) => {
      setError(err);
    });

    socket.on('chatStopped', () => {
      setIsConnected(false);
      setComments([]);
    });

    return () => {
      socket.off('chatMessage');
      socket.off('error');
      socket.off('chatStopped');
    };
  }, [registeredUsers, userRatings, openPanels, scrollToBottom]);

  const handleConnect = async () => {
    if (isConnected) {
      await axios.post(`${SERVER_URL}/api/chat/stop`);
      setIsConnected(false);
      setComments([]);
    } else {
      try {
        await axios.post(`${SERVER_URL}/api/chat/start`, { streamUrl });
        setIsConnected(true);
        setError(null);
      } catch (error) {
        setError('Failed to start live chat');
      }
    }
  };

  const handleDisconnect = async () => {
    await axios.post(`${SERVER_URL}/api/chat/stop`);
    setIsConnected(false);
    setComments([]);
    setError(null);
  };

  const filterComments = (panel: string) => {
    switch (panel) {
      case 'superchats':
        return comments.filter((comment) => comment.superchat);
      case 'chess':
        return comments.filter((comment) => registeredUsers.includes(comment.author.channelId));
      default:
        return comments;
    }
  };

  const togglePanel = (panel: string) => {
    setOpenPanels((prev) =>
      prev.includes(panel) ? prev.filter((p) => p !== panel) : [...prev, panel]
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <h1 className="text-2xl font-bold text-neon-green">Live Stream Chat</h1>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            placeholder="Enter YouTube live stream URL"
            className="bg-gray-700 text-white border-neon-green"
          />
          <Button
            onClick={handleConnect}
            className={`px-4 ${isConnected ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-neon-green hover:bg-green-600'}`}
          >
            {isConnected ? 'Reconnect' : 'Connect'}
          </Button>
          {isConnected && (
            <Button
              onClick={handleDisconnect}
              className="px-4 bg-red-600 hover:bg-red-700"
            >
              Disconnect
            </Button>
          )}
        </div>
      </div>
      {error && (
        <Alert className="m-4 bg-red-900 border-red-600">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex-1 flex flex-wrap p-4 overflow-y-auto relative">
        {['all', 'superchats', 'chess'].map((panel) => (
          <div
            key={panel}
            className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-2 ${
              openPanels.includes(panel) ? '' : 'hidden'
            }`}
          >
            <div className="h-[calc(100vh-12rem)] flex flex-col bg-gray-800/50 rounded-lg backdrop-blur-sm border border-neon-green/30">
              <div className="flex justify-between items-center p-2 border-b border-neon-green/30">
                <h2 className="text-xl font-bold text-neon-green">
                  {panel === 'chess' ? <FaChessKnight className="inline-block mr-2" /> : null}
                  {panel.charAt(0).toUpperCase() + panel.slice(1)}
                </h2>
                <FaTimes className="cursor-pointer text-neon-green hover:text-red-500 transition-colors" onClick={() => togglePanel(panel)} />
              </div>
              <div
                ref={chatRefs[panel as keyof typeof chatRefs]}
                className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-neon-green scrollbar-track-gray-700"
              >
                <AnimatePresence initial={false}>
                  {filterComments(panel).map((comment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className={`p-1 bg-gray-700/70 rounded-lg backdrop-blur-sm ${
                        comment.isOwner ? 'border border-neon-green' : ''
                      }`}
                    >
                      <div className="flex items-center mb-1 text-sm">
                        {comment.author.thumbnail && (
                          <img
                            src={comment.author.thumbnail.url}
                            alt={comment.author.thumbnail.alt}
                            className="w-5 h-5 rounded-full mr-1 border border-neon-green"
                          />
                        )}
                        <div className="relative z-10">
                          {registeredUsers.includes(comment.author.channelId) ? (
                            <ChatHoverCard
                              username={getUsernameWithRating(comment.author.name, userRatings[comment.author.channelId])}
                              userRating={userRatings[comment.author.channelId]}
                            />
                          ) : (
                            <span className="font-bold mr-1 text-neon-green">{comment.author.name}</span>
                          )}
                        </div>
                        {comment.isOwner && <FaCrown className="text-yellow-500 mr-1" title="Stream Owner" />}
                        {comment.isModerator && <FaShieldAlt className="text-blue-400 mr-1" title="Moderator" />}
                        {comment.isVerified && <FaCheck className="text-green-400 mr-1" title="Verified" />}
                        {comment.isMembership && <FaStar className="text-purple-400 mr-1" title="Member" />}
                        {registeredUsers.includes(comment.author.channelId) && (
                          <FaChessKnight className="text-neon-green mr-1" title="Chess Player" />
                        )}
                        {comment.author.badge && (
                          <img
                            src={comment.author.badge.thumbnail.url}
                            alt={comment.author.badge.thumbnail.alt}
                            className="w-4 h-4 mr-1"
                            title={comment.author.badge.label}
                          />
                        )}
                      </div>
                      <div className="ml-6 text-xs">
                        {comment.message.map((item, index) =>
                          'text' in item ? (
                            <span key={index} className="text-gray-200">{item.text}</span>
                          ) : (
                            <img
                              key={index}
                              src={item.url}
                              alt={item.alt}
                              className="inline-block h-4 mx-1 align-text-bottom"
                              title={item.emojiText}
                            />
                          )
                        )} //
                      </div>
                      {comment.superchat && (
                        <div className="mt-1 flex items-center text-xs">
                          <FaDollarSign className="text-yellow-400 mr-1" />
                          <span className="font-semibold text-yellow-400">
                            Super Chat: {comment.superchat.amount}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}