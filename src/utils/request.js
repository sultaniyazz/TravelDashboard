import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchDestError,
  fetchedDestData,
  fetchingDestData,
} from "../features/destinations/destinationsSlice";
import {
  fetchedTourData,
  fetchingTourData,
  fetchTourError,
} from "../features/tours/toursSlice";
import {
  fetchedUserData,
  fetchingUserData,
  fetchUserError,
} from "../features/users/userSlice";

export const getAllDestData = (url) => {
  return async (dispatch) => {
    dispatch(fetchingDestData());
    try {
      const res = await axios.get(url);
      dispatch(fetchedDestData(res.data));
    } catch (err) {
      dispatch(fetchDestError(err.message));
      console.log(err.message);
    }
  };
};
export const getAllTourData = (url) => {
  return async (dispatch) => {
    dispatch(fetchingTourData());
    try {
      const res = await axios.get(url);
      dispatch(fetchedTourData(res.data));
    } catch (err) {
      dispatch(fetchTourError(err.message));
      console.log(err.message);
    }
  };
};
export const getAllUsersData = (url) => {
  return async (dispatch) => {
    dispatch(fetchingUserData());
    try {
      const res = await axios.get(url);
      dispatch(fetchedUserData(res.data));
    } catch (err) {
      dispatch(fetchUserError(err.message));
      console.log(err.message);
    }
  };
};
export const deleteDest = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `${"https://travel-data-base.onrender.com/destinations"}/${id}`
      );
      dispatch(
        getAllDestData("https://travel-data-base.onrender.com/destinations")
      );
      toast.success("delete succesfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err.message);
      toast.error("delete error", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
};

export const deleteTour = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `${"https://travel-data-base.onrender.com/offers"}/${id}`
      );
      dispatch(getAllTourData("https://travel-data-base.onrender.com/offers"));
      toast.success("delete succesfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err.message);
      toast.error("delete error", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
};
