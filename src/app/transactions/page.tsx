'use client'
import { toastUtils } from "@/utils/toastUtils";
import axios from "axios";
import { SparklesIcon, CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Transaction = {
  coinName: string;
    transactionType: "buy" | "sell";
    quantity: number;
    pricePerCoin: number;
    totalAmount: number;
    commissionFee: number;
    purchaseDate: string; 
};

function TransactionHistoryPage() {

    const [transactiondata , settransactiondata] = useState<Transaction[]>([]);
    const router = useRouter()
    useEffect(  () => {
        const fetchdata = async () =>{
        try {
            const token = localStorage.getItem('jwt')
            if(!token){
                toastUtils.showError("Login to acceess")
                router.push('/signup')
                return
            }
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gettrnhst`,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : `Bearer ${token}`
                }
            })
            if(res.status == 200){
                settransactiondata(res.data)
            }
        } catch {
            toastUtils.showError("Something went wrong try again!")
            router.push('/signup')
        }
    }
    fetchdata();
    },[])

  return (
    <>

    <div className="min-h-screen bg-black text-zinc-200 p-4">
      <div className="flex justify-center items-center mt-14 text-center flex-wrap">
        <SparklesIcon className="w-8 h-8 text-indigo-400 animate-pulse" />
        <h2 className="ml-2 text-xl sm:text-2xl md:text-3xl font-serif font-extralight leading-tight text-white">
          Transaction History
        </h2>
      </div>

      <div className="mt-10 space-y-6">
        { transactiondata.length > 0 && transactiondata?.map((tx, index) => {
          const dateLabel = tx.transactionType === "buy" ? "Purchase" : "Sell";
          const netCost = tx.totalAmount + tx.commissionFee;

          return (
            <div
              key={index}
              className="max-w-4xl mx-auto rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 sm:p-6 shadow-[0_0_12px_rgba(0,0,0,0.3)]"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div className="w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-teal-600/20 text-teal-400 rounded-full flex items-center justify-center font-bold">
                      {tx.coinName.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {tx.coinName.charAt(0).toUpperCase() + tx.coinName.slice(1)}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ml-2 whitespace-nowrap ${
                        tx.transactionType === "buy"
                          ? "bg-teal-900 text-teal-400"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {tx.transactionType.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 ml-11 sm:ml-11">
                    <CalendarIcon className="h-3 w-3" />
                    <p className="text-xs text-zinc-400">
                      {dateLabel} Date: {" "}
                      {new Date(tx.purchaseDate).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </div>

                <div className="text-right w-full sm:w-auto">
                  <p className="text-sm text-zinc-400">Total Amount</p>
                  <p className="text-xl sm:text-2xl font-bold text-emerald-400">
                    ${tx.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <hr className="border-zinc-800 my-2" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-4 text-sm mt-4 place-items-center">
                <div className="flex flex-col items-center">
                  <p className="text-zinc-400">Quantity</p>
                  <p className="text-white font-semibold">{tx.quantity}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-zinc-400">Price/Coin</p>
                  <p className="text-white font-semibold">
                    ${tx.pricePerCoin.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-zinc-400">Commission Fee</p>
                  <p className="text-white font-semibold">
                    ${tx.commissionFee.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-zinc-400">Net Cost</p>
                  <p className="text-white font-semibold">
                    ${netCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default TransactionHistoryPage;