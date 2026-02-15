// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

import axios from "axios";
import "dotenv/config";
const api_url = process.env.api_url;
const AuthContext3 = createContext();

export const AuthProvider3 = ({ children }) => {
  const [confirm, setConfirmed] = useState(null);
  const [miningPlan, setMiningPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const checkConfirmed = async () => {
    try {
      const response = await axios.get(`${api_url}/confirm-deposit`, {
        withCredentials: true, // sends the httpOnly cookie
      });

      if (response.status === 200) {
        setConfirmed(true);

        return;
      }
    } catch (err) {
      setConfirmed(false);
    }
  };

  useEffect(() => {
    checkConfirmed();
  }, []);
  const fetchMiningPlan = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api_url}/api/miner/status`, {
        withCredentials: true, // ← Sends httpOnly cookie (auth_token)
      });

      if (res.status === 200) {
        setMiningPlan(res.data); // ← This contains all your miner status
        setError(null);
      }
    } catch (err) {
      setMiningPlan(null);
      setError(err.response?.data?.error || "Failed to load mining status");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch when component mounts
  useEffect(() => {
    fetchMiningPlan();

    // Optional: Refresh every 8 seconds (good for live mining updates)
    const interval = setInterval(fetchMiningPlan, 20000);
    return () => clearInterval(interval);
  }, []);
  return (
    <AuthContext3.Provider value={{ confirm, miningPlan, loading, error }}>
      {children}
    </AuthContext3.Provider>
  );
};

export const useAuth3 = () => useContext(AuthContext3);
