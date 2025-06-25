import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Import users from signup route
const users = new Map()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log('🔐 LOGIN ATTEMPT:', email)

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = users.get(email)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // LAUNCH DAY: Skip email verification check
    console.log('✅ LOGIN SUCCESS:', email)

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        verified: true // Always true for launch day
      }
    })

  } catch (error: any) {
    console.error('❌ Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

