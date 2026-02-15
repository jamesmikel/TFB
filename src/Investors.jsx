import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToken } from "./TokenDetails";
import Heading from "./Header";
import Footer from "./Footer";
import Plan from "./Plans";

function TokenDetails() {
  const [image, setImage] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { selectedToken } = useToken();
  console.log(selectedToken);
  if (!selectedToken) {
    return (
      <p className="text-gray-400">
        No token selected. Click on a token in Top Movers.
      </p>
    );
  }
  const ProposedPercent = selectedToken.miningPlan?.ProposedPercent * 100;
  console.log(ProposedPercent);
  const ProposedTime = selectedToken.miningPlan?.ProposedTime / 3600000;
  useEffect(() => {
    if (ProposedTime === 1 && ProposedPercent === 4) {
      setImage("https://i.imgur.com/UpKnHkY.png");
      setMaxPrice("100");
      setMinPrice("30");
      return;
    }
    if (ProposedTime === 6 && ProposedPercent === 10) {
      setImage("https://i.imgur.com/FHopEbM.png");
      setMaxPrice("1000");
      setMinPrice("100");
      return;
    }
    if (ProposedTime === 12 && ProposedPercent === 20) {
      setImage("https://i.imgur.com/aOBK9AG.png");
      setMaxPrice("10000");
      setMinPrice("1000");
      return;
    }
    if (ProposedTime === 18 && ProposedPercent === 20) {
      setImage("https://i.imgur.com/UpKnHkY.png");
      setMaxPrice("100000");
      setMinPrice("10000");
      return;
    }

    if (ProposedTime === 24 && ProposedPercent === 40) {
      setImage("https://i.imgur.com/FHopEbM.png");
      setMaxPrice("100000");
      setMinPrice("50000");
      return;
    }
    if (ProposedTime === 1 && ProposedPercent === 20) {
      setImage("https://i.imgur.com/aOBK9AG.png");
      setMaxPrice("10000");
      setMinPrice("1000");
      return;
    }
  }, []);

  return (
    <div>
      {" "}
      <Heading />
      <div className="token-details">
        <h1 className="text-3xl font-bold text-white mb-4">
          {selectedToken.name}
        </h1>
        <p className="text-2xl font-semibold text-cyan-400 mt-4">
          ${selectedToken.miningStatus?.totalBalance}
        </p>
        <div style={{ display: "flex", marginTop: "" }}>
          <p
            className={`text-lg ${
              selectedToken.miningStatus?.profitPercentage > 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            ${selectedToken.miningStatus?.currentProfit}
          </p>
          <p
            className={`text-lg ${
              selectedToken.miningStatus?.profitPercentage > 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            ({selectedToken.price_change_percentage_24h > 0 ? "+" : ""}
            {selectedToken.miningStatus?.profitPercentage}%)
          </p>
        </div>

        <div className="plan-box-div plan-box-div2">
          <Plan
            No={selectedToken.miningPlan?.ProposedPercent * 100}
            hours={selectedToken.miningPlan?.ProposedTime / 3600000}
            img={image}
            alt="Bitcoin"
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <Link className="deposit" to="/account/deposit">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 8L12 13L17 8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 13V3"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          Deposit
        </Link>
      </div>{" "}
      <Footer />
    </div>
  );
}

export default TokenDetails;
