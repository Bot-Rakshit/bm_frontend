import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import blunderImage from '@/assets/blunder.jpg'; // Assuming you have a funny image for blunders

export default function SomethingWentWrong() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="dark:bg-black dark:text-white h-screen w-full flex flex-col md:flex-row">
      <Sidebar isOpen={true} /> {/* Pass the isOpen prop */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:ml-64"> {/* Added margin-left */}
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
