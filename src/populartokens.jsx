import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
const tabs = [
  { id: "top", label: "Top", category: null },

  { id: "bnb", label: "BNB", category: "binance-smart-chain" },

  { id: "eth", label: "ETH", category: "ethereum-ecosystem" },

  { id: "sol", label: "SOL", category: "solana-ecosystem" },
];

function PopularTokens() {
  const [activeTab, setActiveTab] = useState("top");
  const navigate = useNavigate();
  const [tokens, setTokens] = useState([]);
  const [isVisible, setIsVisible] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const windows = window.location.href;

  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);

      if (windows.includes("/popularTokens")) {
        setShowAll(!showAll);
        setIsVisible("none");
      }
      try {
        const category = tabs.find((t) => t.id === activeTab).category;

        let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`;

        if (category) {
          url += `&category=${category}`;
        }

        const res = await fetch(url);

        const data = await res.json();

        setTokens(data);
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();

    // Refresh every 60 seconds

    const interval = setInterval(fetchTokens, 60000);

    return () => clearInterval(interval);
  }, [activeTab]);
  const currentTab = tabs.find((t) => t.id === activeTab);
  const displayedTokens = showAll ? tokens : tokens.slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}

      <div className="p-4 border-b border-gray-800">
        <h1 className="populartokens">Popular Tokens</h1>
      </div>

      {/* Tabs */}

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id
                ? "text-cyan-400 border-b-4 border-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Subtitle */}

      <p className="subtitle">
        {currentTab.category
          ? `Top tokens on ${currentTab.label} chain by market cap`
          : "Top tokens by total market cap"}
      </p>

      {/* Loading */}

      {loading ? (
        <p className="text-center mt-10">Loading tokens...</p>
      ) : (
        <div className="tokens">
          {displayedTokens.map((token, index) => (
            <div
              key={token.id}
              onClick={() => navigate(`/coin/${token.id}`)}
              className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-500 w-8">{index + 1}</span>

                <img
                  src={token.image}
                  alt={token.name}
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <p className="font-bold">{token.name}</p>

                  <p className="text-sm text-gray-400">
                    MCap: ${token.market_cap?.toLocaleString() || "N/A"} • Vol:
                    ${token.total_volume?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  ${token.current_price?.toFixed(6) || "0"}
                </p>

                <p
                  className={`text-sm font-medium ${
                    token.price_change_percentage_24h > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {token.price_change_percentage_24h > 0 ? "+" : ""}
                  {token.price_change_percentage_24h?.toFixed(2) || "0"}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <a
        style={{ display: isVisible }}
        onClick={() => {
          navigate("/popularTokens");
        }}
        className="view-all"
      >
        View all
      </a>
    </div>
  );
}

export default PopularTokens;
