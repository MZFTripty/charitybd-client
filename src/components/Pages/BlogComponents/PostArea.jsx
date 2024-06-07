import { useContext, useState } from "react"
import { AuthContext } from "../../Provider/AuthProvider"
import axios from "axios"
import Swal from "sweetalert2"
import useBlogs from "../../Hooks/useBlogs"
import AddPhotoModal from "./AddPhotoModal"


export default function PostArea() {

  const { user } = useContext(AuthContext)
  const name = user?.displayName;
  const email = user?.email
  const photo = user?.photoURL
  const [post, setPost] = useState('')
  const { refetch } = useBlogs()


  const submitPost = () => {
    axios.post('https://charitybd-server.vercel.app/post-a-blog', { post, name, email, photo })
      .then(res => {
        console.log(res.data)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "  Posted Successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        setPost('')
        refetch();
      })
  }



  return (

    <div className="flex flex-col lg:flex-row items-center justify-around px-5 lg:px-0 ">
      <img src={photo} alt="" className="rounded-full w-16 h-16 hidden lg:block" />
      <textarea id="output" onChange={(e) => setPost(e.target.value)} placeholder="Post a blog here" className="textarea textarea-bordered textarea-xl w-full max-w-xl" ></textarea>
      <div className=" mt-4 lg:mt-0 flex  lg:flex-col gap-3  ">
        <button onClick={()=>document.getElementById('Add_photo').showModal()} className="btn btn-sm bg-purple-400 text-white">Add a photo</button>
        <button onClick={() => {
          submitPost();
          document.getElementById("output").value = "";
        }} disabled={post.length === 0} className="btn btn-sm bg-purple-800 text-white">Post Blog</button>
      </div>
      <AddPhotoModal/>
    </div>
  )
}
