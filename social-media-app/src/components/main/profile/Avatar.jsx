import React from "react";
import Avatar from "@mui/material/Avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
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
    fontSize: "24px", // Adjust the fontSize to resize the icon
    cursor: "pointer", // Add the cursor property to make it a hand cursor on hover
    "&:hover": {
      cursor: "pointer", // Show hand cursor on hover
    },
  },
}));

const AvatarWithIcon = ({ src, alt, onUpload }) => {
  const classes = useStyles();

  const handleImageUpload = () => {
    onUpload(); // Call the onUpload function from props
  };
  return (
    <div className={classes.avatarContainer}>
      <Avatar
        sx={{
          width: 100,
          height: 100,
        }}
        alt={alt}
        src={src}
      />
      <CameraAltIcon className={classes.icon} onClick={handleImageUpload} />
    </div>
  );
};

export default AvatarWithIcon;
