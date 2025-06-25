import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Simple in-memory storage for launch day
const users = new Map()
const verificationCodes = new Map()

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    console.log('🚀 SIGNUP ATTEMPT:', { name, email })

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists
    if (users.has(email)) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const codeExpiry = new Date(Date.now() + 600000) // 10 minutes

    // Store user (verified for launch day)
    users.set(email, {
      name,
      email,
      password: hashedPassword,
      verified: true, // AUTO-VERIFY for launch day
      createdAt: new Date()
    })

    // Store verification code
    verificationCodes.set(email, {
      code: verificationCode,
      expiry: codeExpiry
    })

    // LAUNCH DAY: Console logging instead of email
    console.log('🎯 VERIFICATION CODE FOR', email, ':', verificationCode)
    console.log('📧 User auto-verified for launch day')
    console.log('✅ Account created successfully')

    return NextResponse.json({
      success: true,
      message: 'Account created and verified successfully!',
      email: email,
      autoVerified: true // Launch day feature
    })

  } catch (error: any) {
    console.error('❌ Signup error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Export users map for other auth endpoints
export { users, verificationCodes }

