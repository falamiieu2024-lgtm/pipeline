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
Main feature (what a user does in 30 seconds): Signs up with email and password, types a company and where the application stands into a single text field, and clicks Save. It appears in their private list, which is still there next time they log in from any browser.
Data shared between users: no
Real users so far (how many, and how you got them): None outside my own testing yet. The app went live on 10 October; I am sending the link this week to the third-year classmates who are applying for internships alongside me.

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
They identified the product, the user and the call to action correctly on first sight, with no explanation from me. One useful mismatch: they assumed status (in process / rejected) would be a separate field. It is currently written as part of the same free-text line.

Privacy is enforced in the database, not in the browser. Row Level Security is ON for the applications table, with select/insert/update/delete policies keyed on auth.uid(). A request carrying only the public anon key returns an empty array, and an anonymous insert is refused with "new row violates row-level security policy for table applications". Nothing is filtered client-side.

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
