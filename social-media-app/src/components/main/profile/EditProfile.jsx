import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { dummyProfile } from "../../data/data";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Stack } from "@mui/material";
import AvatarWithIcon from "./Avatar";
import ImageUploadModal from "./modal/ImageUploadModal";

const EditProfile = ({ token }) => {
  const [formData, setFormData] = useState({
    avatar: dummyProfile.avatar,
    name: token.user.user_metadata.name,
    password: "",
    bio: "",
  });

  const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showFilePicker, setShowFilePicker] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Update the dummyProfile data with the form data
    dummyProfile.avatar = formData.avatar;
    dummyProfile.name = formData.name;
    dummyProfile.bio = formData.bio;
    // You can also save the data to a backend server here if needed.
    setIsSuccessModalOpen(true); // Open the success modal
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate("/container/profile");
  };

  const handleFileUpload = () => {
    setIsImageUploadModalOpen(true);
    setShowFilePicker(true);
  };

  const handleImageUpload = (file) => {
    // Handle the file upload here, e.g., upload it to the server or save it in state.
    // setUploadedImage(file);
    console.log("file uploaded");
    setIsImageUploadModalOpen(false); // Close the image upload modal
    setIsSuccessModalOpen(true); // Open the success modal
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Info */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <AvatarWithIcon
              src={formData.avatar}
              alt={formData.name}
              onUpload={handleFileUpload}
            />
            <h2>Edit Profile</h2>
            <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                variant="outlined"
                multiline
                fullWidth
                rows={4}
              />
              <TextField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              {/* Save Changes Button */}
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveChanges}
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </Stack>

            {/* Success Modal */}
            <Dialog open={isSuccessModalOpen} onClose={handleCloseSuccessModal}>
              <DialogTitle>Profile Updated Successfully!</DialogTitle>
              <DialogContent>
                Your profile has been updated successfully.
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseSuccessModal} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Grid>
      </Grid>
      <ImageUploadModal
        open={isImageUploadModalOpen}
        onClose={() => setShowFilePicker(false)}
        onUpload={handleImageUpload}
      />
    </Container>
  );
};

export default EditProfile;
