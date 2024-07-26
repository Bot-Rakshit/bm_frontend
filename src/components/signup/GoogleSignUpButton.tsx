import { Button } from '@/components/ui/button';
import { FaGoogle } from 'react-icons/fa';

interface GoogleSignUpButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean; // Added this line
}

export function GoogleSignUpButton({ onClick, isLoading, disabled }: GoogleSignUpButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full bg-white text-gray-900 hover:bg-gray-100 hover:text-green-600 flex items-center justify-center gap-2"
      onClick={onClick}
      disabled={isLoading || disabled} // Use the disabled prop here
    >
      {isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <FaGoogle className="w-5 h-5" />
      )}
      Sign up with Google
    </Button>
  );
}