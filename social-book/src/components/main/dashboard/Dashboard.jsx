import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CreatePost from "../post/CreatePost";
import PostList from "../post/PostList";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../client";
import GroupAvatars from "../friendlist/GroupAvatar";

const Dashboard = ({ token }) => {
  const [userData, setUserData] = useState({
    avatar: "",
    name: "",
    bio: "",
  });
  // const [photoAlbum, setPhotoAlbum] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

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

  const fetchUserPosts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("id, post_text, posted_at")
        .eq("user_id", token.user.id)
        .order("posted_at", { ascending: false });

      if (error) {
        console.error("Error fetching user posts:", error.message);
      } else {
        setUserPosts(data);
        // console.log("User Posts:", data); // Log the
      }
    } catch (error) {
      console.error("Error fetching user posts:", error.message);
    }
  }, [token.user.id]);

  const handlePostAdded = () => {
    fetchUserPosts(); // Call this function to fetch updated posts
  };

  const deletePost = async (postId) => {
    try {
      console.log("Deleting post with ID:", postId);
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId.toString());

      if (error) {
        console.error("Error deleting post:", error.message);
      } else {
        // Refresh user posts by re-fetching
        fetchUserPosts();
      }
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token.user.id);
      fetchUserPosts();
    }
  }, [token, fetchUserData, fetchUserPosts]);

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <h2>Dashboard</h2>
      <Grid container spacing={2}>
        {/* First Grid: User Info */}
        <Grid item xs={12} md={3} sx={{ mt: 2, mb: 4 }}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <Avatar
                alt="User Avatar"
                src={userData.avatar}
                sx={{
                  width: 200,
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              />
            </Grid>
            <Grid item sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
              <Typography variant="h4">{userData.name}</Typography>
              <Typography variant="body3">{userData.bio}</Typography>
            </Grid>
            <GroupAvatars />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={10}
          sx={{ textAlign: "center", marginBottom: "10px" }}
        >
          <Grid item xs={12} sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
            <CreatePost onPostAdded={handlePostAdded} />
          </Grid>
        </Grid>

        {/* Third Grid: User Posts */}
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <PostList posts={userPosts} deletePost={deletePost} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
