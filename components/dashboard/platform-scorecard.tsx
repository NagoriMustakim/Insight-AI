"use client"

import { overviewData } from "@/data/overview"
import { Star } from "lucide-react"

export function PlatformScorecard() {
  const { platformPerformance } = overviewData

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Platform Performance Scorecard</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformPerformance.map((platform) => (
          <div key={platform.name} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-gray-900 dark:text-white">{platform.name}</h4>
              <span className="text-2xl font-bold text-blue-600">{platform.score}</span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Reviews:</span>
                <span className="font-medium text-gray-900 dark:text-white">{platform.reviews.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Rating:</span>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-900 dark:text-white">{platform.rating}</span>
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                </div>
              </div>
            </div>

            <div className="flex h-2 rounded-full overflow-hidden">
              <div style={{ width: `${platform.sentiment.positive}%` }} className="bg-green-400" />
              <div style={{ width: `${platform.sentiment.neutral}%` }} className="bg-yellow-400" />
              <div style={{ width: `${platform.sentiment.negative}%` }} className="bg-red-400" />
            </div>
            
            <div className="flex justify-between mt-2 text-[10px] text-gray-500 dark:text-gray-400 font-medium">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400"></div>{platform.sentiment.positive}% +</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400"></div>{platform.sentiment.neutral}% -</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400"></div>{platform.sentiment.negative}% -</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
