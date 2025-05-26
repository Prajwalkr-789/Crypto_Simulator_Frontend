"use client";

import { BarChart3, Lightbulb, ShieldCheck } from "lucide-react";
import React from "react";
import { delay, motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 , ease: "easeOut" } },
};

function Purpose() {
  return (
  
    <div className="flex  justify-center items-center min-h-screen px-5">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="p-8 rounded-2xl shadow-2xl bg-gradient-to-tr from-black via-[#04342f] to-black backdrop-blur-lg max-w-2xl text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="mb-4 text-white text-3xl font-bold"
        >
          Our Purpose
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-lg mb-6"
        >
          Empowering users to make informed financial decisions through intuitive
          tools, real-time data, and hands-on learning experiences.
        </motion.p>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {/* Feature 1 */}
          <motion.div
            variants={itemVariants}
            className="p-4 rounded-lg shadow-md border border-white/20"
          >
            <Lightbulb className="text-green-400 w-10 h-10 mx-auto mb-3" />
            <h3 className="text-white text-lg font-semibold">Learn & Grow</h3>
            <p className="text-gray-300 text-sm">
              Access educational resources to master crypto trading strategies.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={itemVariants}
            className="p-4 rounded-lg shadow-md border border-white/20"
          >
            <BarChart3 className="text-blue-400 w-10 h-10 mx-auto mb-3" />
            <h3 className="text-white text-lg font-semibold">Real-Time Insights</h3>
            <p className="text-gray-300 text-sm">
              Stay updated with live market trends and make data-driven decisions.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={itemVariants}
            className="p-4 rounded-lg shadow-md border border-white/20"
          >
            <ShieldCheck className="text-yellow-400 w-10 h-10 mx-auto mb-3" />
            <h3 className="text-white text-lg font-semibold">Risk-Free Trading</h3>
            <p className="text-gray-300 text-sm">
              Practice trading with virtual money—zero risk, maximum learning.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Purpose;
