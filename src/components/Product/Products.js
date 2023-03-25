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
} from "@mui/material";
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
  const { loading, products, filteredProductsCount } =
    useSelector(selectAllProducts);
  console.log(products);
  useEffect(() => {
    dispatch(getProducts({ toast }));
  }, [dispatch]);
  return (
    <Box className="wrapper">
      <Box className="filter-box">cdc</Box>
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
      </Box>
    </Box>
  );
};

export default Product;
