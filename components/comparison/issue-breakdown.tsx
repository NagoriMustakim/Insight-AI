"use client"

import { comparisonData } from "@/data/comparison"

export function IssueBreakdown() {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Platform-Specific Issue Breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(comparisonData.issues).map(([platform, issues]) => (
          <div key={platform} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">{platform}</h4>
            <div className="space-y-3">
              {issues.map((issue, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{issue.name}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full 
                    ${issue.severity === 'High' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 
                      issue.severity === 'Medium' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' : 
                      'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'}`}>
                    {issue.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
