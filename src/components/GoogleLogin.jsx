import { useGoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";
import logo from "../assets/icons-google.svg";
import { registerLoginWithGoogleAction } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function GoogleLogin({ buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      dispatch(
        registerLoginWithGoogleAction(responseGoogle.access_token, navigate)
      ),
    onError: (errorResponse) => {
      alert(errorResponse.error_description);
    },
  });

  return (
    <button
      className="flex items-center justify-center ms-2 text-white bg-slate-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center-800 "
      onClick={() => loginWithGoogle()}
    >
      <img className="h-8 w-8 mr-2" src={logo} alt="google-logo" />
      <span>{buttonText}</span>
    </button>
  );
}

GoogleLogin.propTypes = {
  buttonText: PropTypes.string,
};

export default GoogleLogin;
