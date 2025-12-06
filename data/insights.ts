export const insightsData = {
    strengths: [
        { rank: 1, title: "Durable design & build quality", mentions: 1847, sentiment: 92 },
        { rank: 2, title: "Accurate fitness tracking", mentions: 1523, sentiment: 88 },
        { rank: 3, title: "Long battery life (5-7 days)", mentions: 1389, sentiment: 85 },
        { rank: 4, title: "Comfortable wrist strap", mentions: 1156, sentiment: 81 },
        { rank: 5, title: "Water resistant performance", mentions: 982, sentiment: 79 },
    ],
    weaknesses: [
        { rank: 1, title: "Unclear user manual", mentions: 876, sentiment: 45 },
        { rank: 2, title: "Complex initial setup", mentions: 743, sentiment: 52 },
        { rank: 3, title: "Limited third-party app integration", mentions: 654, sentiment: 48 },
        { rank: 4, title: "Small screen text size", mentions: 531, sentiment: 41 },
        { rank: 5, title: "No built-in GPS (requires phone)", mentions: 487, sentiment: 39 },
    ],
    criticalIssues: [
        { rank: 1, title: "Bluetooth connectivity issues", mentions: 1247, sentiment: 78, platforms: ["Amazon", "Walmart"] },
        { rank: 2, title: "App crashes on iOS 17+", mentions: 892, sentiment: 85, platforms: ["Amazon", "Best Buy"] },
        { rank: 3, title: "Inaccurate heart rate monitor", mentions: 678, sentiment: 72, platforms: ["Amazon", "Client Website"] },
        { rank: 4, title: "Charging cable breaks easily", mentions: 543, sentiment: 68, platforms: ["Amazon", "Walmart", "Best Buy"] },
    ],
    themes: [
        { text: "battery life", color: "text-green-600", size: "text-xl" },
        { text: "build quality", color: "text-blue-600", size: "text-lg" },
        { text: "fitness tracking", color: "text-purple-600", size: "text-lg" },
        { text: "water resistant", color: "text-red-500", size: "text-base" },
        { text: "comfortable", color: "text-orange-500", size: "text-base" },
        { text: "bluetooth", color: "text-gray-700 dark:text-gray-300", size: "text-2xl font-bold" },
        { text: "app crashes", color: "text-green-500", size: "text-lg" },
        { text: "heart rate", color: "text-blue-500", size: "text-base" },
        { text: "setup", color: "text-purple-500", size: "text-base" },
        { text: "manual", color: "text-red-600", size: "text-base" },
        { text: "GPS", color: "text-orange-600", size: "text-xl font-bold" },
        { text: "charging cable", color: "text-gray-600 dark:text-gray-400", size: "text-lg" },
        { text: "durability", color: "text-green-600", size: "text-base" },
        { text: "screen size", color: "text-blue-600", size: "text-base" },
        { text: "third-party apps", color: "text-purple-600", size: "text-base" },
    ]
};
