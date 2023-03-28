import axios from "axios";
import { BASEURL } from "../constants/baseUrl";
export const axiosPublic = axios.create({
  baseURL: `${BASEURL}/api/v1`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Đoạn mã trên là một đoạn mã JavaScript sử dụng thư viện Axios để tạo một đối tượng Axios với tên axiosPublic. Đối tượng này được sử dụng để gửi các yêu cầu HTTP đến API của ứng dụng. Đối tượng được tạo ra bằng cách sử dụng phương thức create() của Axios và được cấu hình với các tùy chọn như baseURL, withCredentials và headers. baseURL được sử dụng để chỉ định địa chỉ URL của API, withCredentials được sử dụng để cho phép Axios gửi cookie khi gửi yêu cầu và headers được sử dụng để thiết lập loại dữ liệu được gửi đi. Đoạn mã này được xuất ra bên ngoài module để có thể được sử dụng trong các thành phần khác của ứng dụng.
