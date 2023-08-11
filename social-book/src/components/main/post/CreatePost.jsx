import React, { useState } from "react";
import { Paper, TextField, Button, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { supabase } from "../../../client"; // Import your Supabase client instance
import useAuth from "../../auth/useAuth";

const PostForm = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(4),
}));

const PostsContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  boxShadow: "5px 4px 10px rgba(0, 0, 0, 0.2)", // Adjust the shadow parameters as needed
}));

const CreatePost = ({ onPostAdded }) => {
  const [newPost, setNewPost] = useState("");
  const { token } = useAuth(); // Destructure the user from the useAuth hook

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleAddPost = async () => {
    if (newPost.trim()) {
      const userId = token.user.id; // Use user.id from the authenticated user
      const currentTimestamp = new Date().toISOString();

      const newPostObject = {
        user_id: userId,
        post_text: newPost,
        posted_at: currentTimestamp,
      };

      const { error } = await supabase.from("posts").insert([newPostObject]);

      if (error) {
        console.error("Error adding post:", error.message);
      } else {
        setNewPost("");
        onPostAdded(); // Call the callback function to notify Dashboard
      }
    }
  };

  return (
    <PostsContainer>
      <h2>Create a New Post</h2>
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

export default CreatePost;
