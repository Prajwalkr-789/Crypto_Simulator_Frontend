"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
export interface CryptoData {
  name: string;
  symbol: string;
  current_price: number;
  high_24h: number;
  low_24h: number;
  image: string;
}

const Cryptopricespage: React.FC = () => {
  const [cryptoData, setCryptoData] = React.useState<CryptoData[]>([]);
  const cachepricesref = React.useRef<{ [key: string]: CryptoData[] }>({});

  async function getTopCryptos() {
    if(cachepricesref.current[1]) {
      setCryptoData(cachepricesref.current[1]);
      return;
    }
    // Check if data is already cached
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 24,
        page: 1,
      },
    });
    const cryptoData = await response.data.map((coin : CryptoData) => ({
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      image: coin.image,
    }));

    console.log(cryptoData);
    cachepricesref.current[1] = cryptoData;
    setCryptoData(cryptoData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  }
  useEffect(() => {
    getTopCryptos();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-gray-950 text-gray-200 p-4 sm:p-6 md:p-8 lg:p-10">
      <h1 className="text-4xl font-serif text-center mb-8 bg-clip-text text-transparent bg-gradient-to-t from-zinc-800 via-zinc-600 to-zinc-400 drop-shadow-lg">
        Crypto Prices
      </h1>
      <h1 className="text-sm font-extralight text-center mb-8 text-gray-400 drop-shadow-lg">
        Access up-to-date prices for efficient trading
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {cryptoData.map((crypto, index) => (
          <Link key={index} href={`/cryptodetails/${crypto.name.toLowerCase()}`}>
            <div className="relative backdrop-blur-lg p-4 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src={crypto.image || ""}
                  alt={crypto.name}
                  loading="lazy"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md object-contain"
                />
                <div>
                  <h2 className="text-lg font-bold text-white">{crypto.name}</h2>
                  <p className="text-xs font-medium text-gray-400">High: {crypto.high_24h}</p>
                  <p className="text-xs font-medium text-gray-400">Low: {crypto.low_24h}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-300">{crypto.current_price }</p>
                <p className={`text-sm font-medium ${Math.random() > 0.5 ? "text-green-400" : "text-red-400"}`}>{Math.random() > 0.5 ? "+" : "-"}{Math.floor(Math.random() * 10)}%</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cryptopricespage;