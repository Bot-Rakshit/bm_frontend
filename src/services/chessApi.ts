import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface PercentileRanking {
  blitzPercentile: number;
  bulletPercentile: number;
  rapidPercentile: number;
}

export const getPercentileRanking = async (chessUsername: string): Promise<PercentileRanking> => {
  try {
    const response = await axios.get<PercentileRanking>(`${BACKEND_URL}/api/chess/percentiles/${chessUsername}`);
    console.log('Percentile ranking response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching percentile ranking:', error);
    throw error;
  }
};
