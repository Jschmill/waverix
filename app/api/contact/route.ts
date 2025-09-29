import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the form data
    const validatedData = contactFormSchema.parse(body)
    
    // Here you would typically:
    // 1. Send email notification
    // 2. Save to database
    // 3. Send to CRM
    // 4. Trigger automation workflows
    
    console.log('Contact form submission:', validatedData)
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real implementation, you would:
    /*
    // Send email using a service like Resend, SendGrid, or Nodemailer
    await sendEmail({
      to: 'hello@waverix.com',
      subject: `New Contact Form Submission from ${validatedData.firstName} ${validatedData.lastName}`,
      template: 'contact-form',
      data: validatedData
    })
    
    // Send auto-reply to customer
    await sendEmail({
      to: validatedData.businessEmail,
      subject: 'Thank you for contacting Waverix',
      template: 'contact-confirmation',
      data: validatedData
    })
    
    // Save to database
    await db.contacts.create({
      data: {
        ...validatedData,
        createdAt: new Date(),
        status: 'new'
      }
    })
    
    // Send to CRM (e.g., HubSpot, Salesforce)
    await crmService.createContact(validatedData)
    */
    
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