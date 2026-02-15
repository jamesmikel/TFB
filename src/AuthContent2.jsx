// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

import axios from "axios";
const api_url = process.env.api_url;
const AuthContext2 = createContext();

export const AuthProvider2 = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${api_url}/admin`, {
        withCredentials: true, // sends the httpOnly cookie
      });

      if (response.status === 200) {
        setAdmin(response.data.user);
        return;
      }
    } catch (err) {
      setAdmin(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthContext2.Provider value={{ admin, checkAuth }}>
      {children}
    </AuthContext2.Provider>
  );
};

export const useAuth2 = () => useContext(AuthContext2);

