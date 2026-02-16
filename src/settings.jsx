import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "./Header";
import Footer from "./Footer";
import { useAuth } from "./Authcontent";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Sidebar } from "./account";

const api_url =process.env.REACT_APP_API_URL;

const Signup_user = async (data) => {
  const response = await axios.post(`${api_url}/edit-account`, data, {
    withCredentials: true, // If using auth cookies
  });
  return response; // return full response so we can check status
};

function Edit_Account() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  // Moved here – inside component
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    password2: "",
    email: "",
    bitcoinWallet: "",
    ethWallet: "",
    usdtTRC20Wallet: "",
    tronWallet: "",
    bnbWallet: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [walletError, setWalletError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

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

  const validateWallet = (value, chain) => {
    if (!value || !value.trim()) {
      setWalletError("");
      return true;
    }

    const trimmed = value.trim();

    if (chain === "bitcoin") {
      const btcRegex = /^(bc1q|[13])[a-zA-HJ-NP-Z1-9]{25,62}$/i;
      if (!btcRegex.test(trimmed)) {
        setWalletError("Invalid Bitcoin address (use 1..., 3..., or bc1...)");
        return false;
      }
    } else if (chain === "eth" || chain === "bnb") {
      const ethRegex = /^0x[a-fA-F0-9]{40}$/i;
      if (!ethRegex.test(trimmed)) {
        setWalletError(
          `${chain.toUpperCase()} address must be 42 chars starting with 0x`
        );
        return false;
      }
    } else if (chain === "usdt" || chain === "tron") {
      const tronRegex = /^T[a-zA-HJ-NP-Z1-9]{33}$/i;
      if (!tronRegex.test(trimmed)) {
        setWalletError(
          "TRON/USDT address must start with T and be 34 characters"
        );
        return false;
      }
    }

    setWalletError("Valid address");
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    const walletInfo = {
      bitcoinWallet: "bitcoin",
      ethWallet: "eth",
      usdtTRC20Wallet: "usdt",
      tronWallet: "tron",
      bnbWallet: "bnb",
    };

    const chain = walletInfo[name];
    if (chain) validateWallet(value, chain);
    if (name === "password") validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (localStorage.getItem("cookieConsent") !== "accepted") {
      alert("Please accept cookies to continue.");
      return;
    }
    // Password match
    if (formData.password !== formData.password2) {
      alert("Passwords do not match!");
      return;
    }

    // Password strength
    if (!passwordError.includes("Strong")) {
      alert("Please meet password requirements.");
      return;
    }

    // Wallet validation
    const validWallets = [
      { value: formData.bitcoinWallet, chain: "bitcoin" },
      { value: formData.ethWallet, chain: "eth" },
      { value: formData.usdtTRC20Wallet, chain: "usdt" },
      { value: formData.tronWallet, chain: "tron" },
      { value: formData.bnbWallet, chain: "bnb" },
    ];

    const hasAtLeastOne = validWallets.some((w) => w.value.trim() !== "");
    if (!hasAtLeastOne) {
      alert("Please enter at least one wallet address");
      return;
    }

    const allValid = validWallets.every(
      (w) => !w.value.trim() || validateWallet(w.value.trim(), w.chain)
    );
    if (!allValid) {
      alert("Please fix the invalid wallet address");
      return;
    }

    // Prepare data
    const submitData = { ...formData };
    delete submitData.password2;
    delete submitData.agree;

    setLoading(true);

    try {
      const response = await Signup_user(submitData);

      if (response.status === 200) {
        // SUCCESS → Redirect!

        navigate("/account");
        alert("Account Successfully Edited!");
      }
    } catch (err) {
      if (err.response?.status) {
        setServerError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Heading />
      <svg
        className="hamburger"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 80"
        width="30"
        height="30"
        fill="#ffff"
        onClick={toggleSidebar}
        style={{ marginTop: "", cursor: " pointer" }}
      >
        <rect width="100" height="20" rx="10" />
        <rect y="30" width="100" height="20" rx="10" />
        <rect y="60" width="100" height="20" rx="10" />
      </svg>
      <div className="dashboard-ctn" style={{ display: "flex" }}>
        <Sidebar open={sidebarOpen} />{" "}
        <div className="dashboard">Edit Account</div>
      </div>
      <div style={{ paddingBottom: "20px" }}> </div>

      <form onSubmit={handleSubmit} className="Signup-form">
        <div className="form-inner">
          Please make sure that you use a valid e-mail address. We strongly
          recommend you to use @gmail.com service to work with our website.
        </div>

        <table>
          <tbody>
            <tr>
              <td>FullName</td>
              <td>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  required
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>UserName</td>
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
              <td>New password</td>
              <td>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
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
                        passwordError.includes("Strong") ? "#2ecc71" : "#e74c3c"
                      }`,
                    }}
                  >
                    {passwordError}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>Confirm New Password</td>
              <td>
                <input
                  type="password"
                  name="password2"
                  value={formData.password2}
                  required
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Your Bitcoin INSERT WALLET ::</td>
              <td>
                <input
                  type="text"
                  name="bitcoinWallet"
                  value={formData.bitcoinWallet}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Your ETH INSERT WALLET ::</td>
              <td>
                <input
                  type="text"
                  name="ethWallet"
                  value={formData.ethWallet}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Your USDT TRC-20 INSERT WALLET::</td>
              <td>
                <input
                  type="text"
                  name="usdtTRC20Wallet"
                  value={formData.usdtTRC20Wallet}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Your TRON INSERT WALLET ::</td>
              <td>
                <input
                  type="text"
                  name="tronWallet"
                  value={formData.tronWallet}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Your BNB INSERT WALLET ::</td>
              <td>
                <input
                  type="text"
                  name="bnbWallet"
                  value={formData.bnbWallet}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Email</td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                />
                {walletError && (
                  <div
                    style={{
                      margin: "10px 0",
                      padding: "10px",
                      background: walletError.includes("Valid")
                        ? "#d4edda"
                        : "#f8d7da",
                      color: walletError.includes("Valid")
                        ? "#155724"
                        : "#721c24",
                      borderRadius: "6px",
                    }}
                  >
                    {walletError}
                  </div>
                )}
              </td>
            </tr>
          </tbody>

          {serverError && (
            <>
              <p
                style={{
                  color: "black",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                {serverError}
              </p>
            </>
          )}
        </table>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <Footer />
    </div>
  );
}

export default Edit_Account;


