// import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import { FiChevronsRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPopularSlice } from "../redux/actions/movieActions";

import AOS from "aos";
import '../../node_modules/aos/dist/aos.css';

import Cliploader from "react-spinners/PulseLoader"

function PopularMovie() {
  const dispatch = useDispatch();

  const { popularSlice } = useSelector((state) => state.movie);

  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // get and use redux
    dispatch(getPopularSlice(setErrors, errors));

    // AOS (Animate On Scroll)
    AOS.init({
      once: true,
    });

    //loading animation by react-spinner
    if (getPopularSlice) {
      return setLoading(true)
    } else {
      return;
    }

    // setLoading(true)
    // setTimeout(() => {
    //   setLoading(false)
    // }, 3000)

  }, []);

  const [showAll, setShowAll] = useState(false);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (popularSlice.length === 0) {
    return (
      <h1 className="flex justify-center bg-black p-10">
        {loading ?
          <Cliploader color="#FF0000" loading={loading} size={40} />
          :
          ""
        }
      </h1>
    );
  }

  //for using when on click text Set All Movies or Set Some Movie
  const handleClick = () => {
    setShowAll(!showAll);
  };


  return (
    <>
      <div className="w-full bg-black p-8">
        <div className="flex justify-between mb-10">
          <header
            data-aos="fade-right"
            data-aos-delay="400"
            className="text-white text-2xl lg:text-5xl font font-extrabold hover:text-red-600">
            Popular Movie
          </header>
          <div className="group">
            <button
              data-aos="fade-left"
              data-aos-delay="400"
              onClick={handleClick}
              type="button"
              className="flex items-center group-hover:text-white text-red-600 lg:text-xl gap-2 lg:mr-5 "
            >
              {showAll ? "See Some Movies" : "See All Movies"}
              <FiChevronsRight className="text-red-600 w-10 h-11 group-hover:text-white" />
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2">
          {showAll
            ? popularSlice.map((movie) => (
              <div key={movie.id}>
                <div className="border-2 border-red-800 hover:border-white p-2 m-4 flex justify-center cursor-pointer">
                  <Link to={`/detail-film/${movie.id}`}>
                    <img
                      data-aos="flip-left"
                      data-aos-delay="60"
                      data-aos-duration="800"
                      data-aos-easing="ease-in-out"
                      data-aos-offset="300"
                      className="flex justify-center items-center content-center opacity-60 hover:opacity-100 "
                      src={
                        import.meta.env.VITE_BASEIMGURL + movie.poster_path
                      }
                      alt="poster path"
                    />
                  </Link>
                </div>
              </div>
            ))
            : popularSlice.slice(0, 4).map((movie) => (
              <div key={movie.id}>
                <div className="border-2 border-red-800 hover:border-white p-2 m-4 flex justify-center cursor-pointer">
                  <Link to={`/detail-film/${movie.id}`}>
                    <img
                      data-aos="flip-left"
                      data-aos-duration="800"
                      data-aos-easing="ease-in-out"
                      data-aos-offset="300"
                      className="flex justify-center items-center content-center opacity-60 hover:opacity-100 "
                      src={
                        import.meta.env.VITE_BASEIMGURL + movie.poster_path
                      }
                      alt="poster path"
                    />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default PopularMovie;
