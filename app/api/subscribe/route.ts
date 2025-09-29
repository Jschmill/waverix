import { NextRequest, NextResponse } from 'next/server'
import { subscribeFormSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the email
    const validatedData = subscribeFormSchema.parse(body)
    
    // Here you would typically:
    // 1. Add to email marketing service (Mailchimp, ConvertKit, etc.)
    // 2. Save to database
    // 3. Send welcome email
    
    console.log('Newsletter subscription:', validatedData)
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // In a real implementation, you would:
    /*
    // Add to email marketing service
    await emailService.subscribe({
      email: validatedData.email,
      tags: ['website-signup'],
      source: 'website-newsletter'
    })
    
    // Send welcome email
    await sendEmail({
      to: validatedData.email,
      subject: 'Welcome to Waverix Newsletter!',
      template: 'newsletter-welcome'
    })
    
    // Save to database
    await db.subscribers.create({
      data: {
        email: validatedData.email,
        source: 'website',
        createdAt: new Date()
      }
    })
    */
    
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