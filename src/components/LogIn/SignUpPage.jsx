import Lottie from "lottie-react"
import logInAnimation from '../../Animations/Animation-logIn.json'
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { VscLoading } from "react-icons/vsc";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";


function SignUpPage() {
    const { createUser, loading, setLoading, signInGoogle } = useContext(AuthContext)
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [length, setLength] = useState(0)
    console.log(length)

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const userName = form.userName.value
        const photo = form.photo.value
        const email = form.email.value
        const password = form.password.value

        createUser(email, password)
            .then(res => {
                console.log('success')
                const userForm = {
                    email, photo, userName, isUpward: false, isDowanward: false, role : 'user'
                }
                axios.post('http://localhost:5000/create-user', userForm).then(res => console.log(res))
                updateProfile(res.user, {
                    displayName: userName, photoURL: photo
                })
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully Signned Up !",
                    showConfirmButton: false,
                    timer: 2000
                });
                form.reset()
                navigate('/')
            })
            .catch(error => {
                console.log(error.message)
                setLoading(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.message}`,
                });
            })

    }
    const handleGoogle = () => {
        signInGoogle()
            .then(res => {
                console.log(res)
                const userName = res.user.displayName
                const photo = res.user.photoURL
                const email = res.user.email
                const userForm = {
                    email, photo, userName, isUpward: false, isDowanward: false, role : 'user'
                }
                axios.post('http://localhost:5000/create-user', userForm).then(res => console.log(res))
                navigate('/')
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    return (
        <div className="flex flex-col lg:flex-row-reverse my-12 justify-center items-center gap-20 p-4 max-w-4xl mx-auto rounded-2xl">
            <div className="max-w-xs">
                <Lottie animationData={logInAnimation} />
            </div>
            <div className="shadow-lg rounded-lg p-4">
                <p className="text-center font-semibold text-2xl pb-3 text-purple-600">Please Sign Up!!</p>
                <form onSubmit={handleSignUp} className="flex flex-col items-center gap-y-3">
                    <input type="text" name='userName' placeholder="Enter User Name" className="input input-bordered w-full max-w-xs" />
                    <input type="text" name='photo' placeholder="Enter Photo URL" className="input input-bordered w-full max-w-xs" />
                    <input type="email" name='email' placeholder="Enter Email" className="input input-bordered w-full max-w-xs" />
                    <div className="relative w-full">
                        <input type={show ? 'text' : 'password'} onChange={(e) => setLength(e.target.value.length)} name='password' placeholder="Enter Password" className="input input-bordered w-full max-w-xs" />
                        {
                            length === 0 ? <p></p> :
                                show ? <p onClick={() => setShow(false)}><FaEyeSlash className="absolute text-xl top-3 right-2 text-black" /></p> :
                                    <p onClick={() => setShow(true)}><FaEye className="absolute text-xl top-3 right-2 text-black" /></p>
                        }
                    </div>
                    {
                        loading ? <button className='btn bg-purple-800 text-white hover:text-lg w-full max-w-xs hover:text-black  '><VscLoading className="animate-spin text-3xl" /></button>
                            : <button className='btn bg-purple-800 text-white hover:text-lg w-full max-w-xs hover:text-black '>Sign Up</button>
                    }
                </form>
                <p className="pt-3 ">Already Have an Account? <Link to={'/loginpage'} className="font-semibold">Sign In</Link> </p>
                <p className="divider">OR</p>
                <div className="flex justify-center">
                    <button onClick={handleGoogle} className="btn text-lg bg-purple-200 text-black"><FcGoogle className="text-2xl" /> Continue With Google</button>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
