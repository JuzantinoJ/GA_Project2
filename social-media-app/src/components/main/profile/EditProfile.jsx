import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
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

const EditProfile = () => {
  const [formData, setFormData] = useState({
    avatar: dummyProfile.avatar,
    name: dummyProfile.name,
    bio: dummyProfile.bio,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/container/profile");
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
            <Avatar
              sx={{
                width: 100,
                height: 100,
              }}
              alt={formData.name}
              src={formData.avatar}
            />
            <h2>Edit Profile</h2>
            {/* Use TextField for editing the profile data */}
            <TextField
              label="Avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
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
              sx={{ mb: 2 }}
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

            {/* Success Modal */}
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
              <DialogTitle>Profile Updated Successfully!</DialogTitle>
              <DialogContent>
                Your profile has been updated successfully.
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditProfile;
