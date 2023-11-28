import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Get user
  const getUser = async () => {
    try {
      dispatch(showLoading());
      // Doing here............
      const res = await axios.post(
        "/api/v1/user/getuserData",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        // Correct usage of Navigate component
        <Navigate to="/login" />;
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  };

  // useEffect hook
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]); // Add an empty dependency array to run the effect only once

  if (localStorage.getItem("token")) {
    return children;
  } else {
    // Correct usage of Navigate component
    return <Navigate to="/login" />;
  }
}
