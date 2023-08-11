import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { supabase } from "../../../client";
import { useNavigate } from "react-router-dom";

const AccountPage = ({ token }) => {
  const [userData, setUserData] = useState({
    dateOfBirth: "",
    company: "",
    jobTitle: "",
    email: "",
    contactNumber: "",
    address: "",
  });
  const [isDateInputFocused, setIsDateInputFocused] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleDateInputFocus = () => {
    setIsDateInputFocused(true);
  };

  const handleDateInputBlur = () => {
    setIsDateInputFocused(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    navigate("/container/profile");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updateData = {
      id: token.user.id,
    };

    if (userData.dateOfBirth) {
      updateData.date_of_birth = userData.dateOfBirth;
    }
    if (userData.company) {
      updateData.company = userData.company;
    }
    if (userData.jobTitle) {
      updateData.job_title = userData.jobTitle;
    }
    if (userData.contactNumber) {
      updateData.contact_number = userData.contactNumber;
    }
    if (userData.email) {
      updateData.email = userData.email;
    }
    if (userData.address) {
      updateData.address = userData.address;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .upsert([updateData]);

      if (error) {
        throw error;
      }

      setIsDialogOpen(true);
      console.log("Updated user profile data:", data);
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Date of Birth"
          type={isDateInputFocused ? "date" : "text"}
          value={userData.dateOfBirth}
          onChange={handleChange}
          onFocus={handleDateInputFocus}
          onBlur={handleDateInputBlur}
          name="dateOfBirth"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Company"
          name="company"
          value={userData.company}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Job Title"
          name="jobTitle"
          value={userData.jobTitle}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          value={userData.contactNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={userData.address}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
          <a href="/change-password">Change Password</a>
        </Typography>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Profile Updated"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your profile has been successfully updated.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AccountPage;
