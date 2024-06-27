import signupimage from '@/assets/signup.png';
import { GoogleSignUpButton } from '@/components/GoogleSignUpButton';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

export default function SignUp() {
  const { signInWithGoogle, isLoading, error } = useGoogleAuth();

  const handleGoogleSignUp = async () => {
    await signInWithGoogle();
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
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-neon-green">Create Your Account</h2>
                <p className="mt-2 text-gray-400">Start your journey with us today!</p>
              </div>
              <GoogleSignUpButton onClick={handleGoogleSignUp} isLoading={isLoading} />
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <button onClick={handleGoogleSignUp} className="font-medium text-neon-green hover:text-neon-green-light">
                  Sign in here
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
