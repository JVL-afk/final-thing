import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';
import { Collection, MongoClient, ObjectId } from 'mongodb';

interface User {
  _id: ObjectId;
  plan: string;
  generationsUsed: number;
  analysesUsed: number;
}

export async function POST(request: NextRequest) {
  try {
    // Add explicit type assertion
    const mongoClientPromise = clientPromise as Promise<MongoClient>;
    const client: MongoClient = await mongoClientPromise;
    const db = client.db("affilify");
    const usersCollection: Collection<User> = db.collection<User>("users");

    const { userId, websiteConfig } = await request.json();

    if (!userId || !websiteConfig) {
      return NextResponse.json({ error: "Missing userId or websiteConfig" }, { status: 400 });
    }

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: "User not found", success: false }, { status: 404 });
    }

    // Check user's plan and usage limits
    const plan = user.plan || "free";
    const generationsUsed = user.generationsUsed || 0;

    let generationLimit = 0;
    if (plan === "free") {
      generationLimit = 10;
    } else if (plan === "pro") {
      generationLimit = 100;
    } else if (plan === "enterprise") {
      generationLimit = Infinity;
    }

    if (generationsUsed >= generationLimit) {
      return NextResponse.json({ error: "Generation limit reached for your plan", success: false }, { status: 403 });
    }

    // Simulate website generation
    const generatedWebsiteUrl = `https://affilify.ai/websites/${new Date( ).getTime()}`;

    // Update user's generationsUsed count
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $inc: { generationsUsed: 1 } }
    );

    return NextResponse.json({ success: true, websiteUrl: generatedWebsiteUrl });
  } catch (error) {
    console.error("Error generating website:", error);
    return NextResponse.json({ error: "Internal Server Error", success: false }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "GET request to generate website" });
}

export async function PUT() {
  return NextResponse.json({ message: "PUT request to generate website" });
}

export async function DELETE() {
  return NextResponse.json({ message: "DELETE request to generate website" });
}





