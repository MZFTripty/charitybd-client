import BlogProfile from "./BlogComponents/BlogProfile";
import BlogsArea from "./BlogComponents/BlogsArea";
import PostArea from "./BlogComponents/PostArea";


export default function Blog() {
  return (
    <div className="max-w-5xl mx-auto my-12 grid lg:grid-cols-4">
      <div className="col-span-3">
        <PostArea />
        <BlogsArea />
      </div>
      <div className="hidden lg:block">
        <BlogProfile/>
      </div>
    </div>
  )
}