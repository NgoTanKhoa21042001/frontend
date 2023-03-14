import React, { useEffect, useState } from "react";
import axiosPrivate from "../../redux/axiosPrivate";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
const Payment = (props) => {
  const [stripePromise, setStripePromise] = useState(null);
  const getPublishableKey = async () => {
    // Hàm getPublishableKey được định nghĩa bằng từ khóa async, có nghĩa là nó trả về một promise. Nó gửi một yêu cầu GET đến một điểm cuối API riêng tư để lấy một khóa có thể xuất bản cho Stripe, sau đó sử dụng hàm setStripePromise để đặt biến trạng thái stripePromise thành một phiên bản mới của đối tượng Stripe, được khởi tạo với khóa có thể xuất bản.
    const { data } = await axiosPrivate.get("/publishable-key");
    setStripePromise(loadStripe(data.publishableKey));
  };
  useEffect(() => {
    getPublishableKey();
  });
  return (
    <>
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <StripeCheckoutForm {...props} />
        </Elements>
      )}
    </>
  );
};

export default Payment;

// đoạn mã này thiết lập một biểu mẫu thanh toán bằng cách sử dụng thư viện Stripe, lấy một khóa có thể xuất bản từ một điểm cuối API riêng tư và khởi tạo một đối tượng Stripe với khóa để xử lý thanh toán một cách an toàn
