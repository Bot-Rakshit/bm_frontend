import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import blunderImage from '@/assets/blunder.jpg'; // Assuming you have a funny image for blunders
import { useState } from 'react';
import { Menu
    
 } from 'lucide-react';

export default function SomethingWentWrong() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleGoBack = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="dark:bg-black dark:text-white h-screen w-full flex flex-col md:flex-row">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> {/* Pass the isOpen prop */}
      <div className={`flex-1 flex flex-col items-center justify-center p-8 ${isSidebarOpen ? 'ml-64' : ''}`}> {/* Added margin-left */}
        <header className="bg-white text-black px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg">
          <h1 className="text-xl font-bold">Something Went Wrong</h1>
          <button onClick={toggleSidebar} className="text-black md:hidden">
            <Menu size={24} />
          </button>
        </header>
        <div className="text-center">
          <img src={blunderImage} alt="Blunder" className="w-64 mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-white">BLUNDER!</h1>
          <p className="text-gray-400 font-mono mt-4">
            Oops! Something went wrong. It looks like you made a blunder.
          </p>
          <p className="text-gray-400 font-mono mt-2">
            Don't worry, even the best players make mistakes. Let's get you back on track.
          </p>
          <button
            onClick={handleGoBack}
            className="mt-6 bg-gradient-to-r from-green-600 to-gray-800 hover:from-green-700 hover:to-gray-900 text-white py-2 px-4 rounded-lg font-semibold text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
