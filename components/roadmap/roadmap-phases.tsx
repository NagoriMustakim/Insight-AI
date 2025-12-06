"use client"

import { roadmapData } from "@/data/roadmap"
import { Clock } from "lucide-react"

export function RoadmapPhases() {
  return (
    <div className="space-y-8 mb-8">
      {roadmapData.phases.map((phase) => (
        <div key={phase.id} className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{phase.title}</h3>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${phase.priorityColor}`}>
              {phase.priority}
            </span>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-neutral-800">
            {phase.items.map((item, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-gray-500 dark:text-gray-400">
                    Effort: <span className={`font-medium ${item.effortColor}`}>{item.effort}</span>
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    Impact: <span className={`font-medium ${item.impactColor}`}>{item.impact}</span>
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    Owner: <span className="font-medium text-gray-900 dark:text-white">{item.owner}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
