import axios from "axios";
import { setDetail } from "../reducers/movieReducers";

export const getDetailMovie =
    (movieId, setErrors, errors) => async (dispatch, getState) => {
        try {
            //get token from local storage
            const { token } = getState().auth;
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

            // set the detail popular movie to global state
            dispatch(setDetail(data));
            // setDetailMovies(data);
            setErrors({ ...errors, isError: false });

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors({
                    ...errors,
                    isError: true,
                    message: error?.response?.data?.message || error?.message,
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
    }