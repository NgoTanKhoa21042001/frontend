import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Button, Box, Typography, IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import "./Cart.css";
import {
  addItemsToCart,
  selectCartItems,
  removeItem,
} from "../../redux/features/cartSlice";
import CartItemCard from "./CartItemCard";
import { formatCurrency } from "../../utility/formatCurrency";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector(selectCartItems);
  const deleteCartItem = (_id) => {
    dispatch(removeItem(_id));
  };
  const checkoutHandler = () => {
    // chiyeenr sang login nếu chưa login
    navigate("/auth", { state: { path: "/shipping" } });
  };
  const decreaseQuantity = (_id, qty) => {
    const quantity = qty - 1;
    if (qty <= 1) return;
    dispatch(addItemsToCart({ _id, quantity }));
  };
  const increaseQuantity = (_id, qty, stock) => {
    const quantity = qty + 1;
    if (stock <= qty) return;
    // If the current quantity is less than the stock quantity, the function dispatches an action
    dispatch(addItemsToCart({ _id, quantity }));
  };
  return products.length > 0 ? (
    <Box className="cart-items">
      <Box className="cart-header">
        <Typography variant="button" display="block">
          Product
        </Typography>
        <Typography
          variant="button"
          display="block"
          sx={{ textAlign: "center", textTransform: "none" }}
        >
          Quantity
        </Typography>
        <Typography
          variant="button"
          display="block"
          sx={{ textAlign: "right", textTransform: "none" }}
        >
          Subtotal
        </Typography>
      </Box>
      {products.map((item) => (
        <Box className="cart-body" key={item._id}>
          <CartItemCard item={item} deleteCartItem={deleteCartItem} />

          <Box sx={{ textAlign: "center" }}>
            <Box className="btn-quantity" sx={{ m: 0 }}>
              <Tooltip title="Decrease quantity" placement="top">
                <IconButton
                  color="error"
                  component="span"
                  onClick={() =>
                    decreaseQuantity(item._id, item.quantity, item.stock)
                  }
                >
                  <RemoveCircleIcon />
                </IconButton>
              </Tooltip>
              <label>{item.quantity}</label>

              <Tooltip title="Increase quantity" placement="top">
                <IconButton
                  color="success"
                  component="span"
                  onClick={() =>
                    increaseQuantity(item._id, item.quantity, item.stock)
                  }
                >
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Typography
            variant="button"
            display="block"
            className="item-subtotal"
          >
            {formatCurrency(item.quantity * item.price)}
          </Typography>
        </Box>
      ))}
      <Box className="cart-total-price">
        <Typography variant="button" display="block" className="item-subtotal">
          Total:{" "}
          {formatCurrency(
            products.reduce((acc, item) => acc + item.quantity * item.price, 0)
          )}
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          startIcon={<ShoppingCartCheckoutIcon />}
          onClick={checkoutHandler}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" component="div" gutterBottom>
        Cart is empty
      </Typography>
      <AddShoppingCartIcon
        sx={{ width: "80px", height: "80px", color: "red" }}
      />
      <Typography sx={{ mt: 4 }}>
        <Link to="/">Back to home</Link>
      </Typography>
    </Box>
  );
};

export default Cart;
