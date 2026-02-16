import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Heading from "./Header";
import Footer from "./Footer";
import axios from "axios";

import { useAuth } from "./Authcontent";
const api_url =process.env.REACT_APP_API_URL ;
export default function Login() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(""); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ONLY ONE login request
      const response = await axios.post(`${api_url}/login`, formData, {
        withCredentials: true, // Sends/receives cookies
      });

      if (response.status === 200) {
        // Success → refresh auth state (this sends GET /account)
        await checkAuth();

        alert("Login successful! Welcome back!");
        navigate("/account");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid username or password");
      } else if (err.response?.status === 500) {
        setError("Server error – please try again or contact support");
      } else if (err.response?.status === 403) {
        setError("Too many attempts. Please try later");
      } else {
        setError("Something went wrong. Please try again later.");
      }
      console.error("Login error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Heading />
      <h1 className="member-login">Member Login</h1>

      <div className="L-container">
        <form className="login" onSubmit={handleSubmit}>
          <img src="https://i.imgur.com/JTU1ZJ0.png" alt="Logo" />

          <table>
            <tbody>
              <tr>
                <td>Username:</td>
                <td>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {error && (
            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
              {error}
            </p>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>

          <div className="existing-user">
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}


