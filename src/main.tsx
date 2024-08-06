import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { LandingPage } from './pages/Landing.tsx';
import Signup from './pages/SignUp.tsx';
import '@/styles/globals.css';
import SignUpCallback from './pages/SignUpCallback.tsx';
import Welcome from './pages/Welcome.tsx';
import Community from './pages/Community.tsx';
import Blunder from './pages/SomethingWentWrong.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import ComingSoon from './components/comingsoon.tsx';
import ChessNews from './pages/ChessNews.tsx';
import ChessTutorials from './pages/ChessTutorials.tsx';
import Chat from './pages/Chat.tsx';
import DiamondGift from './pages/Gift.tsx';
import CookieConsentWrapper from './components/CookieConsentWrapper.tsx';
import PageNotFound from './pages/404NotFound.tsx';
import GuessTheElo from './pages/GTE.tsx';
import Learn from './pages/Learn.tsx';
import ShareGamePopup from './components/ShareGamepopup.tsx';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route element={<CookieConsentWrapper />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/app" element={<App />} />
              <Route path="/secret-chat" element={<Chat />} />
              <Route path="/gift" element={<DiamondGift />} />
              <Route path="/chessnews" element={<ChessNews />} />
              <Route path="/chesstutorials" element={<ChessTutorials />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/community" element={<Community />} />
              <Route path="/signupcallback" element={<SignUpCallback />} />
              <Route path="/blunder" element={<Blunder />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/comingsoon" element={<ComingSoon />} />
              <Route path="/gte" element={<GuessTheElo />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/sharegamepopup" element={<ShareGamePopup />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
