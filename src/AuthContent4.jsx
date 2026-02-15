import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import "dotenv/config";

const AuthContext4 = createContext();
const api_url = process.env.api_url;

export const AuthProvider4 = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    total: 0,
    pages: 1,
  });

  // Fetch transactions
  const fetchTransactions = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${api_url}/api/transactions?page=${page}&limit=15`,
        {
          withCredentials: true,
        }
      );

      setTransactions(res.data.transactions || []);
      setPagination(
        res.data.pagination || {
          page: 1,
          limit: 15,
          total: 0,
          pages: 1,
        }
      );
      setError(null);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setError(err.response?.data?.error || "Failed to load transactions");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  // Auto fetch on mount
  useEffect(() => {
    fetchTransactions(1);
  }, []);

  return (
    <AuthContext4.Provider
      value={{
        transactions,
        loading,
        error,
        pagination,
        fetchTransactions, // Call this to refresh or change page
        refreshTransactions: () => fetchTransactions(pagination.page),
      }}
    >
      {children}
    </AuthContext4.Provider>
  );
};

// Custom hook
export const useAuth4 = () => {
  const context = useContext(AuthContext4);
  if (!context) {
    throw new Error("useAuth4 must be used within an AuthProvider4");
  }
  return context;
};
