'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '../../lib/supabase'

const STATUSES = [
  { key: 'waiting', label: 'Waiting' },
  { key: 'replied', label: 'Replied' },
  { key: 'rejected', label: 'Rejected' },
]

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
      .select('*')
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

    // Only content and user_id are sent. status takes its database default,
    // so saving works with the text field alone.
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

  async function setStatus(id, status) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)))

    const { error } = await getSupabase()
      .from('applications')
      .update({ status })
      .eq('id', id)

    if (error) {
      setError(error.message)
      await load()
    }
  }

  async function remove(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))

    const { error } = await getSupabase().from('applications').delete().eq('id', id)

    if (error) {
      setError(error.message)
      await load()
    }
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

  const statusOf = (item) => item.status ?? 'waiting'
  const count = (key) => items.filter((i) => statusOf(i) === key).length

  return (
    <main className="wrap">
      <div className="topbar">
        <span className="brand">Pipeline</span>
        <button data-testid="logout" type="button" className="btn-quiet" onClick={onLogout}>
          Log out
        </button>
      </div>

      <h2>Your applications</h2>

      {items.length > 0 ? (
        <p className="tally">
          <strong>{count('waiting')} still waiting</strong>
          <span> · {count('replied')} replied · {count('rejected')} rejected</span>
        </p>
      ) : null}

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
        <p className="empty">Nothing here yet. Add the last company you applied to.</p>
      ) : (
        <ul className="items">
          {items.map((item) => (
            <li key={item.id} className={`item is-${statusOf(item)}`}>
              <span data-testid="core-item">{item.content}</span>

              <div className="row-controls">
                <div className="pills" role="group" aria-label="Status">
                  {STATUSES.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      className={`pill${statusOf(item) === s.key ? ' on' : ''}`}
                      aria-pressed={statusOf(item) === s.key}
                      onClick={() => setStatus(item.id, s.key)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="remove"
                  aria-label={`Delete ${item.content}`}
                  onClick={() => remove(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
