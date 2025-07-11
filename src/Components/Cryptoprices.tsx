"use client";
import Link from "next/link";
import React from "react";

const Cryptoprices: React.FC = () => {
  const cryptoData = [
    { name: "Bitcoin", price: "$27,000", high: "$28,500", low: "$26,800" },
    { name: "Ethereum", price: "$1,800", high: "$1,900", low: "$1,750" },
    { name: "Binance Coin", price: "$300", high: "$320", low: "$290" },
    { name: "Cardano", price: "$0.35", high: "$0.38", low: "$0.34" },
    { name: "Solana", price: "$22", high: "$24", low: "$21" },
    { name: "Ripple", price: "$0.50", high: "$0.55", low: "$0.48" },
    { name: "Polkadot", price: "$6", high: "$6.5", low: "$5.8" },
    { name: "Dogecoin", price: "$0.07", high: "$0.08", low: "$0.065" },
    {
      name: "Shiba Inu",
      price: "$0.00001",
      high: "$0.000012",
      low: "$0.000009",
    },
    // { name: "Litecoin", price: "$90", high: "$95", low: "$85" },
    // { name: "Chainlink", price: "$7", high: "$7.5", low: "$6.8" },
    // { name: "Avalanche", price: "$15", high: "$16", low: "$14.5" },
    // { name: "Polygon", price: "$1", high: "$1.1", low: "$0.9" },
    // { name: "Uniswap", price: "$5", high: "$5.5", low: "$4.8" },
    // { name: "Cosmos", price: "$10", high: "$11", low: "$9.5" },
  ];

  const cryptoDataImages = [
    {
      name: "Bitcoin",
      image:
        "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    },
    {
      name: "Ethereum",
      image:
        "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    },
    {
      name: "Binance Coin",
      image:
        "https://coin-images.coingecko.com/coins/images/825/large/binance-coin-logo.png",
    },
    {
      name: "Cardano",
      image:
        "https://coin-images.coingecko.com/coins/images/975/large/cardano.png",
    },
    {
      name: "Solana",
      image:
        "https://coin-images.coingecko.com/coins/images/4128/large/solana.png",
    },
    {
      name: "Ripple",
      image:
        "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    },
    {
      name: "Polkadot",
      image:
        "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png",
    },
    {
      name: "Dogecoin",
      image:
        "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png",
    },
    {
      name: "Shiba Inu",
      image:
        "https://coin-images.coingecko.com/coins/images/11939/large/shiba.png",
    },
    {
      name: "Litecoin",
      image:
        "https://coin-images.coingecko.com/coins/images/2/large/litecoin.png",
    },
    {
      name: "Chainlink",
      image:
        "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    },
    {
      name: "Avalanche",
      image:
        "https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    },
    {
      name: "Polygon",
      image:
        "https://coin-images.coingecko.com/coins/images/4713/large/polygon.png",
    },
    {
      name: "Uniswap",
      image:
        "https://coin-images.coingecko.com/coins/images/12504/large/uni.png",
    },
    {
      name: "Cosmos",
      image:
        "https://coin-images.coingecko.com/coins/images/1481/large/cosmos_hub.png",
    },
  ];

  return (
    <>
    <div className="min-h-screen bg-gradient-to-tr from-black via-zinc-950 to-zinc-900 text-gray-200 p-6">
      <h1 className="text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-t from-zinc-400 via-zinc-500 to-zinc-400 drop-shadow-lg">
        Crypto Prices
      </h1>
      <h1 className="text-sm font-extralight text-center mb-8 text-gray-400 drop-shadow-lg">
        Access up-to-date prices for efficient trading
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-1 md:p-10">
        {cryptoData.map((crypto, index) => (
          <div
            key={index}
            className="relative  backdrop-blur-lg p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex justify-between items-center"
          >
            {/* Left Section - Image & Name */}
            <div className="flex items-center space-x-4">
              <img
                src={
                  cryptoDataImages.find((img) => img.name === crypto.name)
                    ?.image || ""
                }
                alt={crypto.name}
                className="w-10 h-10 rounded-full shadow-md object-contain"
              />
              <div>
                <h2 className="text-xl font-bold text-white">{crypto.name}</h2>
                <p className="text-xs font-medium text-gray-400">
                  High: {crypto.high}
                </p>
                <p className="text-xs font-medium text-gray-400">
                  Low: {crypto.low}
                </p>
              </div>
            </div>

            {/* Right Section - Price & Percentage */}
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-300">
                {crypto.price}
              </p>
              <p
              // className={`text-sm font-medium ${
              //   Math.random() > 0.5 ? "text-green-400" : "text-red-400"
              // }`}
              >
                {/* {Math.random() > 0.5 ? "+" : "-"}
                {Math.floor(Math.random() * 10)}% */}
              </p>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-gray-800/30 rounded-xl pointer-events-none"></div>
          </div>
        ))}
      </div>
      
    </div>
    <div className="relative  bg-radial  from-zinc-800  to-black h-screen flex flex-col justify-center items-center text-white text-center px-6">
    <div className="absolute inset-0  opacity-40"></div>

    <div className="relative    z-10 max-w-2xl p-1 md:p-8 rounded-2xl ">
      <h2 className="text-5xl sm:text-5xl font-medium mb-4 tracking-wide text-zinc-300">
        Crypto Simulator
      </h2>
      <h2 className="text-xl text-gray-300  font-light mb-4 tracking-wide">
        Ready to Elevate Your Trading?
      </h2>
      <p className="text-gray-300 text-lg mb-6 leading-relaxed">
        Join us and simulate real-world crypto trading with{" "}
        <span className="font-serif text-green-500 underline">
          virtual money
        </span>{" "}
        — Learn, strategize.
      </p>

      <div className="flex flex-col justify-center items-center sm:flex-row gap-4">
        <Link href="/signup">
          <button
            style={{ border: "0.1px solid oklch(0.442 0.017 285.786)" }}
            className=" hover:cursor-pointer text-white px-4 py-2 rounded-full text-md font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Sign Up for Free
          </button>
        </Link>
      </div>
    </div>
  </div>
  </>
  );
};

export default Cryptoprices;
