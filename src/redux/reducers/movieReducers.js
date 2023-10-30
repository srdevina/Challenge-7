import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popular: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setPopular: (state, action) => {
      state.popular = action.payload;
    },
    fetchMoviesSuccess: (state, action) => {
      state.searchResults = action.payload;
      state.error = null;
    },
    fetchMoviesError: (state, action) => {
      state.searchResults = [];
      state.error = action.payload;
    },
  },
});

export const { setPopular, fetchMoviesSuccess, fetchMoviesError } =
  movieSlice.actions;

export default movieSlice.reducer;
