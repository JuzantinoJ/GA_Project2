export const dummyNotifications = [
  {
    id: 1,
    type: "follow",
    text: "John Doe started following you.",
    timestamp: "2023-07-31T12:30:00Z",
    isRead: false,
  },
  {
    id: 2,
    type: "like",
    text: "Jane Smith liked your post.",
    timestamp: "2023-07-30T19:45:00Z",
    isRead: true,
  },
  {
    id: 3,
    type: "comment",
    text: "Alex Johnson commented on your photo.",
    timestamp: "2023-07-29T09:15:00Z",
    isRead: false,
  },
  {
    id: 4,
    type: "mention",
    text: "You were mentioned in a post by Mike Williams.",
    timestamp: "2023-07-28T15:20:00Z",
    isRead: false,
  },
  {
    id: 5,
    type: "message",
    text: "You have a new direct message from Emily Brown.",
    timestamp: "2023-07-27T22:05:00Z",
    isRead: true,
  },
];

export const dummyProfile = {
  avatar:
    "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=826", // Replace with the URL of the user's avatar image
  name: "", // Replace with the user's name
  bio: "My life, my choice", // Replace with the user's bio
};

export const friendsData = [
  {
    id: 1,
    name: "John Doe",
    avatar: require("../images/avatar/johndoe.jpg"),
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: require("../images/avatar/janesmith.jpg"),
  },
  {
    id: 3,
    name: "Michael Johnson",
    avatar: require("../images/avatar/michealjohnson.jpg"),
  },
  {
    id: 4,
    name: "Michael Jackson",
    avatar: require("../images/avatar/michealjackson.jpg"),
  },
  {
    id: 5,
    name: "Kelly Clarkson",
    avatar: require("../images/avatar/kellyclarkson.jpg"),
  },
  // Add more friends here
];

export const dummyUserPosts = [
  {
    id: 1,
    user: "John Doe",
    content: "Having a great time coding!",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    content: "Exploring new places!",
    timestamp: "1 day ago",
  },
  // Add more dummy posts as needed
];
