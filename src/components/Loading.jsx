import { useState } from "react"

const Loading = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div>
            <button
                onClick={handleClick}
                className={`lg:w-40 text-white bg-red-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center-800
                            ${isLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                >
                {isLoading ? 'loading...' : 'Submit'}
            </button>
            {isLoading && (
                <div className="animate-spin rounded-full border-t-2 border-blue-500 border-r-2 h-6 w-6 "></div>
            )}
        </div>
    )
}

export default Loading;

