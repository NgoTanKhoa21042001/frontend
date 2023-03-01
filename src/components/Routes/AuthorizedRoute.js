import { Box, Typography } from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";
import { selectLoggedInUser } from "../../redux/features/authSlice";
import TreeMenu from "./Menu/TreeMenu";
import "./Authorized.css";
import DrawerTreeMenu from "./Menu/DrawerTreeMenu";
const AuthorizedRoute = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector(selectLoggedInUser);
  let role;
  const { UserInfo } = jwtDecode(accessToken);
  role = UserInfo.roles[0].toString();
  // cho phép quyền truy cập
  if (role === "admin" || role === "seller") {
    return (
      <>
        <Box
          sx={{
            background: "#88acbc",
            display: "flex",
            color: "#fff",
            p: 1,
            alignItems: "center",
          }}
        >
          <Box className="mTreeMenu" sx={{ minWidth: "225px", mr: 1 }}>
            <DrawerTreeMenu />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              component="div"
              variant="h6"
              sx={{ textAlign: "center" }}
            >
              Dashboard
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Box
            className="dTreeMenu"
            sx={{ background: "#88acbc", minWidth: "225px", mr: 1 }}
          >
            <TreeMenu />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ m: "0 auto", p: 1 }}>
              {/* Dashboard */}
              <Outlet />
            </Box>
          </Box>
        </Box>
      </>
    );
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default AuthorizedRoute;
