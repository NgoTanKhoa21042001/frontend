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
import InboxIcon from "@mui/icons-material/Inbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  resetProducts,
  selectAllProducts,
} from "../../redux/features/productSlice";
import "./Product.css";
import ProductCard from "./ProductCard";
import ProductCatdSkeleton from "../Skeletons/ProductCatdSkeleton";
import {
  getCategories,
  selectAllCategories,
} from "../../redux/features/categorySlice";
const Product = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasMorepage, setHasMorepage] = useState(true);
  let minPrice = 1;
  let maxPrice = 100000;
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [ratingsfilter, setRatingsFilter] = useState(0);
  const [category, setCategory] = useState("");
  const { loading, products, filteredProductsCount, resultPerPage } =
    useSelector(selectAllProducts);
  const { categories } = useSelector(selectAllCategories);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
    dispatch(resetProducts());
  };
  // Price
  const priceHandler = (e, newPriceRange) => {
    setPriceRange(newPriceRange);
    setCurrentPage(1);
    dispatch(resetProducts());
  };
  // rating
  const ratingHandler = (e) => {
    setRatingsFilter(e.target.value);
    dispatch(resetProducts());
  };
  const handleListItemClick = (event, index, id) => {
    setSelectedIndex(index);
    setCategory(id);
    setCurrentPage(1);
    dispatch(resetProducts());
  };
  // infinite scrolling
  //  useRef được sử dụng để tạo một biến tham chiếu để lưu trữ một đối tượng IntersectionObserver.
  const observe = useRef();
  const lastElementRef = useCallback(
    (lastElement) => {
      if (loading) return;
      if (observe.current) observe.current.disconnect();
      observe.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorepage) {
          setCurrentPage((prev) => prev + 1);
        }
      });
      if (lastElement) observe.current.observe(lastElement);
    },
    [loading, hasMorepage]
  );
  console.log(products);

  useEffect(() => {
    dispatch(resetProducts());
  }, [dispatch]);

  // useEffect
  useEffect(() => {
    dispatch(getCategories({ toast }));
    const promise = dispatch(
      getProducts({
        search,
        currentPage,
        priceRange,
        category,
        ratingsfilter,
        toast,
      })
    );
    return () => {
      //hàm promise.abort() được sử dụng để hủy bỏ request lấy dữ liệu sản phẩm nếu component bị unmount trước khi request hoàn thành.
      promise.abort();
    };
  }, [dispatch, search, priceRange, ratingsfilter, category, currentPage]);

  useEffect(() => {
    if (filteredProductsCount && resultPerPage) {
      // làm tròn số đến số nguyên lớn nhất tiếp theo
      setHasMorepage(
        Math.ceil(filteredProductsCount / resultPerPage) > currentPage
      );
    }
  }, [filteredProductsCount, resultPerPage, currentPage]);

  // Search

  return (
    <Box className="wrapper">
      {/* Filter box */}
      <Box className="filter-box">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ alignItems: "center", display: "flex" }}>
              <FilterAltIcon />
              Filter Products
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="search-filter-box">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ display: "flex" }}>
                    Search products
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    type="text"
                    id="search"
                    label="Search"
                    name="search"
                    margin="normal"
                    fullWidth
                    value={search}
                    onChange={handleSearch}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box className="price-filter-box">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ alignItems: "center", display: "flex" }}>
                    By price
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Slider
                    value={priceRange}
                    min={minPrice}
                    step={1000}
                    max={maxPrice}
                    onChange={(e, newPriceRange) =>
                      priceHandler(e, newPriceRange)
                    }
                    valueLabelDisplay="on"
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box className="rating-filter-box">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ alignItems: "center", display: "flex" }}>
                    By ratings
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Slider
                    value={ratingsfilter}
                    min={0}
                    step={0.1}
                    max={5}
                    onChange={ratingHandler}
                    valueLabelDisplay="on"
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box className="category-filter-box">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ display: "flex" }}>
                    By categories
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton
                      key={0}
                      id={0}
                      selected={selectedIndex === 0}
                      onClick={(event) => handleListItemClick(event, 0, "")}
                    >
                      <ListItemText primary="All" />
                    </ListItemButton>
                    {categories &&
                      categories.map((cat, index) => (
                        <ListItemButton
                          key={cat._id}
                          id={cat._id}
                          selected={selectedIndex === index + 1}
                          onClick={(event) =>
                            handleListItemClick(event, index + 1, cat._id)
                          }
                        >
                          <ListItemText primary={cat.title} />
                        </ListItemButton>
                      ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
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
            products.map((product, index) =>
              products.length === index + 1 ? (
                <ProductCard
                  ref={lastElementRef}
                  product={product}
                  key={product._id}
                />
              ) : (
                <ProductCard product={product} key={product._id} />
              )
            )}
        </Box>

        {loading && (
          <Box className="card-container">
            {[...Array(8)].map((e, i) => (
              <ProductCatdSkeleton key={i} />
            ))}
          </Box>
        )}
        {/* Pagination */}
      </Box>
    </Box>
  );
};

export default Product;
