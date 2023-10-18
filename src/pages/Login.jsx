import { useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import axios from "axios";
import GoogleLogin from "../components/GoogleLogin";
// import { useNavigate } from "react-router-dom"

const Login = () => {
    // const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            <div className="max-w-lg my-28 border border-red-600 rounded-xl mx-5 md:mx-auto lg:mx-auto p-5">
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

                    <button
                        type="submit"
                        className="mt-6 text-white bg-red-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center-800"
                    >
                        Submit
                    </button>
                </form>
                <GoogleLogin buttonText={"Login With Google"} />
            </div>
        </>
    );
};

export default Login;