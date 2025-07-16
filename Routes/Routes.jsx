import { createBrowserRouter, Navigate } from "react-router-dom";
import NavBar from "../src/components/Nevigation/NavBar";
import Home from "../src/components/Home/Home";
import Members from "../src/components/Members/Members";
import ParticipationsPage from "../src/components/Participations/ParticipationsPage";
import ProfilePage from "../src/components/Profile/ProfilePage";
import LandingPage from "../src/components/LandingPage/LandingPage";

const routes = createBrowserRouter([
    {
        path:"/",element:<LandingPage/>
    },
    {   
        path:"/:role",element:<NavBar/>,children:[
            {index:true,element: <Navigate to="home" replace />},
            {path:"home",element:<Home/>},
            {path:"members",element:<Members/>},
            {path:"participations",element:<ParticipationsPage/>},
            {path:"profile",element:<ProfilePage/>},
        ]
    }
])

export default routes;