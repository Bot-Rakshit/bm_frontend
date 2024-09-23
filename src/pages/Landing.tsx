import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Navbar } from '@/components/landing/navbar';
import { BadgeIcon, PointerIcon, GroupIcon, Zap, Target, Trophy } from 'lucide-react';
import samayheader from '../assets/samayheader.webp';
import chesscomLogo from '../assets/chesscomlogo.webp';
import { Helmet } from 'react-helmet-async';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//
const Counter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
	const count = useMotionValue(0);
	const rounded = useTransform(count, latest => Math.round(latest));

	useEffect(() => {
		const controls = animate(count, end, { duration: duration });
		return controls.stop;
	}, [count, end, duration]);

	return <motion.span>{rounded}</motion.span>;
};

const Hero = () => {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const [totalUsers, setTotalUsers] = useState(0);
	const [token, setToken] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTotalUsers = async () => {
			try {
				const response = await axios.get(`${BACKEND_URL}/api/chess/dashboard`);
				setTotalUsers(response.data.totalUsers);
			} catch (error) {
				console.error('Error fetching total users:', error);
			}
		};

		fetchTotalUsers();

		const storedToken = localStorage.getItem('token');
		setToken(storedToken);
	}, []);

  const scrollToHowItWorks = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEarlyAccess = () => {
    if (token) {
      navigate(`/welcome?token=${token}`);
    } else {
      navigate('/signup');
    }
  };

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
							Join the Ultimate <span className="text-neon-green">Chess Community</span>
						</h1>
						<p className="text-base sm:text-lg lg:text-xl text-gray-300">
							Connect, compete, and climb the ranks with BM Samay Raina in India's biggest chess community.
						</p>
						<div className="inline-flex items-center bg-neon-green/20 rounded-full px-4 py-2 text-neon-green font-semibold">
							<Counter end={totalUsers} /> <span className="ml-2">Users</span>
						</div>
						<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
							<Button 
								className="rounded-full px-6 py-3 text-base sm:text-lg font-medium bg-neon-green text-black hover:bg-neon-green/80 transition-all duration-300" 
								onClick={handleEarlyAccess}
							>
								{token ? 'Go to App' : 'Early Access (BETA)'}
							</Button>
							<Button
								variant="outline"
								className="rounded-full px-6 py-3 text-base sm:text-lg font-medium text-white border-white hover:bg-white/20 transition-all duration-300"
								onClick={scrollToHowItWorks}
							>
								Learn more
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
							<div className="absolute -bottom-36 sm:-bottom-32 -right-8 sm:-right-16 transform rotate-6 hover:rotate-0 transition-transform duration-300 scale-75 sm:scale-100">
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
		<h3 className="text-base sm:text-lg font-semibold text-gray-300 mb-4">Official Partner</h3>
		<img src={chesscomLogo} alt="Chess.com" className="h-9 mx-auto" />
	</div>
);

const HowItWorks = () => (
	<section id="how-it-works" className="py-24 bg-gradient-to-br from-[#1a3a1a] to-[#0a1f0a] rounded-3xl p-12 shadow-xl mb-24">
		<div className="container mx-auto">
			<h2 className="text-4xl font-bold text-neon-green text-center mb-16">How It Works</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
				<div className="flex flex-col items-center text-center">
					<Zap className="w-20 h-20 text-neon-green mb-6" />
					<h3 className="text-2xl font-semibold text-white mb-4">Sign Up</h3>
					<p className="text-gray-300 text-lg">Create an account and connect your YouTube and Chess.com profiles for a seamless experience.</p>
				</div>
				<div className="flex flex-col items-center text-center">
					<Target className="w-20 h-20 text-neon-green mb-6" />
					<h3 className="text-2xl font-semibold text-white mb-4">Profile Verification</h3>
					<p className="text-gray-300 text-lg">We securely verify your accounts to ensure a fair and transparent community.</p>
				</div>
				<div className="flex flex-col items-center text-center">
					<Trophy className="w-20 h-20 text-neon-green mb-6" />
					<h3 className="text-2xl font-semibold text-white mb-4">Join the Community</h3>
					<p className="text-gray-300 text-lg">Interact with Samay and other streamers who can now see your verified chess rating and engage with you.</p>
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
						<TableHead className="w-[60px] text-gray-300 text-lg">Rank</TableHead>
						<TableHead className="text-gray-300 text-lg">Player</TableHead>
						<TableHead className="text-gray-300 text-lg">BM Points</TableHead>
						<TableHead className="text-gray-300 text-lg">Chess Rating</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{[
						{ rank: 1, name: "Samay Raina", initials: "SR", points: 10000, rating: 1850 },
						{ rank: 2, name: "Beaststats", initials: "BS", points: 8500, rating: 1900 },
						{ rank: 3, name: "Drama Queen", initials: "DQ", points: 7800, rating: 1450 },
					].map((player) => (
						<TableRow key={player.rank} className="border-b border-neon-green/10">
							<TableCell className="font-medium text-neon-green text-lg">{player.rank}</TableCell>
							<TableCell>
								<div className="flex items-center gap-3">
									<Avatar className="w-10 h-10 bg-neon-green/20 border border-neon-green/40">
										<AvatarFallback className="text-neon-green">{player.initials}</AvatarFallback>
									</Avatar>
									<span className="text-white text-lg">{player.name}</span>
								</div>
							</TableCell>
							<TableCell className="text-neon-green font-bold text-lg">{player.points.toLocaleString()}</TableCell>
							<TableCell className="text-white text-lg">{player.rating}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	</motion.div>
);

const Features = () => (
	<div className="flex flex-col space-y-8">
		<FeatureCard
			title="Interactive Dashboard"
			description="Explore real-time data and analytics on your chess performance, predictions, and community engagement."
			icon={<ChartIcon className="w-12 h-12 text-neon-green" />}
			className="bg-gradient-to-br from-[#1a3a1a] to-[#0a1f0a] border border-neon-green/20 shadow-lg hover:shadow-neon-green/20 transition-all duration-300 flex-1"
		/>
		<FeatureCard
			title="Make Predictions"
			description="Predict outcomes of chess matches and events. Win exclusive rewards and climb the leaderboard!"
			icon={<PredictIcon className="w-12 h-12 text-neon-green" />}
			className="bg-gradient-to-br from-[#1a3a1a] to-[#0a1f0a] border border-neon-green/20 shadow-lg hover:shadow-neon-green/20 transition-all duration-300 flex-1"
		/>
	</div>
);

type FeatureCardProps = {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className }) => (
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
		<h2 className="text-3xl sm:text-4xl font-bold text-white text-center">Community Features</h2>
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
	<footer className="bg-[#1a2a1a] py-8 md:py-12 rounded-t-3xl relative z-10">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="grid grid-cols-2 md:grid-cols-5 gap-8">
				<div className="space-y-4">
					<h3 className="text-xl font-bold text-neon-green">BM Samay Raina</h3>
					<p className="text-gray-300 text-sm">India's biggest chess community</p>
					<div className="flex space-x-4">
						<a href="https://github.com/Bot-Rakshit/bm_frontend/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neon-green" aria-label="GitHub">
							<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
							</svg>
						</a>
					</div>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
					<ul className="space-y-2">
						<li><Link to="/" className="text-gray-300 hover:text-neon-green">Home</Link></li>
						<li><Link to="/community" className="text-gray-300 hover:text-neon-green">Community Stats</Link></li>
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-white mb-4">Community</h3>
					<ul className="space-y-2">
						<li><a href="https://discord.com/invite/maisamayhoon" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neon-green">Discord</a></li>
						<li><a href="https://www.youtube.com/channel/UCAov2BBv1ZJav0c_yHEciAw" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neon-green">YouTube</a></li>
						<li><a href="https://www.chess.com/club/samay-raina-official" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neon-green">Chess.com</a></li>
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-white mb-4">Socials</h3>
					<ul className="space-y-2">
						<li><a href="https://x.com/ReheSamay" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neon-green">Twitter</a></li>
						<li><a href="https://www.reddit.com/r/SamayRaina/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neon-green">Reddit</a></li>
						<li><a href="https://www.instagram.com/maisamayhoon/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neon-green">Instagram</a></li>
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
					<ul className="space-y-2">
						<li><Link to="/privacy" className="text-gray-300 hover:text-neon-green">Privacy Policy</Link></li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
);

export function LandingPage() {
  return (
    <div className="relative bg-black min-h-screen text-white flex flex-col overflow-x-hidden">
      <Helmet>
        <title>BM Samay Raina - India's Biggest Chess Community</title>
        <meta name="description" content="Join BM Samay Raina's ultimate chess community. Connect, compete, and climb the ranks with India's biggest chess streamer and comedian." />
        <meta name="keywords" content="Samay Raina, chess, community, BM Samay, Indian chess, chess streamer" />
        <meta property="og:title" content="BM Samay Raina - India's Biggest Chess Community" />
        <meta property="og:description" content="Join BM Samay Raina's ultimate chess community. Connect, compete, and climb the ranks with India's biggest chess streamer and comedian." />
        <meta property="og:image" content="/SamayBM.png" />
        <meta property="og:url" content="https://bmsamay.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24 mt-16 md:mt-32"
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
  )
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
  )
}