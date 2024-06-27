import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import signupimage from '@/assets/signup.png';
import { VerificationCodeDisplay } from '@/components/VerificationCodeDisplay';
import { decodeJwt } from '@/lib/jwtDecoder';
import { verifyChessAccount, initiateChessVerification } from '@/services/auth';

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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white w-full justify-center items-center font-sans p-4">
      <div className="bg-gray-800 p-6 md:p-10 rounded-lg border border-neon-green w-full max-w-4xl shadow-lg shadow-neon-green h-auto md:h-[90vh]">
        <div className="flex flex-col md:flex-row flex-1 h-full">
          <div className="md:w-2/5 flex flex-col justify-center items-center p-4 md:p-8 bg-gray-700 relative rounded-lg">
            <img src={signupimage} alt="Chess community" className="absolute inset-0 object-cover w-full h-full hidden md:block rounded-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/90 to-gray-800/50 hidden md:block rounded-lg"></div>
            <div className="relative z-10 text-center md:text-left md:mt-auto md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-neon-green">
                Join India's Biggest Chess Community
              </h1>
              <p className="text-base md:text-lg mb-4 md:mb-8 text-gray-300">
                Get access to dashboards, leaderboards, predictions, BM points, and much more!
              </p>
            </div>
          </div>
          <div className="md:w-3/5 flex flex-col items-center justify-center p-4 md:p-8 mt-4 md:mt-0 bg-gray-800 rounded-lg">
            <div className="w-full max-w-md space-y-6 md:space-y-8">
              {step === 1 && (
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-neon-green">Enter Your Chess.com ID</h2>
                  <input
                    type="text"
                    value={chessComId}
                    onChange={(e) => setChessComId(e.target.value)}
                    className="w-full mt-4 p-2 rounded-lg bg-gray-700 text-white"
                    placeholder="Chess.com ID"
                  />
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                  <button
                    onClick={handleNextStep}
                    className="w-full bg-gradient-to-r from-green-600 to-gray-800 hover:from-green-700 hover:to-gray-900 text-white mt-6 py-2 px-3 rounded-lg font-semibold text-sm"
                  >
                    Next
                  </button>
                </div>
              )}
              {step === 2 && (
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-neon-green">Paste the Verification Code</h2>
                  <VerificationCodeDisplay code={verificationCode} />
                  <p className="mt-4 text-lg text-gray-400">
                    Copy the code above and paste it into the "Location" field of your Chess.com profile settings.
                  </p>
                  <div className="flex justify-center mt-6">
                    <a
                      href="https://www.chess.com/settings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-green-600 to-gray-800 hover:from-green-700 hover:to-gray-900 text-white py-3 px-4 rounded-lg text-center font-semibold text-sm"
                    >
                      Go to Chess.com Settings
                    </a>
                  </div>
                  <p className="mt-4 text-lg text-gray-400">
                    This step is necessary to verify your account ownership.
                  </p>
                  <button
                    onClick={handleVerify}
                    className="w-full bg-gradient-to-r from-green-600 to-gray-800 hover:from-green-700 hover:to-gray-900 text-white mt-6 py-2 px-3 rounded-lg font-semibold text-sm"
                  >
                    Verify
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
