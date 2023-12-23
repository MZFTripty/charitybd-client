import { useQuery } from "@tanstack/react-query"
import axios from "axios"



function useSearch({ search }) {
    const { data: searchResults = [], isLoading } = useQuery({
        queryKey: ['searchResults', search],
        queryFn: async () => {
            const res = await axios.get(`https://charitybd-server.vercel.app/search?q=${search}`)
            return res.data
        }
    })
    return { searchResults, isLoading }
}

export default useSearch
