import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CardActionArea,
  Box,
  Stack,
  Rating,
  CardActions,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Product.css";
import { IMAGE_BASEURL } from "../../constants/baseUrl";
import { formatCurrency } from "../../utility/formatCurrency";
import {
  addItemsToCart,
  selectCartItems,
  removeItem,
} from "../../redux/features/cartSlice";
import { toast } from "react-toastify";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router";

const ProductCard = React.forwardRef(({ product }, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [exist, setExist] = useState(false);
  const [color, setColor] = useState("info");
  const [icon, setIcon] = useState(<AddShoppingCart />);
  const [text, setText] = useState("Add to cart");
  const { products } = useSelector(selectCartItems);
  // Đây là trang product
  const remove = () => {
    setExist(true);
    setColor("error");
    setIcon(<DeleteIcon />);
    setText("Remove from cart");
  };
  const add = () => {
    setExist(false);
    setColor("info");
    setIcon(<AddShoppingCartIcon />);
    setText("Add from cart");
  };
  const cartHandler = () => {
    const _id = product._id;
    const quantity = 1;
    // nếu đã tồn tại sp
    if (exist) {
      dispatch(removeItem(_id));
      toast.error("Items removed from cart");
      add();
      return;
    }
    // nếu chưa có thì add vào cart
    if (!exist) {
      dispatch(addItemsToCart({ _id, quantity, toast }));
      toast.success("Items add to cart");
      remove();
      return;
    }
  };
  const getExist = () => {
    /// nếu có sp rồi thì bỏ đi để sp mới váo
    if (products) {
      const e = products.some((p) => p._id === product._id);
      if (e === true) {
        remove();
      }
    }
  };
  useEffect(() => {
    getExist();
  }, []);
  const linkToNavigate = () => {
    navigate(`/product/${product._id}`);
  };
  return (
    <Box className="productCard">
      <CardActionArea>
        <Card
          className="box-shadow"
          sx={{ position: "relative", overflow: "hidden", minHeight: "365px" }}
          onClick={linkToNavigate}
        >
          <CardMedia
            component="img"
            height="140"
            image={IMAGE_BASEURL + product.images[0].url}
            alt={product.title}
          />
          {product.discount > 0 ? (
            <Typography variant="button" display="block" className="sale">
              Sale
            </Typography>
          ) : (
            ""
          )}
          <CardContent>
            <Typography gutterBottom variant="button" component="h1">
              {/* dài hơn 15 kí tự sẽ cắt chuỗi */}
              {product?.title.length > 15
                ? product.title.slice(0, 14)
                : product.title}
            </Typography>
            <Stack spacing={1} sx={{ display: "block" }}>
              <Rating
                name="half-rating"
                value={product.ratings}
                precision={0.1}
                readOnly
              />
            </Stack>
            <Typography
              gutterBottom
              sx={{ display: "block" }}
              variant="caption"
              component="span"
            >
              Reviews: {product.numOfReviews}
            </Typography>
            {product.discount > 0 ? (
              <Box>
                <Typography
                  gutterBottom
                  sx={{
                    display: "block",
                    textDecoration: "line-through",
                    color: "red",
                  }}
                  variant="caption"
                  component="span"
                >
                  Price: {formatCurrency(product.price)}
                </Typography>
                <Typography
                  gutterBottom
                  sx={{
                    display: "block",
                  }}
                  variant="caption"
                  component="span"
                >
                  Price: {formatCurrency(product.price - product.discount)}
                </Typography>
              </Box>
            ) : (
              <Typography sx={{ display: "block" }} variant="caption">
                {formatCurrency(product.price)}
              </Typography>
            )}
            {product.localShipmentPolicy === "free" ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LocalShippingIcon sx={{ mr: 1, color: "#9c27b0" }} />
                <Typography variant="caption">Free Shipping</Typography>
              </Box>
            ) : (
              ""
            )}
            <Typography sx={{ display: "block" }} variant="button">
              View Details &#38; buy.
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
      <Box sx={{ mt: 2 }}>
        {ref ? (
          <Button
            variant="outlined"
            ref={ref}
            fullWidth
            color={color}
            startIcon={icon}
            onClick={cartHandler}
          >
            {text}
          </Button>
        ) : (
          <Button
            variant="outlined"
            fullWidth
            color={color}
            startIcon={icon}
            onClick={cartHandler}
          >
            {text}
          </Button>
        )}
      </Box>
    </Box>
  );
});

export default ProductCard;
