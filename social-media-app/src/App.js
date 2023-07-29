import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SignInSide from "./components/sign-in/Signin";
import SignUp from "./components/sign-up/Signup";
import Notification from "./components/main/notification/Notification";
import Dashboard from "./components/main/dashboard/Dashboard";
import Profile from "./components/main/profile/Profile";
import EditProfile from "./components/main/profile/EditProfile";
import Container from "./components/container/Container";

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  console.log(token);
  return (
    <div className="container">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignInSide setToken={setToken} />} />
        {token ? (
          <>
            <Route path="/container" element={<Container token={token} />}>
              <Route path="notifications" element={<Notification />} />
              <Route path="profile" element={<Profile />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="edit-profile" element={<EditProfile />} />
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
