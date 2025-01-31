import { useQuery } from "@tanstack/react-query"
import axios from "axios"



function useSearch({ search }) {
    const { data: searchResults = [], isLoading } = useQuery({
        queryKey: ['searchResults', search],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/search?q=${search}`)
            return res.data
        }
    })
    return { searchResults, isLoading }
}

export default useSearch
