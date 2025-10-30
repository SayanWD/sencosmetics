import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const surveySchema = z.object({
  question1: z.string().min(1, 'Answer is required'),
  question2: z.string().min(1, 'Answer is required'),
  question3: z.string().min(1, 'Answer is required'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
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

    const validationResult = surveySchema.safeParse(body)

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

    const { question1, question2, question3, phone, email } = validationResult.data

    // Save to Supabase
    const supabase = await createClient()
    const { error: dbError } = await supabase.from('survey_responses').insert([
      {
        question1,
        question2,
        question3,
        phone,
        email,
        created_at: new Date().toISOString(),
      },
    ])

    if (dbError) {
      console.error('Database error:', dbError)
      // Don't fail the request if DB insert fails, just log it
    }

    // Log to console for debugging
    console.log('Survey response:', {
      question1,
      question2,
      question3,
      phone,
      email,
      timestamp: new Date().toISOString(),
      db_saved: !dbError,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Survey submitted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Survey error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

