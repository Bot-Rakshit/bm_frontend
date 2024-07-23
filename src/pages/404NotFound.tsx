import { Button } from '@/components/ui/button';
import { FaChessKnight, FaChessRook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <header className="bg-white/10 backdrop-filter backdrop-blur-lg text-white px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg z-10">
        <div className="flex items-center">
          <div className="w-8 mr-4"></div> {/* Spacer for hamburger menu */}
          <h1 className="text-xl font-bold">Welcome to BM Samay</h1>
        </div>
        <FaChessKnight className="w-8 h-8 text-neon-green" />
      </header>
      <section className="h-full flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <FaChessRook className="w-5 h-5" />
          <p className="text-xl lg:text-3xl">404 Page not found</p>
          <FaChessRook className="w-5 h-5" />
        </div>
        <Button
          className="rounded-full px-6 py-3 text-base sm:text-lg font-medium bg-neon-green text-black hover:bg-opacity-80 transition-all duration-300"
          asChild
        >
          <Link to="/">Return Home</Link>
        </Button>
        <img
          src="https://media1.tenor.com/m/1A2eGRwt2ZMAAAAd/samay-samay-raina.gif"
          className="max-w-[90%]"
        />
      </section>
    </div>
  );
};

export default PageNotFound;
