'use client'
import React from 'react'
import Purpose from './Purpose'
import FeaturesPage from '@/Components/FeaturesPage'
import HowItWorksPage from './HowItWorksPage'
import Cryptoprices from '@/Components/Cryptoprices'

function Home() {
  return (
      <div  className="bg-black text-gray-200">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl font-extrabold bg-gradient-to-t from-zinc-800 via-zinc-500 to-zinc-300 text-transparent bg-clip-text">
          Crypto Simulator
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-2xl">
          Experience the thrill of trading cryptocurrencies in a risk-free environment.
          Learn, practice, and master the art of crypto trading.
        </p>
        <button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg rounded-lg shadow-lg">
          Get Started
        </button>
        <div className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          { title: "Real-Time Market Data", desc: "Stay updated with the latest market trends and prices. Analyze and make informed decisions." },
          { title: "Risk-Free Trading", desc: "Practice trading with virtual currency. No real money involved, just pure learning." },
          { title: "Track Your Progress", desc: "Monitor your performance and improve your strategies over time." },
        ].map((feature, index) => (
          <div key={index} className="bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-700 text-center">
            <h3 className="text-green-400 text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-300 mt-3">{feature.desc}</p>
          </div>
        ))}
      </div>
      <div>
      
      </div>
      </div>

      {/* Features Section */}
     

      {/* Additional Sections */}
      <Purpose />  
      <FeaturesPage />
      <HowItWorksPage />
      <Cryptoprices />
    </div>
  )
}

export default Home