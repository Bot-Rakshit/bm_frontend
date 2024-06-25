import React, { useEffect } from 'react';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

async function callTestRoute() {
  try {
    const response = await axios.get(`${backendUrl}/api/auth/test`, { withCredentials: true });
    console.log('Response from test route:', response.data);
  } catch (error) {
    console.error('Error calling test route:', error);
  }
}

const Test: React.FC = () => {
  useEffect(() => {
    callTestRoute();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white w-full">
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-bold mb-6">Test Route</h1>
        <p className="text-lg mb-8">Check the console for the response from the backend test route.</p>
      </div>
    </div>
  );
};

export default Test;
