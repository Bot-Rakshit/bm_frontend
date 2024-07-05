import axios from 'axios';

const API_BASE_URL = 'https://api.bmsamay.com/api';

export interface PercentileRanking {
  blitzPercentile: number;
  bulletPercentile: number;
  rapidPercentile: number;
}

export const getPercentileRanking = async (chessUsername: string): Promise<PercentileRanking> => {
  try {
    const response = await axios.get<PercentileRanking>(`${API_BASE_URL}/chess/percentiles/${chessUsername}`);
    console.log('Percentile ranking response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching percentile ranking:', error);
    throw error;
  }
};