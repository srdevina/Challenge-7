import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import GoogleLogin from "../components/GoogleLogin";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [passwerror, setPasswError] = useState("");
  const [name, setName] = useState("");

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
      setPasswError("Password not match!");
    } else {
      setPasswError("");
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

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        {
          email,
          name,
          password,
        }
      );
      const { data } = response.data;
      const { token } = data;

      //save our token
      localStorage.setItem("token", token);

      //redirect to home
      // navigate("/")

      window.location.replace("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data?.message);
        return;
      }
      alert(error?.message);
    }
  };

  return (
    <>
      <div className="absolute top-28 p-10 w-full lg:top-14 lg:w-full lg:px-[350px]">
        <div className="border border-red-600 rounded-xl p-5">
          <div className="text-3xl font-bold mb-4 flex flex-row items-center justify-center text-red-600">
            <BiLogInCircle className="text-5xl" />
            <h1>Register</h1>
          </div>
          <form
            action="submit"
            onSubmit={regis}
            className="mt-8 grid grid-cols-6 gap-6"
          >
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Firstname"
                className="block font-semibold mb-2 text-slate-700
                                        after:content-['*']
                                        after:ml-1
                                        after:text-pink-500"
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

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Lastname"
                className="block font-semibold mb-2 text-slate-700
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

            <div className="col-span-6">
              <label htmlFor="email">
                <span
                  className="block font-semibold mb-2 text-slate-700
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
                  required
                />
                <p className="text-sm m-1 text-pink-700 invisible peer-invalid:visible">
                  email tidak valid
                </p>
              </label>
            </div>

            <div className="col-span-6">
              <label htmlFor="password">
                <span
                  className="block font-semibold mb-2 text-slate-700
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

            <div className="col-span-6">
              <label htmlFor="confirmpassword">
                <span
                  className="block font-semibold mb-2 text-slate-700
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
              {passwerror && (
                <p className=" px-2 text-sm col-span-6 text-pink-700 ">
                  {passwerror}
                </p>
              )}
            </div>

            <div className=" col-span-6 flex flex-col items-center mt-6">
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
              <p className="my-2 font-normal text-lg">Or</p>
            </div>
          </form>
          <div className="mt-2 flex justify-center">
            <GoogleLogin buttonText={"Regis With Google"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
