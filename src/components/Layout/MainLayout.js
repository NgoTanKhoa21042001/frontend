import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Layout/Header";
import "../../App.css";
const MainLayout = () => {
  return (
    <>
      {" "}
      <div className="site">
        <Header />
        <div className="main">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
