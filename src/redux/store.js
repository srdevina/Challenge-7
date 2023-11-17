import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";
import thunk from "redux-thunk"

// create the store or temporary state database
export default configureStore({
    reducer: rootReducers,
    devTools: import.meta.env.MODE !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // redux thunk
});
