"use client"

import { insightsData } from "@/data/insights"

export function ThemesCloud() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Key Themes Overview</h3>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-4 items-center justify-center p-4">
        {insightsData.themes.map((theme, index) => (
          <span key={index} className={`${theme.color} ${theme.size} font-medium hover:scale-110 transition-transform cursor-default`}>
            {theme.text}
          </span>
        ))}
      </div>
    </div>
  )
}
