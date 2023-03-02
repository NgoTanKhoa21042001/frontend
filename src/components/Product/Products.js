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
const Product = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector(selectAllProducts);
  console.log(products);
  useEffect(() => {
    dispatch(getProducts({ toast }));
  }, [dispatch]);
  return (
    <Box className="wrapper">
      <Box className="filter-box"></Box>
      <Box className="container">
        <Box className="card-container">
          {products &&
            products.map((product, index) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
