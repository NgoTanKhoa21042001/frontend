import { Skeleton } from "@mui/material";
import React from "react";

const HeadingWaveSkeleton = () => {
  return (
    <Skeleton
      variant="text"
      animation="wave"
      height="78px"
      width="98%"
      sx={{ m: "-15px 0 0 1%" }}
    ></Skeleton>
  );
};

export default HeadingWaveSkeleton;
