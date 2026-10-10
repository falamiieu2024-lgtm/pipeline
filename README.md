# Pipeline

See which of your internship applications are still alive.

Built for third-year students during autumn recruiting season, when applications end up
scattered across company portals, LinkedIn and email, and the ones that go quiet are
indistinguishable from the ones you forgot to chase.

Sign up with an email and a password, write down a company and where it stands, and it
stays in your private list.

## Running it

```
npm install
npm run dev
```

Needs a `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

The table and its row level security policies are in `supabase.sql`.

## Stack

Next.js (App Router) · Supabase Auth and Postgres · deployed on Vercel.
