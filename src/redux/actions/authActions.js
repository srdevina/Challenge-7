import axios from "axios";
import { setToken, setUser } from "../reducers/authReducer";

export const getMe = (navigate, navigatePathSuccess, navigatePathError) => 
    async (dispatch, getState) => {
        try {
            let { token } = getState().auth;

            if (!token) return;

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/auth/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { data } = response.data;

            dispatch(setUser(data));

            if (navigatePathSuccess) navigate(navigatePathSuccess);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                //if token is not valid
                if (error.response.status === 401) {
                    dispatch(logout());

                    if (navigatePathError) navigate(navigatePathError);
                    return;
                }

                alert(error?.response?.data?.message);
                return;
            }

            alert(error?.message);
        }
    };

export const login = (email, password, navigate) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
            {
                email,
                password,
            }
        );
        const { data } = response.data;
        const { token } = data;

        //save our token
        dispatch(setToken(token));

        //redirect to home
        navigate("/");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(error?.response?.data?.message);
            return;
        }
        alert(error?.message);
    }
};
    
export const logout = () => (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
};



