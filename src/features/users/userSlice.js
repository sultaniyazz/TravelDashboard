import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isUserLoad: false,
  isUserError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchingUserData: (state) => {
      state.isUserLoad = true;
    },
    fetchedUserData: (state, action) => {
      state.isUserLoad = false;
      state.users = action.payload;
    },
    fetchUserError: (state, action) => {
      state.isUserLoad = false;
      state.isUserError = action.payload;
    },
  },
});

export const { fetchingUserData, fetchedUserData, fetchUserError } =
  userSlice.actions;
export default userSlice.reducer;
