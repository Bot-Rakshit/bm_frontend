import { useNavigate } from 'react-router-dom';
import blunderImage from '@/assets/blunder.webp';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function SomethingWentWrong() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dark:bg-black dark:text-white min-h-screen w-full flex flex-col">
      <header className="bg-white text-black px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg">
        <h1 className="text-xl font-bold">Oops!</h1>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="text-gray-600 hover:text-neon-green hover:bg-neon-green/5 rounded-lg"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </Button>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <img src={blunderImage} alt="Blunder" className="w-64 mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-white mb-4">BLUNDER!</h1>
          <p className="text-gray-400 font-mono mb-2">
            Oops! Something went wrong. It looks like you made a blunder.
          </p>
          <p className="text-gray-400 font-mono mb-6">
            Don't worry, even the best players make mistakes. Let's get you back on track.
          </p>
          <Button
            onClick={handleGoBack}
            className="bg-gradient-to-r from-green-600 to-gray-800 hover:from-green-700 hover:to-gray-900 text-white py-2 px-4 rounded-lg font-semibold text-sm"
          >
            Go Back
          </Button>
        </div>
      </main>
    </div>
  );
}