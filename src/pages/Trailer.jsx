import Footer from "../components/Footer"
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BiSolidChevronsLeft } from "react-icons/bi";
import { getDetailMovie } from "../redux/actions/detailActions";
import { useDispatch, useSelector } from "react-redux";

function Trailer() {
    const { movieId } = useParams();
    // const [trailerMovies, setTrailerMovies] = useState();
    const dispatch = useDispatch();

    const { detail } = useSelector((state) => state.movie);

    const [errors, setErrors] = useState({
        isError: false,
        message: null,
    })

    useEffect(() => {
        dispatch(getDetailMovie(movieId, setErrors, errors));
    }, [dispatch]);

    if (!detail) {
        return <div>Loading...</div>
    }

    const videoUrl = `https://www.youtube.com/watch?v=${detail.videos[0].key}`

    return (
        <>
            <div className="w-full bg-black pt-28 lg:pt-16 pb-12">
                <Link as={Link} to={`/detail-film/${movieId}`}>
                    <button className="mb-4 lg:mt-4 border-t-2 border-r-2 hover:border-t-black hover:border-r-black hover:bg-red-600 hover:text-black border-red-600 bg-black w-32 h-10 p-2 rounded-r-full flex gap-3 items-center text-red-600 text-xl font-bold ">
                        <BiSolidChevronsLeft className="w-10 h-12" />
                        Back
                    </button>
                </Link>
                <div className="flex flex-col items-center">
                    {/* mengambil satu video dari API Movie Details menggunakan method slice dengan mapping karena data video terlampau banyak */}
                    {detail.videos.slice(0, 1).map((key) => (
                        <iframe
                            key={key}
                            src={`https://www.youtube.com/embed/${detail.videos[0].key}`}
                            frameBorder="0"
                            className="w-96 h-56 lg:w-[1300px] lg:h-[550px]"
                            allowFullScreen
                        >
                        </iframe>
                    ))}
                    <p className="text-white font-bold text-2xl mt-7">
                        <Link
                            className="border-2 border-red-600 p-3 px-6 rounded-full hover:bg-red-800 hover:border-red-800"
                            to={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer">
                            Watch on Youtube
                        </Link>
                    </p>
                </div>
                <div className="mt-10 md:mt-[94px]">
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Trailer;

