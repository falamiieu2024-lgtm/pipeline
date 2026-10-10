'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getSupabase } from '../../lib/supabase'

export default function LogIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)

    // signInWithPassword checks the password against Supabase. A wrong password
    // comes back as an error here and must stay on this page.
    const { error } = await getSupabase().auth.signInWithPassword({ email, password })

    if (error) {
      setError('That email and password do not match an account.')
      setBusy(false)
      return
    }

    router.push('/app')
    router.refresh()
  }

  return (
    <main className="wrap">
      <p className="brand" style={{ marginBottom: 28 }}>Pipeline</p>
      <h2>Log in</h2>

      {error ? <p className="error">{error}</p> : null}

      <form onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            data-testid="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            data-testid="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button data-testid="login-submit" type="submit" disabled={busy}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="alt">
        No account yet? <Link href="/signup">Sign up</Link>
      </p>
    </main>
  )
}
