import React, { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { logout, selectLoggedInUser } from "../../redux/features/authSlice";
import { IMAGE_BASEURL } from "../../constants/baseUrl";

// dấu chấm xanh hoạt động của avatar
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const AuthMenu = () => {
  const dispatch = useDispatch();

  const { user, accessToken } = useSelector(selectLoggedInUser);
  let role;
  if (accessToken) {
    const { UserInfo } = jwtDecode(accessToken);
    role = UserInfo.roles[0];
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const profile = () => navigate("/profile");
  const orders = () => navigate("/order");
  const dashboard = () => navigate("/authorized/dashboard");
  const logoutUser = () => {
    dispatch(logout({ toast }));
    navigate("/");
  };
  const auth = () => navigate("/auth");
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {user?.avatar?.url ? (
              // hiện hình ảnh avatar
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <img
                    src={IMAGE_BASEURL + user.avatar.url}
                    alt={user.name}
                    style={{ width: 32, height: 32 }}
                  />
                </Avatar>
              </StyledBadge>
            ) : (
              <AccountCircleIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      {accessToken ? (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {role !== "user" ? (
            <MenuItem onClick={dashboard}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Dashhboard
            </MenuItem>
          ) : (
            ""
          )}

          {/* dấu gạch chân */}
          <Divider />
          <MenuItem onClick={orders}>
            <ListItemIcon>
              <SummarizeIcon fontSize="small" />
            </ListItemIcon>
            Orders
          </MenuItem>
          <Divider />
          <MenuItem onClick={profile}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={logoutUser}>
            <ListItemIcon>
              <LoginOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={auth}>
            <ListItemIcon>
              <LoginOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Login or Registration
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default AuthMenu;
