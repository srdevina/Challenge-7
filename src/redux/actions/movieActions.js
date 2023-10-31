import axios from "axios";
import { setPopular, setPopularSlice } from "../reducers/movieReducers";

export const getPopularMovies =
  (setErrors, errors) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
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
      const popular = data.slice(1, 4)

      // Set the popular movie to global state
      dispatch(setPopular(popular));
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
  };


export const getPopularSlice =
  (setErrors, errors) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
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
      const popularSlice = data.slice(0, 20)

      // Set the popular movie to global state
      dispatch(setPopularSlice(popularSlice));
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
  };
