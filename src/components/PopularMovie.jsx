// import PropTypes from "prop-types"
import axios from "axios";
import { useEffect, useState } from "react";
import { FiChevronsRight } from "react-icons/fi";
import { Link } from "react-router-dom"

function PopularMovie() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const [errors, setErrors] = useState({
        isError: false,
        message: null,
    });

    useEffect(() => {
        const getPopularMovies = async () => {
            try {
                //get token from local storage
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/movie/popular`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const { data } = response.data;

                setPopularMovies(data);
                setErrors({ ...errors, isError: false });

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setErrors({
                        ...errors,
                        isError: true,
                        message: error?.response?.data.message,
                    });
                    return;
                }

                alert(error?.message);
                setErrors({
                    ...errors,
                    isError: true,
                    message: error?.message,
                });
            }
        };

        getPopularMovies();
    }, [])

    if (errors.isError) {
        return <h1>{errors.message}</h1>;
    }

    if (popularMovies.length === 0) {
        return <h1>Loading...</h1>;
    }

    //for using when on click text Set All Movies or Set Some Movie
    const handleClick = () => {
        setShowAll(!showAll);
    };

    return (
        <>
            <div className="w-full bg-black p-8">
                <div className="flex justify-between mb-10">
                    <header className="text-white text-2xl lg:text-5xl font font-extrabold hover:text-red-600">
                        Popular Movie
                    </header>
                    <div className="group">
                        <button
                            onClick={handleClick}
                            type="button"
                            className="flex items-center group-hover:text-white text-red-600 lg:text-xl gap-2 lg:mr-5 ">
                            {showAll ? 'See Some Movies' : 'See All Movies'}
                            <FiChevronsRight className="text-red-600 w-10 h-11 group-hover:text-white" />
                        </button>
                    </div>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2">
                    {showAll ? (
                        popularMovies.map((movie) => (
                            <div key={movie.id}>
                                <div className="border-2 border-red-800 hover:border-white p-2 m-4 flex justify-center cursor-pointer">
                                    <Link to={`/detail-film/${movie.id}`}>
                                        <img
                                            className="flex justify-center items-center content-center opacity-60 hover:opacity-100 "
                                            src={import.meta.env.VITE_BASEIMGURL + movie.poster_path}
                                            alt="poster path"
                                        />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        popularMovies.slice(0, 4).map((movie) => (
                            <div key={movie.id}>
                                <div className="border-2 border-red-800 hover:border-white p-2 m-4 flex justify-center cursor-pointer">
                                    <Link to={`/detail-film/${movie.id}`}>
                                        <img
                                            className="flex justify-center items-center content-center opacity-60 hover:opacity-100 "
                                            src={import.meta.env.VITE_BASEIMGURL + movie.poster_path}
                                            alt="poster path"
                                        />
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default PopularMovie;
