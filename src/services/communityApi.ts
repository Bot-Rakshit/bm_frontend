import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/chess/dashboard`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard stats', error);
    throw error;
  }
};