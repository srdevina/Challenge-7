import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getSearchMovies } from "../redux/actions/searchActions";

function HasilPencarian() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("query");
    const page = searchParams.get("page");

    const dispatch = useDispatch();

    const { searching } = useSelector((state) => state.search);

    const [errors, setErrors] = useState({
        isError: false,
        message: null,
    });

    useEffect(() => {
        dispatch(getSearchMovies(errors, setErrors, query, page));
    }, [query, page]);

    return (
        <>
            <div className="w-full bg-black">
                <h1 className="text-white font-semibold text-3xl pt-28 ml-6 md:text-4xl md:ml-10 md:pt-28 mb-5">
                    Search for {`'${query}'`}
                </h1>
                <div className="grid lg:grid-cols-4 md:grid-cols-2">
                    {searching.map((search) => (
                        <div
                            key={search.id}
                            className="border-2 border-red-800 hover:border-white p-2 m-4 flex justify-center cursor-pointer"
                        >
                            <Link to={`/detail-film/${search.id}`}>
                                <img
                                    src={import.meta.env.VITE_BASEIMGURL + search.poster_path}
                                    alt="Poster_movie"
                                    className="flex justify-center items-center content-center opacity-60 hover:opacity-100 "
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HasilPencarian;
