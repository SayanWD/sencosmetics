import { NextRequest, NextResponse } from 'next/server'

// This endpoint helps test CAPI connection
// Call it from Graph API Explorer or Events Manager

export async function GET(request: NextRequest) {
  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID
  const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN

  if (!FB_PIXEL_ID || !FB_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'Facebook Pixel not configured' },
      { status: 500 }
    )
  }

  // Get test_event_code from query params
  const testEventCode = request.nextUrl.searchParams.get('test_event_code')

  const payload: any = {
    data: [
      {
        event_name: 'PageView',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: 'https://maryan.kz/',
        user_data: {
          client_ip_address: '127.0.0.1',
          client_user_agent: 'Test-Agent',
        },
        custom_data: {
          source: 'test_capi_endpoint',
        },
      },
    ],
    access_token: FB_ACCESS_TOKEN,
  }

  // Add test_event_code if provided
  if (testEventCode) {
    payload.test_event_code = testEventCode
  }

  try {
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
      return NextResponse.json(
        { error: 'Failed to send test event', details: result },
        { status: response.status }
      )
    }

    return NextResponse.json({ 
      success: true, 
      result,
      message: 'Test event sent successfully',
      test_event_code: testEventCode || 'not provided'
    })
  } catch (error) {
    console.error('Facebook CAPI test error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    )
  }
}
