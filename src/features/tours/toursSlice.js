import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tours: [],
  isTourLoad: false,
  isTourError: false,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    fetchingTourData: (state) => {
      state.isTourLoad = true;
    },
    fetchedTourData: (state, action) => {
      state.isTourLoad = false;
      state.tours = action.payload;
    },
    fetchTourError: (state, action) => {
      state.isTourLoad = false;
      state.isTourError = action.payload;
    },
  },
});

export const { fetchingTourData, fetchedTourData, fetchTourError } =
  tourSlice.actions;
export default tourSlice.reducer;
