import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Stack } from "@mui/material";
import AvatarWithIcon from "./AvatarWithIcon";
import ImageUploadModal from "./modal/ImageUploadModal";
import { supabase } from "../../../client";

const EditProfile = ({ token }) => {
  const [formData, setFormData] = useState({
    avatar: "",
    name: "",
    bio: "",
  });

  const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [displayAvatar, setDisplayAvatar] = useState(null); // For displaying as an avatar
  const [uploadAvatar, setUploadAvatar] = useState(null); // For uploading to Supabase

  const navigate = useNavigate();

  const fetchUserData = useCallback(async (userId) => {
    try {
      let { data: users, error } = await supabase
        .from("profiles")
        .select("username, bio, avatar_url")
        .eq("id", userId);
      if (error) {
        throw error;
      }
      if (users.length > 0) {
        setFormData({
          avatar: users[0].avatar_url,
          name: users[0].username,
          bio: users[0].bio,
        });
      } else {
        setFormData({
          avatar: null,
          name: null,
          bio: null,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageUpload = (file, filename) => {
    setDisplayAvatar(URL.createObjectURL(file)); // Create temporary URL for display
    setUploadAvatar(file); // Store the actual File object for upload

    // Replace invalid characters and spaces with underscores
    const sanitizedFileName = String(filename)
      .replace(/[^a-zA-Z0-9_. ]/g, "")
      .replace(/\s+/g, "_");
    setIsImageUploadModalOpen(false);
    setUploadedFileName(sanitizedFileName);
    setImageUploaded(true);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const dataToUpdate = {
      id: token.user.id,
      username: formData.name,
      bio: formData.bio,
    };

    try {
      const { data, error } = await supabase
        .from("profiles")
        .upsert(dataToUpdate);

      if (error) {
        throw error;
      }

      console.log("Updated user data:", data);

      if (imageUploaded) {
        const storagePath = `${token.user.id}`;

        try {
          const { data: existingFiles, error: existingFilesError } =
            await supabase.storage.from("avatars").list(storagePath);

          if (existingFilesError) {
            throw existingFilesError;
          }
          // Delete previous image avatars
          if (existingFiles && existingFiles.length > 0) {
            const prevImageFilename = existingFiles[0].name;
            console.log("Previous image filename:", prevImageFilename);

            const { data: deleteData, error: deleteError } =
              await supabase.storage
                .from("avatars")
                .remove([`${storagePath}/${prevImageFilename}`]);

            if (deleteError) {
              throw deleteError;
            }

            console.log("Previous image deleted:", deleteData);
          }

          // Upload new image avatar
          const { data: uploadData, error: uploadError } =
            await supabase.storage
              .from("avatars")
              .upload(`${storagePath}/${uploadedFileName}`, uploadAvatar);

          if (uploadError) {
            throw uploadError;
          }

          console.log("Image uploaded to storage:", uploadData);

          const imageUrl = `https://bkrvcsfzycqmoqwgaxeh.supabase.co/storage/v1/object/public/avatars/${storagePath}/${uploadedFileName}`;

          dataToUpdate.avatar_url = imageUrl;
        } catch (existingFilesError) {
          console.error(
            "Error fetching existing files:",
            existingFilesError.message
          );
        }
      }

      const { data: updateUserData, error: updateUserError } = await supabase
        .from("profiles")
        .upsert(dataToUpdate);

      if (updateUserError) {
        throw updateUserError;
      }

      console.log("User data updated with image URL:", updateUserData);

      setIsSuccessModalOpen(true);
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
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token.user.id);
    }
  }, [token, fetchUserData]);

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Grid container spacing={3}>
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
              displayAvatar={displayAvatar || formData.avatar} // Use displayAvatar if available, otherwise use formData.avatar
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
        isOpen={isImageUploadModalOpen}
        onClose={() => setIsImageUploadModalOpen(false)}
        onImageUpload={handleImageUpload}
      />
    </Container>
  );
};

export default EditProfile;
