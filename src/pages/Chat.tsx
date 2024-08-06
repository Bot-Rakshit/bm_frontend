import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCrown, FaShieldAlt, FaDollarSign, FaCheck, FaTimes, FaChessKnight, FaStar} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import axios from 'axios';
import io, { Socket } from 'socket.io-client';
import ChatHoverCard from '@/components/ChatHoverCard';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const Backend_URL = import.meta.env.VITE_BACKEND_URL;

console.log('SERVER_URL:', SERVER_URL);
console.log('Backend_URL:', Backend_URL);

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

interface ChatUserRating {
  chessUsername: string;
  ratings: {
    blitz: number;
    bullet: number;
    rapid: number;
  };
}

export default function Chat() {
  const [comments, setComments] = useState<ChatItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<string[]>([]);
  const [userRatings, setUserRatings] = useState<{ [key: string]: ChatUserRating }>({});
  const [openPanels, setOpenPanels] = useState<string[]>(['all', 'superchats', 'chess']);
  const socketRef = useRef<Socket | null>(null);
  const [socketId, setSocketId] = useState<string | null>(null);

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
    if (rating >= 400) return '400+';
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

  const fetchUserRatings = useCallback(async (channelIds: string[]) => {
    try {
      const newRatings: { [key: string]: ChatUserRating } = {};

      for (const channelId of channelIds) {
        const response = await axios.get(`${Backend_URL}/api/chess/ratings/${channelId}`);
        newRatings[channelId] = response.data;
      }

      setUserRatings(prevRatings => ({
        ...prevRatings,
        ...newRatings
      }));
    } catch (error) {
      console.error(`Failed to fetch user ratings`, error);
    }
  }, []);

  const connectSocket = useCallback(() => {
    if (socketRef.current?.connected) {
      console.log('Socket already connected');
      return;
    }

    console.log('Initializing socket connection');
    socketRef.current = io(SERVER_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    socketRef.current.on('connect', () => {
      console.log(`Socket connected successfully. ID: ${socketRef.current?.id}`);
      setSocketId(socketRef.current?.id || null);
      setIsConnected(true);
      setError(null);
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setError(`Connection error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    });

    socketRef.current.on('disconnect', (reason) => {
      console.log(`Socket disconnected. ID: ${socketRef.current?.id}, Reason: ${reason}`);
      setIsConnected(false);
      setError(`Disconnected: ${reason}`);
    });

    socketRef.current.on('ping', () => {
      socketRef.current?.emit('pong');
    });

    socketRef.current.on('keepAliveResponse', () => {
      console.log('Received keep-alive response from server');
    });

    socketRef.current.on('chatMessage', (chatItem: ChatItem) => {
      console.log(`Received chat message. Socket ID: ${socketRef.current?.id}`);
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

    socketRef.current.on('error', (err: unknown) => {
      console.error('Socket error:', err);
      setError(typeof err === 'string' ? err : 'Unknown socket error');
    });

    socketRef.current.on('chatEnded', () => {
      console.log('Chat ended');
      setIsConnected(false);
      setComments([]);
    });
  }, [registeredUsers, userRatings, openPanels, scrollToBottom, fetchUserRatings]);

  useEffect(() => {
    connectSocket();

    return () => {
      console.log('Cleaning up socket connection');
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [connectSocket]);

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
          <span className="text-sm text-gray-300">Socket ID: {socketId || 'Not connected'}</span>
          <Button
            className={`px-4 ${isConnected ? 'bg-green-600' : 'bg-red-600'}`}
            onClick={connectSocket}
          >
            {isConnected ? 'Connected' : 'Disconnected'}
          </Button>
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
                        )}
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