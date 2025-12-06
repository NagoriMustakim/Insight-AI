export const comparisonData = {
    overview: [
        { name: "Amazon", sentiment: 74, fill: "#6366f1" },
        { name: "Client Website", sentiment: 82, fill: "#6366f1" },
        { name: "Best Buy", sentiment: 78, fill: "#6366f1" },
        { name: "Walmart", sentiment: 74, fill: "#6366f1" },
    ],
    details: [
        {
            platform: "Amazon",
            reviews: 2847,
            sentiment: 74,
            rating: 4.1,
            distribution: { positive: 62, neutral: 23, negative: 15 },
            trend: -2.6,
        },
        {
            platform: "Client Website",
            reviews: 634,
            sentiment: 82,
            rating: 4.5,
            distribution: { positive: 75, neutral: 18, negative: 7 },
            trend: 2.4,
        },
        {
            platform: "Best Buy",
            reviews: 1203,
            sentiment: 78,
            rating: 4.3,
            distribution: { positive: 68, neutral: 21, negative: 11 },
            trend: 1.3,
        },
        {
            platform: "Walmart",
            reviews: 892,
            sentiment: 74,
            rating: 4.2,
            distribution: { positive: 64, neutral: 22, negative: 14 },
            trend: 1.3,
        },
    ],
    issues: {
        Amazon: [
            { name: "Bluetooth issues", severity: "High" },
            { name: "iOS app crashes", severity: "High" },
            { name: "Cable durability", severity: "Medium" },
        ],
        "Client Website": [
            { name: "Setup complexity", severity: "Medium" },
            { name: "Heart rate accuracy", severity: "Medium" },
            { name: "Manual clarity", severity: "Low" },
        ],
        "Best Buy": [
            { name: "iOS app crashes", severity: "High" },
            { name: "Cable durability", severity: "Medium" },
            { name: "Screen size", severity: "Low" },
        ],
        Walmart: [
            { name: "Bluetooth issues", severity: "High" },
            { name: "Cable durability", severity: "Medium" },
            { name: "No built-in GPS", severity: "Low" },
        ],
    },
    sentimentDistribution: [
        { name: "Positive", value: 67, fill: "#10B981" },
        { name: "Neutral", value: 21, fill: "#F59E0B" },
        { name: "Negative", value: 12, fill: "#EF4444" },
    ],
};
