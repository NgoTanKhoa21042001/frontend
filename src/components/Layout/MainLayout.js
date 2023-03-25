import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Layout/Header";
import "../../App.css";
import Footer from "./Footer";
const MainLayout = () => {
  return (
    <>
      {" "}
      <div className="site">
        <Header />
        <div className="main">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
