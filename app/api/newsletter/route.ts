import { z } from 'zod'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const payloadSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: Request): Promise<Response> {
  const json = await request.json().catch(() => null)
  const parsed = payloadSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email: parsed.data.email, status: 'pending' })

  if (error) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}


