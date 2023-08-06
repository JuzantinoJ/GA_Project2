import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import LayersIcon from "@mui/icons-material/Layers";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

export const MainListItems = () => {
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleDashboardClick = () => {
    navigate("/container/dashboard"); // Redirect to the dashboard page
  };

  const handleNotificationsClick = () => {
    navigate("/container/notifications"); // Redirect to the notifications page
  };

  const handleFriendsClick = () => {
    navigate("/container/friends-list"); // Redirect to the friends page
  };

  const handleProfileClick = () => {
    navigate("/container/profile"); // Redirect to the reports page
  };

  const handlePhotoClick = () => {
    navigate("/container/photo-album"); // Redirect to the integrations page
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleDashboardClick}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={handleProfileClick}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      <ListItemButton onClick={handleNotificationsClick}>
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText primary="Notification" />
      </ListItemButton>
      <ListItemButton onClick={handleFriendsClick}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Friends" />
      </ListItemButton>
      <ListItemButton onClick={handlePhotoClick}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Photo" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default MainListItems;
