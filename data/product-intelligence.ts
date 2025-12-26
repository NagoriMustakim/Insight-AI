export const productIntelligenceData = {
  "featureClusters": [
    {
      "id": 1,
      "theme": "Quality",
      "requestCount": 28,
      "priorityScore": 69,
      "revenueImpact": 6000,
      "sentimentDrop": 21,
      "topRequests": [
        "Customers find these headphones to be of excellent quality, particularly suitable for children."
      ],
      "trend": "stable",
      "platforms": [
        "Amazon"
      ]
    },
    {
      "id": 2,
      "theme": "Sound quality",
      "requestCount": 16,
      "priorityScore": 68,
      "revenueImpact": 3000,
      "sentimentDrop": 19,
      "topRequests": [
        "Customers like the sound quality of these headphones."
      ],
      "trend": "declining",
      "platforms": [
        "Amazon"
      ]
    },
    {
      "id": 3,
      "theme": "Value for money",
      "requestCount": 9,
      "priorityScore": 69,
      "revenueImpact": 2000,
      "sentimentDrop": 22,
      "topRequests": [
        "Customers find the headphones worth their price."
      ],
      "trend": "stable",
      "platforms": [
        "Amazon"
      ]
    },
    {
      "id": 4,
      "theme": "Battery life",
      "requestCount": 7,
      "priorityScore": 71,
      "revenueImpact": 2000,
      "sentimentDrop": 29,
      "topRequests": [
        "Customers are satisfied with the headphones' battery life, with one customer noting that it charges very quickly."
      ],
      "trend": "stable",
      "platforms": [
        "Amazon"
      ]
    },
    {
      "id": 5,
      "theme": "Design",
      "requestCount": 7,
      "priorityScore": 60,
      "revenueImpact": 0,
      "sentimentDrop": 0,
      "topRequests": [
        "Customers like the design of these headphones, finding them super cool looking, with one customer specifically mentioning that the lights are cute."
      ],
      "trend": "declining",
      "platforms": [
        "Amazon"
      ]
    },
    {
      "id": 6,
      "theme": "Comfort",
      "requestCount": 6,
      "priorityScore": 67,
      "revenueImpact": 1000,
      "sentimentDrop": 17,
      "topRequests": [
        "Customers find the headphones comfortable."
      ],
      "trend": "declining",
      "platforms": [
        "Amazon"
      ]
    },
    {
      "id": 7,
      "theme": "Kids-friendly",
      "requestCount": 5,
      "priorityScore": 68,
      "revenueImpact": 1000,
      "sentimentDrop": 20,
      "topRequests": [
        "Customers find these headphones suitable for children, with one mentioning they are the best kids-friendly headphones."
      ],
      "trend": "declining",
      "platforms": [
        "Amazon"
      ]
    },
    {
      "id": 8,
      "theme": "Functionality",
      "requestCount": 7,
      "priorityScore": 89,
      "revenueImpact": 5000,
      "sentimentDrop": 71,
      "topRequests": [
        "Customers report issues with the headphones' functionality, including buttons not working and frequent disconnections."
      ],
      "trend": "rising",
      "platforms": [
        "Amazon"
      ]
    }
  ],
  "whatIfScenarios": [
    {
      "id": 1,
      "issue": "Functionality",
      "currentSentiment": 82,
      "predictedSentiment": 87,
      "improvementPercent": 5,
      "revenueRecovery": 2500,
      "churnPrevented": 50,
      "implementationEffort": "High",
      "timeToFix": "6-10 weeks",
      "affectedUsers": 50,
      "confidence": 80
    }
  ],
  "upcomingVersion": {
    "version": "v1.0.0",
    "plannedRelease": "Next 2-3 months",
    "overallRiskScore": 20,
    "confidence": 80
  },
  "riskCategories": [
    {
      "category": "Functionality",
      "riskLevel": 60,
      "severity": "medium",
      "prediction": "Functionality is a key driver of negative sentiment in recent reviews.",
      "historicalPattern": "Derived from recent Amazon customer feedback.",
      "mitigation": "Prioritize this issue in the upcoming release roadmap.",
      "affectedUserPercent": 1
    }
  ],
  "historicalReleases": [
    {
      "version": "v1.0.0",
      "date": "Release 1",
      "riskPredicted": 33,
      "actualIssues": 27,
      "backlashScore": 30
    },
    {
      "version": "v2.0.0",
      "date": "Release 2",
      "riskPredicted": 30,
      "actualIssues": 26,
      "backlashScore": 27
    },
    {
      "version": "v3.0.0",
      "date": "Release 3",
      "riskPredicted": 27,
      "actualIssues": 25,
      "backlashScore": 24
    },
    {
      "version": "v4.0.0",
      "date": "Release 4",
      "riskPredicted": 24,
      "actualIssues": 24,
      "backlashScore": 21
    },
    {
      "version": "v5.0.0",
      "date": "Release 5",
      "riskPredicted": 21,
      "actualIssues": 23,
      "backlashScore": 18
    },
    {
      "version": "v6.0.0",
      "date": "Release 6",
      "riskPredicted": 20,
      "actualIssues": 24,
      "backlashScore": 15
    }
  ],
  "summaryStats": {
    "totalFeatureRequests": 85,
    "clustersIdentified": 8,
    "avgPriorityScore": 70.1,
    "totalRevenueAtRisk": 20000,
    "modelAccuracy": 90,
    "lastUpdated": "Just now"
  }
};