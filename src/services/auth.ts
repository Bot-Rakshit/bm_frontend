import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function signInWithGoogle() {
  try {
    // Redirect directly to the backend OAuth URL
    window.location.href = `${backendUrl}/api/auth/google`;
  } catch (error) {
    console.error('Error initiating Google sign-in:', error);
    throw error;
  }
}

export async function verifyChessAccount(chessUsername: string, token: string) {
  try {
    const response = await axios.post(
      `${backendUrl}/api/auth/chess-verify/confirm`,
      { chessUsername },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying Chess.com account:', error);
    throw error;
  }
}

export async function initiateChessVerification(chessUsername: string, token: string) {
  try {
    const response = await axios.post(
      `${backendUrl}/api/auth/chess-verify`,
      { chessUsername },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error initiating Chess.com verification:', error);
    throw error;
  }
}