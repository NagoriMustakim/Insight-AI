"use client"

import { Search, Download, ChevronDown, Check } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ReviewsHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  platformFilter: string
  setPlatformFilter: (platform: string) => void
  sentimentFilter: string
  setSentimentFilter: (sentiment: string) => void
  totalReviews: number
  showingReviews: number
}

export function ReviewsHeader({
  searchQuery,
  setSearchQuery,
  platformFilter,
  setPlatformFilter,
  sentimentFilter,
  setSentimentFilter,
  totalReviews,
  showingReviews
}: ReviewsHeaderProps) {
  const [isPlatformOpen, setIsPlatformOpen] = useState(false)
  const [isSentimentOpen, setIsSentimentOpen] = useState(false)
  
  const platformRef = useRef<HTMLDivElement>(null)
  const sentimentRef = useRef<HTMLDivElement>(null)

  const platforms = ["All Platforms", "Amazon", "Client Website", "Best Buy", "Walmart"]
  const sentiments = ["All Sentiments", "Positive", "Neutral", "Negative"]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (platformRef.current && !platformRef.current.contains(event.target as Node)) {
        setIsPlatformOpen(false)
      }
      if (sentimentRef.current && !sentimentRef.current.contains(event.target as Node)) {
        setIsSentimentOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search reviews by keyword or author..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-neutral-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto z-10">
          {/* Platform Dropdown */}
          <div className="relative w-full md:w-auto" ref={platformRef}>
            <button 
              onClick={() => setIsPlatformOpen(!isPlatformOpen)}
              className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors w-full md:w-40"
            >
              <span className="truncate">{platformFilter}</span>
              <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
            </button>
            
            {isPlatformOpen && (
              <div className="absolute top-full mt-1 w-full md:w-48 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg py-1 z-20">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => {
                      setPlatformFilter(platform)
                      setIsPlatformOpen(false)
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors flex items-center justify-between",
                      platformFilter === platform ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {platform}
                    {platformFilter === platform && <Check className="h-3 w-3" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Sentiment Dropdown */}
          <div className="relative w-full md:w-auto" ref={sentimentRef}>
            <button 
              onClick={() => setIsSentimentOpen(!isSentimentOpen)}
              className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors w-full md:w-40"
            >
              <span className="truncate">{sentimentFilter}</span>
              <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
            </button>
            
            {isSentimentOpen && (
              <div className="absolute top-full mt-1 w-full md:w-48 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg py-1 z-20">
                {sentiments.map((sentiment) => (
                  <button
                    key={sentiment}
                    onClick={() => {
                      setSentimentFilter(sentiment)
                      setIsSentimentOpen(false)
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors flex items-center justify-between",
                      sentimentFilter === sentiment ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {sentiment}
                    {sentimentFilter === sentiment && <Check className="h-3 w-3" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button 
            disabled
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600/50 cursor-not-allowed rounded-lg shadow-none"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 font-medium">
        Showing {showingReviews} of {totalReviews} reviews
      </div>
    </div>
  )
}
