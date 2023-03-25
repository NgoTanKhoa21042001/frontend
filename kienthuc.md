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

flexGrow: 1 là một thuộc tính trong CSS để thiết lập độ rộng linh hoạt cho một phần tử trong một layout dựa trên phương pháp flexbox. Ví dụ, nếu có hai phần tử trong một container, phần tử thứ nhất có flex-grow: 1 và phần tử thứ hai không có thuộc tính flex-grow, phần tử đầu tiên sẽ mở rộng để điền vào toàn bộ không gian còn lại trong container sau khi phần tử thứ hai đã được đặt vị trí của nó.

# JSON DATA:

jsonData là một đối tượng JavaScript được sử dụng để biểu diễn dữ liệu dưới dạng chuỗi JSON (JavaScript Object Notation). Nó thường được sử dụng để gửi dữ liệu từ client lên server thông qua các request HTTP như GET hoặc POST. Để gửi dữ liệu dưới dạng jsonData, ta cần sử dụng phương thức POST và đặt jsonData vào phần body của request.

Trong khi đó, formData là một đối tượng JavaScript được sử dụng để biểu diễn dữ liệu dưới dạng key-value pairs. Nó thường được sử dụng để gửi dữ liệu từ client lên server thông qua phương thức POST. Để gửi dữ liệu dưới dạng formData, ta cần sử dụng phương thức POST và đặt formData vào phần body của request.

# axiosPRivate vs axiosPublic

Vì vậy, khác nhau giữa axiosPrivate và axiosPublic là trong cách chúng được cấu hình và sử dụng. axiosPrivate được sử dụng để gửi các yêu cầu tới các API yêu cầu xác thực và quyền truy cập, trong khi axiosPublic được sử dụng để gửi các yêu cầu đến các API không yêu cầu xác thực hoặc quyền truy cập.

# Chức năng trong project

1. Trang chủ: Trang đầu tiên khi khách hàng truy cập vào trang web của bạn. Trang chủ thường bao gồm thông tin về các sản phẩm, dịch vụ, hoặc chương trình khuyến mãi mới nhất của bạn.

2. Danh mục sản phẩm: Các sản phẩm được phân loại vào các danh mục để khách hàng dễ dàng tìm kiếm và chọn lựa. Các danh mục sản phẩm có thể được sắp xếp theo tên, giá cả, thương hiệu, và nhiều tiêu chí khác.

3. Trang chi tiết sản phẩm: Mỗi sản phẩm sẽ có một trang chi tiết riêng với thông tin về sản phẩm đó, bao gồm mô tả chi tiết, hình ảnh, giá cả, đánh giá của khách hàng, và các tính năng khác.

4. Giỏ hàng: Khách hàng có thể thêm sản phẩm vào giỏ hàng và xem lại những sản phẩm đó trước khi thanh toán. Trong giỏ hàng, khách hàng có thể thay đổi số lượng sản phẩm, xóa sản phẩm, hay thay đổi thông tin về địa chỉ nhận hàng và phương thức thanh toán.

5. Đăng ký tài khoản, đăng nhập tài khoản: Khách hàng có thể đăng ký một tài khoản trên trang web, hoặc đăng nhập để đơn giản hóa quá trình thanh toán và lưu trữ thông tin về các đơn hàng trước đây.

6. User có thể change password, edit profile

7. Thanh toán: Sau khi xác nhận thông tin đơn hàng, khách hàng sẽ được chuyển đến trang thanh toán để nhập thông tin về thẻ thanh toán, địa chỉ nhận hàng và các thông tin khác.

8. Đơn hàng: Sau khi khách hàng hoàn tất quá trình thanh toán, họ sẽ nhận được thông báo về đơn hàng của mình, bao gồm thông tin về sản phẩm, giá cả, địa chỉ nhận hàng, thời gian giao hàng, và các thông tin khác.

9. khả năng tương thích trên mọi thiết bị
10. role admin : admin có thể quản lí user, quản lí sản phẩm , cung cấp thông tin về tên, giá, mô tả và hình ảnh sản phẩm.

- quản trị viên quản lý các đơn hàng của khách hàng, theo dõi trạng thái đơn hàng và cập nhật thông tin vận chuyển.

11. seller có thể edit store và product thuộc store
12. Tích hợp dịch vụ vận chuyển: Đây là phần tích hợp dịch vụ vận chuyển để cung cấp cho khách hàng các tùy chọn vận chuyển và tính phí vận chuyển phù hợp với địa chỉ giao hàng của họ.

13. Persist login
14. send mail, contact admin
15. filter product: Cho phép khách hàng tìm kiếm sản phẩm theo tên, danh mục hoặc từ khóa

# ReactJS

Nó có các công cụ tốt nhất để phát triển mã nhanh hơn. Mặc dù React chỉ là một thư viện, nhưng nó cho phép bạn tự do xây dựng ứng dụng và tổ chức mã theo cách bạn muốn, với các công cụ cần thiết. Do đó, nó tốt hơn Angular.js về hiệu suất và kết xuất giao diện người dùng.

# Stock

Trong sản phẩm, "stock" được dùng để chỉ số lượng sản phẩm có sẵn trong kho của công ty hoặc cửa hàng

# useLocation

useLocation là một hook được React Router Dom cung cấp trong thư viện react-router để giúp các thành phần React truy cập và sử dụng các thông tin về vị trí (location) của URL hiện tại được trình duyệt hiển thị. Hook này trả về một đối tượng chứa các thuộc tính như pathname, search, hash, state,... để các thành phần có thể sử dụng thông tin đó để điều hướng đến các trang khác hoặc hiển thị dữ liệu tương ứng.

# variant h5 :

Cụ thể, variant="h5" có nghĩa là chữ được sử dụng cho phần tử <Typography> sẽ có kiểu như tiêu đề cấp 5 (h5) trong HTML. Kiểu chữ này thường được sử dụng để tạo ra các đoạn văn bản có font chữ nhỏ hơn so với tiêu đề cấp 1 (h1), nhưng vẫn có tính năng nổi bật so với các phần còn lại trên trang web.

# createAsyncThunk:

createAsyncThunk là một hàm được cung cấp bởi Redux Toolkit, giúp bạn tự động tạo ra một action creator để xử lý các tác vụ bất đồng bộ (async) trong ứng dụng Redux một cách đơn giản và tiện lợi.

createAsyncThunk giúp bạn định nghĩa một hàm bất đồng bộ (async function) và tạo ra hai action creators với các tên thông thường được đặt tên là "pending" và "fulfilled" để các reducers của Redux có thể xử lý các trạng thái khác nhau của tác vụ.

Ví dụ, với createAsyncThunk, bạn có thể xử lý các tác vụ bất đồng bộ như lấy dữ liệu từ server, gửi các yêu cầu HTTP, hoặc lưu trữ dữ liệu vào cơ sở dữ liệu, và xử lý các kết quả của chúng một cách linh hoạt.

Về cơ bản, createAsyncThunk giúp viết code với Redux thuận tiện hơn và giúp giảm đi sự phức tạp của code khi xử lý các tác vụ bất đồng bộ trong Redux.

# mutate object

Mutate object là thay đổi trực tiếp các giá trị trong một đối tượng bằng cách thêm, xóa hoặc sửa đổi thuộc tính của đối tượng. Khi thực hiện mutate object, đối tượng sẽ bị thay đổi trực tiếp trong bộ nhớ, và những phần khác của code sử dụng đối tượng đó có thể bị ảnh hưởng.

Ví dụ, khi thêm một thuộc tính vào đối tượng bằng cách sử dụng cú pháp gán obj.prop = value, thì đối tượng ban đầu sẽ bị thay đổi và giá trị thuộc tính mới sẽ được thêm vào đối tượng đó. Tương tự, các phương thức như .push () và .splice () cũng là mutate object vì chúng thay đổi trực tiếp nội dung của mảng mà chúng ta đang làm việ

# credentials

credentials thường được sử dụng để lưu trữ thông tin đăng nhập của người dùng, chẳng hạn như tên đăng nhập, mật khẩu, mã thông báo (token) hoặc bất kỳ thông tin đăng nhập nào khác. Thông tin này thường được lưu trữ trong store, và có thể được truy cập thông qua các selectors hoặc action creators để thực hiện các thao tác như kiểm tra quyền truy cập hoặc hiển thị thông tin người dùng đăng nhập.
