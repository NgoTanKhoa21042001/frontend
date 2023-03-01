import { Tooltip } from "@mui/material";
import logo from "../../images/OSHOP2.svg";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import "./Header.css";
import DrawerMenu from "./DrawerMenu";
import AuthMenu from "./AuthMenu";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  return (
    <header>
      <div className="site-header">
        <div className="primary-menu">
          <div className="mobile-menu">
            <DrawerMenu />
          </div>
          <div className="logo-area">
            <Tooltip title="Home">
              <Link to="/">
                <img src={logo} alt="khoaShop" style={{ width: "90px" }} />
              </Link>
            </Tooltip>
          </div>
          <nav className="pages-area">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <HomeIcon />
              Home
            </NavLink>
            <NavLink
              to="/product"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <HomeIcon />
              Product
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <InfoIcon />
              About Us
            </NavLink>
            <NavLink
              to="/contact-us"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <ContactPageIcon />
              Contact Us
            </NavLink>
          </nav>
        </div>
        <div className="secondary-menu">
          <div className="cart-area">
            <Tooltip title="Your cart">
              <Link to="/cart" style={{ padding: "8px 15px" }}>
                <StyledBadge badgeContent={3} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </Link>
            </Tooltip>
          </div>
          <div className="auth-area">
            <AuthMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
