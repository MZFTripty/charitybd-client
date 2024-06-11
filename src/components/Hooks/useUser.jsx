import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function useUser({ email }) {
    const { data: userInfo, isLoading, refetch } = useQuery({
        queryKey: ['userInfo', email],
        queryFn: async () => {
            const res = await axios.get(`https://charitybd-server.vercel.app/userInfo/${email}`)
            return res.data
        }
    })

    return { userInfo, isLoading, refetch }
}
