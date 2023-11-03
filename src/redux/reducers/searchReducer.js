import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    searching: [],
};

const movieSlice = createSlice({
    name: "searching",
    initialState,
    reducers: {
        setSearching: (state, action) => {
            state.searching = action.payload;
        },
    },
});

export const { setSearching } = movieSlice.actions;

export default movieSlice.reducer;