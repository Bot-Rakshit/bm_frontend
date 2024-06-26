import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import { LandingPage } from './pages/landing.tsx';
import Signup from './pages/signup.tsx';
import '@/styles/globals.css';
import Test from './pages/test.tsx'; // Import the Test component
import SignUpCallback from './pages/signupcallback.tsx';
import Welcome from './pages/welcome.tsx'
import Community from './pages/community.tsx';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<Test />} /> 
        <Route path= '/welcome'element={<Welcome />} /> 
        <Route path= '/community'element={<Community />} />     
        <Route path="/signupcallback" element={<SignUpCallback/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
