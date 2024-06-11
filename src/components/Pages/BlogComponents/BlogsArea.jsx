import InfiniteScroll from "react-infinite-scroll-component";
import useBlogs from "../../Hooks/useBlogs";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


export default function BlogsArea() {

    const { blogs, refetch } = useBlogs()
    const { user } = useContext(AuthContext)
    const email = user?.email;

    //updward

    const upward = (id) => {
        axios.patch(`https://charitybd-server.vercel.app/upward/${id}/${email}`)
            .then(res => {
                console.log(res.user);
                refetch();
            })
    }
    const downward = (id) => {
        axios.patch(`https://charitybd-server.vercel.app/downward/${id}/${email}`)
            .then(res => {
                console.log(res.user);
                refetch();
            })
    }

    // for button disabled 


    return (
        <div className="p-8">
            <InfiniteScroll dataLength={10} next={blogs} height={600}>
                {
                    blogs?.map(blog => <>
                        <div className="bg-purple-100 rounded-2xl p-5 max-w-2xl mx-auto mb-5">
                            <div className="flex items-center justify-between">
                                <div className="flex  gap-3 items-center ">
                                    <img src={blog.photo} alt="" className="rounded-full w-12 h-12" />
                                    <div>
                                        <h1 className="font-semibold">{blog.name} {blog?.role === "admin" && "(Admin)"} </h1>
                                        <p className="font-light text-xs">{blog.email}</p>
                                    </div>
                                </div>

                                {/* Rating System */}

                                <div className={`lg:radial-progress 
                                                ${((blog?.upwards.length / (blog?.upwards.length + blog?.downwards.length)) * 100 ) <=50 ? "text-red-700" : "text-green-700" }
                                    `} style={{ "--value": (blog?.upwards.length / (blog?.upwards.length + blog?.downwards.length)) * 100 }} role="progressbar">{Math.floor((blog?.upwards.length / (blog?.upwards.length + blog?.downwards.length)) * 100)}%</div>


                            </div>
                            <p className="px-12 py-4">{blog.post}</p>
                            <img src={blog.blogPhoto} alt="" className="w-60 mt-5 mx-auto" />
                            <div className="mt-6 flex items-center gap-3">
                                <button disabled={blog.upwards.filter(upEmail => upEmail === email).length !== 0} onClick={() => upward(blog._id)} className="flex items-center gap-2 btn btn-sm bg-green-800 text-white hover:bg-green-950">{blog.upwards.length} <FaRegArrowAltCircleUp /></button>
                                <button disabled={blog.downwards.filter(upEmail => upEmail === email).length !== 0} onClick={() => downward(blog._id)} className="flex items-center gap-2 btn btn-sm bg-red-800 text-white hover:bg-red-950">{blog.downwards.length} <FaRegArrowAltCircleUp className="rotate-180" /></button>
                            </div>
                        </div>
                    </>)
                }
            </InfiniteScroll>
        </div>
    )
}
