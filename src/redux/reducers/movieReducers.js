import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popular: [],
  popularSlice: [],
  detail: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setPopular: (state, action) => {
      state.popular = action.payload;
    },
    setPopularSlice: (state, action) => {
      state.popularSlice = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
    }
  },
});

export const {
  setPopular,
  setPopularSlice,
  setDetail,
  fetchMoviesSuccess,
  fetchMoviesError,
} =
  movieSlice.actions;

export default movieSlice.reducer;
