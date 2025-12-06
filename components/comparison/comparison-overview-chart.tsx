"use client"

import { comparisonData } from "@/data/comparison"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

export function ComparisonOverviewChart() {
  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Platform Comparison Overview</h3>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={comparisonData.overview}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-neutral-800" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              domain={[0, 100]}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
              }}
              itemStyle={{ fontSize: '12px', fontWeight: 500 }}
            />
            <Bar dataKey="sentiment" radius={[8, 8, 0, 0]} barSize={60}>
              {comparisonData.overview.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#6366f1] rounded-sm"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Sentiment Score</span>
         </div>
      </div>
    </div>
  )
}
