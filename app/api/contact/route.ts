import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the form data
    const validatedData = contactFormSchema.parse(body)
    
    // Save to database
    const contact = await prisma.contact.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        businessEmail: validatedData.businessEmail,
        phoneNumber: validatedData.phoneNumber || null,
        companyName: validatedData.companyName,
        industry: validatedData.industry,
        companySize: validatedData.companySize,
        currentChallenges: validatedData.currentChallenges,
        interestedServices: validatedData.interestedServices,
        projectTimeline: 'not-specified', // Default value since we removed this field
        budget: validatedData.budget,
        additionalInfo: validatedData.additionalInfo,
        source: body.source || 'contact_form',
        status: 'new'
      }
    })
    
    console.log('Contact form submission saved:', contact.id)
    
    // TODO: In a real implementation, you would:
    // - Send notification email to your team
    // - Send auto-reply to customer
    // - Integrate with your CRM system
    // - Set up automated email sequences
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We\'ll get back to you within 24 hours.',
      data: {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        message: 'Invalid form data. Please check your inputs and try again.',
        errors: error
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    }, { status: 500 })
  }
}

// Handle OPTIONS request for CORS
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