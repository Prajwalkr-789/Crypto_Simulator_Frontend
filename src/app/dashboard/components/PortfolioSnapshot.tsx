'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'

interface Holding {
  coinName: string;
  purchaseDate: string;
  purchasePrice: number;
  quantity: number;
}


interface HoldingCardProps {
  holdings: Holding[];
}


const data = [
  { shortform: 'BTC' ,name : "Bitcoin" , value: 55 },
  { shortform: 'ETH',name : "Ethereum" ,value: 35 },
  { shortform: 'DOGE',name : "Dogecoin" , value: 10 },
]

const COLORS = ['#00b894', '#0984e3', '#fdcb6e']

export default function PortfolioSnapshot() {

  

  return (
    <Card className=" text-white border border-zinc-800 rounded-2xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Your Portfolio</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="h-44 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
                paddingAngle={2}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{borderRadius : "5px" ,backdropFilter:"blur(15px)"  , backgroundColor:"transparent"} }  />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-1 w-full text-sm text-center ">
          {data.map((entry, index) => (
            <div key={index} className="flex justify-between px-4">
                <div>
                    <span className='text-xs'>{entry.name} </span>
                    <span className='font-bold text-xs'>( {entry.shortform} )</span>
                </div>
              
              <span className='text-xs'>{entry.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
