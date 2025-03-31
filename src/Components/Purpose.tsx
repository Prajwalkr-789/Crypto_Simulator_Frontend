import { BarChart3, Lightbulb, ShieldCheck } from 'lucide-react'
import React from 'react'

function Purpose() {
  return (
    <div className="flex bg-black justify-center items-center h-screen bg-gradient-to-br  px-5">
    <div className="p-8 rounded-2xl shadow-2xl  backdrop-blur-lg max-w-2xl text-center  ">
      <h2 className="mb-4 text-white text-3xl font-bold">Our Purpose</h2>
      <p className="text-gray-300 text-lg mb-6">
        Empowering users to make informed financial decisions through intuitive tools, real-time data, and hands-on learning experiences.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="p-4  rounded-lg shadow-md border border-white/20">
          <Lightbulb className="text-green-400 w-10 h-10 mx-auto mb-3" />
          <h3 className="text-white text-lg font-semibold">Learn & Grow</h3>
          <p className="text-gray-300 text-sm">
            Access educational resources to master crypto trading strategies.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="p-4  rounded-lg shadow-md border border-white/20">
          <BarChart3 className="text-blue-400 w-10 h-10 mx-auto mb-3" />
          <h3 className="text-white text-lg font-semibold">Real-Time Insights</h3>
          <p className="text-gray-300 text-sm">
            Stay updated with live market trends and make data-driven decisions.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="p-4  rounded-lg shadow-md border border-white/20">
          <ShieldCheck className="text-yellow-400 w-10 h-10 mx-auto mb-3" />
          <h3 className="text-white text-lg font-semibold">Risk-Free Trading</h3>
          <p className="text-gray-300 text-sm">
            Practice trading with virtual money—zero risk, maximum learning.
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Purpose
