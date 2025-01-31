import { useQuery } from "@tanstack/react-query"
import axios from "axios"

function useFeatureClothes() {
    const {data : featureClothes=[],isLoading}= useQuery({
        queryKey : ['featureClothes'],
        queryFn : async()=>{
            const res = await axios('http://localhost:5000/items?category=Clothes&page=1&limit=3')
            return res.data;
        }
      })
      return {featureClothes,isLoading}
}

export default useFeatureClothes
