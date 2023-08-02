import React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom

const Notification = ({ notifications }) => {
  const navigate = useNavigate(); // Get the navigate function from the hook

  const handleCardClick = (notificationId) => {
    navigate(`/container/notifications/${notificationId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <div>
        <h2>Notifications</h2>
        {notifications.map((notification) => (
          <Paper
            key={notification.id}
            elevation={3}
            sx={{
              p: 2,
              mt: 2,
              backgroundColor: notification.isRead ? "#f0f0f0" : "#ffffff",
              cursor: "pointer",
            }}
            onClick={() => handleCardClick(notification.id)}
          >
            <strong>{notification.text}</strong>
            <p>{notification.timestamp}</p>
          </Paper>
        ))}
      </div>
    </Container>
  );
};

export default Notification;
