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
  const [userName, setUserName] = useState(null);
  const [userBio, setUserBio] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

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
        setUserName(users[0].username);
        setUserBio(users[0].bio);
        setUserAvatar(String(users[0].avatar_url));
      } else {
        setUserName(null);
        setUserBio(null);
        setUserAvatar(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  }, []);

  console.log(userAvatar);

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
              alt={userName || dummyProfile.name}
              src={userAvatar || dummyProfile.avatar} // Use userAvatar if available, otherwise use dummyProfile.avatar
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
