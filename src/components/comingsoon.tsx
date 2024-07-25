import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '@/components/sidebar/Sidebar';
import { Button } from '@/components/ui/button';

export default function ComingSoon() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    navigate('/', { state: { token } }); // Navigate to the home page with token
  };

  return (
    <div className="dark:bg-black dark:text-white min-h-screen w-full flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white text-black px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg">
          <h1 className="text-xl font-bold">Coming Soon</h1>
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-5xl font-bold text-neon-green mb-4">COMING SOON!</h1>
            <p className="text-gray-400 font-mono mb-2">
              We're working hard to bring you something awesome.
            </p>
            <p className="text-gray-400 font-mono mb-6">
              This feature is not available yet, but stay tuned for updates!
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
    </div>
  );
}
