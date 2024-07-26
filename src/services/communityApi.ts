import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/chess/dashboard`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard stats', error);
    throw error;
  }
};