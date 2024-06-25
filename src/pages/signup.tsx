import { useState } from 'react';
import { Link } from 'react-router-dom';
import signupimage from '@/assets/signup.png';
import { GoogleSignUpButton } from '@/components/GoogleSignUpButton';
import { ChessVerificationStep } from '@/components/ChessVerificationStep';
import { VerificationCodeDisplay } from '@/components/VerificationCodeDisplay';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { Alert } from '@/components/ui/Alert.tsx';

interface GoogleSignUpResult {
  success: boolean;
  verificationCode?: string;
}

export default function SignUp() {
  const [step, setStep] = useState<'initial' | 'verification'>('initial');
  const [verificationCode, setVerificationCode] = useState<string | null>(null);
  const { signInWithGoogle, isLoading, error } = useGoogleAuth();

  const handleGoogleSignUp = async () => {
    const result: GoogleSignUpResult = await signInWithGoogle();
    if (result.success && result.verificationCode) {
      setVerificationCode(result.verificationCode);
      setStep('verification');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white w-full">
      <div className="flex flex-col md:flex-row flex-1">
        <div className="md:w-2/5 flex flex-col justify-center items-center p-8 bg-gray-800 relative">
          <img src={signupimage} alt="Chess community" className="absolute inset-0 object-cover w-full h-full hidden md:block rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-900/50 hidden md:block rounded-lg"></div>
          <div className="relative z-10 text-center md:text-left md:mt-auto md:mb-12">
            <h1 className="text-4xl font-bold mb-6 text-white hidden md:block">
              Join India's Biggest Chess Community
            </h1>
            <p className="text-lg mb-8 text-white hidden md:block">
              Get access to dashboards, leaderboards, predictions, BM points, and much more!
            </p>
          </div>
        </div>
        <div className="md:w-3/5 flex flex-col items-center justify-center p-8 mt-0 bg-black">
          <div className="w-full max-w-md space-y-8">
            <Alert
              variant="info"
              title="Notice"
              description="We are currently in development and maintenance. The website will be available for use soon. Thank you for your patience!"
            />
            {step === 'initial' ? (
              <>
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-green-500">Create Your Account</h2>
                  <p className="mt-2 text-gray-400">Start your journey with us today!</p>
                </div>
                <GoogleSignUpButton onClick={handleGoogleSignUp} isLoading={isLoading} />
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-green-500 hover:text-green-400">
                    Sign in here
                  </Link>
                </div>
              </>
            ) : (
              <>
                <ChessVerificationStep />
                <VerificationCodeDisplay code={verificationCode} />
                <a
                  href="https://www.chess.com/settings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-500 text-white mt-4"
                >
                  Click here to add this to your Chess.com profile location field
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}