"use client";
import React from "react";
import { motion } from "framer-motion";
import Purpose from "./Purpose";
import FeaturesPage from "@/Components/FeaturesPage";
import HowItWorksPage from "./HowItWorksPage";
import Cryptoprices from "@/Components/Cryptoprices";
import "../app/globals.css";
import {
  ArrowRightCircleIcon,
} from "lucide-react";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
//   }),
// };



function Homepage() {
  return (
    <>
    <div>
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-1 bg-black">
      {/* bg-[#0e0e10] */}
      {/* bg-gradient-to-r from-[#14b8a6] via-[#38bdf8] to-[#9333ea] */}
      <div className="h-screen text-[#e4e4e7]  flex flex-row ml-[7%]  items-center justify-center text-center px-6 ">
        {/* left section */}
        <div className="flex flex-col justify-center items-center">
          <p
            className="text-5xl mb-10 md:text-7xl font-medium  bg-clip-text text-transparent bg-gradient-to-r
    from-gray-100 via-gray-400 to-gray-100 tracking-tight md:mt-20 drop-shadow-lg"
          >
            Experience the thrill of trading{" "}
            <span style={{textShadow:'0 0 1px #14b8a6, 0 0 3px #14b8a6, 0 0 15px #14b8a6'}} className="font-extralight text-[#14b8a6] ">Crypto</span>
          </p>

          <p className="text-lg text-center md:ml-[5%]  text-zinc-400 md:text-start w-full md:w-10/12 mb-12">
            Dive into a world of crypto trading. Learn, practice, and conquer in
            a risk-free environment, mastering your strategies in real-time.
          </p>

          {/* <ShinyButton>Shiny Button</ShinyButton> */}

          {/* <button className="mx-auto transition-all duration-300 ease-in-out transform hover:scale-105"> */}
            <div className="mt-6 flex flex-row justify-center   items-center text-zinc-300 border-zinc-800 border-l border-t border-b bg-[#0e0e10] px-6 py-3 text-lg rounded-sm shadow-lg border hover:border-[#14b8a6] hover:cursor-pointer  transition-all duration-400 ease-in-out">
              <button>Get Started</button>
              <ArrowRightCircleIcon className="ml-3 w-6 h-6 " />
            </div>
          {/* </button> */}
        </div>
        {/* right section */}
        <div className="hidden md:block flex flex-col justify-center items-center">
          <section className="max-w-7xl mx-auto px-4 py-20">
            
             <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className=" p-6  bg-transparent rounded-xl  hover:shadow-xl opacity-0 hover:opacity-20 transition-opacity duration-1000 ease-in-out">
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                  What is Crypto?
                </h3>
                <p className="text-gray-300 text-sm">
                  Cryptocurrency is digital money built on blockchain
                  technology. It’s decentralized, secure, and powered by
                  cryptography.
                </p>
              </div>

              <div className="p-6 rounded-xl hover:shadow-xl opacity-0 hover:opacity-25 transition-opacity duration-1000 ease-in-out">
                <h3 className="text-xl font-semibold text-emerald-400 mb-2">
                  Blockchain Basics
                </h3>
                <p className="text-gray-300 text-sm">
                  A blockchain is a public, unchangeable ledger that records all
                  transactions securely using consensus and cryptography.
                </p>
              </div>

              <div className="p-6 rounded-xl hover:shadow-xl opacity-0 hover:opacity-25 transition-opacity duration-1000 ease-in-out">
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  How Trading Works
                </h3>
                <p className="text-gray-300 text-sm">
                  Buy low, sell high. Crypto trading involves analyzing charts,
                  market trends, and using strategies like HODLing or scalping.
                </p>
              </div>

              <div className=" p-6 rounded-xl hover:shadow-xl opacity-0 hover:opacity-25 transition-opacity duration-1000 ease-in-out">
                <h3 className="text-xl font-semibold text-purple-400 mb-2">
                  Wallets & Security
                </h3>
                <p className="text-gray-300 text-sm">
                  Crypto wallets store your assets. Use hardware wallets and
                  enable 2FA for strong security in this digital frontier.
                </p>
              </div>

              <div className=" p-6 rounded-xl hover:shadow-xl opacity-0 hover:opacity-25 transition-opacity duration-1000 ease-in-out">
                <h3 className="text-xl font-semibold text-pink-400 mb-2">
                  Decentralization
                </h3>
                <p className="text-gray-300 text-sm">
                  Unlike traditional systems, decentralized networks like
                  Bitcoin run on peer-to-peer protocols without central control.
                </p>
              </div>

              <div className=" p-6 rounded-xl hover:shadow-xl opacity-0 hover:opacity-25 transition-opacity duration-1000 ease-in-out">
                <h3 className="text-xl font-semibold text-red-400 mb-2">
                  Risks & Rewards
                </h3>
                <p className="text-gray-300 text-sm">
                  Crypto is volatile — while gains can be huge, losses can be
                  just as fast. Learn, test, and manage your risks wisely.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="absolute bottom-10 left-0 w-full text-center hidden md:block">
          <div className="text-[#14b8a6] text-lg font-semibold animate-pulse">
            <span>
              BTC: $65,200 <span className="text-green-500">▲ 1.2%</span>{" "}
            </span>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      
    </div>
    </div>
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
   
  >
    <Purpose />
    {/* <CryptoSpotlight/> */}
    <FeaturesPage />
    <HowItWorksPage />
    <Cryptoprices />
  </motion.div>
  </>
  );
}

export default Homepage;
