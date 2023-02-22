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
    // - Hàm xử lý cho các yêu cầu thành công. Hàm này nhận vào đối tượng config chứa thông tin về yêu cầu, ví dụ như tiêu đề, phương thức, thân yêu cầu, v.v. Đối tượng config này sẽ được trả về sau khi được xử lý xong.
    //  được sử dụng để trích xuất mã thông báo truy cập từ trạng thái ứng dụng thông qua thư viện Redux. Nó sử dụng toán tử optional chaining để đảm bảo rằng các thuộc tính không được xác định hoặc nullish (null hoặc undefined) sẽ không gây ra lỗi. Nếu tất cả các thuộc tính đều tồn tại, thì giá trị của accessToken sẽ là mã thông báo truy cập, ngược lại thì giá trị sẽ là undefined.
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
