import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface User {
  _id: ObjectId;
  plan: string;
  generationsUsed: number;
  analysesUsed: number;
}

interface GeneratedWebsite {
  _id?: ObjectId;
  content: string;
  createdAt: Date;
  websiteConfig: {
    niche?: string;
    product?: string;
    audience?: string;
    features?: string[];
    callToAction?: string;
  };
  userId: ObjectId;
}

export async function POST(request: NextRequest) {
  try {
    const mongoClientPromise = clientPromise as Promise<MongoClient>;
    const client: MongoClient = await mongoClientPromise;
    const db = client.db('affilify');
    const usersCollection: Collection<User> = db.collection<User>('users');
    const websitesCollection: Collection<GeneratedWebsite> = db.collection<GeneratedWebsite>('generated_websites');

    const { userId, websiteConfig } = await request.json();

    if (!userId || !websiteConfig) {
      return NextResponse.json({ error: 'Missing userId or websiteConfig' }, { status: 400 });
    }

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: 'User not found', success: false }, { status: 404 });
    }

    const plan = user.plan || 'free';
    const generationsUsed = user.generationsUsed || 0;

    let generationLimit = 0;
    if (plan === 'free') {
      generationLimit = 10;
    } else if (plan === 'pro') {
      generationLimit = 100;
    } else if (plan === 'enterprise') {
      generationLimit = Infinity;
    }

    if (generationsUsed >= generationLimit) {
      return NextResponse.json({ error: 'Generation limit reached for your plan', success: false }, { status: 403 });
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Using gemini-pro for content generation

    // Construct a detailed prompt for website content generation
    const prompt = `Generate personalized website content based on the following configuration:
    Niche: ${websiteConfig.niche || 'general'}
    Product/Service: ${websiteConfig.product || 'various'}
    Target Audience: ${websiteConfig.audience || 'general'}
    Key Features/Benefits: ${websiteConfig.features ? websiteConfig.features.join(', ') : 'N/A'}
    Call to Action: ${websiteConfig.callToAction || 'Learn More'}

    Provide the content in a structured JSON format with the following structure:
    {
      "hero": {
        "title": "Main headline for the hero section",
        "body": "Compelling description for the hero section"
      },
      "about": {
        "title": "About section title",
        "body": "Detailed about section content"
      },
      "services": {
        "title": "Services section title", 
        "body": "Description of services offered"
      },
      "testimonials": {
        "title": "Testimonials section title",
        "body": "Customer testimonials or social proof"
      },
      "contact": {
        "title": "Contact section title",
        "body": "Contact information and call to action"
      }
    }

    Ensure the content is engaging, relevant to the specified configuration, and professionally written. Make it specific to the niche and product/service provided.`;

    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    const generatedContent = aiResponse.text();

    // Store the generated website in the database
    const websiteDocument: GeneratedWebsite = {
      content: generatedContent,
      createdAt: new Date(),
      websiteConfig: websiteConfig,
      userId: new ObjectId(userId)
    };

    const insertResult = await websitesCollection.insertOne(websiteDocument);
    const websiteId = insertResult.insertedId;

    // Create the actual website URL using the website ID
    const generatedWebsiteUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/websites/${websiteId}`;

    // Update user's generationsUsed count
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $inc: { generationsUsed: 1 } }
    );

    return NextResponse.json({ 
      success: true, 
      websiteUrl: generatedWebsiteUrl,
      websiteId: websiteId.toString(),
      generatedContent: generatedContent 
    });
  } catch (error) {
    console.error('Error generating website:', error);
    return NextResponse.json({ error: 'Internal Server Error', success: false }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'GET request to generate website' });
}

export async function PUT() {
  return NextResponse.json({ message: 'PUT request to generate website' });
}

export async function DELETE() {
  return NextResponse.json({ message: 'DELETE request to generate website' });
}




