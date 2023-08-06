import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Photo = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
        event.target.value = ""; // Clear the file input
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <h2>Photo Album</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "20px" }}
      />
      <Grid container spacing={2}>
        {images.map((imageUrl, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                alt="Uploaded"
                onClick={() => handleImageClick(imageUrl)}
                style={{ cursor: "pointer" }}
              />
              <CardActions>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteImage(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Modal for displaying expanded photo */}
      <Dialog
        open={Boolean(selectedImage)}
        onClose={handleCloseModal}
        TransitionComponent={Slide}
        keepMounted
      >
        <DialogTitle>Expanded Photo</DialogTitle>
        <DialogContent>
          <img src={selectedImage} alt="Expanded" style={{ width: "100%" }} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Photo;
