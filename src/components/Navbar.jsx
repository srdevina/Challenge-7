import { SlMagnifier } from "react-icons/sl"
import { useNavigate, Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useState } from "react";
import Navlinks from "./NavLinks";

function Navbar() {
    const navigate = useNavigate();

    //insert query movies and get by id in TMDB 
    const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = e.target.search.value;
        if (searchQuery.trim() === "") {
            return;
        }
        const searchUrl = `/search?query=${searchQuery}&include_adult=false&page=1`;
        navigate(searchUrl)
    }

    //hamburger menu in mobile
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }


    return (
        <>
            <div className="w-full lg:mt-2 fixed z-50">
                <div className="lg:flex lg:justify-between lg:mx-2 lg:mt-2">
                    <div className="text-3xl text-red-600 font-extrabold flex justify-center">
                        <Link as={Link} to={"/"}>
                            <h1>MovieList</h1>
                        </Link>
                    </div>
                    <div className="md:flex md:justify-between md:mr-5 flex flex-col">
                        <div className="flex justify-between mx-2 mr-9 mt-1 lg:mt-0">
                            <form
                                action="search"
                                className="flex"
                                onSubmit={handleSearch}>
                                <input
                                    name="search"
                                    type="text"
                                    className=" border-y-2 border-s-2 border-red-600 rounded-s-3xl bg-transparent px-3 lg:w-[550px] placeholder:text-gray-300 text-white"
                                    placeholder="Mau nonton apa hari ini?"
                                />
                                <button type="submit">
                                    <SlMagnifier className="w-11 h-11 p-[7px] border-e-2 border-y-2 rounded-e-3xl text-gray-300 border-red-600 hover:bg-red-600 hover:text-white" />
                                </button>
                            </form>
                            <button 
                                className="lg:hidden text-red-600 "
                                onClick={toggleNavbar} >
                                {isOpen 
                                    ? <X  className="w-10 h-8"/>
                                    : <Menu className="w-10 h-8"/>}
                            </button>
                        </div>
                    </div>

                    {/* fitur hamburger menu in mobile is open */}
                    <div>
                        <div className="hidden lg:block mt-3 mr-4 ">
                            <Navlinks />
                        </div>
                        {isOpen && (
                            <div className="flex flex-col md:w-56 md:ml-[530px] items-end ml-64 mr-10 p-4 gap-4 border-2 border-red-600 bg-black rounded-xl">
                                <Navlinks />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;


