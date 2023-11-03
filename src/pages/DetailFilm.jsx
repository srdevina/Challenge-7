import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { getDetailMovie } from "../redux/actions/detailActions";
import { useDispatch, useSelector } from "react-redux";

function DetailFilm() {
  const { movieId } = useParams();
  const dispatch = useDispatch();

  const { detail } = useSelector((state) => state.movie);
  console.log(detail);

  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  //get API from popular movie in components PopularMovie by id
  useEffect(() => {
    dispatch(getDetailMovie(movieId, setErrors, errors));
  }, []);

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-black w-full">
        <img
          className="lg:w-full opacity-50"
          src={import.meta.env.VITE_BACKDROP_PATH + detail.backdrop_path}
        />
      </div>
      <div className="bg-black pt-8 pb-8 lg:bg-transparent lg:absolute lg:bottom-32 px-8">
        <div className=" text-white ">
          <div className=" flex flex-col justify-center ">
            <div className="text-6xl font-extrabold mb-4">
              {detail.original_title}
            </div>
            <div className="text-lg lg:w-[700px] mt-4 mb-4">
              {detail.overview}
            </div>
            {detail && detail.genres ? (
              <div className="flex gap-4 mb-7 mt-5">
                {detail.genres.slice(0, 3).map((genre, key) => (
                  <li
                    key={key}
                    type="none"
                    className="text-white text-lg font-medium bg-red-600 px-3 py-1 rounded-full lg:text-md lg:px-2 lg:py-0.5"
                  >
                    {detail.genres[key].name}
                  </li>
                ))}
              </div>
            ) : (
              <div>No genres available</div>
            )}
            <div className="text-lg font-bold mb-3 flex gap-2">
              <BsCalendarDateFill className="text-green-400" />
              {detail.release_date}
            </div>
            <div className="font-medium text-lg mb-6">
              <i className="flex">
                ⭐&nbsp;{parseFloat(detail.vote_average).toFixed(1)}
              </i>
            </div>
            <div className="hover:text-red-500 mt-3 cursor-pointer border-2 border-red-600 bg-red-600 p-2 w-48 rounded-3xl hover:bg-black text-lg font-bold">
              <Link as={Link} to={`/trailer/${detail.id}`}>
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
        <Link as={Link} to={`/trailer/${detail.id}`}>
          <MdOutlineSlowMotionVideo />
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default DetailFilm;
