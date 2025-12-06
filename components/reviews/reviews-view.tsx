"use client"

import { useState, useMemo } from "react"
import { ReviewsHeader } from "./reviews-header"
import { ReviewsList } from "./reviews-list"
import { reviewsData } from "@/data/reviews"

export function ReviewsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [platformFilter, setPlatformFilter] = useState("All Platforms")
  const [sentimentFilter, setSentimentFilter] = useState("All Sentiments")

  const filteredReviews = useMemo(() => {
    return reviewsData.filter((review) => {
      const matchesSearch = 
        review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.author.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesPlatform = 
        platformFilter === "All Platforms" || 
        review.platform === platformFilter
      
      const matchesSentiment = 
        sentimentFilter === "All Sentiments" || 
        review.sentiment === sentimentFilter

      return matchesSearch && matchesPlatform && matchesSentiment
    })
  }, [searchQuery, platformFilter, sentimentFilter])

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reviews Explorer</h2>
        <p className="text-gray-500 dark:text-gray-400">Analyze individual customer reviews and feedback.</p>
      </div>
      
      <ReviewsHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        platformFilter={platformFilter}
        setPlatformFilter={setPlatformFilter}
        sentimentFilter={sentimentFilter}
        setSentimentFilter={setSentimentFilter}
        totalReviews={reviewsData.length}
        showingReviews={filteredReviews.length}
      />
      <ReviewsList reviews={filteredReviews} />
    </>
  )
}
