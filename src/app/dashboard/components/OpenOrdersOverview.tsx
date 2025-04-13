'use client'

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'

const data = [
  { time: '10:00', buy: 1200, sell: 800 },
  { time: '11:00', buy: 1000, sell: 700 },
  { time: '12:00', buy: 1400, sell: 1000 },
  { time: '13:00', buy: 900, sell: 600 },
  { time: '14:00', buy: 1500, sell: 1100 },
]

export default function OpenOrdersOverview() {
  return (
    <Card className="bg-gradient-to-br from-gray-800 to-black text-white rounded-2xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Open Orders</CardTitle>
      </CardHeader>
      <CardContent className="h-48 w-full">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBuy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00b894" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00b894" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSell" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d63031" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#d63031" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#ccc"/>
            <YAxis stroke="#ccc"/>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <Tooltip />
            <Area type="monotone" dataKey="buy" stroke="#00b894" fillOpacity={1} fill="url(#colorBuy)" />
            <Area type="monotone" dataKey="sell" stroke="#d63031" fillOpacity={1} fill="url(#colorSell)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
