# Pipeline — the parts only you can do

Work top to bottom. Nothing here needs you to read code.

## 1. Three accounts (~15 min)

- **GitHub** — github.com, sign up.
- **Vercel** — vercel.com, sign up **with your GitHub account** so they are already linked.
- **Supabase** — supabase.com, sign up (GitHub works), then **New project**.
  Choose a **European region**. Save the database password in a password manager.

## 2. Two things inside Supabase (~5 min)

**a) Turn email confirmation off.** This one switch is worth 60% of your grade — with it
on, the grading bot signs up, is told to check an inbox it does not have, and everything
after that fails.

> Authentication → Sign In / Providers → Email → **Confirm email: OFF** → Save

**b) Copy your two public values.**

> Click **Connect** at the top of the project (or Project Settings → API Keys)

Copy the **Project URL** (`https://something.supabase.co`) and the **publishable key**
(starts with `sb_publishable_`; older projects call it the anon key).

**Do not copy the secret key** (`sb_secret_…` or `service_role`). It must never go into
the app, the repo, or a chat window.

## 3. Paste them into .env.local (~1 min)

Open `~/Claude/pipeline/.env.local` and replace the two placeholder values. Keep the
names exactly as they are. Save the file.

## 4. Create the table (~2 min)

> Supabase → **SQL Editor** → **New query** → paste the whole of `supabase.sql` → **Run**

You should see "Success. No rows returned." Safe to run twice.

## 5. Tell me, and I take over

Say "keys are in" and I will run the app locally and walk the eight checks with you.

## 6. Later — putting it online

Once it works locally:

1. GitHub repo, **Public**. Check there is no `.env.local` in it.
2. Vercel → Add New → Project → import the repo → open **Environment Variables** and add
   the same two lines → Deploy.
3. Vercel → Settings → **Domains** → use the **short** link,
   `https://pipeline-something.vercel.app`. The long deployment links ask visitors to log
   into Vercel, which would score you near zero.
4. Supabase → Authentication → **URL Configuration** → set Site URL to that link and add
   it under Redirect URLs. Save.

## 7. After you submit

Don't push changes. Don't delete the Vercel project. Open your app every few days —
free Supabase projects pause after 7 days idle, and grading happens after the 22nd.
