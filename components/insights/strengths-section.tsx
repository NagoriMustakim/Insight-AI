"use client"

import { insightsData } from "@/data/insights"
import { CheckCircle2 } from "lucide-react"

export function StrengthsSection() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle2 className="h-6 w-6 text-green-500" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Strengths (What's Working Well)</h3>
      </div>
      <div className="space-y-4">
        {insightsData.strengths.map((item) => (
          <div key={item.rank} className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-xl">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.mentions.toLocaleString()} mentions • {item.sentiment}% positive sentiment
              </p>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold text-sm">
              #{item.rank}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
