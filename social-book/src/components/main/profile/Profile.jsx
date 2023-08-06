import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { dummyProfile } from "../../data/data";
import Typography from "@mui/material/Typography";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { IconButton } from "@mui/material";
import { supabase } from "../../../client";
import { useState, useEffect } from "react";

const Profile = ({ token }) => {
  const theme = useTheme();
  const isWidth840pxOrLess = useMediaQuery(theme.breakpoints.down("md"));
  const [userName, setUserName] = useState(null);
  const [userBio, setUserBio] = useState(null);

  useEffect(() => {
    if (token) {
      fetchUserData(token.user.id);
      console.log(token.user.id);
    }
  }, [token]);

  const fetchUserData = async (userId) => {
    console.log("User ID:", userId);
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
        setUserName(users[0].username); // Set the username directly from the response
        setUserBio(users[0].bio);
      } else {
        setUserName(null); // If the user is not found, set username to null
        setUserBio(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
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
              position: "relative", // Relative positioning for the parent element
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
              }}
              alt={dummyProfile.name}
              src={dummyProfile.avatar}
            />
            <Typography sx={{ marginTop: 5 }} variant="h3">
              {userName}
            </Typography>
            <Typography
              sx={{ fontSize: "24px", marginTop: 5, marginBottom: 5 }}
              variant="body1"
            >
              {userBio ? (
                userBio
              ) : (
                <span style={{ fontStyle: "italic" }}>Create a bio</span>
              )}
              <IconButton
                component={Link}
                to="/container/edit-profile"
                size="small"
                sx={{ marginBottom: "10px" }}
              >
                <BorderColorIcon />
              </IconButton>
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
      </Grid>
      <Outlet /> {/* Render child routes */}
    </Container>
  );
};

export default Profile;
