import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import NotificationsMenuItem from "./NotificationsMenuItem";
import SettingsMenuItem from "./SettingsMenuItem";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = ({
  dummyNotifications,
  handleNotificationsUpdate,
  open,
  toggleDrawer,
  handleLogout,
  token,
}) => {
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElSettings, setAnchorElSettings] = useState(null);
  const navigate = useNavigate();

  const handleNotificationsClick = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleNotificationItemClick = (notificationId) => () => {
    const updatedNotifications = dummyNotifications.filter(
      (notification) => notification.id !== notificationId
    );
    handleNotificationsUpdate(updatedNotifications);
    setAnchorElNotifications(null);
    navigate("/container/notifications");
  };

  const handleSettingsClick = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElNotifications(null);
    setAnchorElSettings(null);
  };

  const navigateProfilePage = () => {
    navigate("/container/profile");
    handleCloseMenu();
  };

  const navigateAccountPage = () => {
    navigate("/container/account-page");
    handleCloseMenu();
  };

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Welcome Back {token.user.user_metadata.username}
        </Typography>
        <IconButton color="inherit" onClick={handleNotificationsClick}>
          <Badge badgeContent={dummyNotifications.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={handleSettingsClick}>
          <Badge color="secondary">
            <SettingsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={handleLogout}>
          <Badge color="secondary">
            <LogoutIcon />
          </Badge>
        </IconButton>
      </Toolbar>
      {/* Notifications Menu */}
      <Menu
        anchorEl={anchorElNotifications}
        open={Boolean(anchorElNotifications)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {dummyNotifications.map((notification) => (
          <NotificationsMenuItem
            key={notification.id}
            notification={notification}
            onClick={handleNotificationItemClick(notification.id)}
          />
        ))}
      </Menu>
      {/* Settings Menu */}
      <Menu
        anchorEl={anchorElSettings}
        open={Boolean(anchorElSettings)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <SettingsMenuItem
          handleProfile={navigateProfilePage}
          handleAccount={navigateAccountPage}
        />
      </Menu>
    </AppBar>
  );
};

export default Header;
