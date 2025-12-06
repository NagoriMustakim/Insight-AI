"use client"

import { comparisonData } from "@/data/comparison"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function SentimentDistributionChart() {
  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Overall Sentiment Distribution</h3>
      </div>
      <div className="h-[300px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={comparisonData.sentimentDistribution}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
            >
              {comparisonData.sentimentDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
              }}
              itemStyle={{ fontSize: '12px', fontWeight: 500 }}
            />
            <Legend 
              verticalAlign="middle" 
              align="right"
              layout="vertical"
              iconType="circle"
              formatter={(value, entry: any) => <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">{value}: {entry.payload.value}%</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
