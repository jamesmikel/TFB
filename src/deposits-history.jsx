// src/pages/DepositHistory.jsx
import React from "react";
import Footer from "./Footer";
import Heading from "./Header";

import { useState } from "react";
import { useAuth3 } from "./AuthContent3"; // ← Your context
import { Sidebar } from "./account";

export default function DepositHistory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  const { miningPlan } = useAuth3(); // Get mining status from context

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

  // Find active plan
  const activePlan = plans.find((plan) => {
    const userPercent = parseFloat(miningPlan?.proposedpercent / 100 || 0);
    return Math.abs(userPercent - plan.Percent) < 0.001;
  });

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
        onClick={toggleSidebar} // Add your toggleSidebar logic
        style={{ marginTop: "", cursor: "pointer" }}
      >
        <rect width="100" height="20" rx="10" />
        <rect y="30" width="100" height="20" rx="10" />
        <rect y="60" width="100" height="20" rx="10" />
      </svg>

      <div className="dashboard-ctn" style={{ display: "flex" }}>
        <Sidebar open={sidebarOpen} />
        <div className="dashboard">Deposits</div>
      </div>

      <div style={{ paddingBottom: "20px" }}></div>

      <div className="deposit-div" style={{ marginTop: "20px" }}>
        {plans.map((plan, index) => {
          const isActive = activePlan && activePlan.name === plan.name;

          return (
            <div
              key={index}
              className="deposit-plans"
              style={{ position: "relative" }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "10px",
                    background: "#4CAF50",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  ACTIVE
                </div>
              )}

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
                <p>(N/a)</p>
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
