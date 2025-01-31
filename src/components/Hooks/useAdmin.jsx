import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import axios from "axios";


const useAdmin = () => {
   const {user} = useContext(AuthContext)

   const{data : isAdmin, isLoading:loading } = useQuery({
    queryKey : ['admins'],
    queryFn : async() =>{
        const res  = await axios.get(`http://localhost:5000/userInfo/${user.email}`)
        return res.data.role;
    }
   })
   return [isAdmin, loading]
};

export default useAdmin;