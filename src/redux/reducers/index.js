import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducers";

export default combineReducers({
  auth: authReducer,
  movie: movieReducer,
});
