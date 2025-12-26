export function transformApifyData(apifyData: any[]): any {
  const totalReviews = apifyData.length;
  if (totalReviews === 0) {
    return {
      overviewData: {},
      comparisonData: {},
      insightsData: {},
    };
  }

  const totalRating = apifyData.reduce((sum, review) => sum + parseFloat(review.ReviewScore || '0'), 0);
  const avgRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  const sentimentCounts = apifyData.reduce((counts, review) => {
    const rating = parseFloat(review.ReviewScore || '0');
    if (rating >= 4) counts.positive++;
    else if (rating >= 3) counts.neutral++;
    else counts.negative++;
    return counts;
  }, { positive: 0, neutral: 0, negative: 0 });

  const healthScore = Math.round((sentimentCounts.positive / totalReviews) * 100);

  // Build a simple monthly sentiment trend from review dates
  const monthly: Record<string, { positive: number; neutral: number; negative: number; total: number }> = {};
  for (const review of apifyData) {
    const dateStr = review.ReviewDate as string | undefined;
    const d = dateStr ? new Date(dateStr) : null;
    if (!d || isNaN(d.getTime())) continue;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!monthly[key]) {
      monthly[key] = { positive: 0, neutral: 0, negative: 0, total: 0 };
    }
    const rating = parseFloat(review.ReviewScore || '0');
    if (rating >= 4) monthly[key].positive++;
    else if (rating >= 3) monthly[key].neutral++;
    else monthly[key].negative++;
    monthly[key].total++;
  }

  const sortedMonths = Object.keys(monthly).sort();
  const lastMonths = sortedMonths.slice(-6);

  const sentimentTrend = (lastMonths.length > 0
    ? lastMonths
    : ["Current"]
  ).map((key) => {
    const m = monthly[key];
    const monthScore = m && m.total > 0 ? Math.round((m.positive / m.total) * 100) : healthScore;
    return {
      month: key,
      Amazon: monthScore,
      BestBuy: monthScore,
      Overall: monthScore,
      Walmart: monthScore,
      Website: monthScore,
    };
  });

  const reviewAspects = apifyData[0]?.ReviewAspects || [];
  const strengths = reviewAspects
    .filter((a: any) => parseInt(a.positiv || "0") >= parseInt(a.negativ || "0"))
    .slice(0, 5)
    .map((a: any, i: number) => {
      const pos = parseInt(a.positiv || "0");
      const neg = parseInt(a.negativ || "0");
      const total = pos + neg || 1;
      return {
        rank: i + 1,
        title: a.aspect_name,
        mentions: pos,
        sentiment: Math.round((pos / total) * 100),
      };
    });

  const weaknesses = reviewAspects
    .filter((a: any) => parseInt(a.negativ || "0") > parseInt(a.positiv || "0"))
    .slice(0, 5)
    .map((a: any, i: number) => {
      const pos = parseInt(a.positiv || "0");
      const neg = parseInt(a.negativ || "0");
      const total = pos + neg || 1;
      return {
        rank: i + 1,
        title: a.aspect_name,
        mentions: neg,
        sentiment: Math.round((neg / total) * 100),
      };
    });

  const criticalIssues = weaknesses.map((w: any) => ({ ...w, platforms: ["Amazon"] }));

  const overviewData = {
    healthScore: {
      score: healthScore,
      total: 100,
      change: 0,
      trend: "up",
    },
    totalReviews: {
      count: totalReviews,
      platforms: 1,
    },
    avgRating: {
      score: parseFloat(avgRating.toFixed(1)),
      max: 5,
    },
    criticalIssues: {
      count: criticalIssues.length,
      message: "Require immediate action",
    },
    sentimentTrend,
    platformPerformance: [
      {
        name: "Amazon",
        score: healthScore,
        reviews: totalReviews,
        rating: parseFloat(avgRating.toFixed(1)),
        sentiment: {
          positive: Math.round((sentimentCounts.positive / totalReviews) * 100),
          neutral: Math.round((sentimentCounts.neutral / totalReviews) * 100),
          negative: Math.round((sentimentCounts.negative / totalReviews) * 100),
        },
      },
    ],
    insights: {
      strength: strengths.length > 0 ? { title: "Top Strength", metric: strengths[0].title, description: `${strengths[0].mentions} mentions (${strengths[0].sentiment}% positive)` } : { title: "Top Strength", metric: "N/A", description: "" },
      critical: criticalIssues.length > 0 ? { title: "Top Critical Issue", metric: criticalIssues[0].title, description: `${criticalIssues[0].mentions} mentions (${criticalIssues[0].sentiment}% negative)` } : { title: "Top Critical Issue", metric: "N/A", description: "" },
      declining: { title: "Declining Metric", metric: "N/A", description: "" },
    },
  };

  const comparisonData = {
    overview: [
      { name: "Amazon", sentiment: healthScore, fill: "#6366f1" },
    ],
    details: [
      {
        platform: "Amazon",
        reviews: totalReviews,
        sentiment: healthScore,
        rating: parseFloat(avgRating.toFixed(1)),
        distribution: {
          positive: Math.round((sentimentCounts.positive / totalReviews) * 100),
          neutral: Math.round((sentimentCounts.neutral / totalReviews) * 100),
          negative: Math.round((sentimentCounts.negative / totalReviews) * 100),
        },
        trend: 0,
      },
    ],
    issues: { Amazon: criticalIssues.map((issue: any) => ({ name: issue.title, severity: "High" })) },
    sentimentDistribution: [
      { name: "Positive", value: sentimentCounts.positive, fill: "#10B981" },
      { name: "Neutral", value: sentimentCounts.neutral, fill: "#F59E0B" },
      { name: "Negative", value: sentimentCounts.negative, fill: "#EF4444" },
    ],
  };

  const insightsData = {
    strengths,
    weaknesses,
    criticalIssues,
    themes: reviewAspects.map((a: any) => ({ text: a.aspect_name, color: "text-gray-600", size: "text-base" })),
  };

  // --- Product Intelligence (feature clusters, what-if simulator, launch risk) ---
  const featureClusters = reviewAspects.map((a: any, index: number) => {
    const pos = parseInt(a.positiv || "0");
    const neg = parseInt(a.negativ || "0");
    const total = pos + neg || 1;
    const negativeRatio = total ? neg / total : 0;

    const priorityScore = Math.min(100, Math.round(negativeRatio * 40 + 60));
    const revenueImpact = neg * 1000; // synthetic but deterministic
    const sentimentDrop = Math.round(negativeRatio * 100);
    const trend = negativeRatio > 0.5 ? "rising" : negativeRatio > 0.2 ? "stable" : "declining";

    return {
      id: index + 1,
      theme: a.aspect_name,
      requestCount: total,
      priorityScore,
      revenueImpact,
      sentimentDrop,
      topRequests: [a["aspect-summary"] || ""],
      trend,
      platforms: ["Amazon"],
    };
  });

  const totalFeatureRequests = featureClusters.reduce((sum: number, c: any) => sum + c.requestCount, 0);
  const totalRevenueAtRisk = featureClusters.reduce((sum: number, c: any) => sum + c.revenueImpact, 0);
  const avgPriorityScore =
    featureClusters.length > 0
      ? featureClusters.reduce((sum: number, c: any) => sum + c.priorityScore, 0) / featureClusters.length
      : 0;

  const productSummaryStats = {
    totalFeatureRequests,
    clustersIdentified: featureClusters.length,
    avgPriorityScore: parseFloat(avgPriorityScore.toFixed(1)),
    totalRevenueAtRisk,
    modelAccuracy: 90,
    lastUpdated: "Just now",
  };

  const issuesForScenarios = criticalIssues.length > 0 ? criticalIssues : strengths;
  const whatIfScenarios = issuesForScenarios.slice(0, 5).map((issue: any, index: number) => {
    const improvementPercent = Math.min(20, 5 + index * 3);
    const currentSentiment = healthScore;
    const predictedSentiment = Math.min(100, currentSentiment + improvementPercent);

    return {
      id: index + 1,
      issue: issue.title,
      currentSentiment,
      predictedSentiment,
      improvementPercent,
      revenueRecovery: issue.mentions * 500,
      churnPrevented: issue.mentions * 10,
      implementationEffort: index === 0 ? "High" : index <= 2 ? "Medium" : "Low",
      timeToFix: index === 0 ? "6-10 weeks" : index <= 2 ? "4-6 weeks" : "2-4 weeks",
      affectedUsers: issue.mentions * 10,
      confidence: 80,
    };
  });

  const upcomingVersion = {
    version: "v1.0.0",
    plannedRelease: "Next 2-3 months",
    overallRiskScore: Math.max(20, 100 - healthScore),
    confidence: 80,
  };

  const riskCategories = issuesForScenarios.slice(0, 4).map((issue: any, index: number) => {
    const riskLevel = Math.min(100, 60 + index * 10);
    const severity = riskLevel >= 70 ? "high" : riskLevel >= 50 ? "medium" : "low";
    const affectedUserPercent = Math.min(100, Math.round((issue.mentions / totalReviews) * 10));

    return {
      category: issue.title,
      riskLevel,
      severity,
      prediction: `${issue.title} is a key driver of negative sentiment in recent reviews.`,
      historicalPattern: "Derived from recent Amazon customer feedback.",
      mitigation: "Prioritize this issue in the upcoming release roadmap.",
      affectedUserPercent,
    };
  });

  const historicalReleases = Array.from({ length: 6 }).map((_, index) => {
    const versionIndex = index + 1;
    const riskPredicted = Math.max(20, Math.min(100, 100 - healthScore + (5 - index) * 3));
    const actualIssues = Math.max(10, Math.min(100, riskPredicted + (index - 3) * 2));
    const backlashScore = Math.max(5, Math.min(100, 30 - index * 3));

    return {
      version: `v${versionIndex}.0.0`,
      date: `Release ${versionIndex}`,
      riskPredicted,
      actualIssues,
      backlashScore,
    };
  });

  const productIntelligenceData = {
    featureClusters,
    whatIfScenarios,
    upcomingVersion,
    riskCategories,
    historicalReleases,
    summaryStats: productSummaryStats,
  };

  // --- Reviews list for Reviews Explorer ---
  const reviewsData = apifyData.map((review: any, index: number) => {
    const rating = parseFloat(review.ReviewScore || "0");
    const sentiment = rating >= 4 ? "Positive" : rating >= 3 ? "Neutral" : "Negative";
    const helpfulRaw = String(review.HelpfulCounts ?? "0");
    const helpfulMatch = helpfulRaw.match(/\d+/);
    const helpfulCount = helpfulMatch ? parseInt(helpfulMatch[0], 10) : 0;

    return {
      id: index + 1,
      author: review.Reviewer || "Unknown",
      date: review.ReviewDate || "",
      platform: "Amazon",
      sentiment,
      rating: isNaN(rating) ? 0 : Math.round(rating),
      text: review.ReviewContent || "",
      helpfulCount,
    };
  });

  // --- Roadmap based on critical issues ---
  const makeRoadmapItem = (issue: any, effort: string, impact: string, owner: string) => {
    const effortColorMap: Record<string, string> = {
      High: "text-red-600 dark:text-red-400",
      Medium: "text-orange-600 dark:text-orange-400",
      Low: "text-green-600 dark:text-green-400",
    };

    const impactColorMap: Record<string, string> = {
      Critical: "text-green-600 dark:text-green-400",
      High: "text-green-600 dark:text-green-400",
      Medium: "text-blue-600 dark:text-blue-400",
      Low: "text-gray-600 dark:text-gray-400",
    };

    return {
      title: issue.title,
      effort,
      effortColor: effortColorMap[effort] || effortColorMap["Medium"],
      impact,
      impactColor: impactColorMap[impact] || impactColorMap["Medium"],
      owner,
    };
  };

  const phase1Issues = issuesForScenarios.slice(0, 3);
  const phase2Issues = issuesForScenarios.slice(3, 7);
  const phase3Issues = issuesForScenarios.slice(7, 11);

  const roadmapData = {
    phases: [
      {
        id: "phase1",
        title: "Phase 1: Immediate (0-1 Month)",
        priority: "Critical Priority",
        priorityColor: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
        items:
          phase1Issues.length > 0
            ? phase1Issues.map((issue: any) => makeRoadmapItem(issue, "High", "Critical", "Engineering"))
            : [
                makeRoadmapItem(
                  { title: "Analyze top negative review themes" },
                  "Medium",
                  "High",
                  "Product/Eng",
                ),
              ],
      },
      {
        id: "phase2",
        title: "Phase 2: Short-term (1-3 Months)",
        priority: "High Priority",
        priorityColor: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
        items:
          phase2Issues.length > 0
            ? phase2Issues.map((issue: any) => makeRoadmapItem(issue, "Medium", "High", "Product/Eng"))
            : [
                makeRoadmapItem(
                  { title: "Improve documentation and onboarding based on reviews" },
                  "Medium",
                  "Medium",
                  "Documentation",
                ),
              ],
      },
      {
        id: "phase3",
        title: "Phase 3: Long-term (4-6 Months)",
        priority: "Medium Priority",
        priorityColor: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        items:
          phase3Issues.length > 0
            ? phase3Issues.map((issue: any) => makeRoadmapItem(issue, "Low", "Medium", "R&D"))
            : [
                makeRoadmapItem(
                  { title: "Explore new features suggested in positive reviews" },
                  "Low",
                  "Low",
                  "R&D",
                ),
              ],
      },
    ],
    outcomes: [
      {
        title: "Sentiment Score Improvement",
        description: `Expected increase from ${healthScore} to ${Math.min(
          100,
          healthScore + 10,
        )} overall score`,
        icon: "TrendingUp",
        color:
          "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/10 dark:border-green-900/30 dark:text-green-400",
        iconColor: "text-green-600",
      },
      {
        title: "Average Rating Boost",
        description: `Target increase from ${avgRating.toFixed(1)} to ${(avgRating + 0.3).toFixed(1)}+ stars`,
        icon: "Star",
        color:
          "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/10 dark:border-green-900/30 dark:text-green-400",
        iconColor: "text-yellow-500",
      },
      {
        title: "Critical Issues Resolution",
        description: `${criticalIssues.length} critical issues targeted in the next 3 months`,
        icon: "CheckCircle2",
        color:
          "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/10 dark:border-blue-900/30 dark:text-blue-400",
        iconColor: "text-blue-600",
      },
      {
        title: "Customer Satisfaction",
        description: `Positive review percentage target: ${Math.min(
          100,
          Math.round((sentimentCounts.positive / totalReviews) * 100) + 5,
        )}%+`,
        icon: "ThumbsUp",
        color:
          "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/10 dark:border-blue-900/30 dark:text-blue-400",
        iconColor: "text-blue-600",
      },
    ],
  };

  return { overviewData, comparisonData, insightsData, productIntelligenceData, reviewsData, roadmapData };
}

