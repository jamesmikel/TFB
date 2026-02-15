import React, { useState, useEffect, createContext, useContext } from "react";
import Heading from "./Header";
import Footer from "./Footer";
import { useToken } from "./TokenDetails";
import { useAuth2 } from "./AuthContent2";
import { useAuth3 } from "./AuthContent3";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./account";

const plans = [
  {
    name: "4% AFTER 1 HOURS",
    name2: "4% After 1 hour",
    min: 30,
    max: 100,
    Percent: 0.04,
    Time: 3600 * 1000,
    profit: 4,
  },
  {
    name: "10% AFTER 6 HOURS",
    name2: "10% After 6 hours",
    min: 100,
    max: 1000,
    Percent: 0.1,
    Time: 3600 * 6000,
    profit: 10,
  },
  {
    name: "20% AFTER 12 HOURS",
    name2: "20% After 12 hours",
    min: 1000,
    max: 10000,
    Percent: 0.2,
    Time: 3600 * 12000,
    profit: 20,
  },
  {
    name: "20% AFTER 18 HOURS",
    name2: "20% After 18 hours",
    min: 10000,
    max: 100000,
    Percent: 0.2,
    Time: 3600 * 18000,
    profit: 20,
  },
  {
    name: "40% AFTER 24 HOURS",
    name2: "40% After 24 hours",
    min: 50000,
    max: 100000,
    Percent: 0.4,
    Time: 3600 * 24000,
    profit: 40,
  },
  {
    name: "20% AFTER 1 HOURS",
    name2: "20% After 1 hour",
    min: 1000,
    max: 10000,
    Percent: 0.2,
    Time: 3600 * 1000,
    profit: 20,
  },
];

export default function Deposit() {
  const { selectedPlan, setSelectedPlan } = useToken();
  const { amount, setAmount } = useToken();
  const [calculatedProfit, setCalculatedProfit] = useState(null);
  const { selectedWallet, setSelectedWallet } = useToken();
  const [canSubmit, setCanSubmit] = useState(false);
  const { admin } = useAuth2();
  const { miningPlan } = useAuth3();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCalculatedProfit(null); // Reset calculation
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!selectedPlan || !amount) return;
    const deposit = parseFloat(amount);
    if (deposit < selectedPlan.min || deposit > selectedPlan.max) {
      alert(
        `Amount must be between $${selectedPlan.min} and $${selectedPlan.max}`
      );
      return;
    }

    const profit = deposit * (selectedPlan.profit / 100);

    setCalculatedProfit(profit);
    alert(`Estimated Profit: $${profit.toFixed(2)}`);
  };

  const handleWalletChange = (e) => {
    const value = e.target.value;
    if (value === "Bitcoin") {
      setSelectedWallet(admin?.bitcoin_address);
      return;
    } else if (value === "Ethereum") {
      setSelectedWallet(admin?.ethereum_address);
      return;
    } else if (value === "usdt") {
      setSelectedWallet(admin?.usdt_trc20_address);
      return;
    } else if (value === "bnb") {
      setSelectedWallet(admin?.bnb_address);
      return;
    } else if (value === "tron") {
      setSelectedWallet(admin?.tron_address);
      return;
    }

    return;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (miningPlan?.totalBalance !== undefined) {
      alert("Please Allow Current Mining Operation to conclude.");
      navigate("/account");
      return;
    } else if (miningPlan?.profitComplete === true) {
      alert("Please Withdraw Current deposit.");
      navigate("/account");
      return;
    }
    if (!amount) {
      alert("Please insert an amount to deposit.");
      setCanSubmit(false);
      return;
    }

    const deposit = parseFloat(amount);
    if (deposit < selectedPlan.min || deposit > selectedPlan.max) {
      alert(
        `Amount must be between $${selectedPlan.min} and $${selectedPlan.max}`
      );
      setCanSubmit(false);
      return;
    }
    setCanSubmit(true);

    if (!selectedWallet) {
      alert("Please select a wallet to proceed.");
      return;
    }
    navigate("/confirmation");
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
        <Sidebar open={sidebarOpen} /> <div className="dashboard">Deposit</div>
      </div>
      <div className="make-deposit">
        <h1 className="">Make a Deposit</h1>

        <div>
          <p className="deposit-p">Select Plan and Make a Deposit</p>

          {/* Plans Grid */}
          <div className="deposit-div">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                  selectedPlan?.name === plan.name
                    ? "border-purple-600 bg-purple-900/30 shadow-lg shadow-purple-500/20"
                    : "border-gray-700 bg-gray-800/50 hover:border-purple-500 hover:bg-purple-900/20"
                }`}
              >
                <div className="deposit-plans">
                  <input
                    type="checkbox"
                    value={plan}
                    checked={selectedPlan === plan}
                    onChange={() => handlePlanSelect(plan)}
                  />
                  <h3 className="text-xl font-bold text-center mb-4 text-purple-300">
                    {plan.name}
                  </h3>
                  <div className="text-center space-y-2">
                    <p className="text-gray-300">
                      <span className="font-semibold">Amount:</span> $
                      {plan.min.toLocaleString()} - ${plan.max.toLocaleString()}
                    </p>
                    <p className="text-2xl font-extrabold text-green-400">
                      {plan.profit.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Amount Input & Calculate */}
          {selectedPlan && (
            <>
              <form
                className="Signup-form"
                style={{
                  borderRadius: "20px",
                  maxWidth: "80%",
                  marginTop: "30px",
                }}
              >
                <table>
                  <tbody>
                    <tr>
                      <td className="block text-lg font-medium text-gray-300 mb-3">
                        Amount to Deposit ($)
                      </td>

                      <td>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white text-lg focus:outline-none focus:border-purple-600"
                          required
                        />
                      </td>
                    </tr>
                    <button
                      onClick={handleCalculate}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                        amount
                          ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Calculate Your Profit
                    </button>
                  </tbody>
                </table>
              </form>
              <div className="proceed-form">
                <div>
                  <select
                    name="type"
                    id="wallet-select"
                    onChange={handleWalletChange}
                    className="select"
                    required
                    class="select"
                  >
                    <option value="">Select Wallet</option>
                    <option value="Bitcoin">Bitcoin</option>
                    <option value="Ethereum">Ethereum</option>
                    <option value="bnb">BNB</option>
                    <option value="usdt">USDT-TRON</option>
                    <option value="tron">Tron</option>
                  </select>
                </div>
                <div>
                  <button className="proceed-btn" onClick={handleSubmit}>
                    Proceed
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Balance Display */}
          <div
            className="mt-10 text-center text-gray-400"
            style={{ color: "#fff" }}
          >
            <p className="text-lg">Your account balance ($):</p>
            <p className="text-3xl font-bold text-white mt-2">
              ${parseFloat(miningPlan?.totalBalance).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
