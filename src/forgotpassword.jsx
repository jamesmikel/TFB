import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "./Header";
import Footer from "./Footer";
import "dotenv/config";
const api_url = process.env.api_url; // or ngrok/localhost:5000

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${api_url}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("If the email exists, a reset link has been sent.");
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Heading />
      <h1 className="register-acct">Password Reset</h1>

      {message && (
        <p
          className="text-green-400 text-center mb-4"
          style={{ textAlign: "center" }}
        >
          {message}
        </p>
      )}
      <p
        style={{
          width: "100%",
          textAlign: "center",
          fontFamily: "Montserrat",
          color: "#ffff",
        }}
      >
        Enter your email and we'll send you a link to reset your password.
      </p>
      <form onSubmit={handleSubmit} className="Signup-form">
        <table>
          <tbody>
            <tr>
              <td>Email Address: :</td>
              <td>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className=""
                />
              </td>
            </tr>
          </tbody>
          <div style={{ paddingBottom: "10px" }}></div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition ${
                loading
                  ? "bg-purple-800 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-purple-400 hover:underline"
            >
              Back to Login
            </button>
          </div>
        </table>
        {error && (
          <>
            {message && (
              <p
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                {message}
              </p>
            )}
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              {error}
            </p>
          </>
        )}
      </form>

      <div className="text-center mt-6"></div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
