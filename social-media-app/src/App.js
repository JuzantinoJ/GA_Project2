import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SignInSide from "./components/sign-in/Signin";
import SignUp from "./components/sign-up/Signup";
import Dashboard from "./components/dashboard/Dashboard";

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

  return (
    <div className="container">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignInSide setToken={setToken} />} />
        {token ? (
          <Route path="/homepage" element={<Dashboard token={token} />} />
        ) : (
          <Route path="/signup" element={<SignUp />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
