import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { LandingPage } from './pages/landing.tsx';
import Signup from './pages/signup.tsx';
import '@/styles/globals.css';
import SignUpCallback from './pages/signupcallback.tsx';
import Welcome from './pages/welcome.tsx';
import Community from './pages/community.tsx';
import Blunder from './pages/somethingwentwrong.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import PrivacyPolicy from './pages/privacypolicy.tsx';
import ComingSoon from './components/comingsoon.tsx';
import ChessNews from './pages/ChessNews.tsx';
import ChessTutorials from './pages/ChessTutorials.tsx';
import Chat from './pages/chat.tsx';
import DiamondGift from './pages/gift.tsx';
import CookieConsentWrapper from './components/CookieConsentWrapper.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route element={<CookieConsentWrapper />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/app" element={<App />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/gift" element={<DiamondGift/>} />
              <Route path="/chessnews" element={<ChessNews />} />
              <Route path="/chesstutorials" element={<ChessTutorials />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/community" element={<Community />} />
              <Route path="/signupcallback" element={<SignUpCallback />} />
              <Route path="/blunder" element={<Blunder />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/comingsoon" element={<ComingSoon />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);