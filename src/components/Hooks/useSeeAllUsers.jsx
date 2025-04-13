import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function useSeeAllUsers() {
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/all-user`)
            return res.data
        }
    })

    return { users, isLoading, refetch }
}
