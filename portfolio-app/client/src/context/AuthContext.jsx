import React, { createContext, useState, useEffect } from "react";
import { me } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await me();
        setAuth({ isAuthenticated: true, user: response });
      } catch (error) {
        setAuth({ isAuthenticated: false, user: null });
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
