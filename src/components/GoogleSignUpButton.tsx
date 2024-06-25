import { Button } from '@/components/ui/button';
import { YouTubeIcon } from '@/components/ui/icons';

interface GoogleSignUpButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function GoogleSignUpButton({ onClick, isLoading }: GoogleSignUpButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full bg-white text-gray-900 hover:bg-gray-100 hover:text-green-600"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <YouTubeIcon />
      )}
      Signup and connect your Youtube account
    </Button>
  );
}