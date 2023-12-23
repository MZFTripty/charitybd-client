import { IoLocation } from "react-icons/io5"
import useFeatureGrocery from "../Hooks/useFeatureGrocery"

function FeatureGrocery() {
    const { featureGrocery, isLoading } = useFeatureGrocery()
    return (
        <div>
            <div className="divider text-3xl font-semibold text-purple-800 py-10">Feature Grocery Materials</div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
                {
                    isLoading ? <div className="flex justify-center my-8 col-span-3">
                        <span className="loading loading-spinner text-secondary "></span>
                    </div> :
                        featureGrocery.map(food => <>
                            <div className="card card-compact  bg-base-100 shadow-xl">
                                <figure className=""><img src={food.photo} alt="Shoes" className="h-40 w-full" /></figure>
                                <div className="p-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <img src={food.userPhoto} alt="" className="w-12 h-12 rounded-full" />
                                        <div>
                                            <h1 className="font-semibold">{food.name}</h1>
                                            <h1 className="text-xs">{food.email}</h1>
                                        </div>
                                    </div>
                                    <h2 className="card-title">{food.foodName}</h2>
                                    <p>Quantity : {food.quantity}</p>
                                    <p className="flex items-center gap-2"><IoLocation /> {food.location}</p>
                                    <p>{food.message}</p>

                                </div>
                            </div>
                        </>)
                }
            </div>
        </div>
    )
}

export default FeatureGrocery
