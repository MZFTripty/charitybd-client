import { useQuery } from "@tanstack/react-query"
import axios from "axios"


function useAvailableFoods({ page, category }) {
    const { data: availableFoods = [], isLoading, refetch } = useQuery({
        queryKey: ['availableFoods', page, category],
        queryFn: async () => {
            const res = await axios.get(`https://charitybd-server.vercel.app/items?category=${category}&page=${page}&limit=6`)
            return res.data
        }
    })
    return { availableFoods, isLoading, refetch }
}

export default useAvailableFoods
