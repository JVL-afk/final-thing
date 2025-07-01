import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '../../../../../lib/mongodb'; // Adjust path if necessary

// In-memory "database" (to be replaced by MongoDB)
// const users = new Map(); // REMOVE OR COMMENT OUT THIS LINE

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('affilify'); // Use your database name (e.g., 'affilify')
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Save user to MongoDB
    const newUser = {
      email,
      password: hashedPassword,
      createdAt: new Date(),
      // Add any other default user fields here
    };
    await usersCollection.insertOne(newUser);

    console.log(`User signed up: ${email}`);

    return NextResponse.json(
      { success: true, message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during signup' },
      { status: 500 }
    );
  }
}

