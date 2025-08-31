// client/src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = async (username, email, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      username,
      email,
      password,
    });
    return res.data;
  };

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
    return res.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage
export const useAuth = () => useContext(AuthContext);
