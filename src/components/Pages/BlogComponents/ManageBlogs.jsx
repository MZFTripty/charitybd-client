import InfiniteScroll from "react-infinite-scroll-component";
import useBlogsByEmail from "../../Hooks/useBlogsByEmail";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";


export default function ManageBlogs() {

    const { user } = useContext(AuthContext)
    const email = user?.email
    const { blogByEmail, isLoading, refetch } = useBlogsByEmail({ email })

    const deleteBlog = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://charitybd-server.vercel.app/delete-Blog/${_id}`)
                    .then(res => {
                        console.log(res)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    })
            }
        })
    }

    return (
        <div className="my-8 max-w-4xl mx-auto ">
            <p className="text-center text-3xl font-bold mb-8">Manage Your Blogs</p>
            <div className="">
                <InfiniteScroll dataLength={10} next={blogByEmail} height={600} >
                    {
                        isLoading ? <div className="flex justify-center mt-11"><span className="loading loading-ball loading-xs"></span>
                            <span className="loading loading-ball loading-sm"></span>
                            <span className="loading loading-ball loading-md"></span>
                            <span className="loading loading-ball loading-lg"></span></div> :
                            blogByEmail.length === 0 ? <div className="text-4xl mt-12 text-center  animate-pulse">
                                No records of blogs
                            </div> :
                                blogByEmail.map(blog => <>
                                    <div className="flex flex-col items-center  border-2 p-5 bg-purple-100 rounded-3xl gap-5 mb-6">
                                        <p>{blog.post}</p>
                                        <img src={blog.blogPhoto} alt="" />
                                        <button onClick={() => deleteBlog(blog._id)} className="btn bg-red-800 text-white hover:bg-red-950">Delete This Blog</button>
                                    </div>
                                </>)
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}
