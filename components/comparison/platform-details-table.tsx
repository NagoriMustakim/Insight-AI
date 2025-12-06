"use client"

import { comparisonData } from "@/data/comparison"
import { Star, TrendingUp, TrendingDown, ThumbsUp, ThumbsDown, Minus } from "lucide-react"

export function PlatformDetailsTable() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm mb-8 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-neutral-800">
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Platform</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reviews</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sentiment</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Distribution</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
            {comparisonData.details.map((platform) => (
              <tr key={platform.platform} className="hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors">
                <td className="py-4 px-6 text-sm font-bold text-gray-900 dark:text-white">{platform.platform}</td>
                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">{platform.reviews.toLocaleString()}</td>
                <td className="py-4 px-6 text-sm font-bold text-blue-600">{platform.sentiment}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{platform.rating}</span>
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3 text-xs font-medium">
                    <span className="flex items-center gap-1 text-green-600"><ThumbsUp className="h-3 w-3" /> {platform.distribution.positive}%</span>
                    <span className="flex items-center gap-1 text-yellow-600"><Minus className="h-3 w-3" /> {platform.distribution.neutral}%</span>
                    <span className="flex items-center gap-1 text-red-600"><ThumbsDown className="h-3 w-3" /> {platform.distribution.negative}%</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className={`flex items-center gap-1 text-sm font-medium ${platform.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {platform.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {platform.trend > 0 ? '+' : ''}{platform.trend}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
