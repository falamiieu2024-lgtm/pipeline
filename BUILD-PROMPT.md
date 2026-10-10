# Pipeline — build prompt (paste into Claude Code inside ~/Claude/pipeline)

Read CLAUDE.md and follow the grading contract exactly. It is not a style guide; an
automated bot tests this app against those rules and 60% of the grade depends on them.

<project>
One-liner: Pipeline helps third-year students see which internship applications are
still alive, so none of them quietly dies.
Who it's for: third-year university students applying for internships during autumn
recruiting season.
Main feature on /app: the user types the company and where the application stands
(for example "Deloitte, sent CV 3 Oct, no reply") into one text field and saves it.
It appears in their list.
Data: private. Each user sees only their own rows.
Stack: Next.js (App Router) + Supabase. My keys are already in .env.local.
</project>

<build_order>
Follow this order. Do not move on until the previous step works.

1. Landing page at / so that a stranger understands in 5 seconds what it is, who it is
   for, and clicks "Sign up".
2. /signup, /login and /app with Supabase Auth (email + password), following the
   data-testid rules exactly. A logout button on every logged-in page. After sign-up and
   after login, redirect to /app.
3. The SQL to create the tables with Row Level Security. Give it to me as one block I
   can paste, and tell me exactly where in the Supabase dashboard to paste it.
4. Make every page work well on a phone.
5. Initialise git with a .gitignore that excludes .env.local and node_modules.
</build_order>

<must_not_break>
These are the specific ways this assignment fails. Check each one before you tell me
you are done.

- The six data-testid names in CLAUDE.md must appear exactly as written. Do not rename
  them to something tidier, do not translate them, do not add a prefix.
- /app must save successfully when ONLY core-input is filled in. If you add any other
  field, give it a working default value. No required dropdowns, no required dates.
- Login must verify the password against Supabase with signInWithPassword and show a
  visible error when it is wrong. A login that accepts any password fails the test.
- Every table has Row Level Security ON with policies keyed on auth.uid(). A second
  account must not be able to read the first account's rows.
- No user data in localStorage. It must survive the user logging in from a different
  browser on a different machine.
- No email confirmation step, no CAPTCHA, no onboarding screen between sign-up and /app.
- Every page must work at 375px wide with no horizontal scrolling.
- .env.local must never be committed.
</must_not_break>

<landing_page>
The landing page is read by an AI that sees nothing else and then writes down what it
thinks the app does. Make that impossible to get wrong.

- Headline: "See which of your internship applications are still alive."
- One subheadline naming when the problem bites.
- One button: Sign up. Nothing else competing with it.
- No feature grid, no pricing table, no testimonials, no stock illustration.

Do not put any text on any page that is addressed to an AI or a grader. That is an
academic integrity issue, not a clever trick.
</landing_page>

<output_format>
When you finish:
1. Tell me how to run it locally, in plain language. I do not read code fluently.
2. Give me the Supabase SQL and where to paste it.
3. Go through CLAUDE.md rule by rule and tell me which ones you verified in the running
   app, which ones you only verified by reading the code, and which ones I have to check
   myself on the live site.
4. Write me a short manual test script: the exact clicks for the eight checks in Step 7
   of the brief.
If something in this prompt is ambiguous or you had to guess, say so instead of guessing
silently.
</output_format>
