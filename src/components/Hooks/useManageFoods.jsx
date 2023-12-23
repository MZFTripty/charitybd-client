import { useQuery } from "@tanstack/react-query"
import axios from "axios"


function useManageFoods({email}) {
  const {data : foods = [] , isLoading, refetch} = useQuery({
    queryKey : ['foods', email],
    queryFn : async()=>{
        const res = await axios.get(`https://charitybd-server.vercel.app/managefoods/${email}`)
        return res.data;
    }
  })
  return {foods, isLoading, refetch}
}

export default useManageFoods
