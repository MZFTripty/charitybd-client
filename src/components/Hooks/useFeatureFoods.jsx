import { useQuery } from "@tanstack/react-query"
import axios from "axios"


function useFeatureFoods() {
  const {data : featureFoods=[],isLoading}= useQuery({
    queryKey : ['featureFoods'],
    queryFn : async()=>{
        const res = await axios('https://charitybd-server.vercel.app/items?category=Food&page=1&limit=3')
        return res.data;
    }
  })
  return {featureFoods,isLoading}
}

export default useFeatureFoods
