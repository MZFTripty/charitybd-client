import { useContext } from "react"
import { AuthContext } from "../Provider/AuthProvider"
import { VscLoading } from "react-icons/vsc";
import { Link } from "react-router-dom";
import useUser from "../Hooks/useUser";


function Profile() {
    const { user, logOut, loading, setLoading } = useContext(AuthContext)
    const { userInfo, isLoading } = useUser({ email: user?.email })

    const handleSignOut = () => {
        setLoading(true)
        logOut()
            .then(res => {
                console.log('success', res)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.message)
                setLoading(false)
            })
    }

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Profile </h3>
                    <div className="flex flex-col items-center gap-3">
                        <img src={user.photoURL} alt="" className="w-40 h-40 rounded-full" />
                        <p>{user.displayName}</p>
                        <p>{user.email}</p>
                        <Link to={'/manage-blogs'} className="btn btn-wide btn-sm btn-outline text-purple-800">Manage Your Blogs</Link>
                        {
                            isLoading ? <></>:
                            userInfo.role === "admin" && <Link to={'/admin'} className="btn btn-wide btn-sm btn-outline text-purple-800">Admin Dashboard</Link>
                        }
                        {
                            loading ? <button className='btn bg-red-800 text-white btn-wide  '><VscLoading className="animate-spin text-3xl" /></button> : <button onClick={handleSignOut} className="btn bg-red-800 btn-wide text-white">Sign Out</button>
                        }
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Profile
