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
    <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm border border-neon-green/20">
      <h3 className="text-lg font-semibold mb-2 text-neon-green">Your Verification Code</h3>
      <div className="flex items-center justify-center space-x-2">
        <code className="bg-white/10 px-3 py-2 rounded text-neon-green text-lg font-mono">
          {code}
        </code>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="text-neon-green border-neon-green/30 hover:bg-neon-green hover:text-black transition-all duration-300"
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
    </div>
  );
}