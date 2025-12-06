"use client"

import * as React from "react"
import { productIntelligenceData } from "@/data/product-intelligence"
import { Zap, DollarSign, Users, Clock, Target, ChevronRight, Sparkles } from "lucide-react"

export function WhatIfSimulator() {
  const { whatIfScenarios } = productIntelligenceData
  const [selectedScenario, setSelectedScenario] = React.useState(whatIfScenarios[0])
  const [isSimulating, setIsSimulating] = React.useState(false)

  const handleSimulate = (scenario: typeof whatIfScenarios[0]) => {
    setIsSimulating(true)
    setSelectedScenario(scenario)
    setTimeout(() => setIsSimulating(false), 600)
  }

  const effortColors = {
    Low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-neutral-800 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-500" />
          "What If" Sentiment Simulator
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Model the impact of fixing specific issues on overall sentiment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 dark:divide-neutral-800">
        {/* Left Panel - Issue List */}
        <div className="p-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 px-2">
            Select an issue to simulate
          </p>
          <div className="space-y-2">
            {whatIfScenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleSimulate(scenario)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  selectedScenario.id === scenario.id
                    ? "bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-500 dark:border-emerald-600"
                    : "bg-gray-50 dark:bg-neutral-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-neutral-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">{scenario.issue}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${
                    selectedScenario.id === scenario.id ? "text-emerald-500 rotate-90" : "text-gray-400"
                  }`} />
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    +{scenario.improvementPercent}%
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {scenario.affectedUsers.toLocaleString()} users
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    effortColors[scenario.implementationEffort as keyof typeof effortColors]
                  }`}>
                    {scenario.implementationEffort}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Simulation Result */}
        <div className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-800/50 dark:to-neutral-900">
          <div className={`transition-all duration-300 ${isSimulating ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}>
            {/* Sentiment Gauge */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                If we fix <span className="font-semibold text-gray-700 dark:text-gray-200">"{selectedScenario.issue}"</span>
              </p>
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-36 h-36 transform -rotate-90">
                  {/* Background arc */}
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-gray-200 dark:text-neutral-700"
                    strokeDasharray={`${Math.PI * 60 * 2}`}
                    strokeDashoffset={`${Math.PI * 60 * 0.5}`}
                  />
                  {/* Current sentiment */}
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.PI * 60 * 2}`}
                    strokeDashoffset={`${Math.PI * 60 * (2 - (selectedScenario.currentSentiment / 100) * 1.5)}`}
                    className="transition-all duration-500"
                  />
                  {/* Predicted sentiment */}
                  <circle
                    cx="72"
                    cy="72"
                    r="48"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.PI * 48 * 2}`}
                    strokeDashoffset={`${Math.PI * 48 * (2 - (selectedScenario.predictedSentiment / 100) * 1.5)}`}
                    className="transition-all duration-700 delay-150"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    +{selectedScenario.improvementPercent}%
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">sentiment</span>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-gray-600 dark:text-gray-300">Current: {selectedScenario.currentSentiment}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-gray-600 dark:text-gray-300">Predicted: {selectedScenario.predictedSentiment}%</span>
                </div>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Revenue Recovery</span>
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${(selectedScenario.revenueRecovery / 1000).toFixed(0)}k
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500">per month</div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Churn Prevented</span>
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {selectedScenario.churnPrevented.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500">users saved</div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Time to Fix</span>
                </div>
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {selectedScenario.timeToFix}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-indigo-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Confidence</span>
                </div>
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {selectedScenario.confidence}%
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500">accuracy</div>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
              <Zap className="h-4 w-4" />
              Generate PRD for this Fix
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
