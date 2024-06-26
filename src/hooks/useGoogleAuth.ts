import { useState } from 'react';
import { signInWithGoogle as apiSignInWithGoogle } from '@/services/auth';

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API function which now redirects directly
      await apiSignInWithGoogle();
      return { success: true };
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { signInWithGoogle, isLoading, error };
}