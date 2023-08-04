import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Notification from "./notification/Notification";
import Profile from "./profile/Profile";
import Dashboard from "@mui/icons-material/Dashboard";
import EditProfile from "./profile/EditProfile";
import Photo from "./photoalbum/Photo";
import FriendsList from "./friendlist/FriendsList";

const Main = () => {
  return (
    <div>
      <h2>Main Component Content</h2>
      <nav>
        <ul>
          <li>
            <Link to="dashboard">DashBoard</Link>
          </li>
          <li>
            <Link to="notifications">Notification</Link>
          </li>
          <li>
            <Link to="profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="notifications" element={<Notification />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="photo-album" element={<Photo />} />
        <Route path="friends-list" element={<FriendsList />} />
      </Routes>
    </div>
  );
};

export default Main;
