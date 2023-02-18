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
