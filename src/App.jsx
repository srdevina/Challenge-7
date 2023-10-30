import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HalamanHome from "./pages/HalamanHome";
import HasilPencarian from "./pages/HasilPencarian";
import DetailFilm from "./pages/DetailFilm";
import NotFound from "./pages/NotFound";
import Trailer from "./pages/Trailer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Protected from "./components/Protected";
import NoAccessToken from "./components/NoAccessToken";
import HalamanUser from "./pages/HalamanUser";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
        >
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <Protected>
                    <HalamanHome />
                  </Protected>
                }
              />

              <Route
                path="/search"
                element={
                  <Protected>
                    <HasilPencarian />
                  </Protected>
                }
              />

              <Route
                path="/detail-film/:movieId"
                element={
                  <Protected>
                    <DetailFilm />
                  </Protected>
                }
              />

              <Route
                path="/trailer/:movieId"
                element={
                  <Protected>
                    <Trailer />
                  </Protected>
                }
              />

              <Route
                path="/login"
                element={
                  <NoAccessToken>
                    <Login />
                  </NoAccessToken>
                }
              />

              <Route
                path="/regis"
                element={
                  <NoAccessToken>
                    <Register />
                  </NoAccessToken>
                }
              />

              <Route
                path="/myprofile"
                element={
                  <Protected>
                    <HalamanUser />
                  </Protected>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}

export default App;
