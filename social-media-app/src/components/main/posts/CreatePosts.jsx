import React, { useState } from "react";
import { Paper, TextField, Button, Divider } from "@mui/material";
import { styled } from "@mui/material/styles"; // Import 'styled' from @mui/material/styles
import Title from "../Title";

const PostForm = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(4),
}));

const PostsContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Posts = ({ posts, setPosts }) => {
  const [newPost, setNewPost] = useState("");

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      setPosts([...posts, newPost]);
      setNewPost("");
    }
  };

  return (
    <PostsContainer>
      <Title>Create a New Post</Title>
      <PostForm>
        <TextField
          sx={{ flexGrow: 1, marginRight: (theme) => theme.spacing(2) }}
          label="Write your post..."
          variant="outlined"
          value={newPost}
          onChange={handlePostChange}
        />
        <Button variant="contained" color="primary" onClick={handleAddPost}>
          Post
        </Button>
      </PostForm>
      <Divider />
    </PostsContainer>
  );
};

export default Posts;
