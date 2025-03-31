import React from 'react'

function Chartdata() {
  return (
    <div>
      <div className="mt-6 max-w-xl">
                    
                    <Chart
                        options={{
                            chart: {
                                id: "crypto-chart",
                                toolbar: { show: false },
                                background: "transparent",
                            },
                            xaxis: {
                                categories: priceHistory.map((item) => item.time),
                                labels: { style: { colors: "#aaa", fontSize: "12px" } },
                                axisBorder: { color: "#444" },
                                axisTicks: { color: "#444" },
                            },
                            yaxis: {
                                labels: { style: { colors: "#aaa", fontSize: "12px" } },
                                axisBorder: { color: "#444" },
                                axisTicks: { color: "#444" },
                            },
                            stroke: { curve: "smooth", width: 3 },
                            colors: ["#16a34a"], 
                            grid: { borderColor: "#444", strokeDashArray: 5 },
                            tooltip: {
                                theme: "dark",
                                style: { fontSize: "14px", color: "#111" }, 
                                y: {
                                    formatter: (value: number) => `$${value.toFixed(2)}`, 
                                },
                            },
                            markers: {
                                size: 5,
                                colors: ["#16a34a"],
                                strokeColors: "#222",
                                strokeWidth: 2,
                            },
                        }}
                        series={[{ name: "Price", data: priceHistory.map((item) => item.price) }]}
                        type="line"
                        height={350}
                    />

                    {/* Buttons for Hourly, Daily, Weekly */}
                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                                days === 1 ? "bg-green-500 text-black" : "bg-gray-700 hover:bg-gray-600"
                            }`}
                            onClick={() => setDays(1)}
                        >
                            Hourly
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                                days === 3 ? "bg-green-500 text-black" : "bg-gray-700 hover:bg-gray-600"
                            }`}
                            onClick={() => setDays(3)}
                        >
                            3 Days
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                                days === 7 ? "bg-green-500 text-black" : "bg-gray-700 hover:bg-gray-600"
                            }`}
                            onClick={() => setDays(7)}
                        >
                            Weekly
                        </button>
                    </div>
                </div>
    </div>
  )
}

export default Chartdata
