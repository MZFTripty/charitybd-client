import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { ImCross } from "react-icons/im"
import { VscLoading } from "react-icons/vsc"


function UpdateFood({ updateId , refetch}) {
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const { data: food = {} , refetch: refetch2} = useQuery({
        queryKey: ['food', updateId],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/addfood/${updateId}`)
            return res.data
        }
    })
    const handleUpdate = e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target;
        const foodName = form.foodName.value;
        const photo = form.photo.value;
        const quantity = form.quantity.value;
        const location = form.location.value;
        const date = form.date.value;
        const message = form.message.value;
        const foodForm = {
            foodName, photo, quantity, location, date, message
        }
        axios.put(`http://localhost:5000/addfood/${updateId}`, foodForm)
            .then(res => {
                console.log(res.data)
                setLoading(false)
                setShow(true)
                form.reset()
                refetch();
                refetch2();
            })
        
    }


    return (
        <div>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="flex  justify-between items-center">
                        <h3 className="font-bold text-lg mx-auto">Update <span className="text-purple-700">{food.foodName}</span></h3>
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button onClick={()=> setShow(false)} className=""><ImCross /></button>
                        </form>
                    </div>

                    {
                        show ? <div>
                            <h1 className="text-center text-xl my-24 font-semibold animate-bounce text-green-800">
                                Successfully Updated !
                            </h1>
                        </div>
                            :
                            <form onSubmit={handleUpdate} className="py-8 px-5">
                                <div className="flex items-center justify-center gap-10">
                                    <input type="text" name="foodName" placeholder="Food Name" className="input input-bordered w-full max-w-xs" defaultValue={food.foodName} required />
                                    <input type="text" name="photo" defaultValue={food.photo} placeholder="Photo URL" className="input input-bordered w-full max-w-xs" required />
                                </div>
                                <div className="flex items-center justify-center gap-10 py-5">
                                    <input type="text" name="quantity" defaultValue={food.quantity} placeholder="Food Quantity" className="input input-bordered w-full max-w-xs" required />
                                    <input type="text" name="location" defaultValue={food.location} placeholder="Put Your Location" className="input input-bordered w-full max-w-xs" required />
                                </div>
                                <div className="flex items-center gap-6 justify-center py-6">
                                    <p className="font-semibold">Enter Expire Date : </p>
                                    <input type="date" name="date" defaultValue={food.date} placeholder="Date" className="input input-bordered w-full max-w-xs" required />
                                </div>
                                <textarea className="textarea textarea-bordered textarea-lg w-full max-w-2xl lg:mx-24 " name="message" defaultValue={food.message} placeholder="Write something"></textarea>
                                {
                                    loading ?
                                        <button className='btn btn-wide lg:mx-24 my-5 bg-purple-600 text-white hover:text-black border-none  '><VscLoading className="animate-spin text-3xl" /></button>
                                        : <input type="submit" value="Update Food" className="btn btn-wide lg:mx-24 my-5 bg-purple-600 text-white hover:text-black border-none " />
                                }

                            </form>
                    }

                </div>
            </dialog>
        </div>
    )
}

export default UpdateFood
