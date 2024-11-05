import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destinations: [],
  isDestLoad: false,
  isDestError: false,
};

const destinationsSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    fetchingDestData: (state) => {
      state.isDestLoad = true;
    },
    fetchedDestData: (state, action) => {
      state.isDestLoad = false;
      state.destinations = action.payload;
    },
    fetchDestError: (state, action) => {
      state.isDestLoad = false;
      state.isDestError = action.payload;
    },
  },
});

export const { fetchingDestData, fetchedDestData, fetchDestError } =
  destinationsSlice.actions;
export default destinationsSlice.reducer;
