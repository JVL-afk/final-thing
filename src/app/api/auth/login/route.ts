import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
// @ts-ignore
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

// @ts-ignore
    const client = await clientPromise;
    const db = client.db('affilify'); // Use your database name
    const usersCollection = db.collection('users');

    // Find user in MongoDB
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log(`User logged in: ${email}`);

    // In a real application, you would generate a JWT token here
    return NextResponse.json(
      { success: true, message: 'Login successful', user: { email: user.email } },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during login' },
      { status: 500 }
    );
  }
}

