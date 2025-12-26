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

import { overviewData as initialOverviewData } from "@/data/overview"
import { comparisonData as initialComparisonData } from "@/data/comparison"
import { insightsData as initialInsightsData } from "@/data/insights"

export default function Home() {
  const [activeView, setActiveView] = React.useState("product-details")

  const [productUrl, setProductUrl] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleUrlScrape = async () => {
    const analyzedUrls = JSON.parse(localStorage.getItem('analyzedUrls') || '[]');
    if (analyzedUrls.includes(productUrl)) {
      setError('This product has already been analyzed.');
      return;
    }
    if (!productUrl) {
        setError("Please enter a product URL.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setAnalysisResult(data);

      // Update the data files on the backend
      await fetch('/api/update-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Add the URL to the list of analyzed URLs
      const analyzedUrls = JSON.parse(localStorage.getItem('analyzedUrls') || '[]');
      analyzedUrls.push(productUrl);
      localStorage.setItem('analyzedUrls', JSON.stringify(analyzedUrls));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "product-details":
        return (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Details</h2>
              <p className="text-gray-500 dark:text-gray-400">Enter an Amazon product URL to analyze customer reviews.</p>
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    placeholder="Enter Amazon Product URL"
                    className="flex-grow px-4 py-2 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg text-sm"
                />
                <button
                    onClick={handleUrlScrape}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                    {isLoading ? 'Analyzing...' : 'Analyze Product'}
                </button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {analysisResult && (
              <div className="mt-8 p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg">
                <h3 className="text-lg font-bold">Analysis Result</h3>
                <pre className="text-sm">{JSON.stringify(analysisResult, null, 2)}</pre>
              </div>
            )}
          </>
        )
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

            <StatsCards data={analysisResult?.overviewData ?? initialOverviewData} />
            <SentimentChart data={analysisResult?.overviewData ?? initialOverviewData} />
            <PlatformScorecard data={analysisResult?.overviewData ?? initialOverviewData} />
            <InsightsSection data={analysisResult?.overviewData ?? initialOverviewData} />
          </>
        )
      case "comparison":
        return (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Comparison</h2>
              <p className="text-gray-500 dark:text-gray-400">Compare performance metrics across different channels.</p>
            </div>
            
            <ComparisonOverviewChart data={analysisResult?.comparisonData ?? initialComparisonData} />
            <PlatformDetailsTable data={analysisResult?.comparisonData ?? initialComparisonData} />
            <IssueBreakdown data={analysisResult?.comparisonData ?? initialComparisonData} />
            <SentimentDistributionChart data={analysisResult?.comparisonData ?? initialComparisonData} />
          </>
        )
      case "insights":
        return (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Insights & Themes</h2>
              <p className="text-gray-500 dark:text-gray-400">Deep dive into customer sentiment and emerging topics.</p>
            </div>
            
            <StrengthsSection data={analysisResult?.insightsData ?? initialInsightsData} />
            <WeaknessesSection data={analysisResult?.insightsData ?? initialInsightsData} />
            <CriticalIssuesSection data={analysisResult?.insightsData ?? initialInsightsData} />
            <ThemesCloud data={analysisResult?.insightsData ?? initialInsightsData} />
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
