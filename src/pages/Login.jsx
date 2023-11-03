import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import GoogleLogin from "../components/GoogleLogin";
import { login } from "../redux/actions/authActions";
import Slider from "react-slick";

import captenAmerica from "../assets/captain-america_449504.png";
import spiderMan from "../assets/spiderman_1090806.png";
import xman from "../assets/xman.png";
import hulk from "../assets/hulk.png";
import flash from "../assets/flash.png";
import ironMan from "../assets/ironMan.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (event) => {
    event.preventDefault();

    // Call the login action from redux action
    dispatch(login(email, password, navigate));
  };

  //animasi loading setelah button submit diklik
  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  // animasi slide icon superhero
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <>
      <div className="bg-slate-950 w-full h-screen">
        <div
          className={`absolute px-4 lg:pt-20 w-full lg:w-full lg:px-[760px]
                            ${
                              isLoading ? "opacity-50 pointer-events-none" : ""
                            }`}
        >
          {isLoading && (
            <div
              className=" animate-spin w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-full
                                                    absolute top-64 left-56
                                                    lg:absolute lg:top-[299px] lg:left-[980px]"
            ></div>
          )}
          <div className="w-80 h-screen lg:w-[700px] lg:h-screen rounded-e-[60px] bg-gradient-to-r from-cyan-800 bg-opacity-50 absolute left-0 top-0">
            <div className="lg:mt-48 lg:w-96 lg:p-12 lg:rounded-2xl lg:ml-40 lg:bg-slate-900 lg:bg-opacity-50 lg:flex lg:flex-col lg:shadow-2xl">
              <div className="mt-4 mx-4 lg:mt-0 lg:mx-0">
                <h1 className="text-white text-base font-medium lg:font-medium lg:text-lg lg:mb-2">
                  Welcome to 🎞️🍿
                </h1>
                <p className="text-red-600 text-4xl font-extrabold lg:text-6xl lg:font-extrabold">
                  MovieList
                </p>
              </div>
              <div className="absolute top-2 -right-36 left-56 lg:relative overflow-clip lg:right-0 lg:left-0 lg:top-0">
                <Slider {...settings} className="lg:mt-6">
                  <img
                    src={captenAmerica}
                    alt="icon capten america"
                    className="p-3 lg:p-4"
                  />
                  <img
                    src={spiderMan}
                    alt="icon spiderman"
                    className="p-3 lg:p-4"
                  />
                  <img
                    src={ironMan}
                    alt="icon superhero1"
                    className="p-3 lg:p-4"
                  />
                  <img src={hulk} alt="icon hulk" className="p-3 lg:p-4" />
                  <img src={flash} alt="icon iron man" className="p-3 lg:p-4" />
                  <img src={xman} alt="icon xman" className="p-3 lg:p-4" />
                </Slider>
              </div>
            </div>
          </div>

          {/* login card */}
          <div className="box mt-[94px] lg:mt-0 right-3">
            <span className="box2"></span>
            <div className=" box3 bg-slate-700 bg-opacity-10 rounded-xl px-5 pb-5 pt-4">
              <div className="text-3xl font-bold mb-2 flex flex-row items-center justify-center text-white">
                <BiLogInCircle className="text-5xl text-red-600" />
                <h1 className="text-cyan-400">Login</h1>
              </div>
              <form action="submit" onSubmit={onLogin} className="p-2">
                <div className="px-4 pt-4 pb-1 shadow-lg shadow-slate-700  rounded-xl mb-9 hover:bg-cyan-500 hover:bg-opacity-20 hover:border">
                  <label htmlFor="email">
                    <span
                      className="text-white block font-semibold mb-2
                                        after:content-['*']
                                        after:ml-1
                                        after:text-pink-500
                                        "
                    >
                      Email
                    </span>
                    <input
                      type="email"
                      id="email"
                      placeholder="masukkan email..."
                      className="py-2 lg:py-[10px] px-2 border border-slate-300 rounded-xl w-full text-sm
                                        placeholder:text-slate-400
                                        focus:outline-none 
                                        focus:ring-1 
                                        focus:ring-sky-500 focus:border-sky-500\
                                        invalid:text-pink-700
                                        invalid:focus:ring-pink-700
                                        invalid:focus:border-pink-700
                                        peer"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <p className="text-sm m-1 font-medium text-pink-600 invisible peer-invalid:visible">
                      email tidak valid
                    </p>
                  </label>
                </div>

                <div className="p-4 shadow-lg shadow-slate-700 rounded-xl mb-9 hover:bg-cyan-500 hover:bg-opacity-20 hover:border">
                  <label htmlFor="password">
                    <span
                      className="text-white block font-semibold mb-2
                                        after:content-['*']
                                        after:ml-1
                                        after:text-pink-500"
                    >
                      Password
                    </span>
                    <input
                      type="password"
                      id="password"
                      className="py-2 lg:py-[10px] px-2 border border-slate-300 rounded-xl w-full text-sm placeholder:text-slate-400
                                    focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500\"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="flex flex-col items-center mt-6">
                  <button
                    onClick={handleClick}
                    type="submit"
                    className="lg:w-40 text-white bg-red-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center-800"
                  >
                    {isLoading ? "Loading..." : "Submit"}
                  </button>
                  <p className="mt-2 text-gray-500 text-sm">
                    Dont have an account? &nbsp;
                    <Link to={"/regis"} className="underline text-red-500">
                      Register
                    </Link>
                  </p>
                  <p className="text-white my-2 font-normal text-lg">Or</p>
                </div>
              </form>
              <div className="mt-2 flex justify-center">
                <GoogleLogin buttonText={"Login With Google"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
