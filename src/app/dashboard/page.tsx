"use client";
import React, { useEffect, useState  } from "react";
import { motion } from "framer-motion";
import { Home, User, Settings, Menu } from "lucide-react";
import Link from "next/link";
import RecentTransactionsDashboard from "./components/RecentTransactionsDashboard";
import HoldingCard from "./components/HoldingCard";
import dynamic from "next/dynamic";
import axios from "axios";
import { toastUtils } from "@/utils/toastUtils";
import { useAuth } from "@/Contexts/AuthState";
import { useRouter } from "next/navigation";

export interface Holding {
  coinName: string;
  purchaseDate: string;
  purchasePrice: number;
  quantity: number;
}

export interface Transaction {
  coinName: string;
  commissionFee: number;
  createdAt: string;
  pricePerCoin: number;
  purchaseDate: string;
  quantity: number;
  totalAmount: number;
  transactionType: "buy" | "sell";
}
interface DashboardData {
  username?: string;
  walletBalance?: number;
  holdings?: Holding[];
  transactions?: Transaction[];
}

const ChartDataDashboard = dynamic(
  () => import("./components/chartDataDashboard"),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse h-auto min-h-[200px] bg-muted rounded-xl shadow-sm flex justify-center items-center">
        <p>Loading chart...</p>
      </div>
    ),
  }
);

const PortfolioSnapshot = dynamic(
  () => import("./components/PortfolioSnapshot"),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse h-auto min-h-[150px] bg-muted rounded-xl shadow-sm flex justify-center items-center">
        <p>Loading chart...</p>
      </div>
    ),
  }
);

const textVariants = {
  open: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  closed: { opacity: 0, x: -20, transition: { duration: 1, ease: "easeIn" } },
};

function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  const [data, setdata] = useState<DashboardData>();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const Fetchdashboarddata = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dash`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setdata(response.data);
        console.log(response);
      } else {
        toastUtils.showError(
          "Something went wrong please try refreshing the page"
        );
        return;
      }
    } catch {
      toastUtils.showError("Failed to fetch data");
    }
  };

  useEffect(() => {
    if(isAuthenticated){
      Fetchdashboarddata();
      setIsLoading(false);
    }
    else{
      router.push("/signup");
    }
  }, [isAuthenticated]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    <div className="flex flex-row items-center justify-center min-h-screen bg-black">
      <div className="flex w-full h-full mt-14">
        <motion.div
          className={`${
            isSidebarOpen ? "w-64" : "w-16"
          } bg-zinc-950 hidden md:block text-white transition-all duration-500 ease-in-out flex flex-col items-center py-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex justify-between w-full px-4">
            <motion.h1
              variants={textVariants}
              className={`text-xl font-bold ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              CryptoSim
            </motion.h1>
            <button onClick={toggleSidebar} className="text-white text-2xl">
              <Menu size={20} className="text-gray-200" />
            </button>
          </div>
          <nav className="mt-6 w-full">
            <ul className="space-y-4 flex flex-col justify-start py-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center space-x-4 px-4 py-2 hover:bg-zinc-900 rounded-md"
                >
                  <Home className="w-6 h-6" />
                  {isSidebarOpen && (
                    <motion.span variants={textVariants}>Dashboard</motion.span>
                  )}
                </Link>
              </li>
              <li>
                <a
                  href="/profile"
                  className="flex items-center space-x-4 px-4 py-2 hover:bg-zinc-900 rounded-md"
                >
                  <User className="w-6 h-6" />
                  {isSidebarOpen && (
                    <motion.span variants={textVariants}>
                      Transaction History
                    </motion.span>
                  )}
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="flex items-center space-x-4 px-4 py-2 hover:bg-zinc-900 rounded-md"
                >
                  <Settings className="w-6 h-6" />
                  {isSidebarOpen && (
                    <motion.span variants={textVariants}>Settings</motion.span>
                  )}
                </a>
              </li>
            </ul>
          </nav>
        </motion.div>

        <div className="flex-1 p-4 sm:p-6 min-h-screen overflow-auto">
          <div className="h-14 mb-6 bg-gradient-to-r from-zinc-950 to-zinc-950 backdrop-blur-sm border border-gray-700/50 shadow-sm flex items-center justify-between px-6 rounded-xl">
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Dashboard
            </h1>
            <div className="flex items-center space-x-3 sm:space-x-5">
              <span className="text-sm sm:text-base font-medium text-gray-200">
                {data?.username ? data?.username : "username"}
              </span>
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 hover:text-white transition duration-200" />
            </div>
          </div>

          <div className="block md:hidden w-full px-4 mt-2">
            <div className="flex flex-row flex-wrap gap-2 items-center justify-center text-white rounded-lg shadow-lg p-4">
              <button
                onClick={() => setIsDashboardOpen(true)}
                className={`px-4 py-2 border font-bold border-zinc-600 ${
                  isDashboardOpen
                    ? "bg-zinc-100 text-zinc-800"
                    : "text-gray-300"
                } text-white hover:cursor-pointer rounded-md shadow hover:bg-primary/90 transition`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setIsDashboardOpen(false)}
                className={`px-4 py-2 font-bold ${
                  !isDashboardOpen
                    ? "bg-zinc-100 text-zinc-800"
                    : "text-gray-300"
                } border border-zinc-600 text-white rounded-md hover:cursor-pointer shadow hover:bg-primary/90 transition`}
              >
                Transaction History
              </button>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-min w-full">
            <div className="min-h-[200px] bg-gradient-to-bl from-zinc-950 via-zinc-950 to-yellow-950 text-white flex flex-col items-center justify-between p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">Wallet Balance</h2>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">
                ${data?.walletBalance ? data?.walletBalance.toFixed(2) : "Wallet Balance"}
              </p>
              <div className="flex justify-between w-full">
                ``
                <p className="text-gray-300 text-sm sm:text-base">Recent</p>
                <p className="text-red-400 font-bold text-sm sm:text-base">
                  - $132.45
                </p>
              </div>
            </div>

            <div className="min-h-[170px] border border-zinc-800 backdrop-blur-md rounded-xl p-6 text-white shadow-md flex flex-col justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-center tracking-wide text-white/90">
                Profit & Loss Summary
              </h2>
              <div className="flex flex-col  justify-between items-center gap-4 mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-sm text-white/70">Lifetime</span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-green-500">
                    $8,920.75
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm text-white/70">Today</span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-red-400">
                    - $142.30
                  </span>
                </div>
              </div>
              <div className="mt-4 text-xs text-white/60 text-center">
                Updated just now
              </div>
            </div>

            <div className="min-h-[150px]">
              {/* <PortfolioSnapshot holdings={data?.holdings ?? []} /> */}
              <PortfolioSnapshot  />
            </div>

            <div className="min-h-[200px] bg-yellow-500 text-white p-4">
              <div></div>
            </div>

            <div className="col-span-full bg-gradient-to-r from-zinc-950 to-zinc-950 text-white rounded-xl shadow-lg">
              <ChartDataDashboard />
            </div>

            <div className="col-span-full">
              <HoldingCard holdings={data?.holdings ?? []} />
            </div>

            <div className="col-span-1 md:col-span-2">
              <RecentTransactionsDashboard recentTransactions={{ transactions: data?.transactions ?? [] }}  />
            </div>

            {/* <div className="bg-indigo-500 text-white flex items-center justify-center p-4">
              <p>
                Content 10 Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Placeat accusantium aspernatur unde aliquam. Explicabo
                possimus beatae similique, tempora consectetur odit laboriosam.
                Repellendus alias cum ipsam delectus, quis ipsa nostrum,
                inventore repudiandae quos iure vitae veniam. Quidem enim
                quaerat magnam itaque? Explicabo dolores commodi veritatis
                maxime maiores repudiandae ea similique in
              </p>
            </div> */}

            {/* <div className="bg-gray-700 text-white flex items-center justify-center p-4">
              <p>
                Content 11 Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Placeat accusantium aspernatur unde aliquam. Explicabo
                possimus beatae similique, tempora consectetur odit laboriosam.
                Repellendus alias cum ipsam delectus, quis ipsa nostrum,
                inventore repudiandae quos iure vitae veniam. Quidem enim
                quaerat magnam itaque? Explicabo dolores commodi veritatis
                maxime maiores repudiandae ea similique in
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
