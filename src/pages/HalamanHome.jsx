import { useEffect, useRef, useState } from "react";
import MainSection from "../components/MainSection";
// import PopularMovie from "../components/PopularMovie"
import Footer from "../components/Footer"
import axios from "axios";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function HalamanHome1() {
    const [popularMovies, setPopularMovies] = useState([]);
    const linkRef = useRef(null)

    const [errors, setErrors] = useState({
        isError: false,
        message: null,
    });


    //ambil API popular movies setealah berhasil mendapatkan token login
    useEffect(() => {
        const getPopularMovies = async () => {
            try {
                // Get token from local storage
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
                // console.log(data)

                //perulangan untuk menampilkan 3 data di main section
                const popular = [];
                for (let i = 0; i <= data.length; i++) {
                    if (i <= 2) {
                        popular.push(data[i])
                    }
                }

                setPopularMovies(popular);
                setErrors({ ...errors, isError: false });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setErrors({
                        ...errors,
                        isError: true,
                        message:
                            error?.response?.data?.message || error?.message,
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
    }, []);

    if (errors.isError) {
        return <h1>{errors.message}</h1>;
    }

    if (popularMovies.length === 0) {
        return <h1>Loading...</h1>;
    }

    // back to MainSection when on click text MovieList in Footer from homepage
    const goto = (ref) => {
        window.scrollTo({
            top: ref.offsetTop,
            left: 0,
            behavior: 'smooth'
        })
    }

    //Carousel by react-slick
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        speed: 800,

        appendDots: (dots) => (
            <div className="relative">
                <ul className="flex items-center justify-center absolute bottom-10 lg:bottom-52 lg:mx-[550px] right-0 left-0">
                    {dots}
                </ul>
            </div>
        )
    };

    return (
        <div>
            <div className="w-full bg-black">
                <Slider {...settings}>
                    {popularMovies.map((movie) => (
                        <div key={movie.id} ref={linkRef}>
                            <MainSection
                                trailer={movie.id}
                                imageURL={import.meta.env.VITE_BACKDROP_PATH + movie.backdrop_path}
                                title={movie.title}
                                overview={movie.overview}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            {/* <PopularMovie /> */}
            <Footer linkRef={linkRef} goto={goto} />
        </div >
    )
}

export default HalamanHome1;