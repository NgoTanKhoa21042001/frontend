import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
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
const ProductCard = ({ product }) => {
  return (
    <Box className="productCard">
      <CardActionArea>
        <Card className="box-shadow">
          <CardMedia
            component="img"
            height="140"
            image={IMAGE_BASEURL + product.images[0].url}
            alt={product.title}
          />
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
              <Box>
                <LocalShippingIcon sx={{ mr: 1, color: "#9c27b0" }} />
                <Typography variant="caption">Free Shipping</Typography>
              </Box>
            ) : (
              ""
            )}
            <Typography sx={{ display: "block" }} variant="button">
              View Details
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Box>
  );
};

export default ProductCard;
