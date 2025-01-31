import axios from "axios"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../Provider/AuthProvider"
import useBlogs from "../../Hooks/useBlogs"
import Swal from "sweetalert2"

export default function AddPhotoModal({role}) {
    const [post, setPost] = useState('')
    const [postedPic, setPostedPic] = useState(null)
    const { user } = useContext(AuthContext)
    const name = user?.displayName;
    const email = user?.email
    const photo = user?.photoURL
    const { refetch } = useBlogs()
    const fileInputRef = useRef(null);
    const modalRef = useRef(null);
    const [loading, setLoading] = useState(false)

    const submit = async () => {
        setLoading(true)
        const formData = new FormData();
        formData.append('file', postedPic);
        formData.append('upload_preset', 'Image_CB');
        try {
            await axios.post(
                'https://api.cloudinary.com/v1_1/dcc2jqfig/image/upload',
                formData
            )
                .then(response => {
                    axios.post('http://localhost:5000/post-a-blog', { post, name, email, photo, blogPhoto: response.data.secure_url, role,upwards : [], downwards : [] })
                        .then(res => {
                            console.log(res.data)
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Posted Successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setPost('')
                            setPostedPic(null);
                            if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                            }
                            refetch();
                            if (modalRef.current) {
                                modalRef.current.close();
                                setLoading(false)
                            }
                        })
                })
        }
        catch (error) {
            console.error("Error uploading the image", error);
        }
    }

    return (
        <div>
            <dialog id="Add_photo" className="modal" ref={modalRef}>
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form method="dialog" className="w-full flex flex-col">
                        <h3 className="font-bold text-lg mb-6">Add Your Post Here</h3>
                        <textarea id="output" value={post} onChange={(e) => { setPost(e.target.value) }} placeholder="Add your thoughts " className="textarea textarea-bordered textarea-md w-full max-w-xl mb-3" ></textarea>
                        <input ref={fileInputRef} onChange={(e) => setPostedPic(e.target.files[0])} type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                        <button type="button" onClick={() => {
                            submit();
                        }} disabled={post.length === 0 || !postedPic || loading} className="btn mt-5 bg-purple-800 text-white">Post Blog</button>
                    </form>
                </div>
            </dialog>
        </div>
    )
}
