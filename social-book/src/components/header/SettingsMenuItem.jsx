import React from "react";
import MenuItem from "@mui/material/MenuItem";

const SettingsMenuItem = ({ onClick }) => (
  <>
    <MenuItem onClick={onClick}>Profile</MenuItem>
    <MenuItem onClick={onClick}>My Account</MenuItem>
  </>
);

export default SettingsMenuItem;
