import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb'; // This path should be correct
import { Collection, MongoClient, ObjectId } from 'mongodb'; // Import MongoClient

interface User {
  _id: ObjectId;
  plan: string;
  generationsUsed: number;
  analysesUsed: number;
}

export async function POST(request: NextRequest ) {
  try {
    const client: MongoClient = await clientPromise; // Explicitly type clientPromise as MongoClient
    const db = client.db('affilify'); // Assuming 'affilify' is your database name
    const usersCollection: Collection<User> = db.collection<User>('users');

    const { userId, websiteConfig } = await request.json();

    if (!userId || !websiteConfig) {
      return NextResponse.json({ error: 'Missing userId or websiteConfig', success: false }, { status: 400 });
    }

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: 'User not found', success: false }, { status: 404 });
    }

    // Check user's plan and usage limits
    const plan = user.plan || 'free';
    const generationsUsed = user.generationsUsed || 0;

    let maxGenerations: number;
    switch (plan) {
      case 'free':
        maxGenerations = 1;
        break;
      case 'pro':
        maxGenerations = 10;
        break;
      case 'enterprise':
        maxGenerations = Infinity; // Unlimited
        break;
      default:
        maxGenerations = 0; // Should not happen
    }

    if (generationsUsed >= maxGenerations) {
      return NextResponse.json({ error: `You have reached your limit of ${maxGenerations} website generations for the ${plan} plan. Please upgrade.`, success: false }, { status: 403 });
    }

    // Simulate website generation (replace with actual generation logic)
    const generatedWebsiteUrl = `https://generated-affilify-site-${Date.now( )}.netlify.app`; // Placeholder URL

    // Update user's generation count
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $inc: { generationsUsed: 1 } }
    );

    return NextResponse.json({ message: 'Website generated successfully!', url: generatedWebsiteUrl, success: true });

  } catch (error) {
    console.error('Error in generate-website API:', error);
    return NextResponse.json({ error: 'Internal Server Error', success: false }, { status: 500 });
  }
}



