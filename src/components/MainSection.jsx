import PropTypes from "prop-types"
import { Link } from "react-router-dom";

function MainSection({ imageURL, title, overview, trailer }) {
    return (
        <>
            <div className="relative">
                <img
                    src={imageURL}
                    className="h-96 lg:w-full md:w-full md:h-full lg:h-full xl:h-full opacity-50"
                />
                <div className="absolute bottom-28 sm:bottom-28 mx-8 left-2 md:top-36 md:mx-10 lg:mx-4 lg:top-52 lg:left-8 ">
                    <h1 className="mb-1 border-b border-red-600 inline-block text-white font-bold text-2xl md:text-6xl lg:text-8xl lg:mb-4" >
                        {title}
                    </h1>
                    <p className="text-xs mb-4 md:text-sm text-white lg:text-base lg:w-[800px]">
                        {overview}
                    </p>
                    <Link to={`trailer/${trailer}`}>
                        <button className="cursor-pointer text-sm border-1 rounded-2xl px-2 py-0.5 border-2 md:font-medium md:p-2 md:px-4 lg:w-44 border-red-600 bg-red-600 lg:py-2 lg:mt-2 text-white lg:font-bold lg:text-lg lg:px-2 lg:rounded-3xl hover:bg-red-800 hover:border-red-800 ">
                            WATCH TRAILER
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default MainSection;

MainSection.propTypes = {
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    trailer: PropTypes.number
}