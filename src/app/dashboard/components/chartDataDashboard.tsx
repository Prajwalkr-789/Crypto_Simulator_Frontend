'use client'
import React, { useState } from 'react'
import {
    CartesianGrid,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    Legend,
  } from "recharts";

  type fakedata = {
    date: string;
    profit?: number;
    loss?: number;
  };
  
  type fakedataType = {
    all: fakedata[];
    profitOnly: fakedata[];
  };
  
  const FakeData: fakedataType = {
    all: [
      { date: "Apr 1", profit: 200, loss: 50 },
      { date: "Apr 2", profit: 100, loss: 30 },
      { date: "Apr 3", profit: 300, loss: 20 },
      { date: "Apr 4", profit: 150, loss: 40 },
      { date: "Apr 5", profit: 20, loss: 60 },
      { date: "Apr 6", profit: 50, loss: 160 },
      { date: "Apr 7", profit: 950, loss: 360 },
      { date: "Apr 9", profit: 450, loss: 660 },
      { date: "Apr 10", profit: 750, loss: 360 },
    ],
    profitOnly: [
      { date: "Apr 1", profit: 200 },
      { date: "Apr 2", profit: 100 },
      { date: "Apr 3", profit: 300 },
      { date: "Apr 4", profit: 150 },
      { date: "Apr 5", profit: 20 },
      { date: "Apr 6", profit: 50 },
      { date: "Apr 7", profit: 950 },
      { date: "Apr 9", profit: 450 },
      { date: "Apr 10", profit: 750 },
    ],
  };



function ChartDataDashboard() {

    const [view, setView] = useState<keyof fakedataType>("profitOnly");

    const data = FakeData[view];

  return (
    <div>
      <div className="w-full bg-gradient-to-r from-zinc-950  to-zinc-950 text-white p-0.5 md:p-4 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                      Profit & Loss Chart
                    </h2>
      
                    <div className="flex justify-center gap-4 mb-4">
                      <button
                        onClick={() => setView("all")}
                        className={`px-3 py-1 rounded-md text-sm font-medium border transition duration-200 ${
                          view === "all"
                            ? "bg-white text-gray-700"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        Profit & Loss
                      </button>
                      <button
                        onClick={() => setView("profitOnly")}
                        className={`px-3 py-1 rounded-md text-sm font-medium border transition duration-200 ${
                          view === "profitOnly"
                            ? "bg-white text-gray-700"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        Profit
                      </button>
                    </div>
      
                    <ResponsiveContainer width="100%" height={260}>
                      <LineChart
                        data={data}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                        <XAxis dataKey="date" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip
                          contentStyle={{
                            backdropFilter: "blur(4px)",
                            backgroundColor: "rgba(30,30,30,0.7)",
                            border: "1px solid gray",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                        />
                        {view !== "all" && (

                          <Line
                            type="monotone"
                            dataKey="profit"
                            stroke="green"
                            strokeWidth={2}
                          />
                         
                        )}
                        {view !== "profitOnly" && (
                          <Line
                            type="monotone"
                            dataKey="loss"
                            stroke="red"
                            strokeWidth={2}
                            
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
      
    </div>
  )
}

export default ChartDataDashboard
