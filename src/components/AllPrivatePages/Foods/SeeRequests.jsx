import axios from "axios";




function SeeRequests({ requests, reqRefetch }) {

    const handleCancel = (id) => {
        axios.delete(`http://localhost:5000/requests/${id}`)
            .then(res => {
                console.log('success', res)
                reqRefetch();
            })

    }

    const handleConfirm = (food) => {
        // axios.patch(`http://localhost:5000/items/${food.fid}`, { reqQuantity :food.reqQuantity})
        //         .then(res=>{
        //             console.log(res.data)
        //         })
        axios.post('http://localhost:5000/confirmed', food)
            .then(res => {
                console.log(res)
                
                axios.delete(`http://localhost:5000/requests/${food._id}`)
                    .then(res => {
                        console.log('success', res)
                        reqRefetch();
                    })
            })


    }



    return (
        <div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center">Requests ({requests.length})</h3>
                    <div className="grid grid-cols-1">
                        {
                            requests.map(food => <>
                                <div className="border-2 rounded-xl p-4 my-4 flex items-center justify-center gap-5">
                                    <img src={food.requestPhoto} alt="" className="w-32 h-32 rounded-full" />
                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <h1 className="text-2xl font-semibold">{food.requestName} ({food.donation} tk)</h1>
                                            <h1 className="">{food.requestEmail}</h1>
                                            <h1 className={`${food.isPaid ? "text-green-500" : "text-red-500"}`}>{food.isPaid ? "Paid" : "This user isn't Paid yet"}</h1>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {
                                                food.isPaid && <button onClick={() => handleConfirm(food)} className="btn bg-green-700 text-white hover:text-black">Accept</button>
                                            }
                                            <button onClick={() => handleCancel(food._id)} className="btn bg-red-700 text-white hover:text-black">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </>)
                        }
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default SeeRequests
