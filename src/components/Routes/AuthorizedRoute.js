import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";
import { selectLoggedInUser } from "../../redux/features/authSlice";

const AuthorizedRoute = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector(selectLoggedInUser);
  let role;
  const { userInfo } = jwtDecode(accessToken);
  role = userInfo.roles[0].toString();
  // cho phép quyền truy cập
  if (role === "admin" || role === "seller") {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default AuthorizedRoute;
