"use client"

import { Star, ThumbsUp } from "lucide-react"

interface Review {
  id: number
  author: string
  date: string
  platform: string
  sentiment: string
  rating: number
  text: string
  helpfulCount: number
}

interface ReviewsListProps {
  reviews: Review[]
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800">
        <p className="text-gray-500 dark:text-gray-400">No reviews found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 mb-8">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full 
                ${review.sentiment === 'Positive' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                  review.sentiment === 'Negative' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                {review.sentiment}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {review.platform} • {review.date}
              </span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 dark:text-neutral-700'}`} 
                />
              ))}
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
            {review.text}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-neutral-800">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              By {review.author}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <ThumbsUp className="h-3.5 w-3.5" />
              {review.helpfulCount} found helpful
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
