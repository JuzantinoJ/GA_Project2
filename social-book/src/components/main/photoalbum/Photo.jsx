import React, { useState, useEffect, useRef, useCallback } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent"; // Import DialogContent
import DialogActions from "@mui/material/DialogActions"; // Import DialogActions
import DialogTitle from "@mui/material/DialogTitle"; // Import DialogTitle
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { supabase } from "../../../client"; // Import your Supabase client instance
import { v4 as uuidv4 } from "uuid"; // Import UUID library

const CDNURL =
  "https://bkrvcsfzycqmoqwgaxeh.supabase.co/storage/v1/object/public/photo_album/";

const Photo = ({ token }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const uuid = uuidv4(); // Generate a unique UUID
        const folderName = token.user.id; // Use user ID as folder name

        // Upload image to photo_album storage bucket
        const { data, error } = await supabase.storage
          .from("photo_album")
          .upload(`${folderName}/${uuid}`, file);

        if (error) {
          console.error("Error uploading image:", error.message);
          return;
        }

        // Get the image URL
        const imageUrl = data;

        // Update state with the new image URL
        setImages((prevImages) => [...prevImages, imageUrl]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        alert("There's an error uploading you image. Please try again.");
        console.error("Error handling image upload:", error.message);
      }
    }
  };

  const fetchImages = useCallback(
    async (userID) => {
      try {
        const folderName = token.user.id; // Use user ID as folder name

        // Fetch list of objects in the storage bucket
        const { data, error } = await supabase.storage
          .from("photo_album")
          .list(`${folderName}/`, {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
          });

        if (data !== null) {
          setImages(data);
        } else {
          console.log(error);
        }

        if (error) {
          console.error("Error fetching images:", error.message);
          return;
        }
        // console.log(images);
        //https://bkrvcsfzycqmoqwgaxeh.supabase.co/storage/v1/object/public/photo_album/3566ae3c-bd6f-47fe-9164-af1e4105d2c3/d70e4d2e-1e7e-4bdf-9a08-738b3543f599
        // console.log(data);
      } catch (error) {
        console.error("Error fetching images:", error.message);
      }
    },
    [token.user.id]
  );

  // Rest of your component code

  const handleDeleteImage = async (imageName) => {
    setImageToDelete(imageName);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setImageToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (imageToDelete) {
      const { error } = await supabase.storage
        .from("photo_album")
        .remove([token.user.id + "/" + imageToDelete]);

      if (error) {
        alert(error);
      } else {
        fetchImages();
      }

      setImageToDelete(null);
      setDeleteConfirmationOpen(false);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (token) {
      fetchImages(token.user.id);
    }
  }, [token, images, fetchImages]);
  // console.log(images);
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <h2>Photo Album</h2>
      <Typography variant="body1">Please select an image to upload:</Typography>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "20px" }}
        ref={fileInputRef}
      />

      {/* Display images from storage */}
      {/* to get an image: CDNURL + user.id + "/" + "image.name" */}
      <Grid container spacing={2}>
        {images.map((imageUrl) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={CDNURL + token.user.id + "/" + imageUrl.name}
          >
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={CDNURL + token.user.id + "/" + imageUrl.name}
                alt="Uploaded"
                onClick={() =>
                  handleImageClick(CDNURL + token.user.id + "/" + imageUrl.name)
                }
                style={{ cursor: "pointer" }}
              />
              <CardActions>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteImage(imageUrl.name)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
              {/* Delete Confirmation Dialog */}
              <Dialog
                open={deleteConfirmationOpen}
                onClose={handleDeleteConfirmationClose}
              >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                  Are you sure you want to delete this image?
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleDeleteConfirmationClose}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleConfirmDelete} color="primary">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
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
        {/* <DialogTitle>Expanded Photo</DialogTitle> */}
        <DialogContent>
          <img src={selectedImage} alt="Expanded" style={{ width: "100%" }} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Photo;
