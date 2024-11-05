import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideBar: false,
  darkMode: false,
  langChange: false,
  destModal: false,
};

const pageActionSlice = createSlice({
  name: "pageAction",
  initialState,
  reducers: {
    modal: (state) => {
      state.showSideBar = !state.showSideBar;
    },
    mode: (state) => {
      state.darkMode = !state.darkMode;
    },
    lang: (state) => {
      state.langChange = !state.langChange;
    },
    modalUpdate: (state) => {
      state.destModal = !state.destModal;
    },
  },
});

export const { modal, mode, lang, modalUpdate } = pageActionSlice.actions;
export default pageActionSlice.reducer;
