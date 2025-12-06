"use client"

import { overviewData } from "@/data/overview"
import { CheckCircle2, AlertCircle, TrendingDown } from "lucide-react"

export function InsightsSection() {
  const { insights } = overviewData

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Top Strength */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm flex gap-4">
        <div className="mt-1">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-green-600 mb-1">{insights.strength.title}</h4>
          <p className="font-bold text-gray-900 dark:text-white mb-1">{insights.strength.metric}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{insights.strength.description}</p>
        </div>
      </div>

      {/* Top Critical Issue */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm flex gap-4">
        <div className="mt-1">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-red-500 mb-1">{insights.critical.title}</h4>
          <p className="font-bold text-gray-900 dark:text-white mb-1">{insights.critical.metric}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{insights.critical.description}</p>
        </div>
      </div>

      {/* Declining Metric */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm flex gap-4">
        <div className="mt-1">
          <TrendingDown className="h-6 w-6 text-orange-500" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-orange-500 mb-1">{insights.declining.title}</h4>
          <p className="font-bold text-gray-900 dark:text-white mb-1">{insights.declining.metric}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{insights.declining.description}</p>
        </div>
      </div>
    </div>
  )
}
