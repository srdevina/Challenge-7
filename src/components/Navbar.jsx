import { SlMagnifier } from "react-icons/sl";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getMe, logout } from "../redux/actions/authActions";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  //insert query movies and get by id in TMDB
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    if (searchQuery.trim() === "") {
      return;
    }
    const searchUrl = `/search?query=${searchQuery}&include_adult=false&page=1`;
    navigate(searchUrl);
  };

  //hamburger menu in mobile
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  //logout with redux
  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  //get me with redux
  useEffect(() => {
    if (token) {
      dispatch(getMe(navigate, null, "/login"));
    }
  }, [dispatch, navigate, token]);

  return (
    <>
      <div className="w-full lg:mt-2 fixed z-50">
        <div className="lg:flex lg:justify-between lg:mx-2 lg:mt-2">
          <div className="text-3xl lg:ml-8 text-red-600 font-extrabold flex justify-center">
            <Link as={Link} to={"/"}>
              <h1>MovieList</h1>
            </Link>
          </div>
          {/* jika user ada atau sdh login ini baru ditampilkan */}
          {user && (
            <div className="md:flex md:justify-between md:mr-5 flex flex-col">
              <div className="flex justify-between mx-2 mr-9 mt-1 lg:mt-0">
                <form action="search" className="flex" onSubmit={handleSearch}>
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
                  onClick={toggleNavbar}
                >
                  {isOpen ? (
                    <X className="w-10 h-8" />
                  ) : (
                    <Menu className="w-10 h-8" />
                  )}
                </button>
              </div>
            </div>
          )}
          <div>
            {user ? (
              <>
                <div className="hidden lg:flex lg:mr-10 lg:items-baseline">
                  <div className="mt-3 mr-4 ">
                    <NavLink
                      as={Link}
                      to="/myprofile"
                      className="text-white font-bold text-lg hover:text-red-600"
                    >
                      {user?.name}
                    </NavLink>
                  </div>
                  <button
                    onClick={onLogout}
                    className="border-2 border-red-600 bg-red-600 p-2 rounded-xl text-white hover:bg-red-800 hover:border-black mr-4"
                  >
                    Logout
                  </button>
                </div>

                {/* fitur hamburger menu in mobile when opened */}
                {isOpen && (
                  <>
                    <div className="flex flex-col md:w-56 md:ml-[530px] items-end ml-64 mr-10 p-4 gap-4 border-2 border-red-600 bg-black rounded-xl">
                      <div className="mt-3 mr-4 ">
                        <NavLink
                          as={Link}
                          to="/myprofile"
                          className="text-white font-bold text-lg hover:text-red-600"
                        >
                          {user?.name}
                        </NavLink>
                      </div>
                      <button
                        onClick={onLogout}
                        className="border-2 border-red-600 bg-red-600 p-2 rounded-xl text-white hover:bg-red-800 hover:border-black mr-4"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex justify-center gap-4 m-3">
                <NavLink
                  as={Link}
                  to="/login"
                  className="border-2 text-red-600 border-red-600 rounded-3xl p-2 px-4 mr-2 hover:bg-red-600 hover:text-white"
                >
                  login
                </NavLink>
                <NavLink
                  as={Link}
                  to="/regis"
                  className="border-2 text-white border-red-600 bg-red-600 rounded-3xl p-2 px-4 hover:bg-red-700 hover:text-white"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
