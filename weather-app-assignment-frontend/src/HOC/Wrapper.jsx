import React from "react";
import { Box } from "@mui/material";
import SideBar from "../components/SideBar";

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => (
    <Box sx={{ position: "relative",display:'flex' }}>
      <SideBar />
      <WrappedComponent   {...props} />
    </Box>
  );

  return hocComponent;
};
