import { NextRequest, NextResponse } from 'next/server'
import { subscribeFormSchema } from '@/lib/validations'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the email
    const validatedData = subscribeFormSchema.parse(body)
    
    // Check if email already exists
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingSubscriber) {
      return NextResponse.json({
        success: false,
        message: 'This email is already subscribed to our newsletter.',
      }, { status: 400 })
    }
    
    // Save to database
    const subscriber = await prisma.subscriber.create({
      data: {
        email: validatedData.email,
        source: 'website',
        isActive: true
      }
    })
    
    console.log('Newsletter subscription saved:', subscriber.id)
    
    // TODO: In a real implementation, you would:
    // - Add to email marketing service (Mailchimp, ConvertKit, etc.)
    // - Send welcome email
    // - Set up automated email sequences
    
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      data: {
        email: validatedData.email,
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        message: 'Please enter a valid email address.',
        errors: error
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}