"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "./Authcontent";
import { useAuth4 } from "./AuthContent4";
import { Sidebar } from "./account";
import Heading from "./Header";
import Footer from "./Footer";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 10 }, (_, i) => 2025 + i);

const colors = {
  bg: "#07091a",
  card: "#02030b",
  table: "#02030b",
  accent: "#0a0d44",
  accent2: "#4f46e5",
  text: "#e2e8f0",
  textLight: "#94a3b8",
  border: "#4b3f6e",
  green: "#4ade80",
};

function SelectBox({ value, onChange, children, style = {} }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        backgroundColor: colors.card,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        borderRadius: "10px",
        padding: "14px 46px 14px 18px",
        fontSize: "15px",
        cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 18px center",
        flex: 1,
        minWidth: "120px",
        ...style,
      }}
    >
      {children}
    </select>
  );
}

export default function TransactionHistory() {
  const { user } = useAuth();
  const { transactions, loading, fetchTransactions } = useAuth4();

  const [filterType, setFilterType] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const date = new Date(user.created_at);
  const today = new Date();

  const Lmonth = today.toLocaleString("en-US", { month: "short" });
  const Lday = today.toLocaleString("en-US", { day: "numeric" });
  const Lyear = today.toLocaleString("en-US", { year: "numeric" });
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.toLocaleString("en-US", { day: "numeric" });
  const year = date.toLocaleString("en-US", { year: "numeric" });

  const [from, setFrom] = useState({ m: month, d: day, y: year });
  const [to, setTo] = useState({ m: Lmonth, d: Lday, y: Lyear });

  const filteredTransactions = transactions.filter((tx) =>
    filterType === "all" ? true : tx.type.toLowerCase() === filterType
  );

  const totalAmount = filteredTransactions.reduce(
    (sum, tx) => sum + parseFloat(tx.amount || 0),
    0
  );

  // Simple mobile detection for hamburger + table scroll
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        backgroundColor: colors.bg,
        minHeight: "100vh",
        color: colors.text,
      }}
    >
      <Heading />

      {/* Hamburger - only visible on mobile */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 80"
        width="34"
        height="34"
        fill="#fff"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          cursor: "pointer",
          zIndex: 100,
          display: isMobile ? "block" : "none",
        }}
      >
        <rect width="100" height="20" rx="10" />
        <rect y="30" width="100" height="20" rx="10" />
        <rect y="60" width="100" height="20" rx="10" />
      </svg>

      <div style={{ display: "flex", minHeight: "calc(100vh - 80px)" }}>
        <Sidebar open={sidebarOpen} />

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: isMobile ? "20px 16px" : "40px 50px",
            overflow: "auto",
          }}
        >
          <h1
            style={{
              fontFamily: "Montserrat",
              fontSize: isMobile ? "26px" : "32px",
              fontWeight: "700",
              marginBottom: "32px",
            }}
          >
            Transaction History
          </h1>

          {/* FILTERS - Fully Responsive Flex */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              backgroundColor: colors.card,
              padding: "28px",
              borderRadius: "18px",
              marginBottom: "40px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
              alignItems: "flex-end",
            }}
          >
            {/* Type + Wallet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                flex: "1 1 280px",
              }}
            >
              <SelectBox
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Transactions</option>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="referral_bonus">Referral Bonus</option>
                <option value="mining_plan">Mining Plans</option>
              </SelectBox>

              <select
                style={{
                  backgroundColor: colors.card,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "10px",
                  padding: "14px 18px",
                  fontSize: "15px",
                  cursor: "pointer",
                  flex: 1,
                  minWidth: "120px",
                }}
              >
                <option value="">Choose Wallet</option>
                {Object.entries(user?.address || {})
                  .filter(([_, v]) => v)
                  .map(([key, value]) => (
                    <option key={key} value={value}>
                      {key.toUpperCase()}
                    </option>
                  ))}
              </select>
            </div>

            {/* Date Range - Flex that wraps */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "24px",
                flex: "2 1 400px",
              }}
            >
              <div style={{ flex: "1 1 200px" }}>
                <div
                  style={{
                    color: colors.textLight,
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  From
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <SelectBox
                    value={from.m}
                    onChange={(e) => setFrom({ ...from, m: e.target.value })}
                  >
                    {months.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </SelectBox>
                  <SelectBox
                    value={from.d}
                    onChange={(e) => setFrom({ ...from, d: +e.target.value })}
                  >
                    {days.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </SelectBox>
                  <SelectBox
                    value={from.y}
                    onChange={(e) => setFrom({ ...from, y: +e.target.value })}
                  >
                    {years.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </SelectBox>
                </div>
              </div>

              <div style={{ flex: "1 1 200px" }}>
                <div
                  style={{
                    color: colors.textLight,
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  To
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <SelectBox
                    value={to.m}
                    onChange={(e) => setTo({ ...to, m: e.target.value })}
                  >
                    {months.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </SelectBox>

                  <SelectBox
                    value={to.d}
                    onChange={(e) => setTo({ ...to, d: +e.target.value })}
                  >
                    {days.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </SelectBox>
                  <SelectBox
                    value={to.y}
                    onChange={(e) => setTo({ ...to, y: +e.target.value })}
                  >
                    {years.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </SelectBox>
                </div>
              </div>
            </div>

            {/* GO Button - Grows nicely */}
            <button
              onClick={() => fetchTransactions(1)}
              style={{
                background: `linear-gradient(to right, ${colors.accent}, ${colors.accent2})`,
                color: "white",
                border: "none",
                padding: "16px 48px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                flex: isMobile ? "1 1 100%" : "0 0 auto",
                minWidth: "140px",
              }}
            >
              GO
            </button>
          </div>

          {/* Table - Scrollable on small screens */}
          <div
            style={{
              backgroundColor: colors.table,
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: "860px",
                  borderCollapse: "collapse",
                }}
              >
                {/* Table content same as before */}
                <thead>
                  <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "24px 28px",
                        color: "#c4b5fd",
                        fontWeight: "600",
                      }}
                    >
                      TYPE
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "24px 28px",
                        color: "#c4b5fd",
                        fontWeight: "600",
                      }}
                    >
                      AMOUNT
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "24px 28px",
                        color: "#c4b5fd",
                        fontWeight: "600",
                      }}
                    >
                      DATE
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "24px 28px",
                        color: "#c4b5fd",
                        fontWeight: "600",
                      }}
                    >
                      DESCRIPTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        style={{ textAlign: "center", padding: "70px" }}
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : filteredTransactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        style={{ textAlign: "center", padding: "90px" }}
                      >
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((tx) => (
                      <tr
                        key={tx.id}
                        style={{
                          borderBottom: `1px solid ${colors.border}`,
                          backgroundColor:
                            hoveredRow === tx.id ? colors.hover : "transparent",
                        }}
                        onMouseEnter={() => setHoveredRow(tx.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td
                          style={{
                            padding: "22px 28px",
                            textTransform: "capitalize",
                          }}
                        >
                          {tx.type.replace("_", " ")}
                        </td>
                        <td
                          style={{
                            padding: "22px 28px",
                            textAlign: "right",
                            color: colors.green,
                            fontWeight: "600",
                          }}
                        >
                          +${parseFloat(tx.amount).toFixed(2)}
                        </td>
                        <td
                          style={{
                            padding: "22px 28px",
                            textAlign: "right",
                            color: colors.textLight,
                          }}
                        >
                          {new Date(tx.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td style={{ padding: "22px 28px" }}>
                          {tx.type === "mining_plan" ? tx.description : ""}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div
              style={{
                backgroundColor: "#07091a",

                padding: "26px 32px",
                display: "flex",
                justifyContent: "space-between",
                borderTop: `1px solid ${colors.border}`,
              }}
            >
              <span style={{ color: "#fff", fontSize: "18px" }}>Total</span>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: colors.green,
                }}
              >
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
