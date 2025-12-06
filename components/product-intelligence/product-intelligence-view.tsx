"use client"

import { productIntelligenceData } from "@/data/product-intelligence"
import { FeatureClusters } from "./feature-clusters"
import { WhatIfSimulator } from "./what-if-simulator"
import { LaunchRiskPredictor } from "./launch-risk-predictor"
import { Brain, Sparkles, DollarSign, Target, BarChart3 } from "lucide-react"

export function ProductIntelligenceView() {
  const { summaryStats } = productIntelligenceData

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Development Intelligence</h2>
            <p className="text-gray-500 dark:text-gray-400">AI-powered insights to guide your product decisions</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-4 w-4 text-indigo-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Requests</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {summaryStats.totalFeatureRequests.toLocaleString()}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">AI Clusters</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {summaryStats.clustersIdentified}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-red-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Revenue at Risk</span>
          </div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            ${(summaryStats.totalRevenueAtRisk / 1000).toFixed(0)}k
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-green-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Model Accuracy</span>
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {summaryStats.modelAccuracy}%
          </div>
        </div>
      </div>

      {/* Main Content - Single Column Stacked Layout */}
      <div className="space-y-8">
        {/* Feature Clusters */}
        <FeatureClusters />

        {/* What-If Simulator */}
        <WhatIfSimulator />

        {/* Launch Risk Predictor */}
        <LaunchRiskPredictor />
      </div>
    </>
  )
}
