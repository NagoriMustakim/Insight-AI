import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      overviewData,
      comparisonData,
      insightsData,
      productIntelligenceData,
      reviewsData,
      roadmapData,
    } = body;

    if (!overviewData || !comparisonData || !insightsData || !productIntelligenceData || !reviewsData || !roadmapData) {
      return NextResponse.json({ error: 'Incomplete data provided' }, { status: 400 });
    }

    const dataDir = path.join(process.cwd(), 'data');

    const filesToWrite = [
      { name: 'overview.ts', content: `export const overviewData = ${JSON.stringify(overviewData, null, 2)};` },
      { name: 'comparison.ts', content: `export const comparisonData = ${JSON.stringify(comparisonData, null, 2)};` },
      { name: 'insights.ts', content: `export const insightsData = ${JSON.stringify(insightsData, null, 2)};` },
      {
        name: 'product-intelligence.ts',
        content: `export const productIntelligenceData = ${JSON.stringify(productIntelligenceData, null, 2)};`,
      },
      {
        name: 'reviews.ts',
        content: `export const reviewsData = ${JSON.stringify(reviewsData, null, 2)};`,
      },
      {
        name: 'roadmap.ts',
        content: `export const roadmapData = ${JSON.stringify(roadmapData, null, 2)};`,
      },
    ];

    for (const file of filesToWrite) {
      await fs.writeFile(path.join(dataDir, file.name), file.content, 'utf-8');
    }

    return NextResponse.json({ message: 'Data updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/update-data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
