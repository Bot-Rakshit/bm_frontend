import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function signInWithGoogle() {
  try {
    const response = await axios.get('http://localhost:3000/api/auth/google');
    // Instead of redirecting, return the URL
    return response.data.authUrl;
    console.log(response.data.authUrl);
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