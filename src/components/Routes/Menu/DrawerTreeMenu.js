import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import TreeMenu from "./TreeMenu";
const DrawerTreeMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton onClick={() => setOpen(true)} sx={{ color: "#fff" }}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Box sx={{ background: "#88acbc", height: "100vh", width: "60vw" }}>
          <TreeMenu />
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default DrawerTreeMenu;
