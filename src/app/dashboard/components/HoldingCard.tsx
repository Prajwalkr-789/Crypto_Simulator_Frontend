import React from 'react';

const holdings = [
    { name: 'Bitcoin', symbol: 'BTC', amount: 2.5, value: 65000, change: 5 },
    { name: 'Ethereum', symbol: 'ETH', amount: 10, value: 4200, change: -2.3 },
    { name: 'Litecoin', symbol: 'LTC', amount: 50, value: 150, change: 1.2 },
    { name: 'Bitcoin', symbol: 'BTC', amount: 2.5, value: 65000, change: 5 },
  ];

const HoldingCard = () => {

  return (
    <div className="flex justify-center flex-col items-center">
      <p className='text-white  text-xl font-bold'> Current crypto Holdings </p>
      <div className="flex flex-row items-center flex-wrap space-y-1 max-sm:space-y-4 justify-center space-x-2  w-full h-full p-4 bg">
        {holdings.map(({ name, symbol, amount, value, change }, index) => {
          return (
            <div key={index} className="bg-gradient-to-tr sm:min-w-64 max-sm:min-w-72 from-black via-[#26085055] to-black border border-gray-800 text-white rounded-2xl shadow-xl p-4 w-3/12 hover:scale-[1.02] transition-transform duration-300 ease-in-out  ">
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
