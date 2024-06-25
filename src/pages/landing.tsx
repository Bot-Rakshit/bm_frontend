import { Link } from 'react-router-dom';
import BMSamayLogo from '../assets/SamayBM.png';
import samayheader from '../assets/samayheader.png';

const YTsvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 50 50">
      <path
        stroke="#ff0000"
        d="M 24.402344 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.402344 16.898438 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.902344 40.5 17.898438 41 24.5 41 C 31.101563 41 37.097656 40.5 40.597656 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.097656 35.5 C 45.5 33 46 29.402344 46.097656 24.902344 C 46.097656 20.402344 45.597656 16.800781 45.097656 14.300781 C 44.699219 12.101563 42.800781 10.5 40.597656 10 C 37.097656 9.5 31 9 24.402344 9 Z M 24.402344 11 C 31.601563 11 37.398438 11.597656 40.199219 12.097656 C 41.699219 12.5 42.898438 13.5 43.097656 14.800781 C 43.699219 18 44.097656 21.402344 44.097656 24.902344 C 44 29.199219 43.5 32.699219 43.097656 35.199219 C 42.800781 37.097656 40.800781 37.699219 40.199219 37.902344 C 36.597656 38.601563 30.597656 39.097656 24.597656 39.097656 C 18.597656 39.097656 12.5 38.699219 9 37.902344 C 7.5 37.5 6.300781 36.5 6.101563 35.199219 C 5.300781 32.398438 5 28.699219 5 25 C 5 20.398438 5.402344 17 5.800781 14.902344 C 6.101563 13 8.199219 12.398438 8.699219 12.199219 C 12 11.5 18.101563 11 24.402344 11 Z M 19 17 L 19 33 L 33 25 Z M 21 20.402344 L 29 25 L 21 29.597656 Z"
      ></path>
    </svg>
  );
};

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-300 font-sans">
      <header className="bg-white text-black px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg">
        <Link to="/" className="flex items-center">
          <img src={BMSamayLogo} alt="BM Samay Logo" className="h-12 ml-2" />
        </Link>
        <div className="flex items-center space-x-2">
          <Link className="bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105" to="/signup">Early Access(BETA)</Link>
          <Link
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white py-2 text-sm font-medium transition-colors hover:bg-green-600 hover:text-white focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-white-950 dark:hover:bg-green-600 dark:hover:text-white dark:focus:bg-green-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50 gap-2"
            to="https://www.youtube.com/channel/UCAov2BBv1ZJav0c_yHEciAw/streams"
            target="_blank"
          >
            <YTsvg />
            <span className="hidden sm:inline">Watch Streams</span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center items-center lg:items-start space-y-4 lg:space-y-6 text-center lg:text-left">
                <div className="space-y-4 lg:space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl text-white">
                    Join the BM SamayRaina community
                  </h1>
                  <p className="max-w-[700px] text-green-200 md:text-xl text-center lg:text-left mx-auto lg:mx-0">
                    Join the BM SamayRaina community and get noticed by Samay Raina. Earn BM points, make predictions, and get discounted offers on Samay's merch as well as a chance to win free show tickets.
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <Link
                    className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-green-500 px-8 sm:px-11 text-sm font-medium text-black shadow transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500 disabled:pointer-events-none disabled:opacity-50"
                    to="/signup"
                  >
                    Connect ChessCom Now (BETA)
                  </Link>
                </div>
              </div>
              <img
                alt="Hero"
                className="mx-auto overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                style={{ minHeight: '40vh', width: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                src={samayheader}
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-500">© 2024 BM SamayRaina. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-500" to="/">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-500" to="/">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
