"use client"

import { productIntelligenceData } from "@/data/product-intelligence"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { TrendingUp, TrendingDown, Minus, DollarSign, Users, Layers } from "lucide-react"

const trendIcons = {
  rising: <TrendingUp className="h-4 w-4 text-green-500" />,
  declining: <TrendingDown className="h-4 w-4 text-red-500" />,
  stable: <Minus className="h-4 w-4 text-gray-400" />,
}

const priorityColors = [
  "#6366F1", // indigo
  "#8B5CF6", // violet
  "#A855F7", // purple
  "#D946EF", // fuchsia
  "#EC4899", // pink
  "#F43F5E", // rose
]

export function FeatureClusters() {
  const { featureClusters, summaryStats } = productIntelligenceData

  const chartData = featureClusters.map((cluster, index) => ({
    name: cluster.theme.split(" ")[0],
    requests: cluster.requestCount,
    color: priorityColors[index % priorityColors.length],
  }))

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-neutral-800 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-500" />
              Feature Request Clustering
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              AI-grouped themes from {summaryStats.totalFeatureRequests.toLocaleString()} feature requests
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{summaryStats.clustersIdentified}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Clusters Identified</div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 11 }}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  padding: '12px 16px',
                }}
                formatter={(value: number) => [`${value.toLocaleString()} requests`, 'Volume']}
              />
              <Bar dataKey="requests" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cluster Cards */}
      <div className="p-6 space-y-4">
        {featureClusters.map((cluster, index) => (
          <div
            key={cluster.id}
            className="group p-4 rounded-xl border border-gray-100 dark:border-neutral-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: priorityColors[index % priorityColors.length] }}
                  >
                    {cluster.priorityScore}
                  </span>
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                    {cluster.theme}
                  </h4>
                  {trendIcons[cluster.trend as keyof typeof trendIcons]}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{cluster.requestCount.toLocaleString()}</span> requests
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      ${(cluster.revenueImpact / 1000).toFixed(0)}k
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">at risk</span>
                  </div>
                  <div className="text-red-500 font-medium">
                    -{cluster.sentimentDrop}% sentiment
                  </div>
                </div>

                {/* Top Requests Preview */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cluster.topRequests.slice(0, 2).map((request, i) => (
                    <span
                      key={i}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 rounded-md truncate max-w-[180px]"
                    >
                      {request}
                    </span>
                  ))}
                  {cluster.topRequests.length > 2 && (
                    <span className="inline-block px-2 py-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                      +{cluster.topRequests.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="p-4 bg-gray-50 dark:bg-neutral-800/50 border-t border-gray-100 dark:border-neutral-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Total Revenue at Risk:
            <span className="font-bold text-red-500 ml-2">
              ${(summaryStats.totalRevenueAtRisk / 1000).toFixed(0)}k/month
            </span>
          </span>
          <span className="text-gray-400 dark:text-gray-500 text-xs">
            Updated {summaryStats.lastUpdated}
          </span>
        </div>
      </div>
    </div>
  )
}
