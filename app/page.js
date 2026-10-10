import Link from 'next/link'

export default function Landing() {
  return (
    <main className="wrap">
      <p className="brand" style={{ marginBottom: 28 }}>Pipeline</p>

      <h1>See which of your internship applications are still alive.</h1>

      <p className="lede">
        You applied to eleven companies in three weeks. Pipeline is the one list that tells
        you which ones are still moving, which are waiting on you, and which quietly died —
        so third-year students stop losing applications to their own inbox.
      </p>

      <Link className="btn" href="/signup">Sign up</Link>

      <p className="alt">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  )
}
