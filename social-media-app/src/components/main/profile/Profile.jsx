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

const Profile = () => {
  const theme = useTheme();
  const isWidth840pxOrLess = useMediaQuery(theme.breakpoints.down("md"));

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
              {dummyProfile.name}
            </Typography>
            <Typography sx={{ marginTop: 5, marginBottom: 5 }} variant="body1">
              {dummyProfile.bio}
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
