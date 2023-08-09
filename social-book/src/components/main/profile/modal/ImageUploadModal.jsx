import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";

const ImageUploadModal = ({ isOpen, onClose, onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(""); // State to store selected file name

  const handleImageSelection = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setSelectedFileName(file.name); // Store the selected file name
    console.log(file.name);
  };

  const handleUpload = () => {
    if (selectedImage) {
      // Pass the actual file object and the filename to onImageUpload
      onImageUpload(selectedImage, selectedFileName);
      setSelectedImage(null);
      setSelectedFileName("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Upload Image</DialogTitle>
      <DialogContent>
        <input type="file" accept="image/*" onChange={handleImageSelection} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpload}>Upload</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageUploadModal;
