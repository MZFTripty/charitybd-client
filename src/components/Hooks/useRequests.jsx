import { useQuery } from "@tanstack/react-query"
import axios from "axios"


function useRequests({email}) {
  const {data : requests = [], isLoading, refetch}= useQuery({
    queryKey : ['requests', email],
    queryFn : async()=>{
        const res = await axios.get(`http://localhost:5000/requests?email=${email}`)
        return res.data;
    }
  })
  return {requests, isLoading,refetch}
}

export default useRequests
