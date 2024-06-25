import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface VerificationCodeDisplayProps {
  code: string | null;
}

export function VerificationCodeDisplay({ code }: VerificationCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!code) return null;

  return (
    <div className="bg-gray-800 p-4 rounded-md text-center">
      <h3 className="text-lg font-semibold mb-2">Your Verification Code</h3>
      <div className="flex items-center justify-center space-x-2">
        <code className="bg-gray-700 px-2 py-1 rounded text-green-400 text-lg">
          {code}
        </code>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="text-green-500 hover:text-green-400"
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
    </div>
  );
}