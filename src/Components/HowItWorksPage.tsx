"use client";

import { motion } from "framer-motion";
import { UserPlus, DollarSign, TrendingUp, BarChart3 } from "lucide-react";

const steps = [
  { title: "Sign Up", description: "Create a free account in seconds.", icon: UserPlus },
  { title: "Get Virtual Money", description: "Start with $100,000 in virtual funds to trade.", icon: DollarSign },
  { title: "Trade Crypto", description: "Buy & sell cryptocurrencies in real-time markets.", icon: TrendingUp },
  { title: "Track Progress", description: "Improve your skills and climb the leaderboard.", icon: BarChart3 },
];

// Container variants (for stagger effect)
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Step item variants
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full text-center">
        <motion.h2
          className="text-4xl font-extrabold mb-6 text-gray-100"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-gray-400 mb-12 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Getting started is simple! Follow these steps and begin your trading journey.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:bg-zinc-900"
            >
              <step.icon className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-200">{step.title}</h3>
              <p className="text-gray-400 mt-2">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
