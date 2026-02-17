import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "./Header";
import Footer from "./Footer";
import { useAuth } from "./Authcontent";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const api_url =process.env.REACT_APP_API_URL;

const Signup_user = async (data) => {
  const response = await axios.post(`${api_url}/signup`, data, {
    withCredentials: true, // If using auth cookies
  });
  return response; // return full response so we can check status
};

function Signup() {
  const { checkAuth } = useAuth();
  const navigate = useNavigate(); // Moved here – inside component

  const [passwordError, setPasswordError] = useState("");
  const [walletError, setWalletError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  // Get ?ref=miikel from URL
  const [referrer, setReferrer] = useState(null); // Will store user object from backend

  // Convert ref to an object for backend (simple key-value)
  const refCode = { ref };

  const getReferrer = async (refCode) => {
    try {
      const response = await axios.post(`${api_url}/referral`, refCode, {
        withCredentials: true, // If using auth cookies
      });
      return response.data; // Assume backend returns { user: { id, username, ... } }
    } catch (err) {
      console.error("Referral fetch error:", err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchReferrer = async () => {
      if (ref) {
        try {
          const data = await getReferrer(refCode);
          setReferrer(data.user); // Destructure user from response
        } catch (err) {
          setReferrer({ username: "n/a" }); // Fallback
        }
      } else {
        setReferrer({ username: "n/a" });
      }
    };

    fetchReferrer();
  }, [ref]);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    password2: "",
    email: "",
    agree: false,
    bitcoinWallet: "",
    ethWallet: "",
    usdtTRC20Wallet: "",
    tronWallet: "",
    bnbWallet: "",
    Referrer: referrer ? referrer?.username : null,
  });

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

      if (response.status === 201) {
        // SUCCESS → Redirect!
        await checkAuth();
        navigate("/profile");
        alert("Account created! Welcome!");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setServerError(
          err.response.data.error || "Username or email already exists"
        );
      } else {
        setServerError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Heading />
      <h1 className="register-acct">Register Account</h1>

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
              <td>Password</td>
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
              <td>Confirm Password</td>
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

            <tr>
              <td>Your Upline</td>
              {ref ? (
                <>
                  <td>
                    ({referrer?.username}) {referrer?.full_name}
                  </td>
                </>
              ) : (
                <>(n/a)</>
              )}
            </tr>
            {/* Terms checkbox */}
            <tr>
              <td></td>
              <td style={{ display: "flex", gap: "30px", width: "100%" }}>
                <input
                  style={{
                    marginLeft: "-45%",
                    height: "15px",
                    cursor: "pointer",
                  }}
                  type="checkbox"
                  name="agree"
                  required
                  checked={formData.agree}
                  onChange={handleChange}
                />
                <label style={{ margin: "0", marginLeft: "-43%" }}>
                  I agree to the{" "}
                  <Link to="/terms" style={{ color: "#1e26b6" }}>
                    terms and conditions
                  </Link>
                </label>
              </td>
            </tr>
          </tbody>

          {serverError && (
            <>
              <p
                style={{ color: "red", textAlign: "center", marginTop: "10px" }}
              >
                {serverError}
              </p>
            </>
          )}
        </table>
        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Submit"}
        </button>
      </form>

      <Footer />
    </div>
  );
}

export default Signup;



