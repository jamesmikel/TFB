import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "./TokenDetails";

import { usePrices } from "./calculator";

const tabs = [{ id: "memes", label: "Memes", category: "memes" }];

function TopMovers({ children }) {
  const [activeTab, setActiveTab] = useState("memes");
  const [Users, setUsers] = useState([]);
  const [token, setToken] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const { mergedData } = usePrices();
  const { selectedToken, setSelectedToken } = useToken();
  const [none, setNone] = useState("");
  const navigate = useNavigate();
  const windows = window.location.href;

  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      if (windows.includes("/topmovers")) {
        setShowAll(!showAll);
        setNone("none");
      }

      try {
        const data = await mergedData.sort(
          (a, b) => b.current_price - a.current_price
        );

        setUsers(data); // reset on tab change
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
    const interval = setInterval(fetchTokens, 60000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const currentTab = tabs.find((t) => t.id === activeTab);
  console.log("SortedInvestors:", Users);
  const visibleUsers = showAll ? Users : Users.slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4 border-b border-gray-800">
        <h1 className="populartokens">Top Movers</h1>
      </div>
      {/* Tabs */}
      <div className="tabs-t">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 px-4 text-lg font-medium ${
              activeTab === tab.id
                ? "text-cyan-400 border-b-4 border-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <p className="subtitle">
        {currentTab.category
          ? `Top ${currentTab.label} Crypto Earners (profit +  % gain)`
          : "Top movers by 24h gain"}
      </p>
      {loading ? (
        <p className="text-center mt-10">Loading movers...</p>
      ) : (
        <div className="tokens">
          {visibleUsers.map((users, index) => (
            <div
              onClick={() => {
                navigate("/investors");
                setSelectedToken(users);
              }}
              key={token.id}
              className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-500 w-8">{index + 1}</span>
                <img
                  src={users.image}
                  alt={users.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-bold">{users.name}</p>
                  <p className="text-sm text-gray-400">@{users.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">${users.miningStatus?.totalBalance}</p>
                <p className="text-sm text-green-400 font-medium">
                  ${users.miningStatus?.currentProfit} (+
                  {users.miningStatus?.profitPercentage}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <a
        style={{ display: none }}
        onClick={() => {
          navigate("/topmovers");
        }}
        className="view-all"
      >
        View all
      </a>
    </div>
  );
}

export default TopMovers;
