import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
import { BiSolidUserDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/authActions";

import Slider from "react-slick";

import captenAmerica from "../assets/captain-america_449504.png";
import spiderMan from "../assets/spiderman_1090806.png";
import xman from "../assets/xman.png";
import hulk from "../assets/hulk.png";
import flash from "../assets/flash.png";
import ironMan from "../assets/ironMan.png";
import PropTypes from "prop-types";

function SampleNextArrow(props) {
  const { style } = props;
  return <div style={{ ...style, display: "none" }} />;
}

function SamplePrevArrow(props) {
  const { style } = props;
  return <div style={{ ...style, display: "none" }} />;
}

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [passworderror, setPasswordError] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
    combineTheNames(event.target.value, lastname);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
    combineTheNames(firstname, event.target.value);
  };

  const combineTheNames = (firstname, lastname) => {
    const combinedName = `${firstname} ${lastname}`;
    setName(combinedName);
  };

  const passwordValidation = (password, confirm) => {
    if (password !== confirm) {
      setPasswordError("Password Not Match!");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordMatch = (event) => {
    setPassword(event.target.value);
    passwordValidation(event.target.value, confirmpassword);
  };

  const handleConfirmPasswordMatch = (event) => {
    setConfirmPassword(event.target.value);
    passwordValidation(password, event.target.value);
  };

  const regis = async (event) => {
    event.preventDefault();
    if (passworderror) {
      alert("Password and Confirm Password not match! , Try Again!");
      return;
    }

    dispatch(register(email, name, password, navigate));
  };

  // animasi slide icon superhero
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <div className=" flex flex-col gap-5 lg-gap-0 lg:flex-row items-center justify-evenly bg-gradient-to-r from-cyan-800 via-slate-950 bg-slate-950 w-full py-14">
        {/* movie text */}
        <div className="flex flex-col w-full max-w-lg ">
          <div className="bg-slate-900 bg-opacity-50 p-10 rounded-2xl">
            <h1 className="text-white font-medium lg:text-lg lg:mb-2">
              Welcome to 🎞️🍿
            </h1>
            <h2 className="text-red-600 text-4xl font-extrabold lg:text-6xl">
              MovieList
            </h2>
            <div className=" w-full">
              <Slider {...settings} className="mt-6">
                <img src={captenAmerica} className="p-3 lg:p-4"></img>
                <img src={hulk} className="p-3 lg:p-4"></img>
                <img src={ironMan} className="p-3 lg:p-4"></img>
                <img src={flash} className="p-3 lg:p-4" alt="" />
                <img src={xman} className="p-3 lg:p-4" alt="" />
                <img src={spiderMan} className="p-3 lg:p-4" alt="" />
              </Slider>
            </div>
          </div>
        </div>

        {/* box register */}
        <div className="boxs bg-slate-900  rounded-xl p-5 w-full max-w-lg ">
          <span className="box2"></span>
          <div className="box-s relative z-50">
            <div className="text-3xl font-bold mb-4 flex flex-row items-center justify-center text-red-600">
              <BiSolidUserDetail className="text-6xl text-red-600" />
              <h1 className=" text-cyan-400">Register</h1>
            </div>
            <form
              action="submit"
              onSubmit={regis}
              className="mt-6 flex flex-col gap-5"
            >
              <div className="flex gap-6">
                <div className="shadow-lg shadow-slate-700 rounded-xl w-full p-4">
                  <label
                    htmlFor="Firstname"
                    className="block text-white font-semibold mb-2 
                                          after:content-['*']
                                          after:ml-1
                                          after:text-pink-500 "
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="FirstName"
                    placeholder="nama depan..."
                    className="py-3 px-2 border border-slate-300 rounded-xl w-full text-sm placeholder:text-slate-400
                                      focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500\
                                      invalid:text-pink-700
                                      invalid:focus:ring-pink-700
                                      invalid:focus:border-pink-700
                                      peer"
                    value={firstname}
                    onChange={handleFirstName}
                    required
                  />
                </div>

                <div className="shadow-lg shadow-slate-700 w-full rounded-xl p-4">
                  <label
                    htmlFor="Lastname"
                    className="block font-semibold mb-2 text-white
                                          after:content-['*']
                                          after:ml-1
                                          after:text-pink-500"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="LastName"
                    placeholder="nama belakang..."
                    className="py-3 px-2 border border-slate-300 rounded-xl w-full text-sm placeholder:text-slate-400
                  focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500\
                  invalid:text-pink-700
                  invalid:focus:ring-pink-700
                  invalid:focus:border-pink-700
                  peer"
                    value={lastname}
                    onChange={handleLastName}
                    required
                  />
                </div>
              </div>

              <div className="">
                <label htmlFor="email">
                  <div className=" shadow-lg shadow-slate-700 rounded-xl p-4">
                    <span
                      className="block  font-semibold mb-2 text-white
                      after:content-['*']
                      after:ml-1
                                          after:text-pink-500"
                    >
                      Email
                    </span>
                    <input
                      type="email"
                      id="email"
                      placeholder="masukkan email..."
                      className="py-3 px-2 border border-slate-300 rounded-xl w-full text-sm placeholder:text-slate-400
                                      focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500\
                                      invalid:text-pink-700
                                      invalid:focus:ring-pink-700
                                      invalid:focus:border-pink-700
                                      peer"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <p className="text-sm m-1 text-pink-700 invisible peer-invalid:visible">
                      email tidak valid
                    </p>
                  </div>
                </label>
              </div>

              <div className="shadow-lg shadow-slate-700 rounded-xl p-4">
                <label htmlFor="password">
                  <span
                    className="block font-semibold mb-2 text-white
                                          after:content-['*']
                                          after:ml-1
                                          after:text-pink-500"
                  >
                    Password
                  </span>
                  <input
                    type="password"
                    id="password"
                    placeholder="masukkan password..."
                    className="py-3 px-2 border border-slate-300 rounded-xl w-full text-sm placeholder:text-slate-400
                                      focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500\"
                    value={password}
                    onChange={handlePasswordMatch}
                    required
                  />
                </label>
              </div>

              <div className="shadow-lg shadow-slate-700 rounded-xl p-4">
                <label htmlFor="confirmpassword">
                  <span
                    className="block font-semibold mb-2 text-white
                    after:content-['*']
                    after:ml-1
                                          after:text-pink-500"
                  >
                    Confirm Password
                  </span>
                  <input
                    type="password"
                    id="confirmpassword"
                    placeholder="masukkan password kembali..."
                    className="py-3 px-2 border border-slate-300 rounded-xl w-full text-sm placeholder:text-slate-400
                                      focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500\"
                    value={confirmpassword}
                    onChange={handleConfirmPasswordMatch}
                    required
                  />
                </label>
                {passworderror && (
                  <p className="mt-3 px-2 text-sm text-red-500 ">
                    {passworderror}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center mt-2">
                <button
                  type="submit"
                  className="lg:w-40 text-white bg-red-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center-800"
                >
                  Create an account
                </button>
                <p className="mt-2 text-gray-500 text-sm">
                  Already have an account? &nbsp;
                  <Link to={"/login"} className="underline text-red-500">
                    Login
                  </Link>
                </p>
                <p className="my-1 font-medium text-lg text-white">Or</p>
              </div>
            </form>
            <div className="mt-2 flex justify-center">
              <GoogleLogin buttonText={"Regis With Google"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SampleNextArrow.propTypes = {
  style: PropTypes.object,
};

SamplePrevArrow.propTypes = {
  style: PropTypes.object,
};

export default Register;
