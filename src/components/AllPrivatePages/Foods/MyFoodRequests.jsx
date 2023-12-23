import InfiniteScroll from "react-infinite-scroll-component"
import useRequests from "../../Hooks/useRequests"
import { useContext } from "react"
import { AuthContext } from "../../Provider/AuthProvider"
import Swal from "sweetalert2"
import axios from "axios"


function MyFoodRequests() {
    const { user } = useContext(AuthContext)
    const email = user.email
    const { requests, refetch, isLoading } = useRequests({ email })


    const handleCancel = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://charitybd-server.vercel.app/requests/${_id}`)
                    .then(res => {
                        console.log(res)
                        Swal.fire({
                            title: "Canceled!",
                            text: "Your food request has been canceled ",
                            icon: "success"
                        });
                        refetch();
                    })

            }
        });
    }


    return (
        <div className="max-w-3xl mx-auto my-12">
            <h1 className="text-center text-3xl font-semibold mb-8 text-purple-800">Your Requested Items </h1>
            <InfiniteScroll dataLength={10} height={500} className="p-5 border-t-2 border-b-2">
                <div className="grid grid-cols-1 gap-12 ">
                    {
                        isLoading? <div className="flex justify-center mt-32">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                        :
                        requests.length===0 ? <div className="lg:text-5xl animate-pulse flex justify-center mt-20">
                            <p>No Request Found!!!</p>
                        </div>:
                        requests.map(food => <>
                            <div className="flex flex-col lg:flex-row justify-around items-center  rounded-2xl shadow-xl">
                                <div className="flex flex-col lg:flex-row items-center gap-8 p-4 ">
                                    <div>
                                        <img src={food.photo} alt="" className="w-40 h-28 rounded-3xl" />
                                        <h1>Pending Money :Tk {food.donation}</h1>
                                    </div>
                                    <div>
                                        <h1><span className="font-bold">Food Name :</span> {food.foodName}</h1>
                                        <h1><span className="font-bold">Quantity :</span> {food.quantity}</h1>
                                        <h1><span className="font-bold">Expire Date :</span> {food.date}</h1>
                                        <h1><span className="font-bold">Location :</span>{food.location}</h1>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => handleCancel(food._id)} className="btn bg-red-700 text-white mb-5 lg:mb-0">Cancel</button>
                                </div>
                            </div>
                        </>)
                    }
                </div>
            </InfiniteScroll>

        </div>
    )
}

export default MyFoodRequests
