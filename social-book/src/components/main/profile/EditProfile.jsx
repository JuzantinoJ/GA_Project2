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
        .from("users")
        .select("username, bio, avatar_url")
        .eq("auth_uid", userId);
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

  const handleSaveChanges = async () => {
    const dataToUpdate = {
      username: formData.name,
      bio: formData.bio,
    };

    try {
      const { data, error } = await supabase
        .from("users")
        .update(dataToUpdate)
        .eq("auth_uid", token.user.id);

      if (error) {
        throw error;
      }

      console.log("Updated user data:", data);

      if (imageUploaded) {
        const storagePath = `avatar/${token.user.id}`;

        try {
          // List existing files in the storagePath
          const { data: existingFiles, error: existingFilesError } =
            await supabase.storage.from("images").list(storagePath);

          if (existingFilesError) {
            throw existingFilesError;
          }

          if (existingFiles && existingFiles.length > 0) {
            // Delete the previous image if it exists
            const prevImageFilename = existingFiles[0].name;
            console.log("Previous image filename:", prevImageFilename);

            // Delete the previous image
            const { data: deleteData, error: deleteError } =
              await supabase.storage
                .from("images")
                .remove([`${storagePath}/${prevImageFilename}`]);

            if (deleteError) {
              throw deleteError;
            }

            console.log("Previous image deleted:", deleteData);
          }

          // Upload the new image
          const { data: uploadData, error: uploadError } =
            await supabase.storage
              .from("images")
              .upload(`${storagePath}/${uploadedFileName}`, uploadAvatar);

          if (uploadError) {
            throw uploadError;
          }

          console.log("Image uploaded to storage:", uploadData);

          // https://bkrvcsfzycqmoqwgaxeh.supabase.co/storage/v1/object/public/images/avatar/ea2be061-5702-4bf0-8837-d07adb29e692/avatar.png
          // Construct the public URL of the uploaded image
          const imageUrl = `https://bkrvcsfzycqmoqwgaxeh.supabase.co/storage/v1/object/public/images/${storagePath}/${uploadedFileName}`;

          // Update the user's record with the image URL
          const { data: updateUserData, error: updateUserError } =
            await supabase
              .from("users")
              .update({ avatar_url: imageUrl })
              .eq("auth_uid", token.user.id);

          if (updateUserError) {
            throw updateUserError;
          }

          console.log("User data updated with image URL:", updateUserData);
        } catch (existingFilesError) {
          console.error(
            "Error fetching existing files:",
            existingFilesError.message
          );
        }
      }

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
