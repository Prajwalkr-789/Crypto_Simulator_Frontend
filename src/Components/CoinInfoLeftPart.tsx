"use client";

import { ArrowDown, ArrowUp,TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";

const formatNumber = (num: number) => new Intl.NumberFormat("en-US").format(num);

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image?: {
    large?: string;
  };
  market_cap_rank?: number;
  market_data?: {
    current_price?: {
      usd?: number;
    };
    price_change_percentage_24h?: number;
    price_change_percentage_7d?: number;
    high_24h?: {
      usd?: number;
    };
    low_24h?: {
      usd?: number;
    };
    market_cap?: {
      usd?: number;
    };
    total_volume?: {
      usd?: number;
    };
  };
}

const CoinInfo = ({ coinData }: { coinData: CoinData }) => {
  return (
    <div className="flex flex-col-reverse md:flex-row  w-[95vw] md:w-4/12 gap-8 mt-6">
      {/* Left Section - Coin Info */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 p-6 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] w-full max-w-md border border-gray-800 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-tr from-pink-500/10 to-orange-500/10 blur-xl"></div>

        {/* Header */}
        <div className="flex items-center gap-4 border-b border-gray-800/80 pb-4 relative z-10">
          <div className="relative">
            <img
              src={coinData?.image?.large || "/placeholder.svg"}
              alt={coinData?.name || "Crypto"}
              width={56}
              height={56}
              className="rounded-full shadow-lg border border-gray-700"
            />
            {coinData?.market_cap_rank && (
              <div className="absolute -bottom-1 -right-1 bg-gray-900 text-xs font-bold text-white px-1.5 py-0.5 rounded-md border border-gray-700">
                #{coinData.market_cap_rank}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{coinData?.name}</h2>
            <span className="text-gray-400 text-sm font-medium">{coinData?.symbol?.toUpperCase()}</span>
          </div>
          <div className="ml-auto">
            {coinData?.market_data?.price_change_percentage_24h !== undefined && (
              <div
                className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg ${
                  coinData.market_data.price_change_percentage_24h >= 0
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {coinData.market_data.price_change_percentage_24h >= 0 ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
              </div>
            )}
          </div>
        </div>

        {/* Current Price */}
        <div className="mt-4 mb-6 text-center">
          <span className="text-3xl font-bold text-white">
            ${formatNumber(coinData?.market_data?.current_price?.usd || 0)}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* 24h Change */}
          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
            <span className="text-gray-400 text-xs">24h Change</span>
            {coinData?.market_data?.price_change_percentage_24h !== undefined && (
              <div
                className={`flex items-center gap-1 mt-1 ${
                  coinData.market_data.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {coinData.market_data.price_change_percentage_24h >= 0 ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span className="font-bold">{coinData.market_data.price_change_percentage_24h.toFixed(2)}%</span>
              </div>
            )}
          </div>

          {/* 7d Change */}
          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
            <span className="text-gray-400 text-xs">7d Change</span>
            {coinData?.market_data?.price_change_percentage_7d !== undefined && (
              <div
                className={`flex items-center gap-1 mt-1 ${
                  coinData.market_data.price_change_percentage_7d >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {coinData.market_data.price_change_percentage_7d >= 0 ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span className="font-bold">{coinData.market_data.price_change_percentage_7d.toFixed(2)}%</span>
              </div>
            )}
          </div>

          {/* Today's High */}
          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
            <span className="text-gray-400 text-xs">Today&#39;s High</span>
            <div className="flex items-center mt-1">
              <span className="font-bold text-cyan-400">
                ${formatNumber(coinData?.market_data?.high_24h?.usd || 0)}
              </span>
            </div>
          </div>

          {/* Today's Low */}
          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
            <span className="text-gray-400 text-xs">Today&#39;s Low</span>
            <div className="flex items-center mt-1">
              <span className="font-bold text-amber-400">
                ${formatNumber(coinData?.market_data?.low_24h?.usd || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Market Data */}
        <div className="mt-4 space-y-3">
          {/* Market Cap */}
          <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
            <span className="text-gray-400 text-sm">Market Cap:</span>
            <span className="font-bold text-purple-400">
              ${(coinData?.market_data?.market_cap?.usd ??0 / 1e9).toFixed(2)}B
            </span>
          </div>

          {/* 24h Volume */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">24h Volume:</span>
            <span className="font-bold text-pink-400">
              ${(coinData?.market_data?.total_volume?.usd ?? 0 / 1e9).toFixed(2)}B
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/trade/${coinData?.id}?price=${coinData?.market_data?.current_price?.usd}`}
          passHref
        >
          <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg">
            Trade {coinData?.symbol?.toUpperCase()}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CoinInfo;
