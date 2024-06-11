import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useBlogsByEmail({ email }) {
    const { data: blogByEmail = [], isLoading, refetch } = useQuery({
        queryKey: ['blogByEmail', email],
        queryFn: async () => {
            const res = await axios.get(`https://charitybd-server.vercel.app/all-blogs/${email}`)
            return res.data
        }
    })


    return { blogByEmail , isLoading, refetch}
}
