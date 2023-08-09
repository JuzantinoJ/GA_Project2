import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const AccountPage = () => {
  const [userData, setUserData] = useState({
    dateOfBirth: "",
    company: "",
    jobTitle: "",
    email: "",
    contactNumber: "",
    address: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any actions to save/update user data
    console.log("User data:", userData);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          value={userData.dateOfBirth}
          onChange={handleChange}
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
    </Container>
  );
};

export default AccountPage;
