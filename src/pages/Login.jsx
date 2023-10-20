import { useState } from "react";
import { Link } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import axios from "axios";
import GoogleLogin from "../components/GoogleLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const login = async (event) => {
        // Prevent default is to prevent the default behavior
        event.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
                {
                    email,
                    password,
                }
            );
            const { data } = response.data;
            const { token } = data;

            //save our token
            localStorage.setItem("token", token);

            //redirect to home
            window.location.replace("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error?.response?.data?.message);
                return;
            }
            alert(error?.message);
        }
    };

    //animasi loading setelah button submit diklik
    const handleClick = () => {
        setIsLoading(true);

        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <>
            <div
                className={`absolute top-28 p-10 w-full lg:top-14 lg:w-full lg:px-[350px] 
                            ${isLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
            >
                {isLoading && (
                    <div
                        className="animate-spin w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-full
                                                    absolute top-64 left-56
                                                    lg:absolute lg:top-[260px] lg:left-[730px]"
                    ></div>
                )}
                <div className="border border-red-600 rounded-xl p-5">
                    <div className="text-3xl font-bold mb-4 flex flex-row items-center justify-center text-red-600">
                        <BiLogInCircle className="text-5xl" />
                        <h1>Login</h1>
                    </div>
                    <form action="submit" onSubmit={login}>
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
                                className="py-3 px-2 border border-slate-300 rounded-xl w-full text-sm
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
                            <p className="text-sm m-1 text-pink-700 invisible peer-invalid:visible">
                                email tidak valid
                            </p>
                        </label>

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
                                className="py-3 px-2 border border-slate-300 rounded-xl w-full text-sm placeholder:text-slate-400
                                    focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500\"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </label>
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
                            <p className="my-2 font-normal text-lg">Or</p>
                        </div>
                    </form>
                    <div className="mt-2 flex justify-center">
                        <GoogleLogin buttonText={"Login With Google"} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
