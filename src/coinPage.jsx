import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "./Header";
import Footer from "./Footer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chart, setChart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // 1️⃣ Fetch coin info
      const coinRes = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`
      );
      const [coinData] = await coinRes.json();

      // 2️⃣ Fetch chart (7 days)
      const chartRes = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
      );
      const chartData = await chartRes.json();

      const formattedChart = chartData.prices.map((p) => ({
        time: new Date(p[0]).toLocaleDateString(),
        price: p[1],
      }));

      setCoin(coinData);
      setChart(formattedChart);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Heading />
      <div className="p-6 text-white bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold">
          {coin.name} ({coin.symbol.toUpperCase()})
        </h1>

        <p className="text-2xl mt-2">${coin.current_price.toLocaleString()}</p>

        <p
          className={`mt-1 ${
            coin.price_change_percentage_24h > 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>

        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chart}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip wrapperStyle={{ backGround: "black" }} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#22d3ee"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CoinPage;
