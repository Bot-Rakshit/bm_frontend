import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.bmsamay.com/api';

export const getPercentileRanking = async (chessUsername: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chess/percentiles/${chessUsername}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching percentile ranking:', error);
    throw error;
  }
};