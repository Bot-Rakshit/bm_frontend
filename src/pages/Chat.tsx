import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { FaChessKnight, FaCrown, FaShieldAlt, FaCheck, FaStar, FaDollarSign } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ChatHoverCard from '@/components/ChatHoverCard';

interface ChatMessage {
  author: {
    name: string;
    channelId: string;
  };
  message: string;
  timestamp: Date;
  isOwner: boolean;
  isModerator: boolean;
  isVerified: boolean;
  isMembership: boolean;
  superchat?: {
    amount: string;
    color: string;
  };
}

interface UserRating {
  chessUsername: string;
  ratings: {
    blitz: number;
    bullet: number;
    rapid: number;
  };
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState<string[]>([]);
  const [userRatings, setUserRatings] = useState<{ [key: string]: UserRating }>({});
  const [openPanels, setOpenPanels] = useState<string[]>(['all', 'superchats', 'chess']);
  const [videoInfo, setVideoInfo] = useState<{ title: string; channelTitle: string; isLiveStream: boolean } | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const allChatRef = useRef<HTMLDivElement>(null);
  const superchatsChatRef = useRef<HTMLDivElement>(null);
  const chessChatRef = useRef<HTMLDivElement>(null);

  const chatRefs = useMemo(() => ({
    all: allChatRef,
    superchats: superchatsChatRef,
    chess: chessChatRef,
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

  const getUsernameWithRating = (username: string, userRating: UserRating | undefined): string => {
    if (!userRating || userRating.ratings.rapid === 0) return username;
    const ratingBand = getRatingBand(userRating.ratings.rapid);
    return ratingBand ? `${username} [${ratingBand}]` : username;
  };

  useEffect(() => {
    console.log('Server URL:', import.meta.env.VITE_SERVER_URL);
    console.log('Attempting to connect to socket');
    const socket = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    socket.on('chatMessage', (message: ChatMessage) => {
      console.log('Received chat message:', message);
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, message];
        setTimeout(() => {
          openPanels.forEach(scrollToBottom);
        }, 0);
        return newMessages;
      });

      if (registeredUsers.includes(message.author.channelId) && !userRatings[message.author.channelId]) {
        fetchUserRatings(message.author.channelId);
      }
    });

    socket.on('error', (errorMessage: string) => {
      console.error('Socket error:', errorMessage);
    });

    socket.on('disconnect', (reason) => {
      console.log(`Socket disconnected. Reason: ${reason}`);
    });

    socket.on('switchChannel', (videoUrl: string) => {
      console.log('Switching to channel:', videoUrl);
      setVideoUrl(videoUrl);
      setMessages([]);
    });

    // Implement heartbeat
    const heartbeatInterval = setInterval(() => {
      socket.emit('heartbeat');
    }, 25000);

    return () => {
      socket.disconnect();
      clearInterval(heartbeatInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registeredUsers, userRatings, openPanels, scrollToBottom]);

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chess/registered-users`);
        setRegisteredUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch registered users', error);
      }
    };

    fetchRegisteredUsers();
  }, []);

  const fetchUserRatings = async (channelId: string) => {
    if (userRatings[channelId]) return;

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chess/ratings/${channelId}`);
      setUserRatings(prev => ({
        ...prev,
        [channelId]: {
          chessUsername: response.data.chessUsername,
          ratings: {
            blitz: response.data.ratings.blitz ?? 0,
            bullet: response.data.ratings.bullet ?? 0,
            rapid: response.data.ratings.rapid ?? 0
          }
        }
      }));
    } catch (error) {
      console.error(`Failed to fetch user ratings for ${channelId}`, error);
    }
  };

  const handleSwitchChannel = async () => {
    console.log('Switching channel to:', videoUrl);
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chat/switch-channel`, { videoUrl });
      setVideoInfo({
        title: response.data.videoTitle,
        channelTitle: response.data.channelTitle,
        isLiveStream: response.data.isLiveStream
      });
      setMessages([]); // Clear previous messages
      if (socketRef.current) {
        socketRef.current.emit('switchChannel', videoUrl);
      }
    } catch (error) {
      console.error('Failed to switch channel:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const filterMessages = (panel: string) => {
    switch (panel) {
      case 'superchats':
        return messages.filter((msg) => msg.superchat);
      case 'chess':
        return messages.filter((msg) => registeredUsers.includes(msg.author.channelId));
      default:
        return messages;
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
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
            className="bg-gray-700 text-white border-neon-green rounded px-2 py-1"
          />
          <button
            onClick={handleSwitchChannel}
            className="px-4 py-2 bg-neon-green text-black rounded hover:bg-green-600 transition-colors"
          >
            Switch Channel
          </button>
        </div>
      </div>
      {videoInfo && (
        <div className="p-4 bg-gray-800 text-neon-green">
          <p>Now watching: {videoInfo.title}</p>
          <p>Channel: {videoInfo.channelTitle}</p>
          <p>{videoInfo.isLiveStream ? 'Live Stream' : 'Video'}</p>
        </div>
      )}
      <div className="flex-1 flex flex-wrap p-4 overflow-y-auto">
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
                  {panel === 'chess' && <FaChessKnight className="inline-block mr-2" />}
                  {panel.charAt(0).toUpperCase() + panel.slice(1)}
                </h2>
                <button
                  onClick={() => togglePanel(panel)}
                  className="text-neon-green hover:text-red-500 transition-colors"
                >
                  Close
                </button>
              </div>
              <div
                ref={chatRefs[panel as keyof typeof chatRefs]}
                className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-neon-green scrollbar-track-gray-700"
              >
                <AnimatePresence initial={false}>
                  {filterMessages(panel).map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className={`p-2 bg-gray-700/70 rounded-lg backdrop-blur-sm ${
                        msg.isOwner ? 'border border-neon-green' : ''
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {registeredUsers.includes(msg.author.channelId) ? (
                          <ChatHoverCard
                            username={getUsernameWithRating(msg.author.name, userRatings[msg.author.channelId])}
                            userRating={userRatings[msg.author.channelId]}
                          />
                        ) : (
                          <span className="font-bold mr-1 text-neon-green">{msg.author.name}</span>
                        )}
                        {msg.isOwner && <FaCrown className="text-yellow-500 ml-1" title="Stream Owner" />}
                        {msg.isModerator && <FaShieldAlt className="text-blue-400 ml-1" title="Moderator" />}
                        {msg.isVerified && <FaCheck className="text-green-400 ml-1" title="Verified" />}
                        {msg.isMembership && <FaStar className="text-purple-400 ml-1" title="Member" />}
                      </div>
                      <div className="ml-6 text-sm text-gray-300">{msg.message}</div>
                      {msg.superchat && (
                        <div className="mt-1 flex items-center text-sm">
                          <FaDollarSign className="text-yellow-400 mr-1" />
                          <span className="font-semibold text-yellow-400">
                            Super Chat: {msg.superchat.amount}
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
};

export default Chat;