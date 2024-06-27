import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BMSamayLogo from '../assets/SamayBM.png';
import samayheader from '../assets/samayheader.png';
import { Youtube } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-300 font-sans">
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 w-full border-b border-border/40 px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg">
        <div className="flex items-center">
          <img src={BMSamayLogo} alt="BM Samay Logo" className="h-12 ml-2" />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="default">
            {/* <Link to="/signup">Early Access (BETA)</Link> */}
            Early Access (BETA)
          </Button>
          <Button variant="outline">
            {/* <Link to="https://www.youtube.com/channel/UCAov2BBv1ZJav0c_yHEciAw/streams" target="_blank"> */}
              <Youtube className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Watch Streams</span>
            {/* </Link> */}
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            {/* Maintenance Notice */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
              <p className="font-bold">Maintenance Notice</p>
              <p>Our servers are currently under maintenance and verification. We'll be back soon! Thank you for your patience.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center mt-6">
              <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CardHeader>
                  <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight xl:text-6xl text-white">
                    Join the BM SamayRaina community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-200 md:text-xl mb-6">
                    Join the BM SamayRaina community and get noticed by Samay Raina. Earn BM points, make predictions, and get discounted offers on Samay's merch as well as a chance to win free show tickets.
                  </p>
                  <Button size="lg" className="w-full sm:w-auto">
                    {/* <Link to="/signup"> */}
                      Connect ChessCom Now (BETA)
                    {/* </Link> */}
                  </Button>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img
                    alt="Hero"
                    className="w-full h-full object-cover"
                    style={{ minHeight: '40vh', objectPosition: 'top center' }}
                    src={samayheader}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-500">© 2024 BM SamayRaina. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <span className="text-xs hover:underline underline-offset-4 text-gray-500">
            Terms of Service
          </span>
          <span className="text-xs hover:underline underline-offset-4 text-gray-500">
            Privacy
          </span>
        </nav>
      </footer>
    </div>
  );
}
