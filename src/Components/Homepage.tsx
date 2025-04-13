"use client";
import React from "react";
import { motion } from "framer-motion";
import Purpose from "./Purpose";
import FeaturesPage from "@/Components/FeaturesPage";
import HowItWorksPage from "./HowItWorksPage";
import Cryptoprices from "@/Components/Cryptoprices";
import '../app/globals.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

function Home() {
  return (
    <div className="bg-black text-gray-200">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          className="text-6xl mainheader2 font-extrabold bg-gradient-to-r from-zinc-500 via-zinc-600 to-zinc-900  bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Crypto Simulator
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl  mt-4 max-w-2xl text-transparent bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700 bg-clip-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Experience the thrill of trading cryptocurrencies in a risk-free environment. Learn, practice, and master the art of crypto trading.
        </motion.p>

        <motion.button
          className="mt-6  text-zinc-300 border-zinc-800 border-l border-t border-b bg-gradient-to-r from-zinc-900 via-zinc-950 to-black px-6 py-3 text-lg rounded-sm shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.1 }}
        >
          Get Started
        </motion.button>

        {/* Features */}
        <div className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Real-Time Market Data",
              desc: "Stay updated with the latest market trends and prices. Analyze and make informed decisions.",
            },
            {
              title: "Risk-Free Trading",
              desc: "Practice trading with virtual currency. No real money involved, just pure learning.",
            },
            {
              title: "Track Your Progress",
              desc: "Monitor your performance and improve your strategies over time.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 shadow-lg border border-zinc-800 text-center"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-green-400 text-xl font-semibold">
                {feature.title}
              </h3>
              <p className="text-gray-300 mt-3">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Sections */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Purpose />
        <FeaturesPage />
        <HowItWorksPage />
        <Cryptoprices />
      </motion.div>
    </div>
  );
}

export default Home;
