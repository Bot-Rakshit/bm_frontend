import { useState, useEffect, useRef } from 'react';
import { LiveChat } from 'youtube-chat';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCrown, FaShieldAlt, FaDollarSign, FaCheck } from 'react-icons/fa';
import Sidebar from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/Alert';

// Define ChatItem interface based on the documentation
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

export default function Chat() {
  const [streamUrl, setStreamUrl] = useState('');
  const [comments, setComments] = useState<ChatItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const liveChat = useRef<LiveChat | null>(null);

  useEffect(() => {
    return () => {
      if (liveChat.current) {
        liveChat.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [comments]);

  const handleConnect = async () => {
    if (isConnected) {
      if (liveChat.current) {
        liveChat.current.stop();
      }
      setIsConnected(false);
      setComments([]);
      setError(null);
    } else {
      const liveId = extractLiveId(streamUrl);
      if (liveId) {
        try {
          liveChat.current = new LiveChat({ liveId });
          await liveChat.current.start();
          console.log('LiveChat started successfully for video ID:', liveId);
          setIsConnected(true);
          setError(null);

          liveChat.current.on('chat', (chatItem: ChatItem) => {
            setComments((prevComments) => [...prevComments, chatItem].slice(-100));
          });

          liveChat.current.on('error', (err) => {
            console.error('LiveChat error:', err);
            setIsConnected(false);
            setError('An error occurred. Please try reconnecting.');
          });
        } catch (error) {
          console.error('An error occurred:', error);
          setError(`Failed to connect. Error: ${(error as Error).message || 'Unknown error'}`);
        }
      } else {
        setError('Invalid YouTube URL. Please enter a valid YouTube video or live stream URL.');
      }
    }
  };

  const extractLiveId = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <h1 className="text-4xl font-bold mb-6 text-neon-green">Live Stream Chat</h1>
        <div className="flex mb-4 space-x-4">
          <Input
            type="text"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            placeholder="Enter YouTube live stream URL"
            className="flex-1 bg-gray-800 text-white border-neon-green"
          />
          <Button
            onClick={handleConnect}
            className={`px-6 ${
              isConnected ? 'bg-red-600 hover:bg-red-700' : 'bg-neon-green hover:bg-green-600'
            }`}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
        {error && (
          <Alert className="mb-4 bg-red-900 border-red-600">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-neon-green/30"
        >
          <AnimatePresence initial={false}>
            {comments.map((comment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="mb-2 p-3 bg-gray-700/70 rounded-lg backdrop-blur-sm"
              >
                <div className="flex items-center mb-1">
                  {comment.author.thumbnail && (
                    <img
                      src={comment.author.thumbnail.url}
                      alt={comment.author.thumbnail.alt}
                      className="w-8 h-8 rounded-full mr-2 border-2 border-neon-green"
                    />
                  )}
                  <span className="font-bold mr-2 text-neon-green">{comment.author.name}</span>
                  {comment.isOwner && <FaCrown className="text-yellow-500 mr-1" title="Stream Owner" />}
                  {comment.isModerator && <FaShieldAlt className="text-blue-400 mr-1" title="Moderator" />}
                  {comment.isVerified && <FaCheck className="text-green-400 mr-1" title="Verified" />}
                  {comment.author.badge && (
                    <img
                      src={comment.author.badge.thumbnail.url}
                      alt={comment.author.badge.thumbnail.alt}
                      className="w-5 h-5 mr-1"
                      title={comment.author.badge.label}
                    />
                  )}
                </div>
                <div className="ml-10">
                  {comment.message.map((item, index) => (
                    'text' in item ? (
                      <span key={index} className="text-gray-200">{item.text}</span>
                    ) : (
                      <img
                        key={index}
                        src={item.url}
                        alt={item.alt}
                        className="inline-block h-6 mx-1 align-text-bottom"
                        title={item.emojiText}
                      />
                    )
                  ))}
                </div>
                {comment.superchat && (
                  <div className="mt-2 flex items-center">
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
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>Connected to: {isConnected ? streamUrl : 'Not connected'}</span>
          <span>Messages: {comments.length}</span>
        </div>
      </div>
    </div>
  );
}