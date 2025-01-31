import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useBlogs() {
  const {data : blogs = [], isLoading, refetch}=useQuery({
    queryKey : ['blogs'],
    queryFn : async()=>{
      const res = await axios.get('http://localhost:5000/all-blogs')
      return res.data
    }
  })

  return {blogs, isLoading, refetch}
}
