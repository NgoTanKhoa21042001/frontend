import axios from "axios";
import { BASEURL } from "../constants/baseUrl";
import { axiosPublic } from "./axiosPublic";
import { refreshUserDetails } from "./features/authSlice";

let store;

export const injectStore = (_store) => {
  store = _store;
};
// tạo 1 instance
const axiosPrivate = axios.create({
  baseURL: `${BASEURL}/api/v1`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// tạo interceptors
axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = store?.getState()?.auth?.credentials?.accessToken;
    if (accessToken) {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    // khi rq thành công
    return config;
  },
  (error) => Promise.reject(error)
);

// Đoạn mã này đang triển khai một trình chặn Axios để xử lý các phản hồi từ một API riêng tư. Nếu trạng thái phản hồi là 403 (bị từ chối), nó sẽ kiểm tra xem yêu cầu đã được gửi trước đó chưa. Nếu chưa, nó sẽ gửi một yêu cầu đến một API công cộng để làm mới thông tin người dùng và lấy một mã truy cập mới. Nếu mã truy cập được lấy thành công, nó sẽ cập nhật tiêu đề của yêu cầu ban đầu với mã truy cập mới và gửi lại yêu cầu. Nếu không thể lấy mã truy cập hoặc yêu cầu ban đầu đã được gửi, nó sẽ từ chối lời hứa với lỗi.
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const { data } = await axiosPublic.get(`/refresh`);
      await store.dispatch(refreshUserDetails(data));
      const accessToken = store?.getState()?.auth?.credentials?.accessToken;
      if (accessToken) {
        prevRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
      }
      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
