import { Button } from "@/components/ui/button"

type PredictionCardProps = {
  className?: string;
};

export const PredictionCard: React.FC<PredictionCardProps> = ({ className }) => (
  <div className={`bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg w-full max-w-sm ${className}`}>
    <h3 className="text-xl font-bold text-neon-green mb-4">Upcoming Matches</h3>
    <div className="space-y-4">
      <MatchPrediction 
        players="Samay Raina vs  Alex Sem"
        date="TBD, 2024"
      />
      <MatchPrediction 
        players="Anish Giri vs Magnus Carlsen"
        date="May 18, 2024"
      />
    </div>
  </div>
)

function MatchPrediction({ players, date }: { players: string; date: string }) {
  return (
    <div className="mb-3 pb-3 border-b border-gray-700 last:border-0">
      <p className="text-sm font-semibold text-white mb-1">{players}</p>
      <p className="text-xs text-gray-400 mb-2">{date}</p>
      <div className="flex items-center justify-between">
        <Button className="rounded-full px-3 py-1 text-xs font-medium bg-neon-green text-black hover:bg-opacity-80 transition-all duration-300">
          Predict Now
        </Button>
        <div className="text-neon-green font-bold text-sm">+100 BM</div>
      </div>
    </div>
  )
}
