import React, { useState, useEffect } from "react";
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
import { supabase } from "../../../client";

const EditProfile = ({ token }) => {
  const [formData, setFormData] = useState({
    avatar: dummyProfile.avatar,
    name: "",
    bio: "",
  });

  const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showFilePicker, setShowFilePicker] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchUserData(token.user.id);
    }
  }, [token]);

  const fetchUserData = async (userId) => {
    try {
      let { data: users, error } = await supabase
        .from("users")
        .select("username, bio") // Select the username instead of "id"
        .eq("auth_uid", userId); // Use "auth_uid" instead of "id"

      if (error) {
        throw error;
      }

      console.log(users);
      if (users.length > 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: users[0].username,
          bio: users[0].bio,
        }));
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    // Prepare the data to be updated in the 'users' table
    const dataToUpdate = {
      username: formData.name,
      bio: formData.bio,
    };

    try {
      // Update the user data in the 'users' table
      const { data, error } = await supabase
        .from("users")
        .update(dataToUpdate)
        .eq("auth_uid", token.user.id);

      if (error) {
        throw error;
      }

      console.log("Updated user data:", data);
      setIsSuccessModalOpen(true); // Open the success modal
    } catch (error) {
      console.error("Error updating user data:", error.message);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate("/container/profile");
  };

  const handleFileUpload = () => {
    setIsImageUploadModalOpen(true);
    setShowFilePicker(true);
    console.log(showFilePicker);
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
