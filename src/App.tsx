import BMLogo from '@/assets/SamayBM.webp';
import { Badge } from '@/components/ui/badge';

function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-y-4">
        <div className="inline-flex items-center gap-x-4">
          <img src={BMLogo} alt="BM Samay Logo" className="w-32" />
          <span className="text-6xl">+</span>
          <img src={'/vite.svg'} alt="Vite Logo" className="w-32" />
        </div>
        <h1 className="text-4xl font-bold">Welcome to BM Samay</h1>
        <p className="text-lg text-center">Join the BM SamayRaina community and get noticed by Samay Raina. Earn BM points, make predictions, and get discounted offers on Samay's merch as well as a chance to win free show tickets.</p>
        <a href="https://ui.shadcn.com" rel="noopener noreferrer nofollow" target="_blank">
          <Badge variant="outline">shadcn/ui</Badge>
        </a>
      </div>
    </main>
  );
}

export default App;

