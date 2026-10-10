# Step 7 — the eight checks

Do all of these on the **live Vercel link**, not on your laptop. If one fails for you,
it fails for the bot.

- [ ] **1. Incognito window, open your link.** No Vercel login screen. Within five
      seconds you can say what it is, who it is for, and what to click.
- [ ] **2. Go to `/signup`.** Register with an email you have never used here. You land
      on `/app` immediately. No "check your email".
- [ ] **3. On `/app`, type only `test 1`** in the one text field and save. It appears in
      the list.
- [ ] **4. Click Log out.**
- [ ] **5. Different browser** (Chrome then Edge, or a second incognito window). Go to
      `/login` and type the **wrong** password. It must be refused with a visible error.
- [ ] **6. Same browser, right password.** `test 1` is still there.
- [ ] **7. Sign up a second account.** It must **not** see the first account's item.
- [ ] **8. Open the link on your phone.** Readable, and nothing scrolls sideways.

If 7 fails, row level security is off — tell me and I will fix the SQL.
If 5 fails (any password works), tell me and I will fix the login.
If 6 fails (the item vanished), it is being saved in the browser instead of the database.
