import React from "react";
import MenuItem from "@mui/material/MenuItem";

const SettingsMenuItem = ({ handleAccount, handleProfile }) => (
  <>
    <MenuItem onClick={handleProfile}>Profile</MenuItem>
    <MenuItem onClick={handleAccount}>My Account</MenuItem>
  </>
);

export default SettingsMenuItem;
