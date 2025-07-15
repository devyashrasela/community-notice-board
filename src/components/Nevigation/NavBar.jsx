import { Outlet, NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div className="h-full w-full flex flex-col bg-[#F4F2EE]">
            <div className="w-full min-h-18 flex justify-between shadow items-center px-30 bg-white">
                <div className="h-full w-120 flex items-center gap-2">
                    <div className="h-10 w-10 rounded-md bg-[#000000]"></div>
                    <div className="h-full w-[90%] flex items-center">
                        <h1 className="text-black text-2xl font-bold">Community Notice Board</h1>
                    </div>
                </div>
                <div className="h-full flex gap-8 items-center">
                    <NavLink
                        to="home"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 font-semibold"
                                : "text-gray-700 hover:text-blue-600"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="members"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 font-semibold"
                                : "text-gray-700 hover:text-blue-600"
                        }
                    >
                        Members
                    </NavLink>
                    <NavLink
                        to="participations"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 font-semibold"
                                : "text-gray-700 hover:text-blue-600"
                        }
                    >
                        Participations
                    </NavLink>
                    <NavLink
                        to="profile"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 font-semibold"
                                : "text-gray-700 hover:text-blue-600"
                        }
                    >
                        Profile
                    </NavLink>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default NavBar;
