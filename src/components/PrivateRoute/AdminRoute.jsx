import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAdmin from '../Hooks/useAdmin'
import { AuthContext } from '../Provider/AuthProvider'
import useUser from '../Hooks/useUser'

export default function AdminRoute({ children }) {
    const { user, isLoading } = useContext(AuthContext)
    const location = useLocation()
    const email = user.email
    
    const { userInfo } = useUser({ email })

    if (isLoading) {
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
    console.log(email)
    // return <Navigate to={'/'} state={location.pathname} replace />
    return children
}
