"use client"

import { overviewData } from "@/data/overview"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function SentimentChart() {
  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sentiment Trend (6 Months)</h3>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={overviewData.sentimentTrend}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-neutral-800" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              domain={[60, 90]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
              }}
              itemStyle={{ fontSize: '12px', fontWeight: 500 }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="Amazon" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4, fill: "#F59E0B", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="BestBuy" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4, fill: "#3B82F6", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Overall" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4, fill: "#8B5CF6", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Walmart" stroke="#06B6D4" strokeWidth={2} dot={{ r: 4, fill: "#06B6D4", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Website" stroke="#10B981" strokeWidth={2} dot={{ r: 4, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
