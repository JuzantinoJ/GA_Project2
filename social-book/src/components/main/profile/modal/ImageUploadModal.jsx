import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
// import ImageIcon from "@mui/icons-material/Image";

const useStyles = styled((theme) => ({
  modalContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  addIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ImageUploadModal = ({ open, onClose, onUpload }) => {
  const classes = useStyles();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically trigger a click on the hidden input
  };

  const handleFileChange = (event) => {
    // Handle file selection here, and pass the file to the onUpload function
    const selectedFile = event.target.files[0];
    onUpload(selectedFile);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.modalContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick} // Trigger the file picker dialog
        >
          <AddIcon className={classes.addIcon} />
          Upload Image
        </Button>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          ref={fileInputRef} // Reference to the hidden input element
        />
      </div>
    </Modal>
  );
};

export default ImageUploadModal;
