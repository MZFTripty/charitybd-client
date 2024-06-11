import useAvailableFoods from "../../Hooks/useAvailableFoods"
import { IoLocation } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { useContext, useState } from "react";
import useSearch from "../../Hooks/useSearch";
import { Link, useLoaderData } from "react-router-dom";
import { ImCross } from "react-icons/im";
import Lottie from "lottie-react";
import searchingAnimation from '../../../Animations/Animation-searching.json'
import { AuthContext } from "../../Provider/AuthProvider";
import { FaRegPlusSquare } from "react-icons/fa";
import axios from "axios";
import SkeletonLoading from "../../Home/Utilities/SkeletonLoading";



function AvailableFoods() {
    const [page, setPage] = useState(1)
    const [category, setCategory] = useState('')
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')
    const { user } = useContext(AuthContext)
    const [food, setFood] = useState({})
    const { availableFoods, isLoading,  } = useAvailableFoods({ page, category })
    const [search, setSearch] = useState('')
    const { searchResults, isLoading: searchLoading } = useSearch({ search })
    const { count , foodCount, clothCount, groceryCount} = useLoaderData() 
    const allPages = Math.ceil(count / 6);
    const foodPages = Math.ceil(foodCount / 6);
    const clothPages = Math.ceil(clothCount / 6);
    const groceryPages = Math.ceil(groceryCount / 6);

    const totalPages = [...Array(allPages).keys()]
    const totalfoodPages = [...Array(foodPages).keys()]
    const totalclothPages = [...Array(clothPages).keys()]
    const totalgroceryPages = [...Array(groceryPages).keys()]


    const handleSearch = (e) => {
        e.preventDefault()
        const searchTerm = e.target.searchTerm.value;
        setSearch(searchTerm)
    }

    const handleRequest = (e) => {
        
        e.preventDefault()
        const donation = e.target.donation.value
        const reqQuantity = e.target.reqQuantity.value
        const requestEmail = user.email;
        const requestName = user.displayName;
        const requestPhoto = user.photoURL;
        const foodName = food.foodName;
        const date = food.date;
        const email = food.email;
        const location = food.location;
        const message = food.message;
        const name = food.name;
        const photo = food.photo;
        const quantity = food.quantity;
        const userPhoto = food.userPhoto;
        const fid = food._id;

        const foodForm = {
            foodName, date, email, location, message, name, photo, quantity, userPhoto, fid, requestEmail, requestName, requestPhoto, donation,reqQuantity
        }

        if (parseInt(donation) < 20  ) {
            setError('You have to donate More than 20 tk' )
             
        }
        else if( parseInt(reqQuantity) < 1 ){
            setError('take quantity more than zero ')
        }
        else if(parseInt(reqQuantity) > parseInt(quantity)){
            setError('take quantity Less than Quantity ')
        }
        else {
            axios.post('https://charitybd-server.vercel.app/requests', foodForm)
                .then(res => {
                    console.log(res.data)
                    setShow(true)
                    setError('')
                })
            
        }
    }

    return (
        <div className="my-12 max-w-5xl mx-auto p-5 lg:p-0">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <h1 className="text-3xl text-center font-bold text-purple-700">Availabe Items</h1>
                <select onChange={(e) =>{
                     setCategory(e.target.value);
                     setPage(1)
                }} className="select select-bordered w-full max-w-xs">
                    <option>All</option>
                    <option>Food</option>
                    <option>Clothes</option>
                    <option>Grocery Materials</option>
                </select>
                <form onSubmit={handleSearch} className="join">
                    <div>
                        <div>
                            <input name="searchTerm" className="input input-bordered join-item" placeholder="Search" />
                        </div>
                    </div>

                    <div className="indicator">
                        <button onClick={() => document.getElementById('my_modal_4').showModal()} className="btn join-item bg-purple-700 text-white hover:text-black" ><IoMdSearch className="text-3xl" /></button>
                    </div>
                </form>
            </div>
            {
                isLoading ? <div className="flex justify-center my-12">
                    <SkeletonLoading/>
                </div> :
                    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6 `}>

                        {
                            availableFoods.map(food => <>
                                <div className="flex flex-col card-compact  bg-base-100 shadow-xl">
                                    <figure className=""><img src={food.photo} alt="Shoes" className="h-48 mx-auto" /></figure>
                                    <div className="card-body">
                                        <div className="flex items-center gap-3 ">
                                            <img src={food.userPhoto} alt="" className="w-12 h-12 rounded-full" />
                                            <div>
                                                <h1 className="font-semibold">{food.name}</h1>
                                                <h1 className="text-xs">{food.email}</h1>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="card-title">{food.foodName}</h2>
                                            <p>Quantity : {food.quantity}</p>
                                            <p>{food.category === 'Clothes'?'':`Expire Date : ${food.date}`}</p>
                                            <p className="flex items-center gap-2"><IoLocation /> {food.location}</p>
                                            <p className="">{food.message.length > 40 ? food.message.slice(0, 41) + ' ....' : food.message}</p>
                                        </div>
                                        <div className="card-actions justify-center">
                                            {
                                                user ? user?.email === food?.email ? <button></button> :
                                                    <button onClick={() => {
                                                        document.getElementById('my_modal_1').showModal();
                                                        setFood(food);
                                                    }} className="btn text-white btn-wide bg-purple-700"><FaRegPlusSquare className="text-xl" /> Request {food.category} </button> :
                                                    <Link to={'/loginpage'} className="text-red-800 font-semibold hover:bg-purple-300 hover:text-black p-4 rounded-xl">For Request You have to login </Link>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </>)
                        }

                    </div>}
            <div className="my-12">
                {
                    (category === 'All' || category === '') &&
                    totalPages.map(i => <>
                        <button onClick={() => setPage(i + 1)} className={`btn mr-2  text-white ${page === i + 1 ? 'bg-purple-900' : 'bg-purple-500'}`}>{i + 1}</button>
                    </>)
                }
                {
                    (category === 'Food' ) &&
                    totalfoodPages.map(i => <>
                        <button onClick={() => setPage(i + 1)} className={`btn mr-2  text-white ${page === i + 1 ? 'bg-purple-900' : 'bg-purple-500'}`}>{i + 1}</button>
                    </>)
                }
                {
                    (category === 'Clothes' ) &&
                    totalclothPages.map(i => <>
                        <button onClick={() => setPage(i + 1)} className={`btn mr-2  text-white ${page === i + 1 ? 'bg-purple-900' : 'bg-purple-500'}`}>{i + 1}</button>
                    </>)
                }
                {
                    (category === 'Grocery Materials' ) &&
                    totalgroceryPages.map(i => <>
                        <button onClick={() => setPage(i + 1)} className={`btn mr-2  text-white ${page === i + 1 ? 'bg-purple-900' : 'bg-purple-500'}`}>{i + 1}</button>
                    </>)
                }
            </div>

            {/* Search result */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl ">
                    <div className="flex justify-between items-center ">
                        <p></p>
                        <h3 className="font-bold text-lg text-center">Search Result : {searchResults.length}</h3>
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className=""><ImCross /></button>
                        </form>
                    </div>
                    {
                        searchLoading ? <div className="max-w-xs mx-auto"><Lottie animationData={searchingAnimation} /></div> :
                            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6`}>
                                {search.length === 0 ? <p>Please Search For Something</p> :
                                    searchResults.length === 0 ? <p>No result Found </p> :
                                        searchResults.map(food => <>
                                            <div className="card card-compact  bg-base-100 shadow-xl">
                                                <figure className=""><img src={food.photo} alt="Shoes" /></figure>
                                                <div className="card-body">
                                                    <div className="flex items-center gap-3 ">
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
                                                    <div className="card-actions justify-center">
                                                        {
                                                            user ? user?.email === food?.email ? <button></button> :
                                                                <button onClick={() => {
                                                                    document.getElementById('my_modal_1').showModal();
                                                                    setFood(food);
                                                                }} className="btn text-white btn-wide bg-purple-700">  
                                                                Request {food.category === 'Food' && "Food"}
                                                                {food.category === 'Clothes' && "Cloth"}
                                                                {food.category === 'Grocery Materials' && "Grosery Materials"}
                                                                 <FaRegPlusSquare className="text-xl" /></button> :
                                                                <Link to={'/loginpage'} className="text-red-800 font-semibold hover:bg-purple-300 hover:text-black p-4 rounded-xl">For Request You have to login </Link>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </>)}
                            </div>
                    }
                </div>

            </dialog>
            {/* Donation form */}

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={() => setShow(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {
                        show ? <p className="font-semibold text-center animate-bounce">Thanks for Your Donation ❤️❤️</p> :
                            <div>
                                <h3 className="font-bold text-lg mb-2">How Much You want to donate</h3>
                                <form onSubmit={handleRequest} className="flex flex-col items-center justify-center gap-3">
                                    <input type="number" name="donation" placeholder="eg : more than 20 tk" required className="input input-bordered w-full max-w-xs" />
                                    <input type="number" name="reqQuantity" placeholder="eg : more than zero" required className="input input-bordered w-full max-w-xs" />
                                    <button className="btn bg-purple-700 text-white">Confirm</button>
                                </form>
                                <p className="font-semibold text-red-800 text-center mt-4">
                                    {error}
                                </p>
                            </div>
                    }
                </div>
            </dialog>


        </div>
    )
}

export default AvailableFoods
