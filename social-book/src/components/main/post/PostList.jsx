import React from "react";
import { List, ListItem, ListItemText, Paper, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles"; // Import 'styled' from @mui/material/styles
import { dummyUserPosts } from "../../data/data";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = styled((theme) => ({
  post: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: "#f0f2f5", // Custom background color for posts
    display: "flex", // Make the post container a flex container
    alignItems: "flex-start", // Align items (posts) to the top
  },
  postContent: {
    flexGrow: 1, // Allow the post content to take up the remaining space
    textAlign: "left", // Align the text to the left
  },
}));

const PostList = ({ posts }) => {
  const classes = useStyles();

  return (
    <List>
      {dummyUserPosts.map((post, index) => (
        <Paper className={classes.post} key={index}>
          <ListItem sx={{ mt: 4 }}>
            <ListItemText
              primary={post.content}
              secondary={post.user + " • " + post.timestamp}
              className={classes.postContent}
            />
            {/* Delete Icon */}
            <IconButton>
              <CommentIcon />
            </IconButton>
            {/* Heart Icon */}
            <IconButton>
              <FavoriteIcon />
            </IconButton>
            {/* Delete Icon */}
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
};

export default PostList;
