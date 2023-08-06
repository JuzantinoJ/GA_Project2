import React from "react";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
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
      {posts.map((post, index) => (
        <Paper className={classes.post} key={index}>
          <ListItem>
            <ListItemText primary={post} className={classes.postContent} />
          </ListItem>
        </Paper>
      ))}
    </List>
  );
};

export default PostList;
