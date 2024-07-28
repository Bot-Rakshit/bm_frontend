import { useEffect } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import Background from '@/components/Background';
import Header from '@/components/sidebar/Header';

const BulletinBoard = () => {
  useEffect(() => {
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://bm-samay.disqus.com/embed.js';
    s.setAttribute('data-timestamp', String(Date.now()));
    (d.head || d.body).appendChild(s);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col relative w-full">
        <Background />
        <Header headerTitle="Bulletin Board" showChessbase={false} />
        <main className="flex-1 p-6 md:p-10 z-10 overflow-auto">
          <div className="bg-black/60 backdrop-filter backdrop-blur-md rounded-2xl p-6 border border-neon-green/20">
            <h1 className="text-3xl font-bold text-neon-green mb-4">Bulletin Board</h1>
            <p className="text-gray-300 mb-6">Welcome to the Bulletin Board of BM Samay. Share your thoughts and discussions here.</p>
            <div id="disqus_thread"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BulletinBoard;
