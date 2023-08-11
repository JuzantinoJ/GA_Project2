import { List, ListItem, ListItemText, Paper, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";

const PostContainer = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  backgroundColor: "#f0f2f5", // Custom background color for posts
  display: "flex", // Make the post container a flex container
  alignItems: "flex-start", // Align items (posts) to the top
}));

const PostList = ({ posts, deletePost }) => {
  return (
    <List>
      {posts.map((post) => (
        <PostContainer key={post.id}>
          <ListItem sx={{ mt: 2 }}>
            <ListItemText
              primary={post.post_text}
              secondary={new Date(post.posted_at).toLocaleString()}
              sx={{ flexGrow: 1, textAlign: "left" }}
            />
            {/* Comment Icon */}
            <IconButton>
              <CommentIcon />
            </IconButton>
            {/* Heart Icon */}
            <IconButton>
              <FavoriteIcon />
            </IconButton>
            {/* Delete Icon */}
            <IconButton onClick={() => deletePost(post.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </PostContainer>
      ))}
    </List>
  );
};

export default PostList;
