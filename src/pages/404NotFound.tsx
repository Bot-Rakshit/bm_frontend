import { Button } from '@/components/ui/button';

import { Link, useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden">
      {/* Background styling */}
      <div className="contain-paint h-full w-full fixed">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 z-0">
          <div className="absolute inset-0 opacity-10 bg-[url('/chess-pattern.svg')] bg-repeat"></div>
        </div>
        <div className="absolute top-20 -left-20 w-96 h-96 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500 opacity-10 rounded-full filter blur-3xl"></div>
      </div>

      <section className="relative h-full flex flex-col items-center justify-center gap-8 z-10 p-4">
        <img
          src="https://media1.tenor.com/m/1A2eGRwt2ZMAAAAd/samay-samay-raina.gif"
          className="w-1/2 max-w-xs h-auto"
          alt="404 Not Found"
        />
        <div className="flex items-center gap-4">
         
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
          Page Not Found
          </p>
         
        </div>
        <div className="max-w-md w-full text-center mx-auto opacity-80 z-10">
          <p className="text-base sm:text-lg md:text-2xl lg:text-xl font-semibold mb-4">
            Oops! Something went wrong. It looks like this page does not exist.
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            className="rounded-full px-4 py-2 text-sm sm:text-base md:text-lg lg:text-lg font-medium bg-neon-green text-black hover:bg-opacity-80 transition-all duration-300"
            asChild
          >
            <Link to="/">Return Home</Link>
          </Button>
          <Button
            onClick={handleLogout}
            className="rounded-full px-4 py-2 text-sm sm:text-base md:text-lg lg:text-lg font-medium bg-black text-white border border-white hover:bg-opacity-80 hover:text-black transition-all duration-300"
          >
            Logout
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;