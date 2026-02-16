import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Heading from "./Header";
import Footer from "./Footer";

function ResetPassword() {
  const api_url =process.env.REACT_APP_API_URL ;
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      alert("No assigned password reset token.");
      navigate("/");
    }
  }, [token]);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 14) errors.push("• At least 14 characters");
    if (!/[A-Z]/.test(password)) errors.push("• One uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("• One lowercase letter");
    if (!/\d/.test(password)) errors.push("• One number");
    if (!/[!@#$%^&*()_+=\-[\]{}|;':\",./<>?]/.test(password))
      errors.push("• One special character");
    if (!/@/.test(password)) errors.push("• Must contain @ symbol");

    setPasswordError(
      errors.length > 0 ? errors.join(" | ") : "Strong password!"
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassword(value);
    if (name === "password2") setConfirmPassword(value);

    if (name === "password") validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!passwordError.includes("Strong")) {
      setError("Please complete password requirements!");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${api_url}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.error || "Failed to reset password.");
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
      <h1 className="register-acct">Reset Password</h1>

      <div>
        {message && (
          <p
            className="text-green-400 text-center mb-4"
            style={{ textAlign: "center" }}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="Signup-form">
          <table>
            <tbody>
              <tr>
                <td>New password</td>
                <td>
                  <input
                    type="password"
                    name="password"
                    value={newPassword}
                    required
                    onChange={handleChange}
                    style={{
                      border:
                        passwordError && !passwordError.includes("Strong")
                          ? "2px solid #e74c3c"
                          : passwordError.includes("Strong")
                          ? "2px solid #2ecc71"
                          : "1px solid #ccc",
                    }}
                  />
                  {passwordError && (
                    <div
                      style={{
                        marginTop: "10px",
                        padding: "12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        backgroundColor: passwordError.includes("Strong")
                          ? "rgba(46, 204, 113, 0.1)"
                          : "rgba(231, 76, 60, 0.1)",
                        color: passwordError.includes("Strong")
                          ? "#2ecc71"
                          : "#e74c3c",
                        border: `1px solid ${
                          passwordError.includes("Strong")
                            ? "#2ecc71"
                            : "#e74c3c"
                        }`,
                      }}
                    >
                      {passwordError}
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td>Confirm Password</td>
                <td>
                  <input
                    type="password"
                    name="password2"
                    value={confirmPassword}
                    required
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>

            {error && (
              <>
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
          </table>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-purple-400 hover:underline"
            style={{
              width: "40%",
            }}
          >
            Back to Login
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default ResetPassword;


