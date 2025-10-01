import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    // Check password against environment variable
    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!adminPassword) {
      return NextResponse.json({
        success: false,
        message: 'Admin authentication not configured'
      }, { status: 500 })
    }
    
    if (password !== adminPassword) {
      return NextResponse.json({
        success: false,
        message: 'Invalid password'
      }, { status: 401 })
    }
    
    // Generate a simple token (in production, use JWT or similar)
    const token = process.env.ADMIN_AUTH_TOKEN || 'admin-authenticated'
    
    return NextResponse.json({
      success: true,
      token,
      message: 'Authentication successful'
    })
    
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json({
      success: false,
      message: 'Authentication failed'
    }, { status: 500 })
  }
}