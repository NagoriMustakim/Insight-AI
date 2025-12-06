"use client"

import * as React from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { Header } from "@/components/ui/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { SentimentChart } from "@/components/dashboard/sentiment-chart"
import { PlatformScorecard } from "@/components/dashboard/platform-scorecard"
import { InsightsSection } from "@/components/dashboard/insights-section"

import { ComparisonOverviewChart } from "@/components/comparison/comparison-overview-chart"
import { PlatformDetailsTable } from "@/components/comparison/platform-details-table"
import { IssueBreakdown } from "@/components/comparison/issue-breakdown"
import { SentimentDistributionChart } from "@/components/comparison/sentiment-distribution-chart"

import { StrengthsSection } from "@/components/insights/strengths-section"
import { WeaknessesSection } from "@/components/insights/weaknesses-section"
import { CriticalIssuesSection } from "@/components/insights/critical-issues-section"
import { ThemesCloud } from "@/components/insights/themes-cloud"

import { RoadmapHeader } from "@/components/roadmap/roadmap-header"
import { RoadmapPhases } from "@/components/roadmap/roadmap-phases"
import { ExpectedOutcomes } from "@/components/roadmap/expected-outcomes"

import { ReviewsView } from "@/components/reviews/reviews-view"
import { ChatView } from "@/components/chat/chat-view"
import { ProductIntelligenceView } from "@/components/product-intelligence/product-intelligence-view"

export default function Home() {
  const [activeView, setActiveView] = React.useState("overview")

  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h2>
                <p className="text-gray-500 dark:text-gray-400">Welcome back, here's what's happening with your products.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                  Export Report
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30">
                  View Insights
                </button>
              </div>
            </div>

            <StatsCards />
            <SentimentChart />
            <PlatformScorecard />
            <InsightsSection />
          </>
        )
      case "comparison":
        return (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Comparison</h2>
              <p className="text-gray-500 dark:text-gray-400">Compare performance metrics across different channels.</p>
            </div>
            
            <ComparisonOverviewChart />
            <PlatformDetailsTable />
            <IssueBreakdown />
            <SentimentDistributionChart />
          </>
        )
      case "insights":
        return (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Insights & Themes</h2>
              <p className="text-gray-500 dark:text-gray-400">Deep dive into customer sentiment and emerging topics.</p>
            </div>
            
            <StrengthsSection />
            <WeaknessesSection />
            <CriticalIssuesSection />
            <ThemesCloud />
          </>
        )
      case "roadmap":
        return (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Action Roadmap</h2>
              <p className="text-gray-500 dark:text-gray-400">Strategic plan to improve product performance and sentiment.</p>
            </div>
            
            <RoadmapHeader />
            <RoadmapPhases />
            <ExpectedOutcomes />
          </>
        )
      case "reviews":
        return <ReviewsView />
      case "chat":
        return <ChatView />
      case "product-intelligence":
        return <ProductIntelligenceView />
      default:
        return (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Coming Soon</h2>
              <p className="text-gray-500 dark:text-gray-400">The {activeView} view is under development.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar activeView={activeView} onNavigate={setActiveView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
            
            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-neutral-800 flex justify-center text-xs text-gray-500 dark:text-gray-400">
              <p>© 2025 Insight AI</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
