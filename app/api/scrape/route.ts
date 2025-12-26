import { NextRequest, NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';
import { transformApifyData } from '@/lib/data-transformer';

function getAsinFromUrl(url: string): string | null {
    const asinRegex = /\/(?:dp|gp\/product)\/([A-Z0-9]{10})/; // Regex to find ASIN in URL
    const match = url.match(asinRegex);
    return match ? match[1] : null;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { productUrl } = body;

        if (!productUrl) {
            return NextResponse.json({ error: 'Product URL is required' }, { status: 400 });
        }

        // I will add the Apify scraping logic here in the next step.
        console.log('Received product URL:', productUrl);

        const client = new ApifyClient({
            token: process.env.APIFY_API_TOKEN,
        });

        const asin = getAsinFromUrl(productUrl);

        if (!asin) {
            return NextResponse.json({ error: 'Could not extract ASIN from the provided URL' }, { status: 400 });
        }

        const input = {
            "ASIN_or_URL": [
                productUrl
            ],
            "country": "India",
            "filter_by_mediaType": [
                "all_contents"
            ],
            "filter_by_ratings": [
                "all_stars"
            ],
            "filter_by_verified_purchase_only": [
                "all_reviews"
            ],
            "get_customers_say": true,
            "max_reviews": 100,
            "recent_days": 0,
            "sort_reviews_by": [
                "helpful"
            ],
            "unique_only": false
        }
        console.log('Input:', input);
        const actorCall = await client.actor("8vhDnIX6dStLlGVr7").call(input);

        const { items } = await client.dataset(actorCall.defaultDatasetId).listItems();
        items.forEach((item) => {
            console.dir(item);
        });
        const transformedData = transformApifyData(items);

        return NextResponse.json(transformedData, { status: 200 });
    } catch (error) {
        console.error('Error in /api/scrape:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
