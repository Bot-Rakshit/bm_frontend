import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Navbar } from "@/components/landing/navbar";
import { Link } from "react-router-dom";
import samayheader from "../assets/samayheader.png";
import chesscomLogo from "../assets/chesscomlogo.png";
import { PredictionCard } from "@/components/PredictionCard";
import {
  BadgeIcon,
  PointerIcon,
  GroupIcon,
  Zap,
  Target,
  Trophy,
  InstagramIcon,
  Twitter,
  ShoppingCart,
  Github,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative pt-20 lg:pt-32 flex items-center overflow-hidden"
    >
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Join the Ultimate{" "}
              <span className="text-neon-green">Chess Community</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300">
              Connect, compete, and climb the ranks with BM Samay Raina in
              India's biggest chess community.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <Button
                className="rounded-full px-6 py-3 text-base sm:text-lg font-medium bg-neon-green text-black hover:bg-opacity-80 transition-all duration-300"
                asChild
              >
                <Link to="/signup">Early Access (BETA)</Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-6 py-3 text-base sm:text-lg font-medium text-white border-white hover:bg-white hover:text-black transition-all duration-300"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative mt-12 lg:mt-0">
            <div className="relative w-full max-w-md mx-auto">
              <img
                src={samayheader}
                alt="Samay Raina"
                className="rounded-lg shadow-2xl w-full h-[300px] sm:h-[400px] object-cover object-center"
              />
              <div className="absolute -bottom-16 sm:-bottom-32 -right-8 sm:-right-16 transform rotate-6 hover:rotate-0 transition-transform duration-300 scale-75 sm:scale-100">
                <PredictionCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Partner = () => (
  <div className="text-center mt-24 sm:mt-32 mb-16 sm:mb-24">
    <h3 className="text-base sm:text-lg font-semibold text-gray-300 mb-4">
      Official Partner
    </h3>
    <img src={chesscomLogo} alt="Chess.com" className="h-9 mx-auto" />
  </div>
);

const HowItWorks = () => (
  <section
    id="how-it-works"
    className="py-24 bg-gradient-to-br from-[#1a3a1a] to-[#0a1f0a] rounded-3xl p-12 shadow-xl mb-24"
  >
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold text-neon-green text-center mb-16">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center text-center">
          <Zap className="w-20 h-20 text-neon-green mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-4">Sign Up</h3>
          <p className="text-gray-300 text-lg">
            Create an account and connect your YouTube and Chess.com profiles
            for a seamless experience.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Target className="w-20 h-20 text-neon-green mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-4">
            Profile Verification
          </h3>
          <p className="text-gray-300 text-lg">
            We securely verify your accounts to ensure a fair and transparent
            community.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Trophy className="w-20 h-20 text-neon-green mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-4">
            Join the Community
          </h3>
          <p className="text-gray-300 text-lg">
            Interact with Samay and other streamers who can now see your
            verified chess rating and engage with you.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Leaderboard = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-[#1a3a1a] to-[#0a1f0a] rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-transform duration-300 border border-neon-green/20"
  >
    <h2 className="text-3xl font-bold text-neon-green mb-8">Leaderboard</h2>
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neon-green/20">
            <TableHead className="w-[60px] text-gray-300 text-lg">
              Rank
            </TableHead>
            <TableHead className="text-gray-300 text-lg">Player</TableHead>
            <TableHead className="text-gray-300 text-lg">BM Points</TableHead>
            <TableHead className="text-gray-300 text-lg">
              Chess Rating
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            {
              rank: 1,
              name: "Samay Raina",
              initials: "SR",
              points: 10000,
              rating: 1850,
            },
            {
              rank: 2,
              name: "Beaststats",
              initials: "BS",
              points: 8500,
              rating: 1900,
            },
            {
              rank: 3,
              name: "Drama Queen",
              initials: "DQ",
              points: 7800,
              rating: 1450,
            },
          ].map((player) => (
            <TableRow
              key={player.rank}
              className="border-b border-neon-green/10"
            >
              <TableCell className="font-medium text-neon-green text-lg">
                {player.rank}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 bg-neon-green/20 border border-neon-green/40">
                    <AvatarFallback className="text-neon-green">
                      {player.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white text-lg">{player.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-neon-green font-bold text-lg">
                {player.points.toLocaleString()}
              </TableCell>
              <TableCell className="text-white text-lg">
                {player.rating}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </motion.div>
);

const Features = () => (
  <div className="space-y-8">
    <FeatureCard
      title="Interactive Dashboard"
      description="Explore real-time data and analytics on your chess performance, predictions, and community engagement."
      icon={<ChartIcon className="w-12 h-12 text-neon-green" />}
      className="bg-gradient-to-br from-[#1a3a1a] to-[#0a1f0a] border border-neon-green/20 shadow-lg hover:shadow-neon-green/20 transition-all duration-300"
    />
    <FeatureCard
      title="Make Predictions"
      description="Predict outcomes of chess matches and events. Win exclusive rewards and climb the leaderboard!"
      icon={<PredictIcon className="w-12 h-12 text-neon-green" />}
      className="bg-gradient-to-br from-[#1a3a1a] to-[#0a1f0a] border border-neon-green/20 shadow-lg hover:shadow-neon-green/20 transition-all duration-300"
    />
  </div>
);

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className,
}) => (
  <div className={`rounded-xl p-6 ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      {icon}
      <h3 className="text-2xl font-bold text-neon-green">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </div>
);

const CommunityFeatures = () => (
  <section className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 sm:p-12 space-y-8 max-w-7xl mx-auto transform hover:scale-105 transition-transform duration-300">
    <h2 className="text-3xl sm:text-4xl font-bold text-white text-center">
      Community Features
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard
        icon={<BadgeIcon className="w-12 h-12 text-neon-green" />}
        title="Leaderboard"
        description="Track your progress and see how you rank among the community."
      />
      <FeatureCard
        icon={<PointerIcon className="w-12 h-12 text-neon-green" />}
        title="Predictions"
        description="Make predictions on upcoming chess matches and events."
      />
      <FeatureCard
        icon={<GroupIcon className="w-12 h-12 text-neon-green" />}
        title="Community"
        description="Engage with fellow chess enthusiasts and Samay Raina fans."
      />
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#1a2a1a] py-12 rounded-t-3xl relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-neon-green">BM Samay Raina</h3>
          <p className="text-gray-300 text-sm">
            India's biggest chess community
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/maisamayhoon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-neon-green"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/ReheSamay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-neon-green"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://www.redwolf.in/samay-raina"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-neon-green"
            >
              <ShoppingCart className="w-6 h-6" />{" "}
            </a>
            <a
              href="https://github.com/Bot-Rakshit/bm_frontend/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-neon-green"
            >
              <Github className="w-6 h-6" />{" "}
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-300 hover:text-neon-green">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/community"
                className="text-gray-300 hover:text-neon-green"
              >
                Community Stats
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://discord.com/invite/maisamayhoon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-neon-green"
              >
                Discord
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@SamayRainaOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-neon-green"
              >
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://www.chess.com/club/samay-raina-official"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-neon-green"
              >
                Chess.com
              </a>
            </li>
            <li>
              <a
                href="https://x.com/ReheSamay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-neon-green"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/privacy"
                className="text-gray-300 hover:text-neon-green"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="text-gray-300 hover:text-neon-green"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export function LandingPage() {
  return (
    <div className="relative bg-black min-h-screen text-white flex flex-col overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a1f0a] to-[#1a3a1a] z-0">
        <div className="absolute inset-0 opacity-20 bg-[url('/chess-pattern.svg')] bg-repeat"></div>
      </div>

      {/* Depth elements */}
      <div className="absolute top-20 -left-20 w-64 h-64 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>

      {/* Content */}
      <Navbar />
      <main className="flex-grow px-4 sm:px-6 py-24 mt-15 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-48">
            <Hero />
            <Partner />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 mt-32"
          >
            <Leaderboard />
            <Features />
          </motion.div>
          <HowItWorks />
          <CommunityFeatures />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}

function PredictIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12h10" />
      <path d="M9 4v16" />
      <path d="m3 9 3 3-3 3" />
      <path d="M14 8V6c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2" />
    </svg>
  );
}
