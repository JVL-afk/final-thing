import { NextRequest, NextResponse } from 'next/server';

// This is the URL of your REAL backend service running on the same server
const BACKEND_API_URL = 'http://45.32.73.36:3000/api/analyze-website';

export async function POST(request: NextRequest ) {
  try {
    // Get the URL and userId from the request body sent by the frontend page
    const body = await request.json();
    const { url, userId } = body;

    if (!url) {
      return NextResponse.json({ success: false, error: 'Website URL is required.' }, { status: 400 });
    }

    // Forward the request to your real backend service
    const backendResponse = await fetch(BACKEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        userId: userId
      }),
    });

    // Check if the backend responded successfully
    if (!backendResponse.ok) {
      const errorData = await backendResponse.text();
      console.error(`Backend error: ${backendResponse.status}`, errorData);
      return NextResponse.json(
        { success: false, error: `The analysis server returned an error: ${backendResponse.statusText}` },
        { status: backendResponse.status }
      );
    }

    const analysisData = await backendResponse.json();

    return NextResponse.json(analysisData);

  } catch (error: any) {
    console.error('Error in /api/analyze-website route:', error);
    return NextResponse.json(
      { success: false, error: 'An internal server error occurred. Please check the server logs.' },
      { status: 500 }
    );
  }
}

