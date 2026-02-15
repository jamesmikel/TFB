// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "dotenv/config";
const api_url = process.env.api_url;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [ip, setIP] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Check if user is logged in (by hitting a protected endpoint)
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${api_url}/account`, {
        withCredentials: true, // sends the httpOnly cookie
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setIP(response.data.ip);

        setUser(response.data.user);
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await axios.post(`${api_url}/logout`, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, ip, loading, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
