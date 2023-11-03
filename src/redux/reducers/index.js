import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducers";
import searchReducer from "./searchReducer";

export default combineReducers({
  auth: authReducer,
  movie: movieReducer,
  search: searchReducer
});

