import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface PredictionCardProps {
  token: string | null;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ token }) => {
  const navigate = useNavigate();

  const handlePredictNow = () => {
    if (token) {
      navigate(`/welcome?token=${token}`);
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1a3a1a] to-[#0a1f0a] p-6 rounded-xl shadow-lg border border-neon-green/30 max-w-sm">
      <h3 className="text-2xl font-bold text-neon-green mb-4">Make Your Prediction</h3>
      <p className="text-gray-300 mb-6">Predict the outcomes of upcoming chess matches and events. Win exclusive rewards!</p>
      <Button 
        className="w-full bg-neon-green text-black hover:bg-neon-green/80 transition-all duration-300 rounded-full py-3 font-semibold text-base"
        onClick={handlePredictNow}
      >
        {token ? 'Go to Predictions' : 'Predict Now'}
      </Button>
    </div>
  );
};