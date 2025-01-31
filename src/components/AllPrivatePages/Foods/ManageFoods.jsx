import { useContext, useState } from "react"
import { AuthContext } from "../../Provider/AuthProvider"
import useManageFoods from "../../Hooks/useManageFoods"
import { FaEdit, } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { BsCartCheck } from "react-icons/bs";
import UpdateFood from "./UpdateFood";
import SeeRequests from "./SeeRequests";
import { useQuery } from "@tanstack/react-query";


function ManageFoods() {
    const { user } = useContext(AuthContext)
    const [updateId, setUpdateId] = useState('')
    const [foodId , setFoodId ]= useState('')
    const email = user.email
    const { foods, isLoading, refetch } = useManageFoods({ email })
    const{data : requests=[], refetch:reqRefetch }= useQuery({
        queryKey : ['requests', foodId, email],
        queryFn : async ()=>{
            const res = await axios.get(`http://localhost:5000/requests/${foodId}?email=${email}`)
            return res.data
        }
    })
    


    const handleDelete = (_id) => {
        console.log(_id)
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
                axios.delete(`http://localhost:5000/addfood/${_id}`)
                    .then(res => {
                        console.log('success')
                    }).catch(err => console.log(err.message))
                Swal.fire({
                    title: "Deleted!",
                    text: "Food has been deleted !.",
                    icon: "success"
                });
                refetch();
            }
        });
    }

    const handleUpdate = (_id) => {
        setUpdateId(_id)
    }

    return (
        <div className="max-w-4xl mx-auto my-12">
            <h1 className="text-center font-bold text-2xl mb-12 text-purple-700">Manage Your Items </h1>
            <div className="overflow-x-auto">
                {
                    isLoading ? <div className="flex justify-center mt-12">
                        <span className="loading loading-spinner text-secondary "></span>
                    </div> :
                        <table className="table table-xs">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Item Name</th>
                                    <th>Item Quantity</th>
                                    <th>Location</th>
                                    <th>Expire Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    foods.map((food, index) => <>
                                        <tr>
                                            <th>{index + 1}</th>
                                            <td>{food.foodName}</td>
                                            <td>{food.quantity}</td>
                                            <td>{food.location}</td>
                                            <td>{food.date}</td>
                                            <td className="flex items-center gap-3">
                                                <button >
                                                    <FaEdit onClick={() => {
                                                        handleUpdate(food._id);
                                                        document.getElementById(`my_modal_4`).showModal();
                                                    }} className="text-xl text-purple-800" />
                                                </button>
                                                <button onClick={() => handleDelete(food._id)}>
                                                    <MdDeleteForever className="text-2xl text-red-700" />
                                                </button>
                                                <button onClick={()=>{
                                                    document.getElementById(`my_modal_2`).showModal();
                                                    setFoodId(food._id)
                                                }}>
                                                    <BsCartCheck className="text-2xl"/>
                                                </button>
                                            </td>
                                        </tr>
                                    </>)
                                }
                            </tbody>
                        </table>
                }
            </div>
            <UpdateFood updateId={updateId} refetch={refetch} />
            <SeeRequests requests={requests} reqRefetch={reqRefetch}/>
        </div>
    )
}

export default ManageFoods
