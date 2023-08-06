import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import SignIn from "./components/signin/Signin";
import SignUp from "./components/signup/Signup";
import Notification from "./components/main/notification/Notification";
import Dashboard from "./components/main/dashboard/Dashboard";
import Profile from "./components/main/profile/Profile";
import EditProfile from "./components/main/profile/EditProfile";
import Container from "./components/container/Container";
import { dummyNotifications } from "./components/data/data";
import Photo from "./components/main/photoalbum/Photo";
import FriendsList from "./components/main/friendlist/FriendsList";
import useAuth from "./components/auth/useAuth";

function App() {
  const { token, saveTokenToSessionStorage, clearTokenFromSessionStorage } =
    useAuth();

  useEffect(() => {
    if (token) {
      saveTokenToSessionStorage(token);
    }
  }, [token, saveTokenToSessionStorage]);

  console.log(token);
  return (
    <div className="container">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={<SignIn setToken={saveTokenToSessionStorage} />}
        />
        {token ? (
          <>
            <Route
              path="/container"
              element={
                <Container
                  token={token}
                  handleLogout={clearTokenFromSessionStorage}
                />
              }
            >
              <Route
                path="notifications"
                element={<Notification notifications={dummyNotifications} />}
              />
              <Route path="profile" element={<Profile token={token} />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="edit-profile"
                element={<EditProfile token={token} />}
              />
              <Route path="photo-album" element={<Photo />} />
              <Route path="friends-list" element={<FriendsList />} />
            </Route>
          </>
        ) : (
          <Route path="/signup" element={<SignUp />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
