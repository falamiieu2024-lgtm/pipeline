'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '../../lib/supabase'

export default function AppPage() {
  const router = useRouter()

  const [ready, setReady] = useState(false)
  const [items, setItems] = useState([])
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    // Row Level Security means this only ever returns the logged-in user's rows.
    const { data, error } = await getSupabase()
      .from('applications')
      .select('id, content, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
      return
    }
    setItems(data ?? [])
  }, [])

  useEffect(() => {
    let cancelled = false

    async function boot() {
      const { data } = await getSupabase().auth.getSession()
      if (cancelled) return

      if (!data.session) {
        router.replace('/login')
        return
      }

      await load()
      if (!cancelled) setReady(true)
    }

    boot()
    return () => {
      cancelled = true
    }
  }, [router, load])

  async function onSubmit(e) {
    e.preventDefault()
    const content = text.trim()
    if (!content) return

    setError('')
    setBusy(true)

    const { data: sessionData } = await getSupabase().auth.getSession()
    const userId = sessionData.session?.user?.id

    if (!userId) {
      router.replace('/login')
      return
    }

    const { error } = await getSupabase()
      .from('applications')
      .insert({ content, user_id: userId })

    if (error) {
      setError(error.message)
      setBusy(false)
      return
    }

    setText('')
    await load()
    setBusy(false)
  }

  async function onLogout() {
    await getSupabase().auth.signOut()
    router.replace('/login')
    router.refresh()
  }

  if (!ready) {
    return (
      <main className="wrap">
        <p className="lede">Loading…</p>
      </main>
    )
  }

  return (
    <main className="wrap">
      <div className="topbar">
        <span className="brand">Pipeline</span>
        <button
          data-testid="logout"
          type="button"
          className="btn-quiet"
          onClick={onLogout}
        >
          Log out
        </button>
      </div>

      <h2>Your applications</h2>

      {error ? <p className="error">{error}</p> : null}

      <form onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="core-input">Company and where it stands</label>
          <input
            id="core-input"
            data-testid="core-input"
            type="text"
            placeholder="Deloitte — sent CV 3 Oct, no reply"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <button data-testid="core-submit" type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Save'}
        </button>
      </form>

      {items.length === 0 ? (
        <p className="empty">
          Nothing here yet. Add the last company you applied to.
        </p>
      ) : (
        <>
          <ul className="items">
            {items.map((item) => (
              <li key={item.id} data-testid="core-item">
                {item.content}
              </li>
            ))}
          </ul>
          <p className="count">
            {items.length} application{items.length === 1 ? '' : 's'} tracked
          </p>
        </>
      )}
    </main>
  )
}
