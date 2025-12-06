"use client"

import { overviewData } from "@/data/overview"
import { TrendingUp, Star, AlertCircle, MessageSquare } from "lucide-react"

export function StatsCards() {
  const { healthScore, totalReviews, avgRating, criticalIssues } = overviewData

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Health Score */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Health Score</p>
          <TrendingUp className="h-5 w-5 text-green-500" />
        </div>
        <div className="flex items-end gap-3">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{healthScore.score}/100</h3>
        </div>
        <p className="text-xs font-medium text-green-600 mt-2">
          +{healthScore.change}% from last month
        </p>
      </div>

      {/* Total Reviews */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Reviews</p>
          <Star className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="flex items-end gap-3">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{totalReviews.count.toLocaleString()}</h3>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Across {totalReviews.platforms} platforms
        </p>
      </div>

      {/* Avg Rating */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Star Rating</p>
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        </div>
        <div className="flex items-end gap-3">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{avgRating.score}</h3>
        </div>
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className={`h-3 w-3 ${star <= Math.round(avgRating.score) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`} 
            />
          ))}
        </div>
      </div>

      {/* Critical Issues */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full -mr-2 -mt-2"></div>
        <div className="flex justify-between items-start mb-4 relative">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Critical Issues</p>
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="flex items-end gap-3 relative">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{criticalIssues.count}</h3>
        </div>
        <p className="text-xs font-medium text-red-500 mt-2 relative">
          {criticalIssues.message}
        </p>
      </div>
    </div>
  )
}
