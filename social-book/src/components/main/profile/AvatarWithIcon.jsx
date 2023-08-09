import React from "react";
import Avatar from "@mui/material/Avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";

const useStyles = styled((theme) => ({
  avatarContainer: {
    position: "relative",
    display: "inline-block",
  },
  icon: {
    position: "absolute",
    bottom: theme.spacing(0),
    right: theme.spacing(0),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: "50%",
    border: `2px solid ${theme.palette.common.white}`,
    fontSize: "24px",
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const AvatarWithIcon = ({ displayAvatar, alt, onUpload }) => {
  const classes = useStyles();

  const handleImageUpload = () => {
    onUpload();
  };

  return (
    <div className={classes.avatarContainer}>
      <Avatar
        sx={{
          width: 100,
          height: 100,
        }}
        alt={alt}
        src={displayAvatar} // Use the displayAvatar prop to show the uploaded image
      />
      <CameraAltIcon className={classes.icon} onClick={handleImageUpload} />
    </div>
  );
};

export default AvatarWithIcon;
