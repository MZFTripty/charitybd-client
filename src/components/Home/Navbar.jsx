import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../Provider/AuthProvider"
import Profile from "./Profile"


function Navbar() {

    const { user } = useContext(AuthContext)

    const navItems = <>
        <li><Link to={'/'}>Home</Link></li>
        <li>
            <div className="dropdown dropdown-bottom hover:dropdown-hover ">
                <div tabIndex={0} role="button" className="">Items</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li className="hover:bg-purple-200 rounded-xl"><Link to={'/availablefoods'}>Available Items</Link></li>
                    <li className="hover:bg-purple-200 rounded-xl"><Link to={'/managefoods'}>Manage My Items</Link></li>
                    <li className="hover:bg-purple-200 rounded-xl"><Link to={'/myfoodrequests'}>My Requests</Link></li>
                    <li className="hover:bg-purple-200 rounded-xl"><Link to={'/confirmedrequest'}>Confirmed Items</Link></li>
                </ul>
            </div>
        </li>
        
        <li className=" rounded-xl"><Link to={'/addfood'}>Add Items</Link></li>
        <li className=" rounded-xl"><Link to={'/blogs'}>Blogs</Link></li>

    </>


    return (
        <div className="navbar bg-green-200 font-bold ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="text-purple-600"><Link to={'/'}>Home</Link></li>
                        <li>
                            <details>
                                <summary className="text-purple-600">Items</summary>
                                <ul className="p-2">
                                    <li className="hover:bg-purple-200 rounded-xl"><Link to={'/availablefoods'}>Available Items</Link></li>
                                    
                                    <li className="hover:bg-purple-200 rounded-xl"><Link to={'/managefoods'}>Manage My Items</Link></li>
                                    <li className="hover:bg-purple-200 rounded-xl"><Link to={'/myfoodrequests'}>My Requests</Link></li>
                                    <li className="hover:bg-purple-200 rounded-xl"><Link to={'/confirmedrequest'}>Confirmed Items</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li className=" rounded-xl text-purple-700"><Link to={'/addfood'}>Add Items</Link></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-2xl text-purple-500 font-extrabold"><span className="text-3xl -mr-2 text-purple-800 ">C</span>harity <span className="text-3xl text-purple-800">BD</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <div tabIndex={0} role="button" onClick={()=>document.getElementById('my_modal_3').showModal()} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                            </div>
                        </div>
                        <Profile />
                    </>
                        :
                        <Link to={'/loginpage'} className="btn bg-purple-700 text-white">Log In</Link>
                }
            </div>
        </div>
    )
}

export default Navbar
