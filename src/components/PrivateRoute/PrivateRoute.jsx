import { useContext } from "react"
import { AuthContext } from "../Provider/AuthProvider"
import { Navigate, } from "react-router-dom"


function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <div className="flex justify-center items-center my-32">
            <span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }
    if (user) {
        return children
    }
    return <Navigate state={location.pathname} to='/loginpage' />

}

export default PrivateRoute
