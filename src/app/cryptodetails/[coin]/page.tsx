"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import axios from "axios";
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react";

// Dynamically import ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CryptoDetails = () => {
    const { coin } = useParams();
    const [priceHistory, setPriceHistory] = useState<{ time: string; price: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [days, setDays] = useState(1);
    const [coinData, setCoinData] = useState<any>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(false);

            const [priceResponse, coinResponse] = await Promise.all([
                axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`),
                axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`),    
            ]);

            const priceData = priceResponse.data.prices.map(([timestamp, price]: [number, number]) => ({
                timestamp,
                price: parseFloat(price.toFixed(2)),
            }));

            setPriceHistory(filterPriceHistory(priceData, days));
            setCoinData(coinResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [coin, days]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat("en-US").format(num)
      }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <Link href="/cryptoprices" className="text-green-400 hover:underline">← Back</Link>
            <h1 className="text-4xl text-center mt-4 capitalize">{coinData?.name} ({coinData?.symbol?.toUpperCase()})</h1>

            {loading ? (
                <p className="text-center mt-4">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-400 mt-4">Failed to fetch data. Try again later.</p>
            ) : (
                <div className="flex flex-col-reverse md:flex-row gap-8 mt-6">
                    {/* Left Section - Coin Info */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-950 p-6 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] w-full max-w-md border border-gray-800 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-tr from-pink-500/10 to-orange-500/10 blur-xl"></div>

      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-800/80 pb-4 relative z-10">
        <div className="relative">
          <img
            src={coinData.image.small || "/placeholder.svg"}
            alt={coinData.name}
            width={56}
            height={56}
            className="rounded-full shadow-lg border border-gray-700"
          />
          <div className="absolute -bottom-1 -right-1 bg-gray-900 text-xs font-bold text-white px-1.5 py-0.5 rounded-md border border-gray-700">
            #{coinData.market_cap_rank}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-white">{coinData.name}</h2>
          <span className="text-gray-400 text-sm font-medium">{coinData.symbol}</span>
        </div>
        <div className="ml-auto">
          <div
            className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg ${coinData.market_data.price_change_percentage_24h >= 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
          >
            {coinData.market_data.price_change_percentage_24h >= 0 ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Current Price */}
      <div className="mt-4 mb-6 text-center">
        <span className="text-3xl font-bold text-white">${formatNumber(coinData.market_data.current_price.usd)}</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* 24h Change */}
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
          <span className="text-gray-400 text-xs">24h Change</span>
          <div
            className={`flex items-center gap-1 mt-1 ${coinData?.market_data?.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {coinData.market_data.price_change_percentage_24h >= 0 ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
            <span className="font-bold">{coinData.market_data.price_change_percentage_24h.toFixed(2)}%</span>
          </div>
        </div>

        {/* 7d Change */}
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
          <span className="text-gray-400 text-xs">7d Change</span>
          <div
            className={`flex items-center gap-1 mt-1 ${coinData.market_data.price_change_percentage_7d >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {coinData.market_data.price_change_percentage_7d >= 0 ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
            <span className="font-bold">{coinData.market_data.price_change_percentage_7d.toFixed(2)}%</span>
          </div>
        </div>

        {/* Today's High */}
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
          <span className="text-gray-400 text-xs">Today&apos;s High</span>
          <div className="flex items-center mt-1">
            <span className="font-bold text-cyan-400">${formatNumber(coinData.market_data.high_24h.usd)}</span>
          </div>
        </div>

        {/* Today's Low */}
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
          <span className="text-gray-400 text-xs">Today&apos;s Low</span>
          <div className="flex items-center mt-1">
            <span className="font-bold text-amber-400">${formatNumber(coinData.market_data.low_24h.usd)}</span>
          </div>
        </div>
      </div>

      {/* Market Data */}
      <div className="mt-4 space-y-3">
        {/* Market Cap */}
        <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
          <span className="text-gray-400 text-sm">Market Cap:</span>
          <span className="font-bold text-purple-400">${(coinData.market_data.market_cap.usd / 1e9).toFixed(2)}B</span>
        </div>

        {/* 24h Volume */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">24h Volume:</span>
          <span className="font-bold text-pink-400">${(coinData.market_data.total_volume.usd / 1e9).toFixed(2)}B</span>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg">
        Trade {coinData.symbol}
      </button>
    </div>

                    {/* Right Section - Chart */}
                    <div className="w-full md:w-2/3">
                        <Chart
                            options={{
                                chart: { id: "crypto-chart", toolbar: { show: false }, background: "transparent" },
                                xaxis: { categories: priceHistory.map((item) => item.time), labels: { style: { colors: "#aaa", fontSize: "12px" } } },
                                yaxis: { labels: { style: { colors: "#aaa", fontSize: "12px" } } },
                                stroke: { curve: "smooth", width: 3 },
                                colors: ["#16a34a"],
                                grid: { borderColor: "#444", strokeDashArray: 5 },
                                tooltip: {
                                    theme: "dark",
                                    y: { formatter: (value: number) => `$${value.toFixed(2)}` },
                                },
                            }}
                            series={[{ name: "Price", data: priceHistory.map((item) => item.price) }]}
                            type="line"
                            height={350}
                        />

                        {/* Buttons for Hourly, Daily, Weekly */}
                        <div className="flex justify-center gap-4 mt-4">
                            {["1", "3", "7"].map((day) => (
                                <button
                                    key={day}
                                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                                        days === +day ? "bg-green-500 text-black" : "bg-gray-700 hover:bg-gray-600"
                                    }`}
                                    onClick={() => setDays(+day)}
                                >
                                    {day === "1" ? "Hourly" : day === "3" ? "3 Days" : "Weekly"}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/** Function to filter price history data */
const filterPriceHistory = (data: { timestamp: number; price: number }[], days: number) => {
    return data
        .filter((_ , index) => index % (days === 1 ? 12 : 24) === 0)
        .map(({ timestamp, price }) => ({
            time: new Date(timestamp).toLocaleString("en-US", days === 1 ? { hour: "2-digit", minute: "2-digit" } : { month: "short", day: "numeric" }),
            price,
        }));
};

export default CryptoDetails;
