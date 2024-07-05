import { Box, Divider, List, ListItem } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
const SideBar = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "#618bcb",
          width: "200px",
          borderTopRightRadius: "30px",
          borderBottomRightRadius: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 111,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <List>
            <ListItem
              onClick={() => localStorage.setItem("heading", "Dashboard")}
            >
              <NavLink
                to={`/home`}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                Dashboard
              </NavLink>
            </ListItem>
            <Divider
              sx={{ width: "90%", margin: "0 auto", backgroundColor: "white" }}
            />
            <ListItem
              onClick={() => localStorage.setItem("heading", "Favourite")}
            >
              <NavLink
                to="/favourite"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                Favourite
              </NavLink>
            </ListItem>
            <Divider
              sx={{ width: "90%", margin: "0 auto", backgroundColor: "white" }}
            />
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
