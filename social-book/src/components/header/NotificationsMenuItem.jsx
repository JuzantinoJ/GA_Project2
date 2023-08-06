import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const NotificationsMenuItem = ({ notification, onClick }) => (
  <MenuItem onClick={onClick}>
    <Typography variant="inherit">{`${notification.text}`}</Typography>
  </MenuItem>
);

export default NotificationsMenuItem;
