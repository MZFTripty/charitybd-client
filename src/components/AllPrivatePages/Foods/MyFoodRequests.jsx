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
                axios.delete(`http://localhost:5000/requests/${_id}`)
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

    const handlePay = async (food) => {
        try {
            const res = await axios.post(`http://localhost:5000/init`, {
                total_amount: Number(food.donation),
                product_name: food.foodName,
                product_profile: food.foodName,
                product_image: food.photo,
                cus_name: user.displayName,
                cus_email: user.email,
                ship_name: user.displayName,
            })
            console.log(res)
            window.location.href = res.data
        }
        catch (err) {
            console.log(err)
            Swal.fire({
                title: "Failed!",
                text: "Failed to pay the request. Please try again later.",
                icon: "error"
            });
        }
    }


    return (
        <div className="max-w-3xl mx-auto my-12">
            <h1 className="text-center text-3xl font-semibold mb-8 text-purple-800">Your Requested Items </h1>
            <InfiniteScroll dataLength={10} height={500} className="p-5 border-t-2 border-b-2">
                <div className="grid grid-cols-1 gap-12 ">
                    {
                        isLoading ? <div className="flex justify-center mt-32">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                            :
                            requests.length === 0 ? <div className="lg:text-5xl animate-pulse flex justify-center mt-20">
                                <p>No Request Found!!!</p>
                            </div> :
                                requests.map(food => <>
                                    <div className="flex flex-col lg:flex-row justify-around items-center  rounded-2xl shadow-xl">
                                        <div className="flex flex-col lg:flex-row items-center gap-8 p-4 ">
                                            <div className="flex flex-col gap-4">
                                                <img src={food.photo} alt="" className="w-40 h-28 rounded-3xl" />
                                                <h1 className="text-sm badge bg-orange-600 text-white p-2">Your {food.donation} TK is pending</h1>
                                            </div>
                                            <div>
                                                <h1><span className="font-bold">Food Name :</span> {food.foodName}</h1>
                                                <h1><span className="font-bold">Quantity :</span> {food.quantity}</h1>
                                                <h1><span className="font-bold">Expire Date :</span> {food.date}</h1>
                                                <h1><span className="font-bold">Location :</span>{food.location}</h1>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div>
                                                <button onClick={() => handlePay(food)} className="btn btn-sm bg-orange-500 text-white mb-5 lg:mb-0">Pay {food.donation} Tk </button>
                                            </div>
                                            <div>
                                                <button onClick={() => handleCancel(food._id)} className="btn btn-sm bg-red-700 text-white mb-5 lg:mb-0">Cancel</button>
                                            </div>
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
