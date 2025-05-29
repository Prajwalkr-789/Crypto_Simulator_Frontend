import React from "react";

type recentTransactiondatatype = {
  coinName: string,
  commissionFee: number,
  createdAt: string;
  pricePerCoin: number;
  purchaseDate: string;
  quantity: number;
  totalAmount: number;
  transactionType: "buy" | "sell";
}

type recentTransactionType = {
  transactions: recentTransactiondatatype[];
};

// const recentTransactions: recentTransactionType = {
//   transactions: [
//     {
//       coinName: "Bitcoin",
//       priceBought: 42000.25,
//       quantity: 0.5,
//       totalSpent: 21000.125,
//       date: "2025-04-01",
//     },
//     {
//       coinName: "Ethereum",
//       priceBought: 2800.75,
//       quantity: 1.0,
//       totalSpent: 2800.75,
//       date: "2025-04-03",
//     },
//     {
//       coinName: "Litecoin",
//       priceBought: 160.5,
//       quantity: 2.5,
//       totalSpent: 401.25,
//       date: "2025-04-05",
//     },
//     {
//       coinName: "Cardano",
//       priceBought: 1.45,
//       quantity: 1000,
//       totalSpent: 1450,
//       date: "2025-04-06",
//     },
//     {
//       coinName: "Ripple",
//       priceBought: 1.2,
//       quantity: 5000,
//       totalSpent: 6000,
//       date: "2025-04-07",
//     },
//   ],
// };

function RecentTransactionsDashboard({recentTransactions}: {recentTransactions: recentTransactionType}) {
  return (
    <div>
      <div className=" bg-gradient-to-r from-zinc-950 to-zinc-950 text-white flex flex-col items-center justify-center p-4 rounded-xl max-w-2xl shadow-lg">
        <h2 className="text-xl text-gray-300 font-semibold mb-4">
          Recent Transactions
        </h2>
        <div className="w-full">
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
            {recentTransactions.transactions.map((transaction, index) => (
              <li
                key={index}
                className="mb-4 px-6 py-4 border border-zinc-800 hover:shadow-md shadow-zinc-800 text-white backdrop-blur-sm  rounded-xl transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400  to to-gray-500">
                    {transaction.coinName}
                  </span>
                  <span className="text-xs text-gray-400">
                    ${transaction.pricePerCoin}
                  </span>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-300">
                  <span className="text-xs">
                    Quantity: {transaction.quantity}
                  </span>
                  <span className="text-xs">
                    Total: ${transaction.pricePerCoin * transaction.quantity}
                  </span>
                </div>
                <div className="text-xs text-white/70 mt-2">
                  Date: {transaction.purchaseDate.slice(0, 10)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecentTransactionsDashboard;
