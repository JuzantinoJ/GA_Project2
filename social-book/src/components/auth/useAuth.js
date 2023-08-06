import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
const useAuth = () => {
  const [token, setToken] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    // Check if token is present in sessionStorage
    const storedToken = JSON.parse(sessionStorage.getItem("token"));
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveTokenToSessionStorage = (token) => {
    sessionStorage.setItem("token", JSON.stringify(token));
    setToken(token);
  };

  const clearTokenFromSessionStorage = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return { token, saveTokenToSessionStorage, clearTokenFromSessionStorage };
};

export default useAuth;
