import axios from 'axios';

export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard stats', error);
    throw error;
  }
};