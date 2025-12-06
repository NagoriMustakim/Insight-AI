export const overviewData = {
    healthScore: {
        score: 77,
        total: 100,
        change: 2.6,
        trend: "up", // 'up' | 'down'
    },
    totalReviews: {
        count: 5576,
        platforms: 4,
    },
    avgRating: {
        score: 4.3,
        max: 5,
    },
    criticalIssues: {
        count: 4,
        message: "Require immediate action",
    },
    sentimentTrend: [
        { month: "Apr", Amazon: 74, BestBuy: 76, Overall: 75, Walmart: 72, Website: 82 },
        { month: "May", Amazon: 73, BestBuy: 75, Overall: 74, Walmart: 71, Website: 80 },
        { month: "Jun", Amazon: 71, BestBuy: 75, Overall: 74, Walmart: 71, Website: 79 },
        { month: "Jul", Amazon: 68, BestBuy: 73, Overall: 72, Walmart: 69, Website: 78 },
        { month: "Aug", Amazon: 72, BestBuy: 76, Overall: 75, Walmart: 72, Website: 80 },
        { month: "Sep", Amazon: 74, BestBuy: 77, Overall: 76, Walmart: 73, Website: 82 },
    ],
    platformPerformance: [
        {
            name: "Amazon",
            score: 74,
            reviews: 2847,
            rating: 4.1,
            sentiment: { positive: 62, neutral: 23, negative: 15 },
        },
        {
            name: "Client Website",
            score: 82,
            reviews: 634,
            rating: 4.5,
            sentiment: { positive: 75, neutral: 18, negative: 7 },
        },
        {
            name: "Best Buy",
            score: 78,
            reviews: 1203,
            rating: 4.3,
            sentiment: { positive: 66, neutral: 23, negative: 11 },
        },
        {
            name: "Walmart",
            score: 74,
            reviews: 892,
            rating: 4.2,
            sentiment: { positive: 64, neutral: 22, negative: 14 },
        },
    ],
    insights: {
        strength: {
            title: "Top Strength",
            metric: "Durable design & build quality",
            description: "Mentioned in 1,847 reviews (92% positive)",
        },
        critical: {
            title: "Top Critical Issue",
            metric: "Bluetooth connectivity issues",
            description: "Mentioned in 1,247 reviews (78% negative)",
        },
        declining: {
            title: "Declining Metric",
            metric: "Amazon sentiment score",
            description: "Dropped from 76 to 74 (primarily due to iOS bugs)",
        },
    },
};
