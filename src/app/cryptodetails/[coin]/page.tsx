"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import CoinInfoLeftPart from "@/Components/CoinInfoLeftPart";
import ChartdataRightpart from "@/Components/ChartdataRightpart";
// import Loader from './components/Loader'
// import { div } from "framer-motion/client";
// Dynamically import ApexCharts

const CryptoDetails = () => {
  const isAuthenticated = true;
  const { coin } = useParams();
  const [priceHistory, setPriceHistory] = useState<{ time: string; price: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [days, setDays] = useState(1);
  const [coinData, setCoinData] = useState<any>(null);
  const cacheRef = useRef<{ [key: number]: { time: string; price: number }[] }>({});

  const fetchData = useCallback(async () => {
    if (cacheRef.current[days]) {
      setPriceHistory(cacheRef.current[days]);
      return;
    }
    try {
      setLoading(true);
      setError(false);

      const [priceResponse, coinResponse] = await Promise.all([
        axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`),
        axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`),
      ]);
      console.log("hi")
      const priceData = priceResponse.data.prices.map(([timestamp, price]: [number, number]) => ({
        timestamp,
        price: parseFloat(price.toFixed(2)),
      }));
      const filteredData = filterPriceHistory(priceData, days);
      cacheRef.current[days] = filteredData;
      setPriceHistory(filteredData);
      setCoinData(coinResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [coin, days]);

  useEffect(() => {
    if(isAuthenticated) {
      fetchData();
    }else {
      window.location.href = "/signup"
    }
  }, [isAuthenticated , fetchData]);


  if(!isAuthenticated) return null;
  return (
    <div className="min-h-screen min-w-full flex flex-col items-center justify-center bg-black text-white p-6">
  <Link href="/cryptopricepage" className="text-green-400 hover:underline">
    ← Back
  </Link>
  <h1 className="text-4xl text-center mt-4 font-bold font-serif capitalize">
    {coinData?.name} ({coinData?.symbol?.toUpperCase()})
  </h1>

  {loading ? (
    <p className="text-center mt-4">Loading...</p>
  ) : error ? (
    <p className="text-center text-red-400 mt-4">Failed to fetch data. Try again later.</p>
  ) : (
    <div className="flex w-full h-full flex-col justify-center items-center md:flex-row gap-8 mt-6">
      <CoinInfoLeftPart  coinData={coinData} />
      <ChartdataRightpart  priceHistory={priceHistory} days={days} setDays={setDays} />
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
      time: new Date(timestamp).toLocaleString("en-US", 
        days === 1 ? { hour: "2-digit", minute: "2-digit" } : { month: "short", day: "numeric" }
      ),
      price,
    }));
};

export default CryptoDetails;
