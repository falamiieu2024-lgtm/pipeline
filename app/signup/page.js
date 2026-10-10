'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getSupabase } from '../../lib/supabase'

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)

    const { error } = await getSupabase().auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setBusy(false)
      return
    }

    router.push('/app')
    router.refresh()
  }

  return (
    <main className="wrap">
      <p className="brand" style={{ marginBottom: 28 }}>Pipeline</p>
      <h2>Create your account</h2>

      {error ? <p className="error">{error}</p> : null}

      <form onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            data-testid="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            data-testid="signup-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button data-testid="signup-submit" type="submit" disabled={busy}>
          {busy ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      <p className="alt">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  )
}
