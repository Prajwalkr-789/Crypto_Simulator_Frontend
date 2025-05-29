import React from 'react';

interface Holding {
  coinName: string;
  purchaseDate: string;
  purchasePrice: number;
  quantity: number;
}

// const holdings = [
//     { name: 'Bitcoin', symbol: 'BTC', amount: 2.5, value: 65000, change: 5 },
//     { name: 'Ethereum', symbol: 'ETH', amount: 10, value: 4200, change: -2.3 },
//     { name: 'Litecoin', symbol: 'LTC', amount: 50, value: 150, change: 1.2 },
//     { name: 'Bitcoin', symbol: 'BTC', amount: 2.5, value: 65000, change: 5 },
//   ];

interface HoldingCardProps {
  holdings: Holding[];
}

// const HoldingCard = ({holdings}) => {
const HoldingCard: React.FC<HoldingCardProps> = ({ holdings }) => {

  return (
    <div className="flex justify-center flex-col items-center">
      <p className='text-white  text-xl font-bold'> Current crypto Holdings </p>
      {
        holdings.length === 0 ? (
          <p className='text-white text-sm font-semibold'>No holdings found</p>
        ) : <div className="flex flex-row items-center flex-wrap space-y-1 max-sm:space-y-4 justify-center space-x-2  w-full h-full p-4 bg">
        {holdings.map((holding, index) => {
          return (
            <div key={index} className="bg-gradient-to-tr sm:min-w-64 max-sm:min-w-72 from-black via-[#26085055] to-black border border-gray-800 text-white rounded-2xl shadow-xl p-4 w-3/12 hover:scale-[1.02] transition-transform duration-300 ease-in-out  ">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">{holding.coinName.charAt(0).toUpperCase() + holding.coinName.slice(1)}</h3>
                  {/* <p className="text-sm text-zinc-400 uppercase">{holding.symbol}</p> */}
                </div>
                <div className="text-right">
                  <p className="text-md font-bold text-emerald-400">Bought at : ${holding.purchasePrice}</p>
                  <p className="text-md font-bold text-gray-400">Total value : ${holding.purchasePrice * holding.quantity}</p>

                  {/* <p className={`text-sm font-medium ${holding.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {holding.change > 0 ? '+' : ''}{holding.change}%
                  </p> */}
                </div>
              </div>
            
              <div className="mt-5 border-t border-zinc-700 pt-4 flex flex-row justify-between items-center">
                <div className='flex flex-col items-center '>
                    <p className="text-sm text-zinc-400 ">Amount Held</p>
                    <p className="text-lg font-semibold text-white">{holding.quantity}</p>
                </div>
                <div className='flex flex-col items-end'>
                    <p className="text-sm text-zinc-400">Date</p>
                    <p className="text-sm font-semibold text-white">{holding.purchaseDate.slice(0,10)}</p>
                </div>

              </div>
            </div>
          );
        })}
      </div>
      }
      
    </div>
  );
};

export default HoldingCard;
