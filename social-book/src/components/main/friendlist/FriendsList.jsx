import React from "react";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { friendsData } from "../../data/data";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Link } from "react-router-dom";

const FriendsList = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <h2>Friends List</h2>
      <List>
        {friendsData.map((friend) => (
          <Link
            to={`/friend/${friend.id}`}
            key={friend.id}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ mt: 2 }}>
              <CardActionArea>
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <Avatar alt={friend.name} sx={{ bgcolor: "#f50057" }}>
                      {friend.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={friend.name}
                    primaryTypographyProps={{ variant: "subtitle1" }}
                    sx={{ marginLeft: 10 }}
                  />
                </ListItem>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </List>
    </Container>
  );
};

export default FriendsList;
