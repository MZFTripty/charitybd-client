import BlogsArea from "./BlogComponents/BlogsArea";
import PostArea from "./BlogComponents/PostArea";


export default function Blogs() {
  return (
    <div className="max-w-4xl mx-auto my-12">
      <PostArea/>
      <BlogsArea/>
    </div>
  )
}
