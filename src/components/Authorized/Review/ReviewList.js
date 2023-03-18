import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IMAGE_BASEURL } from "../../../constants/baseUrl";
import BoxShadowLoader from "../../Skeletons/BoxShadowLoader";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import {
  getProductsByAuthorizeRoles,
  selectAllProducts,
} from "../../../redux/features/productSlice";
import {
  deleteReview,
  getReviews,
  resetMutationResult,
  selectAllReviews,
  selectReviewMutationResult,
} from "../../../redux/features/reviewSlice";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const ReviewList = () => {
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const { products } = useSelector(selectAllProducts);
  const { reviews, loading: revLoading } = useSelector(selectAllReviews);
  const { success } = useSelector(selectReviewMutationResult);
  console.log(reviews);

  const columns = [
    {
      field: "image",
      headerName: "Avatar",
      headerClassName: "gridHeader",
      flex: 0.4,
      minWidth: 60,
      renderCell: (params) => {
        return params.value === "" ? (
          ""
        ) : (
          <img src={params.value} height="100%" />
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "gridHeader",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "rating",
      headerName: "Rating",
      headerClassName: "gridHeader",
      flex: 0.6,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <>
            <Stack spacing={1} sx={{ display: "block" }}>
              <Rating value={params.value} precision={0.1} readOnly />
            </Stack>
          </>
        );
      },
    },
    {
      field: "review",
      headerName: "Review",
      headerClassName: "gridHeader",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "delete",
      headerName: "Delete",
      headerClassName: "gridHeader",
      flex: 0.5,
      minWidth: 80,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Delete" placement="top">
              <IconButton
                color="error"
                component="span"
                onClick={() => deleteHandler(params.getValue(params.id, "id"))}
              >
                <DeleteForeverIcon sx={{ width: "30px", height: "30px" }} />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((rev) => {
      rows.push({
        id: rev._id,
        image: IMAGE_BASEURL + rev.user.avatar.url,
        name: rev.user.name,
        rating: rev.rating,
        review: rev.comment,
      });
    });
  const handleChange = (id) => {
    setId(id);
    if (id !== "") {
      dispatch(getReviews({ id, toast }));
    }
  };
  const deleteHandler = (reviewId) => {
    // tìm đến id product sau đó là đến id review
    let productId = id;
    dispatch(deleteReview({ reviewId, productId, toast }));
  };
  useEffect(() => {
    if (success) {
      // gọi hàm resetMutationResult và getReviews từ redux store thông qua dispatch. Hàm resetMutationResult được sử dụng để xóa kết quả mutation trước đó trong store
      dispatch(resetMutationResult());
      dispatch(getReviews({ id, toast }));
    }
    // gọi hàm getProductsByAuthorizeRoles để lấy danh sách sản phẩm từ redux store thông qua dispatch.
    dispatch(getProductsByAuthorizeRoles({ toast }));
  }, [dispatch, success, id]);
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ maxWidth: 350, m: "30px auto", textAlign: "left" }}>
        <FormControl fullWidth>
          <InputLabel id="productlist">Product List</InputLabel>
          <Select
            labelId="productlist"
            id="productList"
            value={id}
            label="Product List"
            onChange={(e) => handleChange(e.target.value)}
          >
            {products &&
              products.map((product) => (
                <MenuItem key={product._id} value={product._id}>
                  {product.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Divider />
      {revLoading ? (
        <BoxShadowLoader />
      ) : id ? (
        reviews && reviews.length > 0 ? (
          <>
            <Typography sx={{ mt: 3 }}>
              {reviews.length} Review(s) found for this product
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                mt: 2,
                textAlign: "center",
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                sx={{ m: 0 }}
                components={{ Toolbar: GridToolbar }}
                autoHeight
              />
            </Box>
          </>
        ) : (
          <Typography sx={{ mt: 3 }}>No Reviews Found</Typography>
        )
      ) : (
        <Typography sx={{ mt: 3 }}>
          Select a product to view reviews.
        </Typography>
      )}
    </Box>
  );
};

export default ReviewList;
