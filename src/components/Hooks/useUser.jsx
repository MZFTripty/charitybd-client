import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function useUser({ email }) {
    const { data: userInfo, isLoading, refetch } = useQuery({
        queryKey: ['userInfo', email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/userInfo/${email}`)
            return res.data
        }
    })

    return { userInfo, isLoading, refetch }
}
