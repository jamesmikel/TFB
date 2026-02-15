import Heading from "./Header";
import Footer from "./Footer";
import axios from "axios";
import "dotenv/config";

import { useToken } from "./TokenDetails";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const api_url = process.env.api_url;

const SubmitDeposit = async (data) => {
  const response = await axios.post(`${api_url}/deposit`, data, {
    withCredentials: true,
  });
  return response;
};

export default function ConfirmDeposit() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { selectedWallet, selectedPlan, amount } = useToken();

  if (selectedPlan === null) {
    navigate("/account/deposit");
    return null; // Prevent rendering if redirecting
  }

  const [formData, setFormData] = useState({
    username: "",
    DepositAmount: amount,
    ProposedTime: selectedPlan.Time,
    ProposedPercent: selectedPlan.Percent,
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
      const response = await SubmitDeposit(formData);
      if (response.status === 200) {
        alert("Deposit Saved");
        navigate("/account");
      }
    } catch (err) {
      console.log("Deposit error", err);
      if (err.response?.status === 409) {
        alert(err.response.data.error);
      } else if (err.response?.status === 500) {
        alert("Server error during deposit. Please try again.");
      } else {
        alert("Deposit failed.");
      }
    } finally {
      setLoading(false);
    }
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
          Confirm Your Deposit
        </h2>
        <p style={{ textAlign: "center" }}>
          Copy the Wallet Address Below and Proceed with Your Deposit:
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
          {selectedWallet}
        </code>

        <h3 style={{ color: "#02030b" }}>Investment Details:</h3>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <strong>Plan: </strong>
            {selectedPlan.name}
          </li>
          <li>
            <strong>Expected Profit Return: </strong> {selectedPlan.name2}
          </li>
          <li>
            <strong>Principal Amount Return: </strong> Included
          </li>
          <li>
            <strong>Withdrawal: </strong> Available with 0.00% Fee
          </li>
        </ul>

        <h3 style={{ color: "#02030b" }}>Transaction Summary:</h3>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <strong>Credit Amount: </strong> ${amount}.00
          </li>
          <li>
            <strong>Deposit Fee:</strong> 0.00% + $0.00 (Minimum: $0.00)
          </li>
          <li>
            <strong>Debit Amount: </strong> ${amount}.00
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
                <strong style={{ color: "#02030b" }}>Your Username:</strong>
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
              onClick={() => navigate("/account/deposit")}
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
              {loading ? "Processing..." : "Proceed"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
