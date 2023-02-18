import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { selectLoggedInUser } from "../../redux/features/authSlice";
import BoxShadowLoader from "../Skeletons/BoxShadowLoader";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  //Sử dụng hook useSelector() để lấy giá trị accessToken từ store của Redux.
  const { accessToken } = useSelector(selectLoggedInUser);
  //Sử dụng hook useEffect() để đăng ký một hàm callback, được thực thi sau khi component được mount hoặc giá trị accessToken được thay đổi.
  useEffect(() => {
    if (accessToken === null) {
      navigate("/auth");
    }
  }, [accessToken, navigate]);
  return accessToken ? <Outlet /> : <BoxShadowLoader />;
};

export default ProtectedRoute;

// kiểm tra xem người dùng đã đăng nhập chưa bằng cách sử dụng accessToken. Nếu người dùng đã đăng nhập (có accessToken), nó sẽ cho phép người dùng truy cập vào trang được bảo vệ (được định nghĩa bên trong component Outlet), ngược lại, nếu người dùng chưa đăng nhập (không có accessToken), nó sẽ chuyển hướng người dùng đến trang đăng nhập (/auth).
