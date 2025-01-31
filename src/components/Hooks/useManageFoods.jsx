import { useQuery } from "@tanstack/react-query"
import axios from "axios"


function useManageFoods({email}) {
  const {data : foods = [] , isLoading, refetch} = useQuery({
    queryKey : ['foods', email],
    queryFn : async()=>{
        const res = await axios.get(`http://localhost:5000/managefoods/${email}`)
        return res.data;
    }
  })
  return {foods, isLoading, refetch}
}

export default useManageFoods
