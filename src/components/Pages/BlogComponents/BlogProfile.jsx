import { useContext } from "react"
import { AuthContext } from "../../Provider/AuthProvider"
import useBlogsByEmail from "../../Hooks/useBlogsByEmail"
import { Link } from "react-router-dom"



export default function BlogProfile() {

    const { user } = useContext(AuthContext)
    const email = user?.email
    const {blogByEmail}=useBlogsByEmail({email})

    return (
        <div className="border-2 p-5 rounded-xl flex flex-col gap-3">
            <h1 className="text-center font-bold text-lg">Your Blog Post</h1>
            <img src={user.photoURL} alt="" className="w-32 h-32 m-auto rounded-full" />
            <p className="font-semibold">Your Blogs : { blogByEmail.length }</p>
            <Link to={'/manage-blogs'} className="font-semibold hover:text-blue-700">Manage Your Blogs</Link>
        </div>
    )
}
