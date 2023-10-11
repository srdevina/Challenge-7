import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

function Footer({ linkRef, goto }) {
    return (
        <>
            <div className="w-full pb-8 px-4 bg-black border-t-2 border-t-red-600 lg:mt-0 lg:pt-10 lg:px-8 lg:pb-8">
                <div className="flex flex-col gap-2 lg:flex lg:flex-row lg:justify-evenly md:flex md:flex-row md:justify-evenly md:pt-6">
                    <div className="justify-center md:border-r-2 md:border-r-red-600 flex items-center p-10" >
                        <header 
                            className="text-white font-extrabold text-2xl lg:text-5xl cursor-pointer" 
                            onClick={() => goto(linkRef.current)}>
                                MovieList
                        </header>
                    </div>
                    <div className="text-lg">
                        <p className="text-white font-bold text-xl mb-2">
                            Team-7
                        </p>
                        <div className="text-red-600">
                            <ul>
                                <li>Helmi</li>
                                <li>Sri Devina</li>
                                <li>Andre</li>
                                <li>Ravel</li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-lg">
                        <p className="text-white font-bold text-xl mb-2">
                            My Partner
                        </p>
                        <div className="text-red-600">
                            <div className="flex items-center group">
                                <AiFillInstagram className="group-hover:text-white" />
                                <Link
                                    to={'https://www.instagram.com/academybinar/'}
                                    target="_blank"
                                    className="hover:text-white cursor-pointer"
                                    title="@academybinar">
                                    <p className="ml-1">Binar Academy</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;

Footer.propTypes = {
    linkRef: PropTypes.object,
    goto: PropTypes.func
}