import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import BMSamayLogo from '../assets/SamayBM.png';
import samayheader from '../assets/samayheader.png';
import { Youtube } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-300 font-sans">
      <header className="bg-white text-white px-4 lg:px-6 h-16 flex items-center justify-between shadow-md mt-4 mx-4 rounded-lg">
        <div className="flex items-center">
          <img src={BMSamayLogo} alt="BM Samay Logo" className="h-10 mr-2" />
          <span className="text-xl font-bold">BM SamayRaina</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="default" className="bg-green-500 hover:bg-green-600 text-black font-semibold text-xs sm:text-sm px-2 sm:px-4" asChild>
            <Link to="/signup">Early Access</Link>
          </Button>
          <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black p-2 sm:p-3" asChild>
            <a href="https://www.youtube.com/channel/UCAov2BBv1ZJav0c_yHEciAw/streams" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Youtube className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Watch Streams</span>
            </a>
          </Button>
        </div>
      </header>
      <div className="container px-4 md:px-6 mx-auto">
        <Alert className="mt-4 bg-blue-900 border-blue-500 text-blue-100">
          <InfoCircledIcon className="h-4 w-4 flex-shrink-0" />
          <div className="w-full sm:w-auto">
            <AlertTitle>Coming Soon</AlertTitle>
            <AlertDescription className="text-sm sm:text-base">
              We're excited to announce that our website will be fully functional in the near future. We are currently awaiting Google OAuth verification to ensure a secure and seamless login experience for all our users. Thank you for your patience and enthusiasm!
            </AlertDescription>
          </div>
        </Alert>
      </div>
      <main className="flex-1 bg-gradient-to-b from-gray-900 to-black py-8">
        <section className="w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <Card className="bg-gray-800 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight xl:text-5xl text-green-400">
                    Join the BM SamayRaina community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 md:text-xl mb-6">
                    Join the BM SamayRaina community and get noticed by Samay Raina. Earn BM points, make predictions, and get discounted offers on Samay's merch as well as a chance to win free show tickets.
                  </p>
                  <Button size="lg" className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-black font-semibold" asChild>
                    <Link to="/signup">
                      Connect ChessCom Now (BETA)
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-0 shadow-xl">
                <CardContent className="p-0">
                  <img
                    alt="Hero"
                    className="w-full h-full object-cover"
                    style={{ minHeight: '50vh', objectPosition: 'center' }}
                    src={samayheader}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2024 BM SamayRaina. All rights reserved.</p>
            <nav className="flex gap-4 mt-4 sm:mt-0">
              <Link to="/terms" className="text-sm hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
