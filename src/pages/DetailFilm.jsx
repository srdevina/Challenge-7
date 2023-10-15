import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { AiFillStar } from "react-icons/ai"
import { BsCalendarDateFill } from "react-icons/bs"
import { MdOutlineSlowMotionVideo } from "react-icons/md"
import { FaPlay } from "react-icons/fa6"

function DetailFilm() {
    const { movieId } = useParams();
    const [detailMovies, setDetailMovies] = useState();

    //get API from popular movie in components PopularMovie by id 
    useEffect(() => {
        const getDetailMovies = async () => {
            try {
                //get token from local storage
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/movie/${movieId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const { data } = response.data;

                setDetailMovies(data);

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    alert(error?.response?.data?.message);
                    return;
                }
                alert(error?.message);
            }
        };

        getDetailMovies();
    }, [movieId]);

    if (!detailMovies) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Navbar />
            <div className="bg-black w-full">
                <img
                    className="lg:w-full opacity-50"
                    src={import.meta.env.VITE_BACKDROP_PATH + detailMovies.backdrop_path}
                />
            </div>
            <div className="bg-black pt-8 pb-8 lg:bg-transparent lg:absolute lg:bottom-32 px-8">
                <div className=" text-white ">
                    <div className=" flex flex-col justify-center ">
                        <div className="text-6xl font-extrabold mb-4">
                            {detailMovies.original_title}
                        </div>
                        <div className="flex gap-3">
                            {detailMovies.genres.map((genre, key) => (
                                <li key={key} type="none" className="text-white text-lg font-medium">{detailMovies.genres[key].name}</li>
                            ))}
                        </div>
                        <div className="text-lg lg:w-[700px] mt-4 mb-4">
                            {detailMovies.overview}
                        </div>
                        <div className="text-lg font-bold mb-3 flex gap-2">
                            <BsCalendarDateFill className="text-green-400" />
                            {detailMovies.release_date}
                        </div>
                        <div className="font-medium text-lg">
                            <i className="flex">
                                <AiFillStar className="text-yellow-600" />
                                {detailMovies.vote_average}
                            </i>
                        </div>
                        <div className="hover:text-red-500 mt-3 cursor-pointer border-2 border-red-600 bg-red-600 p-2 w-48 rounded-3xl hover:bg-black text-lg font-bold">
                            <Link as={Link} to={`/trailer/${detailMovies.id}`}>
                                <button type="button" className="flex gap-3 items-center ml-3 ">
                                    <FaPlay />
                                    Watch Trailer
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block text-white text-[250px] hover:text-red-600 lg:absolute lg:right-72 lg:bottom-36 lg:animate-pulse">
                <Link as={Link} to={`/trailer/${detailMovies.id}`}>
                    <MdOutlineSlowMotionVideo />
                </Link>
            </div>
            <Footer />
        </>
    )
}

export default DetailFilm;