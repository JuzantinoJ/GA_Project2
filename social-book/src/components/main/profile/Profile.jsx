import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { supabase } from "../../../client";
import { dummyProfile } from "../../data/data";

const Profile = ({ token }) => {
  const theme = useTheme();
  const isWidth840pxOrLess = useMediaQuery(theme.breakpoints.down("md"));
  const [userData, setUserData] = useState({
    userName: "",
    userBio: null,
    userAvatar: null,
    dateOfBirth: null,
    company: null,
    jobTitle: null,
    email: null,
    contactNumber: null,
    address: null,
  });

  const fetchUserData = useCallback(async (userId) => {
    console.log(userId);
    try {
      let { data: users, error } = await supabase
        .from("profiles")
        .select(
          "username, bio, avatar_url, date_of_birth,company, job_title, contact_number, address, email"
        )
        .eq("id", userId);
      if (error) {
        throw error;
      }
      if (users.length > 0) {
        setUserData({
          userName: users[0].username,
          userBio: users[0].bio,
          userAvatar: String(users[0].avatar_url),
          dateOfBirth: users[0].date_of_birth,
          company: users[0].company,
          jobTitle: users[0].job_title,
          email: users[0].email,
          contactNumber: users[0].contact_number,
          address: users[0].address,
        });
      } else {
        setUserData({
          userName: null,
          userBio: null,
          userAvatar: null,
          dateOfBirth: null,
          company: null,
          jobTitle: null,
          email: null,
          contactNumber: null,
          address: null,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserData(token.user.id);
    }
  }, [token, fetchUserData]);

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
              position: "relative", // Relative positioning for the parent element
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
              }}
              alt={userData.userName || dummyProfile.name}
              src={userData.userAvatar || dummyProfile.avatar} // Use userAvatar if available, otherwise use dummyProfile.avatar
            />
            <Typography sx={{ marginTop: 5 }} variant="h3">
              {userData.userName}
            </Typography>
            <Typography
              sx={{ fontSize: "24px", marginTop: 5, marginBottom: 5 }}
              variant="body1"
            >
              {userData.userBio ? (
                userData.userBio
              ) : (
                <span style={{ fontStyle: "italic" }}>Create a bio</span>
              )}
            </Typography>
            <Button
              component={Link}
              to="/container/edit-profile" // Replace with the path to the edit profile page
              variant="outlined"
              sx={{
                position: isWidth840pxOrLess ? "relative" : "absolute",
                top: isWidth840pxOrLess ? "auto" : 8,
                right: isWidth840pxOrLess ? "auto" : 8,
                width: isWidth840pxOrLess ? "100%" : "auto",
                mt: isWidth840pxOrLess ? 2 : 0,
              }}
            >
              <EditIcon sx={{ marginRight: 1 }} />
              Edit Profile
            </Button>
          </Paper>
        </Grid>
        {/* User Details */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              User Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Name:</Typography>
                <Typography>{userData.userName || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Date of Birth:</Typography>
                <Typography>{userData.dateOfBirth || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Company:</Typography>
                <Typography>{userData.company || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Job Title:</Typography>
                <Typography>{userData.jobTitle || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Email:</Typography>
                <Typography>{userData.email || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Contact Number:</Typography>
                <Typography>{userData.contactNumber || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Address:</Typography>
                <Typography>{userData.address || "N/A"}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Outlet /> {/* Render child routes */}
    </Container>
  );
};

export default Profile;
