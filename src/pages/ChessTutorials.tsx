import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Sidebar from '@/components/sidebar/Sidebar';
import { FaExternalLinkAlt, FaChessBoard, FaPuzzlePiece, FaChess, FaPlay } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from '@/components/sidebar/Header';
import Background from '@/components/Background';

interface Video {
  id: string;
  title: string;
  thumbnail: string | null;
  url: string;
}

interface YouTubeApiResponse {
  items: {
    snippet: {
      resourceId: {
        videoId: string;
      };
      title: string;
      thumbnails: {
        high?: { url: string };
        default?: { url: string };
      };
    };
  }[];
  nextPageToken?: string;
}

const categories = [
  { id: 'howto', name: 'How to play', icon: FaChessBoard, playlistId: 'PL9WYcwsWaJ7o8SmzqSY7q7D4l4XCpFdk_' },
  { id: 'tactics', name: 'Tactics', icon: FaPuzzlePiece, playlistId: 'PLUe4-TSKGmsD8DxA8KcmOs4-MzJ8d462O' },
  { id: 'traps', name: 'Traps', icon: FaChess, playlistId: 'PL9WYcwsWaJ7puDxl2aTBiMsnFQ3OR0_Qu' },
];

const CACHE_KEY = 'chessTutorialsData';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function ChessTutorials() {
  const [videos, setVideos] = useState<{ [key: string]: Video[] }>({});
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchVideos = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        setVideos(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      if (!API_KEY) {
        console.error('YouTube API key is not set');
        setLoading(false);
        return;
      }

      try {
        const videosByCategory: { [key: string]: Video[] } = {};

        for (const category of categories) {
          let allVideos: Video[] = [];
          let nextPageToken = '';

          do {
            const response = await axios.get<YouTubeApiResponse>(`https://www.googleapis.com/youtube/v3/playlistItems`, {
              params: {
                part: 'snippet',
                playlistId: category.playlistId,
                maxResults: 50,
                pageToken: nextPageToken,
                key: API_KEY,
              },
            });

            const newVideos = response.data.items.map((item): Video => ({
              id: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url || null,
              url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
            }));

            allVideos = [...allVideos, ...newVideos];
            nextPageToken = response.data.nextPageToken || '';
          } while (nextPageToken);

          videosByCategory[category.id] = allVideos;
        }

        setVideos(videosByCategory);
        localStorage.setItem(CACHE_KEY, JSON.stringify(videosByCategory));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [location.search]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col relative w-full">
        <Background />
        <Header
          headerTitle="Chess Tutorials"
          showChessbase
          showChesscom
        />
        <main className="flex-1 p-6 md:p-10 z-10 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <p className="text-lg text-gray-300 mb-8">
              Explore this comprehensive collection of instructive chess videos from ChessBase India & ChessKid (Chess.com). Whether you're a beginner learning the basics or an experienced player looking to sharpen your skills, these tutorials cover a wide range of topics to help improve your chess game.
            </p>

            <Tabs defaultValue="howto" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center justify-center">
                    <category.icon className="mr-2 min-w-[14px]" />
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-neon-green"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {videos[category.id]?.map((video, index) => (
                        <motion.div
                          key={video.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="bg-black/60 backdrop-filter backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-neon-green/30 transition-all duration-300 flex flex-col border border-neon-green/20"
                        >
                          <div className="relative h-48 group">
                            <img src={video.thumbnail || '/placeholder-image.jpg'} alt={video.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <FaPlay className="text-4xl text-white" />
                            </div>
                          </div>
                          <div className="p-4 flex-grow flex flex-col justify-between">
                            <h2 className="text-lg font-semibold mb-2 text-neon-green hover:text-white transition-colors duration-300 line-clamp-2">{video.title}</h2>
                            <button
                              onClick={() => setSelectedVideo(video)}
                              className="mt-2 inline-flex items-center justify-center bg-neon-green text-black px-3 py-1 rounded-full hover:bg-white transition-colors duration-300 text-sm font-medium"
                            >
                              Watch Video <FaExternalLinkAlt className="ml-2" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>

        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-gray-900 rounded-xl w-full max-w-4xl overflow-hidden flex flex-col"
                style={{ maxHeight: 'calc(100vh - 2rem)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative pt-[56.25%] w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
                <div className="p-4 sm:p-6 flex-shrink-0 bg-gray-800 overflow-y-auto">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 text-neon-green">{selectedVideo.title}</h2>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                    <a
                      href={selectedVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center"
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      Watch on YouTube
                    </a>
                    <button
                      onClick={() => setSelectedVideo(null)}
                      className="bg-neon-green text-black px-4 py-2 rounded-full hover:bg-white transition-colors duration-300 text-sm font-medium flex items-center"
                    >
                      <FaPlay className="mr-2" />
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}