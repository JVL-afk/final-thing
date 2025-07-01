import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb'; // Correct path for this file

export async function POST(request: NextRequest) {
  try {
    const { affiliateLink, productName } = await request.json();
    // Assuming user email is passed in a header or retrieved from session/token
    // For now, let's use a placeholder or retrieve from a header if available
    const userEmail = request.headers.get('x-user-email') || 'demo@user.com'; // You might set this in frontend fetch calls

    if (!affiliateLink) {
      return NextResponse.json(
        { success: false, error: 'Affiliate link is required' },
        { status: 400 }
      );
    }

    console.log(`AI Website Generation Request for ${userEmail}: Affiliate Link - "${affiliateLink}", Product Name - "${productName || 'N/A'}"`);

    // --- Call your real backend on port 3000 ---
    // IMPORTANT: Replace 'YOUR_SERVER_IP' with your actual server's public IP address
    const realBackendResponse = await fetch('http://45.32.73.36:3000/api/generate-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ affiliateLink, productName, templateType: 'modern' } ), // Pass necessary data to your backend
    });

    const realBackendData = await realBackendResponse.json();

    if (!realBackendData.success) {
        console.error('Real backend response error:', realBackendData.error);
        return NextResponse.json(
            { success: false, error: realBackendData.error || 'Real backend failed to generate website' },
            { status: realBackendResponse.status || 500 }
        );
    }

    const generatedWebsiteUrl = realBackendData.url; // Assuming your real backend returns 'url'

    // --- Save generated website details to MongoDB ---
    const client = await clientPromise;
    const db = client.db('affilify'); // Use your database name
    const websitesCollection = db.collection('generatedWebsites');

    const newWebsite = {
      userId: userEmail, // Link to the user who generated it
      affiliateLink,
      productName: productName || 'N/A',
      generatedUrl: generatedWebsiteUrl,
      createdAt: new Date(),
      status: 'active', // You can add a status
      // Add any other relevant data you want to store from the backend response
    };

    await websitesCollection.insertOne(newWebsite);
    console.log(`Generated website saved to DB for user ${userEmail}: ${generatedWebsiteUrl}`);

    // --- Return success response to frontend ---
    return NextResponse.json({
      success: true,
      message: 'Website generated and saved successfully!',
      website: { // This structure is what your frontend expects for display
        title: `Generated for ${productName || 'N/A'}`,
        description: `Website generated from ${affiliateLink}`,
        sections: [{ heading: 'View Website', content: '', products: [{ name: 'View', description: '', affiliateLink: generatedWebsiteUrl }] }],
        url: generatedWebsiteUrl
      },
      generationTime: realBackendData.generationTime || 0, // Pass through if backend provides
    });

  } catch (error: any) {
    console.error('AI website generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during AI generation' },
      { status: 500 }
    );
  }
}

