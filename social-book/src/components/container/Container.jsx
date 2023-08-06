import React from "react";
import Header from "../header/Header";
import ToolBar from "../toolbar/ToolBar";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { dummyNotifications } from "../data/data";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const defaultTheme = createTheme();

const Container = ({ token, handleLogout }) => {
  const [notifications, setNotifications] = useState(dummyNotifications);

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleNotificationsUpdate = (updatedNotifications) => {
    setNotifications(updatedNotifications);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header
          dummyNotifications={notifications}
          handleNotificationsUpdate={handleNotificationsUpdate}
          open={open}
          toggleDrawer={toggleDrawer}
          handleLogout={handleLogout}
          token={token}
        />
        <ToolBar open={open} toggleDrawer={toggleDrawer} />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Container;
