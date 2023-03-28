import React, { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";

import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Slider,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Pagination,
  PaginationItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  selectAllProducts,
} from "../../redux/features/productSlice";
import "./Product.css";
import ProductCard from "./ProductCard";
import ProductCatdSkeleton from "../Skeletons/ProductCatdSkeleton";
const Product = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, products, filteredProductsCount, resultPerPage } =
    useSelector(selectAllProducts);
  console.log(products);
  useEffect(() => {
    dispatch(getProducts({ currentPage, toast }));
  }, [dispatch, currentPage]);
  const handleChange = () => {};
  return (
    <Box className="wrapper">
      <Box className="filter-box"></Box>
      <Box className="container">
        <Typography
          variant="div"
          component="h5"
          sx={{
            ml: "10px",
            mb: "20px",
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          {filteredProductsCount && filteredProductsCount > 0
            ? `Found ${filteredProductsCount} items`
            : "No product found"}
        </Typography>
        <Box className="card-container">
          {products &&
            products.map((product, index) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </Box>

        {loading && (
          <Box className="card-container">
            {[...Array(8)].map((e, i) => (
              <ProductCatdSkeleton key={i} />
            ))}
          </Box>
        )}
        {/* Pagination */}
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredProductsCount / resultPerPage)}
            page={currentPage}
            onChange={(e, v) => setCurrentPage(v)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Product;
