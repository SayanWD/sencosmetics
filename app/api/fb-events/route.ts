import { NextRequest, NextResponse } from 'next/server'

// Facebook Pixel ID from environment
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { eventName, userData, customData, testEventCode } = body

  // Log in development for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.log('📊 Facebook CAPI Event (Development):')
    console.log('  Event:', eventName)
    console.log('  User Data:', userData)
    console.log('  Custom Data:', customData)
    console.log('  → Event logged but not sent to Facebook (dev mode)')
    return NextResponse.json({ 
      success: true, 
      message: 'Development mode - event logged but not sent to Facebook',
      event: eventName,
      userData,
      customData
    })
  }

  if (!FB_PIXEL_ID || !FB_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'Facebook Pixel not configured' },
      { status: 500 }
    )
  }

  try {
    // Get client IP for advanced matching
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     ''

    // Get user agent
    const userAgent = request.headers.get('user-agent') || ''

    // Build the CAPI payload
    const payload: any = {
      data: [
        {
          event_name: eventName || 'PageView',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: request.headers.get('referer') || '',
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: userAgent,
            ...userData, // email, phone, etc.
          },
          custom_data: customData || {},
        },
      ],
      access_token: FB_ACCESS_TOKEN,
    }

    // Add test_event_code if provided (for testing in Events Manager)
    if (testEventCode) {
      payload.test_event_code = testEventCode
    }

    // Send to Facebook Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('Facebook CAPI error:', result)
      return NextResponse.json(
        { error: 'Failed to send event', details: result },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Facebook CAPI error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
