import { getChessNews } from '@/services/chessApi';
import { Article } from '@/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useNewsQuery = (
  opts?: Omit<UseQueryOptions<Article[]>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['news'],
    queryFn: getChessNews,
    ...(opts || {}),
  });
};
