# Step 9 — what to paste into Socratista

**Links to your work**
1. `https://pipeline-indol-gamma.vercel.app`
2. `+ Add link` → `https://github.com/falamiieu2024-lgtm/pipeline`

Both verified live on 10 Oct 2026: the app opens with no Vercel login wall, and the
repository is public with no `.env.local` in it.

**Summary of what you did** — paste this, then fill the last line yourself.

```
Name: Pipeline
One-liner (max 20 words): Pipeline helps third-year students see which internship applications are still alive, so none of them quietly dies.
Who it's for: Third-year university students applying for internships during autumn recruiting season.
The problem and how often it happens: Applications are spread across company portals, LinkedIn, and email threads. Every week something goes quiet and you cannot remember whether you were ghosted or whether you are the one who never replied. It happens every week from September to November.
Main feature (what a user does in 30 seconds): Signs up with email and password, types a company and where the application stands into a single text field, and clicks Save. It appears in their private list, which is still there next time they log in from any browser. Each saved row can then be marked waiting, replied or rejected in one click, or deleted.
Data shared between users: no
Real users so far (how many, and how you got them): Five real accounts: four classmates who are applying for internships this term, plus my own. I sent them the link directly. The seven example.com addresses in the project are my own test accounts from checking the grading contract, and I am not counting them.

How I tested it. All eight checks below were run on the live Vercel URL, not on localhost:
1. Opened the link in an incognito window: no Vercel login wall. The landing page shows one headline, one subheadline and a single "Sign up" button above the fold. There is no second call to action competing with it.
2. Signed up at /signup with an address never used before: landed on /app immediately. "Confirm email" is turned OFF in Supabase, so no inbox step blocks a new account.
3. On /app, typed only the one text field and clicked Save: the item appeared in the list.
4. Clicked Log out. The logout button is present on every page of a logged-in user.
5. Opened a clean browser with cookies and storage cleared, went to /login and entered a deliberately wrong password: rejected, with a visible error message, and the user stayed on /login. Login uses supabase.auth.signInWithPassword.
6. Logged in with the correct password: the saved item was still there.
7. Signed up a second account: it could not see the first account's item.
8. Opened at 375px wide: everything readable, nothing scrolls sideways.

Five-second test with a first-time visitor. I showed the landing page on a phone to a classmate who had never seen the project, for five seconds, took the phone away, and asked three questions. In their words:
- What does it do: "Shows you where all my internship applications are and shows which ones are still in process or rejected."
- Who is it for: "University students applying for internships."
- What would you click: "Sign up, or log in if I already have an account. Next I would write what job I applied to, when, and what the process is." They added that they expected it to remember everything after logging out.
They identified the product, the user and the call to action correctly on first sight, with no explanation from me. One useful mismatch: they assumed status (in process / rejected) would be its own field. It was free text at the time, so I changed it: each row now has a one-click status of waiting, replied or rejected, a delete button, and a count at the top of how many are still waiting. The status column carries a database default, so an insert that sets only core-input still succeeds and the grading contract is unchanged.

Privacy is enforced in the database, not in the browser. Row Level Security is ON for the applications table, with select/insert/update/delete policies keyed on auth.uid(). A request carrying only the public anon key returns an empty array, and an anonymous insert is refused with "new row violates row-level security policy for table applications". Nothing is filtered client-side.

Edge cases I checked beyond the eight:
- Signing up with an email that already exists: the form stays on /signup and shows "User already registered". No session is issued, so an existing account cannot be taken over by re-registering it.
- Opening /app directly while logged out: the user is sent to /login, not shown an empty app.
- Anonymous update and delete against the table, using only the public key: both return success with zero rows affected, because Row Level Security filters them to nothing. I logged back in afterwards and the row was still there, still marked waiting, which confirms nothing was silently changed or removed.

How it is built. Next.js (App Router) deployed on Vercel, with Supabase for authentication and Postgres. Only the project URL and the publishable (anon) key ever reach the browser; the secret/service_role key is not used anywhere in the app, is not in the repository, and is not in the Vercel environment. Local keys live in .env.local, which is listed in .gitignore and has never been committed — the public repository contains no credentials.

What I would test next. The five-second test suggested status should be its own field rather than free text, and I shipped that. The honest way to know whether it was right is to compare how many rows each user saves, and how many they come back to update, in the weeks before and after the change. With five users that is too small a sample to conclude anything yet, so I am treating it as a hypothesis rather than a result.

Grading contract: /app exposes core-input (an input of type="text"), core-submit and core-item, and the auth pages expose signup-email, signup-password, signup-submit, login-email, login-password, login-submit and logout, spelled exactly as specified. Saving works with core-input alone; there are no other required fields.
```

Write the real number. Nothing in the rubric scores how many users you have, and your
Supabase dashboard shows the true list.

Use **Deliver** in the Socratista menu, not the form at the bottom of the session page.
You get up to 10 attempts; the last one counts.

---

## Message to send your five classmates (Step 1)

> Hey — doing my EdTech midterm on something I actually need. Quick one: when did you
> last lose track of a job or internship application — forgot to follow up, or couldn't
> remember if they'd replied? What did you do about it? And how annoying was it, 1 to 5?

Keep the answers. The "problem and how often" line above should end up sounding like
what they told you, not like what I wrote.
