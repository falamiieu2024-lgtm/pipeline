'use client'

import { createBrowserClient } from '@supabase/ssr'

let client

// One browser client, reused. Reads the two public values from .env.local locally
// and from the Vercel environment variables in production.
export function getSupabase() {
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    )
  }
  return client
}
