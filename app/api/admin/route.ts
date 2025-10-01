import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'contacts'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    if (type === 'contacts') {
      const [contacts, total] = await Promise.all([
        prisma.contact.findMany({
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.contact.count()
      ])

      return NextResponse.json({
        success: true,
        data: contacts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      })
    } else if (type === 'subscribers') {
      const [subscribers, total] = await Promise.all([
        prisma.subscriber.findMany({
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.subscriber.count()
      ])

      return NextResponse.json({
        success: true,
        data: subscribers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid type parameter'
      }, { status: 400 })
    }

  } catch (error) {
    console.error('Admin API error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Something went wrong'
    }, { status: 500 })
  }
}

// Simple authentication middleware - you should implement proper auth
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, id, status } = body

    if (action === 'update_status' && id && status) {
      const contact = await prisma.contact.update({
        where: { id },
        data: { status }
      })

      return NextResponse.json({
        success: true,
        data: contact
      })
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid action'
    }, { status: 400 })

  } catch (error) {
    console.error('Admin API error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Something went wrong'
    }, { status: 500 })
  }
}