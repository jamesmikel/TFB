import Heading from "./Header";
import Footer from "./Footer";
import axios from "axios";

import { useToken } from "./TokenDetails";
import { useState } from "react";
import { useAuth3 } from "./AuthContent3";
import { useNavigate } from "react-router-dom";
const api_url = process.env.api_url;

const SubmitWithdrawal = async (data) => {
  const response = await axios.post(`${api_url}/api/miner/withdraw`, data, {
    withCredentials: true,
  });
  return response;
};

export default function ConfirmWithdrawal() {
  const [loading, setLoading] = useState(false);
  const { miningPlan } = useAuth3();
  const navigate = useNavigate();
  const { chosenWallet } = useToken();

  if (chosenWallet === null) {
    navigate("/account/withdraw");
    return null; // Prevent rendering if redirecting
  }
  if (!miningPlan) {
    alert("No Active Deposits Found");
    navigate("/account/withdraw");
    return null;
  }
  const [formData, setFormData] = useState({
    username: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username) {
      alert("Please Insert Your Username!");
      return;
    }

    setLoading(true);
    try {
      const response = await SubmitWithdrawal(formData);
      if (response.status === 200) {
        alert("Withdrawal request submitted successfully!");
        navigate("/account");
      }
    } catch (err) {
      console.log("Withdrawal error", err);
      if (err.response?.status === 500) {
        alert("Server error during deposit. Please try again.");
      } else {
        alert("Deposit failed.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    alert("Withdrawal cancelled");
    navigate("/account");
  };

  return (
    <div>
      <Heading />
      <h1 className="register-acct">Confirm Deposit</h1>
      <div
        className="confirmation"
        style={{ fontFamily: "Montserrat", color: "#fff" }}
      >
        <h2 style={{ textAlign: "center", margin: "0" }}>
          Confirm Your Withdrawal
        </h2>
        <p style={{ textAlign: "center" }}>
          You are about to withdraw funds to the following address:
        </p>
        <code
          style={{
            display: "block",
            padding: "10px",
            fontFamily: "Montserrat",
            backgroundColor: "#07091a",
            borderRadius: "4px",
            wordBreak: "break-all",
            textAlign: "center",
          }}
        >
          {chosenWallet}
        </code>
        <h3 style={{ color: "#02030b" }}>Withdrawal Details:</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <strong>Amount to Withdraw:</strong> $
            {parseFloat(miningPlan.totalBalance).toFixed(2)}
          </li>
          <li>
            <strong>Current Profit:</strong> $ $
            {parseFloat(miningPlan.currentProfit).toFixed(2)}
          </li>
          <li>
            <strong>Withdrawal Fee:</strong> 0.00%
          </li>
          <li>
            <strong>Net Amount to Receive:</strong>$
            {parseFloat(miningPlan.totalBalance).toFixed(2)}
          </li>
          <li>
            <strong>Processing Time:</strong> Instant (after confirmation)
          </li>
        </ul>

        <h3 style={{ color: "#02030b" }}>Transaction Summary:</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <strong>Requested Amount:</strong> $
            {parseFloat(miningPlan.totalBalance).toFixed(2)}
          </li>
          <li>
            <strong>Fee:</strong> $0.00
          </li>
          <li>
            <strong>Total Deducted:</strong>$
            {parseFloat(miningPlan.totalBalance).toFixed(2)}
          </li>
        </ul>

        <form
          onSubmit={handleSubmit}
          className="Signup-form"
          style={{ background: "none" }}
        >
          <table>
            <tr>
              <td>
                <strong style={{ color: "#02030b" }}>
                  Enter Username to confirm:
                </strong>
              </td>
              <td>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
          </table>
          <div style={{ paddingBottom: "18px" }}></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              onClick={handleCancel}
              className="button"
              style={{ color: "#fff" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#02030b", color: "#fff" }}
              className="button"
            >
              {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#d32f2f",
            fontSize: "14px",
          }}
        >
          ⚠️ This action cannot be undone. Funds will be sent to the wallet
          address above.
        </p>
      </div>
      <Footer />
    </div>
  );
}

