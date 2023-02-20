import axios from "axios";
import { BASEURL } from "../components/constants/baseUrl";
let store;

export const injectStore = (_store) => {
  store = _store;
};
const axiosPrivate = axios.create({
  // Tóm lại, đoạn mã này tạo ra một instance của Axios với cấu hình cụ thể để gửi các yêu cầu HTTP đến máy chủ, bao gồm địa chỉ URL, cho phép gửi cookie và các đối tượng JSON được gửi dưới dạng yêu cầu HTTP.
  baseURL: `${BASEURL}/api/v1`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = store?.getState()?.auth?.credentials?.accessToken;
    if (accessToken) {
      console.log(accessToken);
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosPrivate;
