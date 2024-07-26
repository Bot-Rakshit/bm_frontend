import { useState, useEffect } from 'react';
import signupimage from '@/assets/signup.webp';
import { GoogleSignUpButton } from '@/components/signup/GoogleSignUpButton';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { BarChart2, Zap, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/Alert';

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export default function SignUp() {
  const { signInWithGoogle, isLoading, error } = useGoogleAuth();
  const [showMobileAlert, setShowMobileAlert] = useState(false);

  useEffect(() => {
    const checkMobileBrowser = () => {
      const ua = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      const isStandalone = 'standalone' in window.navigator && (window.navigator as NavigatorWithStandalone).standalone;
      const isInAppBrowser = ua.includes('Instagram') || ua.includes('FBAN') || ua.includes('FBAV');

      setShowMobileAlert(isMobile && !isStandalone && isInAppBrowser);
    };

    checkMobileBrowser();
  }, []);

  const handleGoogleSignUp = async () => {
    await signInWithGoogle();
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex min-h-screen bg-black text-white w-full justify-center items-center font-sans p-4 overflow-hidden contain-paint">
      <div className="contain-paint absolute inset-0 bg-gradient-to-br from-black via-[#0a1f0a] to-[#1a3a1a] z-0">
        <div className="absolute inset-0 opacity-20 bg-[url('/chess-pattern.svg')] bg-repeat fa"></div>
      </div>

      {/* Depth elements */}
      <div className="absolute top-20 -left-20 w-64 h-64 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-neon-green opacity-10 rounded-full filter blur-3xl"></div>

      {showMobileAlert && (
        <Alert className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 text-black p-2 sm:p-4">
          <AlertDescription className="text-sm sm:text-base text-center">
            Signups don't work in in-app browsers. Please use Safari or Chrome.
          </AlertDescription>
        </Alert>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-[#1a3a1a] to-[#0a1f0a] p-4 sm:p-6 rounded-3xl border border-neon-green/20 w-full max-w-5xl shadow-2xl shadow-neon-green/20 relative z-10"
      >
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 h-full">
          <div className="lg:w-3/5 flex flex-col justify-center rounded-2xl overflow-hidden relative">
            <img src={signupimage} alt="Chess community" className="absolute inset-0 object-cover w-full h-full rounded-2xl opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a1a]/70 to-transparent rounded-2xl"></div>
            <div className="relative z-10 text-left space-y-4 sm:space-y-6 p-4 sm:p-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-neon-green leading-tight">
                Join the Ultimate Chess Community
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-8 text-gray-300">
                Connect, compete, and climb the ranks with BM Samay Raina!
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { icon: BarChart2, text: "Interactive Dashboards" },
                  { icon: Zap, text: "Live Predictions" },
                  { icon: Award, text: "Exclusive Rewards" },
                  { icon: Users, text: "Vibrant Community" }
                ].map(({ icon: Icon, text }, index) => (
                  <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-neon-green" />
                    <span className="text-sm sm:text-lg text-gray-300">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-2/5 flex flex-col items-center justify-center p-4 sm:p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
            <div className="w-full max-w-md space-y-6 sm:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-neon-green mb-2">Create Your Account</h2>
                <p className="text-base sm:text-lg text-gray-300">Start your chess journey today!</p>
              </div>
              <GoogleSignUpButton onClick={handleGoogleSignUp} isLoading={isLoading} />
              {error && <p className="text-red-400 text-center mt-4">{error}</p>}
              <div className="text-center text-gray-400 mt-4 sm:mt-6">
                Already have an account?{" "}
                <button onClick={handleGoogleSignUp} className="font-medium text-neon-green hover:text-neon-green-light transition-colors duration-300">
                  Sign in here
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">
                BM Samay Raina's use and transfer of information received from Google APIs to any other app will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-neon-green hover:underline">Google API Services User Data Policy</a>, including the Limited Use requirements.
              </p>
              <p className="text-xs text-gray-400 mt-2 text-center">
                By signing up, you agree to our{" "}
                <Link to="/privacy" className="text-neon-green hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}