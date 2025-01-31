import { useQuery } from "@tanstack/react-query"
import axios from "axios";


function useFeatureGrocery() {
    const {data : featureGrocery=[],isLoading}= useQuery({
        queryKey : ['featureGrocery'],
        queryFn : async()=>{
            const res = await axios('http://localhost:5000/items?category=Grocery Materials&page=1&limit=3')
            return res.data;
        }
      })
      return {featureGrocery,isLoading}
}

export default useFeatureGrocery
