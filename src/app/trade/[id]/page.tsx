'use client';

import { useSearchParams, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowDown, ArrowUp} from "lucide-react";
import { toastUtils } from "@/utils/toastUtils";
import { useAuth } from "@/Contexts/AuthState"; 
const TradePage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [isloading, setIsLoading] = useState(true);

  const coinName = params.id?.toString();
  const price = Number.parseFloat(searchParams.get("price") || "0");

  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<"buy" | "sell">("buy");
  const [balance, setBalance] = useState(0);

const fetchBalance = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/walletbalance`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (res.status === 200) {
      console.log(res);
      setBalance(res?.data?.walletBalance);
    } else {
      toastUtils.showError(res.statusText || "Failed to fetch balance");
    }
  } catch {
    toastUtils.showError("Error fetching balance");
  }
};

useEffect(() => {
  if(!isAuthenticated){
    router.push('/signup')
  }else{
    fetchBalance();
    setIsLoading(false);
  }
}, []);



const handleTrade = async () => {
  const quantity = amount;
  if (!coinName) {
    toastUtils.showError("Coin name is missing.");
    return;
  }
  if (!price) {
    toastUtils.showError("Price is missing or invalid.");
    return;
  }
  if (isNaN(quantity)) {
    toastUtils.showError("Amount is not a valid number.");
    return;
  }
  if (quantity <= 0) {
    toastUtils.showError("Amount must be greater than zero.");
    return;
  }

  const payload = {
    coinName,
    pricePerCoin: price,
    quantity,
  };

  const endpoint =
    type === "buy" ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/buy` : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sell`;

  if (type === "buy" && quantity * price > balance) {
    toastUtils.showError("Insufficient balance for this trade.");
    return;
  }

  try {
    const response = await axios.post(endpoint, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      validateStatus(status) {
        return status >= 200 && status < 500; 
      },
    });

    if (response.status === 200) {
      toastUtils.showMessage(
        `${type === "buy" ? "Bought" : "Sold"} ${quantity} ${coinName.toUpperCase()} successfully!`
      );
      setAmount(0);
      fetchBalance();

    }else if(response.status === 4000){
      toastUtils.showError("Insufficient balance for this trade.");
    } else if (response.status === 404) {
      toastUtils.showError("Trade failed. Please try again.");
    } else {
      toastUtils.showError("Trade failed. Please try again.");
    }
  } catch (error) {
    console.error("Trade error:", error);
    toastUtils.showError("Something went wrong with your trade.");
  }
};

  const totalValue = amount * price || 0;

   if (isloading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-pulse h-10 w-40  rounded-lg">
          Loading....
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tl from-gray-950 via-gray-900 to-black">
      <div className=" text-white  flex flex-col items-center justify-center p-6">
        {/* <div className="mt-16 ml-5 fixed top-0 left-5 px-6 py-4 rounded-2xl bg-gradient-to-br from-[#111827] to-[#1f2937] text-white shadow-xl shadow-black/30 border border-zinc-700 flex items-center gap-4">
          <div className="bg-green-600/20 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 1.343-3 3v6m0 0H6m3 0h6m3 0h-3m0 0v-6a3 3 0 10-6 0v6"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-zinc-400">Available Balance</p>
            <p className="text-2xl font-semibold text-green-400">$100,000</p>
          </div>
        </div> */}

        <div className="max-w-md mt-14 w-full bg-gradient-to-br from-gray-900 to-gray-950 p-8 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.3)] border border-zinc-800 space-y-6 relative overflow-hidden">
          {/* Background pattern */}

          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(30,64,175,0.3),transparent_40%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.3),transparent_40%)]"></div>
          </div>

          {/* Content */}
          <div className="relative">
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold">
                  {coinName?.slice(0, 1).toUpperCase()}
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Trade {coinName?.toUpperCase()}
            </h1>
            <div className="flex justify-center mt-2">
              <div className="px-4 py-1.5 rounded-full  backdrop-blur-sm border border-zinc-700/50">
                <p className="text-center text-sm">
                  Current Price:{" "}
                  <span className="font-medium text-green-400">
                    $
                    {price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>
              </div>
               <div className="px-4 py-1.5 rounded-full  backdrop-blur-sm border border-zinc-700/50">
                <p className="text-center text-sm">
                  Wallet Balance:{" "}
                  <span className="font-medium text-green-400">
                    $
                    {balance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 relative">
            <div className="group">
              <label
                className="block text-sm font-medium text-zinc-400 mb-1.5 ml-1"
              >
                Amount
              </label>
              <div className="relative">
                <input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) =>  setAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl  border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                  {coinName?.toUpperCase()}
                </div>
              </div>
            </div>

            {amount != 0 && (
              <div className="bg-zinc-800/30 rounded-xl p-3 border border-zinc-800 animate-fadeIn">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Total Value:</span>
                  <span className="font-medium">
                    $
                    {totalValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setType("buy")}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  type === "buy"
                    ? "bg-green-600/80 shadow-lg shadow-green-900/30"
                    : "bg-zinc-800/70 border border-green-600/30 hover:bg-zinc-800 hover:border-green-500/50"
                }`}
              >
                <ArrowDown
                  className={`w-4 h-4 ${
                    type === "buy" ? "" : "text-green-500"
                  }`}
                />
                Buy
              </button>
              <button
                onClick={() => setType("sell")}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  type === "sell"
                    ? "bg-red-600/80 shadow-lg shadow-red-900/30"
                    : "bg-zinc-800/70 border border-red-600/30 hover:bg-zinc-800 hover:border-red-500/50"
                }`}
              >
                <ArrowUp
                  className={`w-4 h-4 ${type === "sell" ? "" : "text-red-500"}`}
                />
                Sell
              </button>
            </div>

            <button
              onClick={handleTrade}
              className="w-full bg-gradient-to-r from-gray-950 to-indigo-900 py-3.5 rounded-xl font-medium hover:from-black hover:to-indigo-900 transition-all duration-200 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >Confirm {type === "buy" ? "Purchase" : "Sell"}
            </button>

          </div>

          <div className="text-center text-xs text-zinc-500 pt-2">
            All trades are subject to market conditions. <br />
            Please review details before confirming.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradePage;
