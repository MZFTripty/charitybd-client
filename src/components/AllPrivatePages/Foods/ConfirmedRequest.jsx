import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { AuthContext } from "../../Provider/AuthProvider"
import deliveryAnimation from '../../../Animations/Delivery-animation.json'
import Lottie from "lottie-react"


function ConfirmedRequest() {
    const { user } = useContext(AuthContext)
    const email = user.email
    const { data: foods = [], isLoading } = useQuery({
        queryKey: ['foods', email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/confirmed?email=${email}`)
            return res.data
        }
    })


    return (
        <div className="max-w-4xl mx-auto my-12">
            <h1 className="text-center text-3xl font-semibold mb-6 text-purple-800">Your Confirmed Requests</h1>
            <InfiniteScroll dataLength={10} height={500} className="p-5 border-t-2 border-b-2">
                <div className=" grid grid-cols-1 gap-8">
                    {
                        isLoading ? <div className="flex justify-center mt-32">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div> :
                            foods.map(food => <>
                                <div className="border-2 lg:p-4 gap-2 lg:gap-0 rounded-xl shadow-xl flex flex-col lg:flex-row justify-between items-center">
                                    <img src={food.photo} alt="" className="w-52 h-40 rounded-xl" />
                                    <div className="space-y-1">
                                        <h1>Item name : {food.foodName}</h1>
                                        <h1>Quantity : {food.reqQuantity}</h1>
                                        <h1>Expire Date : {food.date}</h1>
                                        <h1>Location : {food.location}</h1>
                                    </div>
                                    <div className="max-w-xs">
                                        <Lottie animationData={deliveryAnimation} />
                                    </div>
                                </div>
                            </>)
                    }
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default ConfirmedRequest
