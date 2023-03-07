import React, { useEffect, useState } from "react";
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
  TextField,
  DialogContentText,
} from "@mui/material";
import ProductDetailsImageCarouselCard from "./ProductDetailsImageCarouselCard";
import ProductDetailsInfoCard from "./ProductDetailsInfoCard";
import "./productDetail.css";
const ProductDetails = () => {
  const [open, setOpen] = React.useState(false);
  const [submitRating, setSubmitRating] = useState(5);
  const [submitReview, setSubmitReview] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmitReviewRating = () => {};
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
          <Box className="product-reviews">
            <Box className="reviews" style={{ textAlign: "center" }}>
              <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                  sx={{ bgcolor: "primary.main", color: "#fff", mb: 2 }}
                >
                  Review &#38; Rating
                </DialogTitle>
                <DialogContent sx={{ minWidth: "350px" }} fullWidth>
                  <Stack spacing={1} sx={{ display: "block" }}>
                    <Rating
                      value={submitRating}
                      precision={0.1}
                      onChange={(e, newValue) => setSubmitRating(newValue)}
                    />
                  </Stack>

                  {/* LỜI BÌNH LUẬN */}
                  <TextareaAutosize
                    id="review"
                    style={{ width: "100%", margin: "10px 0", padding: 0 }}
                    minRows={5}
                    value={submitReview}
                    variant="standard"
                    onChange={(e) => setSubmitReview(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleSubmitReviewRating}>Submit</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductDetails;
