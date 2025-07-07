import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const { websiteUrl } = await request.json();
    const userEmail = request.headers.get('x-user-email') || 'demo@user.com';

    if (!websiteUrl) {
      return NextResponse.json({
        success: false,
        error: 'Website URL is required for analysis',
      }, { status: 400 });
    }

    console.log(`AI Website Analysis Request for ${userEmail} | URL: ${websiteUrl}`);

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct a detailed prompt for website analysis
    const prompt = `Analyze the following website URL: ${websiteUrl}. Provide a comprehensive analysis focusing on:
    1. Overall summary and main topic.
    2. SEO recommendations (meta descriptions, alt tags, internal/external links, keywords).
    3. Content quality, readability, and relevance to potential affiliate niches.
    4. Identify opportunities for new content, keyword targeting, and affiliate product integration.
    5. Suggestions for affiliate programs in complementary niches.

    Provide the analysis in a structured JSON format with the following keys:
    {
      "summary": "Overall summary of the website and its main topic.",
      "seoRecommendations": [
        "Recommendation 1",
        "Recommendation 2"
      ],
      "contentOpportunities": [
        "Opportunity 1",
        "Opportunity 2"
      ],
      "affiliateSuggestions": [
        "Suggestion 1",
        "Suggestion 2"
      ]
    }

    Ensure the analysis is insightful, actionable, and professionally written.`;

    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    const generatedAnalysis = aiResponse.text();

    // Attempt to parse the generated analysis as JSON
    let analysisResult;
    try {
      analysisResult = JSON.parse(generatedAnalysis);
    } catch (parseError) {
      console.error('Failed to parse AI generated analysis as JSON:', parseError);
      // Fallback to plain text if JSON parsing fails
      analysisResult = { rawText: generatedAnalysis };
    }

    return NextResponse.json({
      success: true,
      message: 'Website analyzed successfully!',
      analysis: analysisResult,
    });
  } catch (error) {
    console.error('AI website analysis error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error during AI analysis',
    }, { status: 500 });
  }
}


