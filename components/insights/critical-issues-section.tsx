"use client"

import { insightsData } from "@/data/insights"
import { XCircle } from "lucide-react"

export function CriticalIssuesSection() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <XCircle className="h-6 w-6 text-red-500" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Critical Issues (Immediate Action Required)</h3>
      </div>
      <div className="space-y-4">
        {insightsData.criticalIssues.map((item) => (
          <div key={item.rank} className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded">Critical</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {item.mentions.toLocaleString()} mentions • {item.sentiment}% negative sentiment
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 dark:text-gray-500">Affected platforms:</span>
                <div className="flex gap-2">
                  {item.platforms.map((platform) => (
                    <span key={platform} className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-neutral-800 px-2 py-0.5 rounded border border-gray-100 dark:border-neutral-700">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold text-sm">
              #{item.rank}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
