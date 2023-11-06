import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import SearchResultPage from "./pages/SearchResultPage";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import TrailerPage from "./pages/TrailerPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import Protected from "./components/Protected";
import NoAccessToken from "./components/NoAccessToken";
import NotFoundPage from "./pages/NotFoundPage";

import { GoogleOAuthProvider } from "@react-oauth/google";
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
                    <HomePage />
                  </Protected>
                }
              />

              <Route
                path="/search"
                element={
                  <Protected>
                    <SearchResultPage />
                  </Protected>
                }
              />

              <Route
                path="/detail-film/:movieId"
                element={
                  <Protected>
                    <MovieDetailsPage />
                  </Protected>
                }
              />

              <Route
                path="/trailer/:movieId"
                element={
                  <Protected>
                    <TrailerPage />
                  </Protected>
                }
              />

              <Route
                path="/login"
                element={
                  <NoAccessToken>
                    <LoginPage />
                  </NoAccessToken>
                }
              />

              <Route
                path="/regis"
                element={
                  <NoAccessToken>
                    <RegisterPage />
                  </NoAccessToken>
                }
              />

              <Route
                path="/myprofile"
                element={
                  <Protected>
                    <UserPage />
                  </Protected>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}

export default App;
