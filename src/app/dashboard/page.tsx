"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Settings, Menu } from "lucide-react";
import Link from "next/link";
import ChartDataDashboard from "./components/chartDataDashboard";
import RecentTransactionsDashboard from "./components/RecentTransactionsDashboard";
import PortfolioSnapshot from "./components/PortfolioSnapshot";
import OpenOrdersOverview from "./components/OpenOrdersOverview";
import HoldingCard from "./components/HoldingCard";


function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-black mt-14">
      {/* Sidebar */}
      <div className="flex w-full h-full ">
        {/* Sidebar */}
        <motion.div
          className={`${
            isSidebarOpen ? "w-64" : "w-16"
          } bg-zinc-900 hidden md:block text-white transition-all duration-500 ease-in-out flex flex-col items-center py-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex justify-between w-full px-4">
            <h1
              className={`text-xl font-bold ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              CryptoSim
            </h1>
            <button onClick={toggleSidebar} className="text-white text-2xl">
              {isSidebarOpen ? (
                <Menu size={20} className="text-gray-200" />
              ) : (
                <Menu size={20} className="text-gray-200" />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="mt-6 w-full">
            <ul className="space-y-4 flex flex-col justify-start py-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-700 rounded-md"
                >
                  <Home className="w-6 h-6" />
                  {isSidebarOpen && <span>Dashboard</span>}
                </Link>
              </li>
              <li>
                <a
                  href="/profile"
                  className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-700 rounded-md"
                >
                  <User className="w-6 h-6" />
                  {isSidebarOpen && <span>Transaction History</span>}
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-700 rounded-md"
                >
                  <Settings className="w-6 h-6" />
                  {isSidebarOpen && <span>Settings</span>}
                </a>
              </li>
            </ul>
          </nav>
        </motion.div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6  min-h-screen overflow-auto">
          {/* Header */}
          {/* <div className="h-14 mb-6 bg-gradient-to-r from-[#1f2937] to-[#111827] backdrop-blur-sm border border-gray-700/50 shadow-sm flex items-center justify-between px-6 rounded-xl"> */}
          <div className="h-14 mb-6 bg-gradient-to-r from-zinc-950  to-zinc-950 backdrop-blur-sm border border-gray-700/50 shadow-sm flex items-center justify-between px-6 rounded-xl">
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Dashboard
            </h1>
            <div className="flex items-center space-x-3 sm:space-x-5">
              <span className="text-sm sm:text-base font-medium text-gray-200">
                User Name
              </span>
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 hover:text-white transition duration-200" />
            </div>
          </div>

          {/* Grid Section */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-min w-full">
            {/* content 1 starts */}
            <div className="min-h-[200px] bg-gradient-to-bl from-zinc-950 via-zinc-950 to-yellow-950  text-white flex flex-col items-center justify-between p-6 rounded-lg shadow-lg relative">
              <div className="absolute top-4 text-center w-full">
                <h2 className="text-xl font-semibold">Wallet Balance</h2>
              </div>
              <div className="flex flex-col items-center justify-center flex-grow">
                <p className="text-4xl font-bold text-center text-blue-500">
                  $5,423.89
                </p>
              </div>
              <div className="absolute text-gray-300 bottom-4 left-6 text-md font-medium">
                <p>Recent</p>
              </div>
              <div className="absolute bottom-4 right-6 text-md font-bold text-red-400">
                <p>- $132.45</p>
              </div>
            </div>
            {/*  */}
            {/* content 2 starts */}
            <div className="min-h-[170px] bg-gradient-to-r from-zinc-950  to-zinc-950 border border-zinc-600 backdrop-blur-md   rounded-xl p-6 text-white shadow-md flex flex-col justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-center tracking-wide text-white/90">
                Profit & Loss Summary
              </h2>

              <div className="flex flex-col justify-between items-center gap-4 mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-sm text-white/70">Lifetime</span>
                  <span className="text-3xl font-extrabold text-green-500">
                    $8,920.75
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm text-white/70">Today</span>
                  <span className="text-3xl font-extrabold text-red-400">
                    - $142.30
                  </span>
                </div>
              </div>

              <div className="mt-4 text-xs text-white/60 text-center">
                Updated just now
              </div>
            </div>

            <div className="min-h-[150px] ">
              <PortfolioSnapshot/>
            </div>

            <div className="min-h-[200px] bg-yellow-500 text-white ">
             <OpenOrdersOverview/>
            </div>
            {/* content 5 and graph of profit and loss starts here */}
            <div className="col-span-1 sm:col-span-2 md:col-span-3 bg-gradient-to-r from-zinc-950  to-zinc-950 text-white rounded-xl shadow-lg">
              <ChartDataDashboard/>
            </div>

            <div className="col-span-1 sm:col-span-4 ">
              <HoldingCard/>
            </div>

            {/* <div className="col-span-1 sm:col-span-2 md:col-span-2 bg-teal-500 text-white flex items-center justify-center p-4">
              <p>
                Content 8 Content 3 Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Placeat accusantium aspernatur unde aliquam.
                Explicabo possimus beatae similique, tempora consectetur odit
                laboriosam. Repellendus alias cum ipsam delectus, quis ipsa
                nostrum, inventore repudiandae quos iure vitae veniam. Quidem
                enim quaerat magnam itaque? Explicabo dolores commodi veritatis
                maxime maiores repudiandae ea similique in
              </p>
            </div> */}

            {/* content 9 Recent Transactions */}
            <div className="col-span-1 sm:col-span-2 md:col-span-2 ">
              <RecentTransactionsDashboard/>
            </div>

            <div className="bg-indigo-500 text-white flex items-center justify-center p-4">
              <p>
                Content 10 Content 3 Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Placeat accusantium aspernatur unde aliquam.
                Explicabo possimus beatae similique, tempora consectetur odit
                laboriosam. Repellendus alias cum ipsam delectus, quis ipsa
                nostrum, inventore repudiandae quos iure vitae veniam. Quidem
                enim quaerat magnam itaque? Explicabo dolores commodi veritatis
                maxime maiores repudiandae ea similique in
              </p>
            </div>

            <div className="bg-gray-700 text-white flex items-center justify-center p-4">
              <p>
                Content 11 Content 3 Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Placeat accusantium aspernatur unde aliquam.
                Explicabo possimus beatae similique, tempora consectetur odit
                laboriosam. Repellendus alias cum ipsam delectus, quis ipsa
                nostrum, inventore repudiandae quos iure vitae veniam. Quidem
                enim quaerat magnam itaque? Explicabo dolores commodi veritatis
                maxime maiores repudiandae ea similique in
              </p>
            </div>
          </div>
        </div>
        {/* Content End */}
      </div>
    </div>
  );
}

export default Page;
