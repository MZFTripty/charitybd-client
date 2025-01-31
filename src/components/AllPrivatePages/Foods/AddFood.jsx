import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { VscLoading } from "react-icons/vsc";
import Swal from "sweetalert2";


function AddFood() {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [category, setCategory]= useState('')

    const addfood = (e) => {
        e.preventDefault()
        setLoading(true)
        const form = e.target;
        const name = user.displayName;
        const userPhoto = user.photoURL
        const email = user.email
        const foodName = form.foodName.value;
        const photo = form.photo.value;
        const quantity = form.quantity.value;
        const location = form.location.value;
        const category = form.category.value
        const date = form.date.value;
        const message = form.message.value;
        const foodForm = {
            foodName, photo, quantity, location, date, message, name, email, userPhoto, category
        }
        axios.post('http://localhost:5000/addfood', foodForm)
            .then(res => {
                console.log(res.data)
                setLoading(false)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "  Added Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset()
            })


    }

    return (
        <div className="max-w-4xl mx-auto shadow-2xl rounded-lg lg:mt-20 mt-8 mb-10">
            <p className="text-purple-700 text-4xl font-semibold text-center  py-8">Add Your Items Here</p>
            <form onSubmit={addfood} className="py-8 px-5">
                <div className="flex items-center justify-center gap-10">
                    <input type="text" name="foodName" placeholder=" Name" className="input input-bordered w-full max-w-xs" required />
                    <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className="flex items-center justify-center gap-10 py-5">
                    <input type="text" name="quantity" placeholder=" Quantity" className="input input-bordered w-full max-w-xs" required />
                    <input type="text" name="location" placeholder="Put Your Location" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className="flex justify-center gap-10 py-6">
                    <div className="flex flex-col gap-3">
                        <p className="font-semibold">Enter Expire Date : </p>
                        <input type="date" name="date" placeholder="Date" className="input input-bordered w-full max-w-xs" required disabled={category==='Clothes'}/>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p>Select Category</p>
                        <select onChange={(e)=>setCategory(e.target.value)} name="category" className="select select-bordered w-full ">
                            <option>Food</option>
                            <option>Clothes</option>
                            <option>Grocery Materials</option>
                        </select>
                    </div>
                </div>
                <textarea className="textarea textarea-bordered textarea-lg w-full max-w-2xl lg:mx-24 " name="message" placeholder="Write something"></textarea>
                {
                    loading ?
                        <button className='btn btn-wide lg:mx-24 my-5 bg-purple-600 text-white hover:text-black border-none  '><VscLoading className="animate-spin text-3xl" /></button>
                        : <input type="submit" value="Add" className="btn btn-wide lg:mx-24 my-5 bg-purple-600 text-white hover:text-black border-none " />
                }
            </form>
        </div>
    )
}

export default AddFood
