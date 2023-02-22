Object.keys(avatar).forEach((key) => {
formData.append(avatar.item(key).name, avatar.item(key));
});

Lấy tất cả các keys của object avatar bằng cách sử dụng phương thức Object.keys(avatar).

2. Sử dụng phương thức forEach để duyệt qua mỗi key trong object avatar.

3. Trong mỗi lần lặp, chúng ta thêm dữ liệu vào formData. Phương thức avatar.item(key) trả về giá trị tại key được xác định trong object avatar. Sau đó, chúng ta sử dụng phương thức name của giá trị đó để xác định tên của trường dữ liệu khi gửi dữ liệu đến máy chủ.

4. Cuối cùng, chúng ta thêm giá trị của item đó vào formData bằng cách sử dụng phương thức formData.append(). Kết quả là tất cả các trường dữ liệu được thêm vào formData và sẵn sàng để được gửi đến máy chủ thông qua HTTP request.

Ví dụ: Nếu object avatar có các keys là "avatar_1" và "avatar_2" và giá trị của chúng là các file ảnh, đoạn code này sẽ thêm các file ảnh đó vào formData với tên trường dữ liệu lần lượt là "avatar_1" và "avatar_2".

================================

# jwt-decode

Thư viện jwt-decode cung cấp một cách đơn giản để giải mã các token JWT, cho phép truy cập vào các thông tin trong phần payload mà không cần giải mã signature. Nó được sử dụng trong các ứng dụng JavaScript để xác thực người dùng hoặc cho phép truy cập vào các tài nguyên an toàn.

==============================

# Typography

Trong Mui, Typography được sử dụng để hiển thị các đoạn văn bản trong các ứng dụng web
Typography còn cung cấp nhiều thuộc tính cho phép tùy chỉnh các kiểu chữ, ví dụ như:

- variant: định nghĩa kiểu chữ được sử dụng. Các giá trị có thể là "h1" đến "h6", "subtitle1", "subtitle2", "body1", "body2", "caption", "button", "overline".
- align: định nghĩa căn lề của đoạn văn bản.
- color: định nghĩa màu sắc của đoạn văn bản.
- noWrap: cho phép vô hiệu hóa việc ngắt dòng tự động.
- # gutterBottom: cho phép thêm khoảng trắng dưới đoạn văn bản.

credentials là một object chứa thông tin về thông tin xác thực,

- withCredentials: Cấu hình này cho phép Axios gửi cookie khi yêu cầu HTTP được gửi đến máy chủ. Điều này cần thiết khi muốn duy trì phiên làm việc cho người dùng.

- headers: Đây là đối tượng chứa các thông tin về tiêu đề yêu cầu HTTP. Trong đoạn mã này, tiêu đề 'Content-Type' được thiết lập là 'application/json', cho biết rằng các yêu cầu được gửi là các đối tượng JSON.

# Form data:

FormData là một interface mới được HTML5 giới thiệu trong Web API. Hầu hết chúng ta đã từng chặn hoặc chỉnh sửa dữ liệu khi submit form với Jquery . FormData là một Web API interface, cung cấp cho ta một cách tiếp cận khác với việc xử lý form. Việc sử dụng FormData cũng giống với việc xử dụng ajax jquery.

Phương thức append cho phép chúng ta chèn thêm một cặp key => value vào trong FormData
