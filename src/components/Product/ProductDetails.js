import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {
  productDetails,
  selectProductDetails,
} from "../../redux/features/productSlice";

import BoxShadowLoader from "../Skeletons/BoxShadowLoader";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  Stack,
  Rating,
  Typography,
} from "@mui/material";
import ProductDetailsImageCarouselCard from "./ProductDetailsImageCarouselCard";
import ProductDetailsInfoCard from "./ProductDetailsInfoCard";
import "./productDetail.css";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector(selectProductDetails);
  useEffect(() => {
    dispatch(productDetails({ id, toast }));
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <BoxShadowLoader></BoxShadowLoader>
      ) : (
        <>
          <Box className="product-details">
            <Box className="product-image-carousel">
              {product?.images && (
                <ProductDetailsImageCarouselCard images={product.images} />
              )}
            </Box>
            <Box className="product-info">
              {product && <ProductDetailsInfoCard product={product} />}
            </Box>
          </Box>
          <Box className="product-reviews"></Box>
        </>
      )}
    </>
  );
};

export default ProductDetails;
