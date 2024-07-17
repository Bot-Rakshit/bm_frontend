import { getPercentileRanking } from "@/services/chessApi"
import { useQuery } from "@tanstack/react-query"


export const useRankingsQuery = (chessUsername: string | null) => {
    return useQuery({
        queryKey: ['rankings', chessUsername],
        queryFn: () => getPercentileRanking(chessUsername!),
        enabled: !!chessUsername,
    })
}