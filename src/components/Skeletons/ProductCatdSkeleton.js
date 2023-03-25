import { Box, Card, Skeleton } from "@mui/material";
import React from "react";

const ProductCatdSkeleton = () => {
  return (
    <Box className="productCard">
      <Card sx={{ minHeight: "365px" }} className="box-shadow">
        <Skeleton variant="rectangular" width="100%" animation="wave">
          <Box sx={{ pt: "140px" }}></Box>
        </Skeleton>
        <Box sx={{ p: 1 }}>
          <Skeleton width="100%" animation="wave" height={60}></Skeleton>
          <Skeleton
            width="70%"
            animation="wave"
            height={35}
            sx={{ m: "0 auto" }}
          ></Skeleton>
          <Skeleton
            width="70%"
            animation="wave"
            height={35}
            sx={{ m: "0 auto" }}
          ></Skeleton>
          <Skeleton width="100%" animation="wave" height={35}></Skeleton>
          <Skeleton width="100%" animation="wave" height={35}></Skeleton>
        </Box>
      </Card>
      <Skeleton
        width="100%"
        animation="wave"
        height={60}
        sx={{ m: "0 auto", mt: "2" }}
      ></Skeleton>
    </Box>
  );
};

export default ProductCatdSkeleton;
