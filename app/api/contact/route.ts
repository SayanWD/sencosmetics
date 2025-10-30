import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json().catch(() => null)

    if (!body) {
      return NextResponse.json(
        { success: false, message: 'Invalid request body' },
        { status: 400 }
      )
    }

    const validationResult = contactSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const { name, email, phone, message } = validationResult.data

    // Save to Supabase
    const supabase = await createClient()
    const { error: dbError } = await supabase.from('contact_submissions').insert([
      {
        name,
        email,
        phone: phone || null,
        message,
        created_at: new Date().toISOString(),
      },
    ])

    if (dbError) {
      console.error('Database error:', dbError)
      // Don't fail the request if DB insert fails, just log it
    }

    // Log to console for debugging
    console.log('Contact form submission:', {
      name,
      email,
      phone: phone || 'N/A',
      message,
      timestamp: new Date().toISOString(),
      db_saved: !dbError,
    })

    // TODO: Send email notification (optional)
    // Example with Sendgrid:
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   from: process.env.SENDGRID_FROM_EMAIL,
    //   subject: `New contact form submission from ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `
    // })

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

