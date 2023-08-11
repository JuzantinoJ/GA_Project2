import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { friendsData } from "../../data/data";
import { useNavigate } from "react-router-dom";

export default function GroupAvatars() {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    // You can navigate to the friends list with the friendId
    navigate("/container/friends-list");
  };

  return (
    <AvatarGroup max={4} sx={{ marginTop: "20px" }}>
      {friendsData.map((friend) => {
        return (
          <Avatar
            alt={friend.name}
            src={friend.avatar}
            onClick={handleAvatarClick}
          />
        );
      })}
    </AvatarGroup>
  );
}
