"use client";

import { CheckCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const features = [
  {
    title: "Risk-Free Trading",
    description: "No real money, just learning! Practice with virtual funds.",
  },
  {
    title: "Real-Time Market Data",
    description: "Stay updated with live stock prices refreshed every second.",
  },
  {
    title: "Compete with Others",
    description: "Climb the leaderboard, challenge friends, and test your skills.",
  },
  {
    title: "Learn & Improve",
    description: "Access tutorials, tips, and expert insights to become a pro.",
  },
];

const dummyBitcoinData = [
  { time: "7", price: 3500 },
  { time: "8", price: 4120 },
  { time: "9", price: 4095 },
  { time: "10", price: 4150 },
  { time: "11", price: 4170 },
  { time: "12", price: 4530 },
  { time: "13", price: 4190 },
];

const cryptoPrices = [
  { name: "Bitcoin", price: "$41,000" },
  { name: "Ethereum", price: "$2,500" },
  { name: "BNB", price: "$300" },
  { name: "Solana", price: "$120" },
  { name: "XRP", price: "$0.58" },
  { name: "BNB", price: "$300" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0.2) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12">
        {/* Left Section - Features */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="md:w-1/2"
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-extrabold mb-10 text-gray-100"
          >
            Why Choose Us?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="text-gray-400 mb-6 text-lg max-w-lg"
          >
            Experience a next-level trading simulator with real-time data,
            risk-free trading, and a competitive edge.
          </motion.p>

          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={0.3 + index * 0.15}
                variants={fadeUp}
                className="p-6 rounded-xl shadow-md flex flex-col items-start hover:shadow-lg hover:bg-zinc-900 transition duration-300"
                style={{ border: "0.1px solid oklch(0.442 0.017 285.786)" }}
              >
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <h3 className="text-xl font-bold text-gray-200">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-400 mt-2">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Section - Charts */}
        <motion.div
          className="md:w-1/2 flex flex-col gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Bitcoin Chart */}
          <motion.div
            variants={fadeUp}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="p-6 rounded-xl shadow-lg h-96 flex flex-col justify-center text-center"
          >
            <h3 className="text-gray-200 font-semibold text-xl mb-3">
              Bitcoin Price Trends
            </h3>
            <h4 className="mb-5">Tracking the price of crypto made easy</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dummyBitcoinData}>
                <XAxis className="text-sm" dataKey="time" stroke="#aaa" />
                <YAxis className="text-sm" domain={["auto", "auto"]} stroke="#aaa" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "transparent",
                    backdropFilter: "blur(10px)",
                    borderRadius: "2px",
                    border: "0.5px solid #4b5563",
                  }}
                  itemStyle={{ color: "#ffff" }}
                  cursor={true}
                  labelStyle={{ color: "#fff" }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#00c896"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Live Crypto Prices */}
          <motion.div
            variants={fadeUp}
            className="p-6 rounded-xl shadow-lg h-56 overflow-hidden relative text-center"
          >
            <h3 className="text-zinc-200 font-semibold text-xl text-center mb-3">
              Live Market Prices
            </h3>
            <div className="animate-scroll absolute top-14 w-full">
              {cryptoPrices.map((item, i) => (
                <div
                  key={i}
                  className={`text-center text-lg text-gray-${500 + i * 100} py-1`}
                >
                  <span className="font-semibold">{item.name}</span> {item.price}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
