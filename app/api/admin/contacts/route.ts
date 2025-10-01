import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for pagination and filtering
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const source = searchParams.get('source')

    const skip = (page - 1) * limit

    // Build where clause
    const where: { status?: string; source?: string } = {}
    if (status) where.status = status
    if (source) where.source = source

    // Get contacts with pagination
    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.contact.count({ where })
    ])

    // Get summary statistics
    const totalContacts = await prisma.contact.count()
    const newContacts = await prisma.contact.count({ where: { status: 'new' } })
    const contactFormSubmissions = await prisma.contact.count({ where: { source: 'contact_form' } })
    const getStartedSubmissions = await prisma.contact.count({ where: { source: 'get_started' } })

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        },
        stats: {
          total: totalContacts,
          new: newContacts,
          contactForm: contactFormSubmissions,
          getStarted: getStartedSubmissions
        }
      }
    })

  } catch (error) {
    console.error('Admin contacts error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch contacts'
    }, { status: 500 })
  }
}

// Update contact status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, emailSent } = body

    const updateData: { status?: string; emailSent?: boolean; emailSentAt?: Date } = {}
    if (status) updateData.status = status
    if (emailSent !== undefined) {
      updateData.emailSent = emailSent
      if (emailSent) updateData.emailSentAt = new Date()
    }

    const contact = await prisma.contact.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      data: contact
    })

  } catch (error) {
    console.error('Update contact error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to update contact'
    }, { status: 500 })
  }
}