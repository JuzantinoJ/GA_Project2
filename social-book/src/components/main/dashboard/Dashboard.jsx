import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CreatePost from "../post/CreatePost";
import PostList from "../post/PostList";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../client";

const Dashboard = ({ token }) => {
  const [userData, setUserData] = useState({
    avatar: "",
    name: "",
    bio: "",
  });

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
        setUserData({
          avatar: users[0].avatar_url,
          name: users[0].username,
          bio: users[0].bio,
        });
      } else {
        setUserData({
          avatar: null,
          name: null,
          bio: null,
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
      <h2>Dashboard</h2>
      <Grid container spacing={2}>
        {/* First Grid: User Info */}
        <Grid item xs={12} md={3} sx={{ mt: 2, mb: 4 }}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Avatar
                alt="User Avatar"
                src={userData.avatar}
                sx={{ width: 200, height: 200 }}
              />
            </Grid>
            <Grid item sx={{ marginLeft: "40px", whiteSpace: "nowrap" }}>
              <Typography variant="h4">{userData.name}</Typography>
              <Typography variant="body3">{userData.bio}</Typography>
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
