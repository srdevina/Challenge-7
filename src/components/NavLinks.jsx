import { NavLink } from "react-router-dom";

const Navlinks = () => {
    return (
        <>
            <NavLink 
                to={"/login"} 
                className="border-2 text-red-600 border-red-600 rounded-3xl p-2 px-4 mr-2 hover:bg-red-600 hover:text-white">
                    Login
            </NavLink>
            <NavLink 
                to={"/regis"} 
                className="border-2 text-white border-red-600 bg-red-600 rounded-3xl p-2 px-4 hover:bg-red-700 hover:text-white">
                    Register
            </NavLink>
        </>
    )
};

export default Navlinks;