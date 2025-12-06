"use client"

import { roadmapData } from "@/data/roadmap"
import { TrendingUp, Star, CheckCircle2, ThumbsUp } from "lucide-react"

const iconMap = {
  TrendingUp,
  Star,
  CheckCircle2,
  ThumbsUp,
}

export function ExpectedOutcomes() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Expected Outcomes After Roadmap Completion</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roadmapData.outcomes.map((outcome, index) => {
          const Icon = iconMap[outcome.icon as keyof typeof iconMap]
          return (
            <div key={index} className={`p-4 rounded-xl border ${outcome.color}`}>
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 ${outcome.iconColor}`} />
                <div>
                  <h4 className="font-bold text-sm mb-1">{outcome.title}</h4>
                  <p className="text-xs opacity-80">{outcome.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
