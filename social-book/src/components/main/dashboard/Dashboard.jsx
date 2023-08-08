import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CreatePost from "../post/CreatePost";
import PostList from "../post/PostList";

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <h2>Dashboard</h2>
      <Grid container spacing={2}>
        {/* First Grid: User Info */}
        <Grid item xs={12} md={3} sx={{ mt: 2, mb: 4 }}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Avatar
                alt="User Avatar"
                src="/user-avatar.jpg"
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h4">John Doe</Typography>
              <Typography variant="body3">Software Developer</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <CreatePost />
          </Grid>
        </Grid>

        {/* Third Grid: User Posts */}
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <PostList />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
