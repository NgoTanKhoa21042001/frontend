import { Avatar, Box, Card, Divider, Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PaymentIcon from "@mui/icons-material/Payment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { formatCurrency } from "../../utility/formatCurrency";

import { useNavigate } from "react-router-dom";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import jwtDecode from "jwt-decode";

import React, { useEffect, useState } from "react";
import { selectShippingInfo } from "../../redux/features/shippingSlice";
import { selectCartItems } from "../../redux/features/cartSlice";
import { selectLoggedInUser } from "../../redux/features/authSlice";
import axiosPrivate from "../../redux/axiosPrivate";
import {
  createOrder,
  resetMutationResult,
  selectOrderMutationResult,
} from "../../redux/features/orderSlice";

const StripeCheckoutForm = (props) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const [proccessing, setProcessing] = useState(false);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shipInfo } = useSelector(selectShippingInfo);
  const { products } = useSelector(selectCartItems);
  const { user, accessToken } = useSelector(selectLoggedInUser);
  // giải mã token truy cập (access token) của người dùng (user). Sau khi token truy cập được giải mã, thông tin của người dùng được lưu trữ trong biến UserInfo
  const { UserInfo } = jwtDecode(accessToken);
  const userEmail = UserInfo.email.toString();
  const { success } = useSelector(selectOrderMutationResult);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  // Đoạn code này đang tạo ra một mảng mới các đối tượng có tất cả các thuộc tính của các đối tượng gốc trong products, nhưng với một thuộc tính product bổ sung chứa giá trị _id
  const orderItems = products.map(({ _id, ...rest }) => ({
    ...rest,
    product: _id,
  }));
  const order = {
    shippingInfo: shipInfo,
    orderItems: orderItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharge,
    totalPrice: orderInfo.totalPrice,
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const { data } = await axiosPrivate.post(
        `/create-payment-intent`,
        paymentData
      );
      const client_secret = data.clientSecret;
      if (!stripe || !elements) return;
      // client_secret là mã bí mật của khách hàng được trả về từ API Stripe, và payment_method là đối tượng chứa thông tin về phương thức thanh toán được sử dụng
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: userEmail,
            address: {
              line1: shipInfo.address,
              city: shipInfo.city,
              state: shipInfo.state,
              postal_code: shipInfo.zipCode,
              country: shipInfo.country,
            },
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        // processing sẽ được thiết lập lại để cho phép người dùng thử lại.
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // đoạn mã tiếp tục kiểm tra trạng thái của paymentIntent
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          // tạo đơn hàng
          dispatch(createOrder({ order, toast }));
        } else {
          toast.error("Proccessing error");
          setProcessing(false);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setProcessing(false);
    }
  };
  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
      setProcessing(false);
      navigate("/order/success");
    }
  }, [dispatch, success, navigate]);
  return (
    <Box
      component="form"
      onSubmit={(e) => submitHandler(e)}
      sx={{
        m: "auto",
        maxWidth: "550px",
        textAlign: "center",
        minWidth: "500px",
      }}
    >
      <Card sx={{ p: 1, pt: 3 }}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            height: "80px",
            width: "80px",
            m: "0 auto",
          }}
        >
          <Typography sx={{ fontSize: "1.3rem" }}>Stripe</Typography>
        </Avatar>

        <Divider sx={{ m: "10px 0" }} />
        <Box sx={{ textAlign: "right" }}>
          <Grid container sx={{ alignItems: "center", m: "20px 0" }}>
            <Grid item xs sx={{ mr: 1 }}>
              <Typography>Card Number : </Typography>
            </Grid>
            <Grid item xs>
              <CardNumberElement style={{ border: "1px solid #dadada" }} />
            </Grid>
          </Grid>

          <Grid container sx={{ alignItems: "center", m: "20px 0" }}>
            <Grid item xs sx={{ mr: 1 }}>
              <Typography>Card Expire Date : </Typography>
            </Grid>
            <Grid item xs>
              <CardExpiryElement style={{ border: "1px solid #dadada" }} />
            </Grid>
          </Grid>

          <Grid container sx={{ alignItems: "center", m: "20px 0" }}>
            <Grid item xs sx={{ mr: 1 }}>
              <Typography>Card CVC : </Typography>
            </Grid>
            <Grid item xs>
              <CardCvcElement style={{ border: "1px solid #dadada" }} />
            </Grid>
          </Grid>
        </Box>
        <LoadingButton
          type="submit"
          loading={proccessing}
          fullWidth
          loadingPosition="start"
          startIcon={<PaymentIcon />}
          variant="contained"
        >
          Pay - {orderInfo && formatCurrency(orderInfo.totalPrice)}
        </LoadingButton>
      </Card>
    </Box>
  );
};

export default StripeCheckoutForm;
