import { useQuery } from "@tanstack/react-query"
import axios from "axios"

function useFeatureClothes() {
    const {data : featureClothes=[],isLoading}= useQuery({
        queryKey : ['featureClothes'],
        queryFn : async()=>{
            const res = await axios('https://charitybd-server.vercel.app/items?category=Clothes&page=1&limit=3')
            return res.data;
        }
      })
      return {featureClothes,isLoading}
}

export default useFeatureClothes
