"use client"

import { productIntelligenceData } from "@/data/product-intelligence"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts"
import { AlertTriangle, Shield, TrendingDown, Calendar, Target, AlertCircle, CheckCircle } from "lucide-react"

const severityColors = {
  high: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400", border: "border-red-200 dark:border-red-800" },
  medium: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400", border: "border-yellow-200 dark:border-yellow-800" },
  low: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800" },
}

export function LaunchRiskPredictor() {
  const { upcomingVersion, riskCategories, historicalReleases } = productIntelligenceData

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return "text-red-500"
    if (risk >= 50) return "text-yellow-500"
    return "text-green-500"
  }

  const getRiskLabel = (risk: number) => {
    if (risk >= 70) return "High Risk"
    if (risk >= 50) return "Medium Risk"
    return "Low Risk"
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-neutral-800 bg-gradient-to-r from-orange-500/5 to-red-500/5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Launch Risk Predictor
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              AI-predicted risk areas for upcoming release
            </p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-neutral-800">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{upcomingVersion.version}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{upcomingVersion.plannedRelease}</p>
          </div>
        </div>
      </div>

      {/* Overall Risk Score */}
      <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Launch Risk Score</span>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-500">{upcomingVersion.confidence}% confidence</span>
          </div>
        </div>
        <div className="relative">
          <div className="h-4 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                upcomingVersion.overallRiskScore >= 70
                  ? "bg-gradient-to-r from-red-400 to-red-600"
                  : upcomingVersion.overallRiskScore >= 50
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                  : "bg-gradient-to-r from-green-400 to-emerald-500"
              }`}
              style={{ width: `${upcomingVersion.overallRiskScore}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400">Low Risk</span>
            <span className={`text-lg font-bold ${getRiskColor(upcomingVersion.overallRiskScore)}`}>
              {upcomingVersion.overallRiskScore}/100 - {getRiskLabel(upcomingVersion.overallRiskScore)}
            </span>
            <span className="text-xs text-gray-400">High Risk</span>
          </div>
        </div>
      </div>

      {/* Risk Categories */}
      <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Risk Breakdown by Category
        </h4>
        <div className="space-y-4">
          {riskCategories.map((category, index) => {
            const severity = severityColors[category.severity as keyof typeof severityColors]
            return (
              <div
                key={index}
                className={`p-4 rounded-xl border ${severity.border} ${severity.bg} transition-all hover:scale-[1.01]`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {category.severity === "high" ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : category.severity === "medium" ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    <span className="font-semibold text-gray-900 dark:text-white">{category.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xl font-bold ${severity.text}`}>
                      {category.riskLevel}%
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {category.affectedUserPercent}% users affected
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{category.prediction}</p>
                <div className="flex items-start gap-2 text-xs">
                  <TrendingDown className="h-3.5 w-3.5 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Historical: </span>
                    <span className="text-gray-700 dark:text-gray-300">{category.historicalPattern}</span>
                  </div>
                </div>
                <div className="mt-3 p-2 rounded-lg bg-white/50 dark:bg-neutral-900/50 border border-gray-200/50 dark:border-neutral-700/50">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">💡 Mitigation: </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">{category.mitigation}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Historical Accuracy Chart */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Prediction Model Accuracy (Last 6 Releases)
        </h4>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={historicalReleases}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="version"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 11 }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                }}
                formatter={(value: number, name: string) => [
                  `${value}%`,
                  name === "riskPredicted"
                    ? "Predicted Risk"
                    : name === "actualIssues"
                    ? "Actual Issues"
                    : "Backlash Score"
                ]}
              />
              <Legend
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value) =>
                  value === "riskPredicted"
                    ? "AI Predicted"
                    : value === "actualIssues"
                    ? "Actual Result"
                    : "Backlash"
                }
              />
              <Line
                type="monotone"
                dataKey="riskPredicted"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ r: 4, fill: "#6366F1", strokeWidth: 2, stroke: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="actualIssues"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 4, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="backlashScore"
                stroke="#F59E0B"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3, fill: "#F59E0B" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-indigo-500" />
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              Model Accuracy: {productIntelligenceData.summaryStats.modelAccuracy}%
            </span>
            <span className="text-xs text-indigo-500 dark:text-indigo-400 ml-2">
              (Based on last 6 releases)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
