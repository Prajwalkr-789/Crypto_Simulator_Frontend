"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CryptoChart = ({
  priceHistory,
  days,
  setDays,
}: {
  priceHistory: any[];
  days: number;
  setDays: (days: number) => void;
}) => {
  return (
    <div className="w-full md:w-2/4">
      <Chart
        options={{
          chart: {
            id: "crypto-chart",
            toolbar: { show: false },
            background: "transparent",
          },
          xaxis: {
            categories: priceHistory?.map((item) => item.time) || [],
            labels: { style: { colors: "#aaa", fontSize: "12px" } },
          },
          yaxis: {
            labels: { style: { colors: "#aaa", fontSize: "12px" } },
          },
          stroke: { curve: "smooth", width: 3 },
          colors: ["#16a34a"],
          grid: { borderColor: "#444", strokeDashArray: 5 },
          tooltip: {
            theme: "dark",
            y: { formatter: (value: number) => `$${value.toFixed(2)}` },
          },
        }}
        series={[
          {
            name: "Price",
            data: priceHistory?.map((item) => item.price) || [],
          },
        ]}
        type="line"
        height={350}
      />

      {/* Buttons for Hourly, 3 Days, Weekly */}
      <div className="flex justify-center gap-4 mt-4">
        {["1", "3", "7"].map((day) => (
          <button
            key={day}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
              days === +day ? "bg-green-500 text-black" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setDays(+day)}
          >
            {day === "1" ? "Hourly" : day === "3" ? "3 Days" : "Weekly"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CryptoChart;
