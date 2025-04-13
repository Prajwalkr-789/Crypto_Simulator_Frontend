"use client"

import { useSearchParams, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"
import { ArrowDown, ArrowUp, Check, X, Loader2 } from "lucide-react"

const TradePage = () => {
  const params = useParams()
  const searchParams = useSearchParams()

  const coinName = params.id?.toString()
  const price = Number.parseFloat(searchParams.get("price") || "0")

  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"buy" | "sell">("buy")
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (status) {
      setShowMessage(true)
      const timer = setTimeout(() => {
        setShowMessage(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const handleTrade = async () => {
    const quantity = Number.parseFloat(amount)
    if (!coinName || !price || isNaN(quantity) || quantity <= 0) {
      setIsSuccess(false)
      setStatus("Invalid input or missing data.")
      return
    }

    setIsLoading(true)

    try {
    //   const response = await axios.post("/api/trade", {
    //     coin: coinName,
    //     price,
    //     quantity,
    //     type,
    //     timestamp: new Date().toISOString(),
    //   })
    const response = {  
        data: { message: "Trade successful!" },
        status: 200,
        } 


      if (response.status === 200) {
        setIsSuccess(true)
        setStatus(`${type === "buy" ? "Bought" : "Sold"} ${quantity} ${coinName?.toUpperCase()} successfully!`)
        setAmount("")
      } else {
        setIsSuccess(false)
        setStatus("Trade failed. Please try again.")
      }
    } catch (error) {
      console.error(error)
      setIsSuccess(false)
      setStatus("Something went wrong with your trade.")
    } finally {
      setIsLoading(false)
    }
  }

  const totalValue = Number.parseFloat(amount) * price || 0

  return (
    <div className="min-h-screen bg-gradient-to-tl from-gray-950 via-gray-900 to-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gradient-to-br from-gray-900 to-gray-950 p-8 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.3)] border border-zinc-800 space-y-6 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(30,64,175,0.3),transparent_40%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.3),transparent_40%)]"></div>
        </div>

        {/* Content */}
        <div className="relative">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold">{coinName?.slice(0, 1).toUpperCase()}</span>
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
                  ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 relative">
          <div className="group">
            <label htmlFor="amount" className="block text-sm font-medium text-zinc-400 mb-1.5 ml-1">
              Amount
            </label>
            <div className="relative">
              <input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl  border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                {coinName?.toUpperCase()}
              </div>
            </div>
          </div>

          {amount && (
            <div className="bg-zinc-800/30 rounded-xl p-3 border border-zinc-800 animate-fadeIn">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Total Value:</span>
                <span className="font-medium">
                  ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
              <ArrowDown className={`w-4 h-4 ${type === "buy" ? "" : "text-green-500"}`} />
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
              <ArrowUp className={`w-4 h-4 ${type === "sell" ? "" : "text-red-500"}`} />
              Sell
            </button>
          </div>

          <button
            onClick={handleTrade}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-gray-950 to-indigo-900 py-3.5 rounded-xl font-medium hover:from-black hover:to-indigo-900 transition-all duration-200 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>Confirm {type === "buy" ? "Purchase" : "Sale"}</>
            )}
          </button>

          {/* Animated status message */}
          <div
            className={`fixed top-4 right-4 max-w-xs w-full p-4 rounded-lg shadow-lg border transition-all duration-500 transform z-50 ${
              showMessage ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            } ${
              isSuccess
                ? "bg-green-900/80 border-green-700 backdrop-blur-sm"
                : "bg-red-900/80 border-red-700 backdrop-blur-sm"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`rounded-full p-1 ${isSuccess ? "bg-green-500" : "bg-red-500"}`}>
                {isSuccess ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{isSuccess ? "Success!" : "Error"}</p>
                <p className="text-xs opacity-90 mt-0.5">{status}</p>
              </div>
              <button onClick={() => setShowMessage(false)} className="text-white/80 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Confetti effect for successful trades */}
          {isSuccess && showMessage && (
            <div className="fixed inset-0 pointer-events-none z-40">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-5%`,
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    borderRadius: `${Math.random() > 0.5 ? "50%" : "0"}`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center text-xs text-zinc-500 pt-2">
          All trades are subject to market conditions. <br />
          Please review details before confirming.
        </div>
      </div>
    </div>
  )
}

export default TradePage
