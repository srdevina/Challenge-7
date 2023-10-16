import { useState, useEffect } from "react";
import axios from "axios";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaUserAstronaut } from "react-icons/fa"
import { MdMarkEmailRead } from "react-icons/md"
import { ImUserCheck } from "react-icons/im"

const HalamanUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getMe = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const { data } = response.data;

                setUser(data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    //if token is not valid
                    if (error.response.status === 401) {
                        localStorage.removeItem("token");
                        return;
                    }

                    alert(error?.response?.data?.message);
                    return;
                }

                alert(error?.message);
            }
        };

        getMe();
    }, []);

    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-800">
                <div className="border-2 border-red-600 rounded-xl bg-slate-900 shadow-2xl shadow-slate-600  
                                transition-transform duration-500 transform-gpu hover:scale-125">
                    <div className="font-bold text-2xl flex flex-col items-center mt-6">
                        <BiSolidUserDetail className="text-red-600 w-20 h-20" />
                        <h2 className="text-white">User Detail</h2>
                    </div>
                    <div className="flex flex-col gap-4 text-white text-lg mt-4 p-6">
                        <div className="flex items-center gap-3">
                            <FaUserAstronaut className="text-red-600 w-6 h-10" />
                            <p>{user?.type}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <ImUserCheck className="text-red-600 w-6 h-10" />
                            <p>{user?.name}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <MdMarkEmailRead className="text-red-600 w-6 h-10" />
                            <p><i>{user?.email}</i></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HalamanUser;