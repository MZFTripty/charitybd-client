import InfiniteScroll from "react-infinite-scroll-component";
import useBlogs from "../../Hooks/useBlogs";


export default function BlogsArea() {

    const { blogs } = useBlogs()
    const email = blogs?.filter(blog => {
        return blog.email === 'zarinfatematripty@gmail.com'
    })
    const isAdminEmail = email[0]?.email

    return (
        <div className="p-8">
            <InfiniteScroll dataLength={10} next={blogs} height={600}>
                {
                    blogs?.map(blog => <>
                        <div className="bg-purple-100 rounded-2xl p-5 max-w-2xl mx-auto mb-5">
                            <div className="flex gap-3 items-center ">
                            <img src={blog.photo} alt="" className="rounded-full w-12 h-12" />
                            <div>
                                <h1 className="font-semibold">{blog.name} {blog.email === isAdminEmail && "(Admin)"} </h1>
                                <p className="font-light text-xs">{blog.email}</p>
                            </div>
                            </div>
                            <p className="px-12 py-4">{blog.post}</p>
                            <img src={blog.blogPhoto} alt="" className="w-60 mt-5 mx-auto" />
                        </div>
                    </>)
                }
            </InfiniteScroll>
        </div>
    )
}
