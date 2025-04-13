import React from 'react';

const holdings = [
    { name: 'Bitcoin', symbol: 'BTC', amount: 2.5, value: 65000, change: 5 },
    { name: 'Ethereum', symbol: 'ETH', amount: 10, value: 4200, change: -2.3 },
    { name: 'Litecoin', symbol: 'LTC', amount: 50, value: 150, change: 1.2 },
    { name: 'Bitcoin', symbol: 'BTC', amount: 2.5, value: 65000, change: 5 },
  ];

const HoldingCard = () => {

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 sm:gap-y-2 gap-x-2 overflow-x-auto w-full h-full p-4 bg">
        {holdings.map(({ name, symbol, amount, value, change }, index) => {
          const changeClass = change > 0 ? 'text-green-500' : 'text-red-500';
          return (
            <div key={index} className="bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900 text-white rounded-2xl shadow-xl p-4 w-3/12 hover:scale-[1.02] transition-transform duration-300 ease-in-out border border-zinc-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">{name}</h3>
                  <p className="text-sm text-zinc-400 uppercase">{symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-emerald-400">${value}</p>
                  <p className={`text-sm font-medium ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {change > 0 ? '+' : ''}{change}%
                  </p>
                </div>
              </div>
            
              <div className="mt-5 border-t border-zinc-700 pt-4">
                <p className="text-sm text-zinc-400">Amount Held</p>
                <p className="text-lg font-semibold text-white">{amount}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HoldingCard;
