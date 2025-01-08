import { Route, Routes } from "react-router-dom"
import { Home } from "../components/Home"
import CreateTrip from "../components/pages/CreateTrip"
import { ViewTrip } from "../View-Trip/[tripId]"
import { MyTrips } from "../components/UserTrips/MyTrips"


export const AllRoutes = ({isLoaded,handleGoogleLogin,openDialog,setOpenDialog}) => {
  return (
    <Routes>
        <Route element={<Home/>} path="/"/>
        <Route element={<CreateTrip isLoaded={isLoaded} handleGoogleLogin={handleGoogleLogin} openDialog={openDialog} setOpenDialog={setOpenDialog}/>} path="/create-trip"/>
        <Route path="/view-trip/:tripId" element={<ViewTrip/>}/>
        <Route path="/my-trips" element={<MyTrips/>}/>
    </Routes>
  )
}
