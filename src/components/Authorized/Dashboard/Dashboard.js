import React from "react";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { selectLoggedInUser } from "../../../redux/features/authSlice";
import AdminDashboard from "./AdminDashboard";
import SellerDashboard from "./SellerDashboard";

const Dashboard = () => {
  const { accessToken } = useSelector(selectLoggedInUser);
  let role;
  const { UserInfo } = jwtDecode(accessToken);
  role = UserInfo.roles[0];
  return role === "admin" ? <AdminDashboard /> : <SellerDashboard />;
};

export default Dashboard;
