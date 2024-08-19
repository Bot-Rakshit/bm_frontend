import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import signupimage from '@/assets/signup.webp';
import { VerificationCodeDisplay } from '@/components/signup/VerificationCodeDisplay';
import { decodeJwt } from '@/lib/jwtDecoder';
import { verifyChessAccount, initiateChessVerification } from '@/services/auth';
import { motion } from 'framer-motion';

type ErrorResponse = {
  response?: {
    data?: {
      error?: string;
    };
  };
};

export default function SignUpCallback() {
  const [step, setStep] = useState(1);
  const [chessComId, setChessComId] = useState('');
  const [verificationCode, setVerificationCode] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (token) {
      const decoded = decodeJwt(token);
      setVerificationCode(decoded.verificationCode);
      setToken(token);
      if (decoded.chessUsername) {
        navigate(`/welcome?token=${token}`);
      }
    }
  }, [location.search, navigate]);

  const handleNextStep = async () => {
    if (step === 1 && chessComId && token) {
      try {
        const response = await initiateChessVerification(chessComId, token);
        if (response.verificationCode) {
          setStep(2);
        }
      } catch (error: unknown) {
        const err = error as ErrorResponse;
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      }
    }
  };

  const handleVerify = async () => {
    if (chessComId && token) {
      try {
        const response = await verifyChessAccount(chessComId, token);
        if (response.success) {
          const newToken = response.token;
          navigate(`/welcome?token=${newToken}`);
        } else {
          setError('Verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Error verifying Chess.com account:', error);
        setError('Verification failed. Please try again.');
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex min-h-screen bg-black text-white w-full justify-center items-center font-sans p-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a1f0a] to-[#1a3a1a] z-0">
        <div className="absolute inset-0 opacity-20 bg-[url('/chess-pattern.svg')] bg-repeat"></div>
      </div>
      
      {/* Depth elements */}
      <div className="absolute top-20 -left-20 w-64 h-64 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-[#1a3a1a] to-[#0a1f0a] p-6 rounded-3xl border border-neon-green/20 w-full max-w-5xl shadow-2xl shadow-neon-green/20 relative z-10 overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          <div className="lg:w-2/5 flex flex-col justify-center items-center p-4 md:p-8 relative rounded-lg">
            <img src={signupimage} alt="Chess community" className="absolute inset-0 object-cover w-full h-full rounded-lg opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a1a]/70 to-transparent rounded-lg"></div>
            <div className="relative z-10 text-center md:text-left md:mt-auto md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-neon-green">
                Join India's Biggest Chess Community
              </h1>
              <p className="text-base md:text-lg mb-4 md:mb-8 text-gray-300">
                Get access to dashboards, leaderboards, predictions, BM points, and much more!
              </p>
            </div>
          </div>
          <div className="lg:w-3/5 flex flex-col items-center justify-center p-4 md:p-8 mt-4 md:mt-0 bg-white/5 rounded-lg backdrop-blur-sm overflow-y-auto max-h-[80vh] lg:max-h-none">
            <div className="w-full max-w-md space-y-6 md:space-y-8">
              {step === 1 && (
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-neon-green mb-4">Enter Your Chess.com ID</h2>
                  <input
                    type="text"
                    value={chessComId}
                    onChange={(e) => setChessComId(e.target.value)}
                    placeholder="Your Chess.com ID"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-neon-green/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green"
                  />
                  <button
                    onClick={handleNextStep}
                    className="w-full bg-neon-green text-black mt-6 py-2 px-4 rounded-lg font-semibold hover:bg-opacity-80 transition-all duration-300"
                  >
                    Submit
                  </button>
                </div>
              )}
              {step === 2 && (
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-neon-green mb-4">Paste the Verification Code</h2>
                  <VerificationCodeDisplay code={verificationCode} />
                  <p className="mt-4 text-lg text-gray-300">
                    Copy the code above and paste it into the "Location" field of your Chess.com profile settings.
                  </p>
                  <div className="flex justify-center mt-6">
                    <a
                      href="https://www.chess.com/settings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-neon-green text-black py-3 px-4 rounded-lg text-center font-semibold text-sm hover:bg-opacity-80 transition-all duration-300"
                    >
                      Go to Chess.com Settings
                    </a>
                  </div>
                  <p className="mt-4 text-lg text-gray-300">
                    This step is necessary to verify your account ownership.
                  </p>
                  <button
                    onClick={handleVerify}
                    className="w-full bg-neon-green text-black mt-6 py-2 px-4 rounded-lg font-semibold hover:bg-opacity-80 transition-all duration-300"
                  >
                    Verify
                  </button>
                </div>
              )}
              {error && <p className="text-red-400 text-center mt-4">{error}</p>}
              <p className="text-xs text-gray-400 mt-4 text-center">
                BM Samay Raina's use and transfer of information received from Google APIs to any other app will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-neon-green hover:underline">Google API Services User Data Policy</a>, including the Limited Use requirements.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}