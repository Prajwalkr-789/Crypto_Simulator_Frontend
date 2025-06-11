"use client";
// import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { toastUtils } from "@/utils/toastUtils";
import { div } from "framer-motion/client";

export interface CryptoData {
  name: string;
  symbol: string;
  current_price: number;
  high_24h: number;
  low_24h: number;
  image: string;
  price_change_percentage_24h: number;
}

const Cryptopricespage: React.FC = () => {
  const [cryptoData, setCryptoData] = React.useState<CryptoData[]>([]);
  const cachepricesref = React.useRef<{ [key: string]: CryptoData[] }>({});
  const isImagedatacached = React.useRef(false);
  const imageCache = React.useRef<Map<string, string>>(new Map());
  

  const initializeSSE = () => {
    // If already cached, use it
    if (cachepricesref.current[1]) {
      setCryptoData(cachepricesref.current[1]);
      return;
    }

    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/price`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("SSE data received:", data);
        if (data.error) {
          console.error("SSE error:", data.error);
          return;
        }
        if(!isImagedatacached.current) {
        imageCache.current = new Map();
        data.forEach((coin: CryptoData) => {
          if (coin.image && !imageCache.current.has(coin.symbol)) {
            imageCache.current.set(coin.symbol, coin.image);
          }
        });
        isImagedatacached.current = true;

      }

        const cryptoData: CryptoData[] = data.map((coin: CryptoData) => {
          // const existing = cachepricesref.current[1]?.find(c => c.symbol === coin.symbol);
    
          return {
            name: coin.name,
            symbol: coin.symbol,
            current_price: coin.current_price,
            high_24h: coin.high_24h,
            low_24h: coin.low_24h,
            image:imageCache.current.get(coin.symbol) || coin.image, // Keep old image if exists
            price_change_percentage_24h: coin.price_change_percentage_24h,
          };
        });
    
        setCryptoData(cryptoData);
        cachepricesref.current[1] = cryptoData;
      } catch (err) {
        console.error("Error parsing SSE data", err);
      }
    };
    

    eventSource.onerror = () => {
      toastUtils.showError("Error connecting to server. Please try again later.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  };

  useEffect(() => {
    const cleanup = initializeSSE();
    return cleanup; // Ensures SSE is closed on unmount
  }, []);
  

  return (
    <>
   { cryptoData == null  ?(<div className="animate-pulse mainheader2 flex justify-center items-center text-[2rem] h-screen"><p>Loading...</p></div> ):
    (<div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-gray-950 text-gray-200 p-4 sm:p-6 md:p-8 lg:p-10">
      <h1 className="text-4xl mt-14 font-serif text-center mb-4 bg-clip-text text-transparent bg-gradient-to-t from-zinc-200 via-zinc-300 to-zinc-600 drop-shadow-lg">
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
                  src={imageCache.current.get(crypto.symbol) || ""}
                  alt={crypto.name}
                  width={48}
                  height={48}
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
                <p className={`text-sm font-medium ${crypto.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}`}>{crypto.price_change_percentage_24h > 0 ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(3)}%</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>)
}
    </>
  );
};

export default Cryptopricespage;