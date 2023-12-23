import { Outlet } from "react-router-dom"
import Navbar from "./Home/Navbar"
import Footers from "./Home/Footers"


function Root() {
  return (
    <div>
       <Navbar/>
       <Outlet/>
       <Footers/>
    </div>
  )
}

export default Root
