# Infinity Sparkle Studios — Website + Studio Pricing App

| File | What it is |
|---|---|
| `index.html` | Customer website: shop, "Design With Us" form, collaboration thread, Pay Now buttons, Studio Dashboard (PIN protected) |
| `studio.html` | Studio app (PIN protected): jobs, 7 production stages, live pricing, price book, backup/sync |
| `js/pricing.js` | Pricing engine and default rates (PMT price list, Elegoo resins, filigree formula) |
| `js/store.js` | Saving, backup file, GitHub sync |
| `manifest.json` | Makes the customer site installable — phones offer "Add to Home Screen" / "Install" |
| `sw.js` | Service worker — lets the installed app open instantly and work if the connection drops |
| `icons/` | App icon (the gold diamond mark) in the sizes phones need for install/home screen |

## Installing it as an app
Once this is hosted (see below), share the link (or a QR code pointing to it). On Android/desktop Chrome, visitors get a "Get the app" button on the site itself, or the browser's own install prompt. On iPhone/iPad there's no automatic prompt — the site shows a banner telling them to tap Share → "Add to Home Screen." Either way, it installs as its own icon with no app-store step.

## How pricing works (studio.html)
For each job, each stage adds materials and fees. The price updates the moment you add a line:

Design/CAD → 3D print → Casting → Finishing → Stones & setting → Plating & extras → Final QC

Total costs + Overheads 15% + Risk 15% + **Shadow 15%** = Cost price
Cost price × Mark-up 2.5 = Selling price (rounded up to the nearest R10, no VAT)

The **shadow price** is a safety buffer in case metal or supplier prices rise before you update the price book. Set the default in **Price book**. You can override it on any job with the **Shadow % (this job)** box. Leave that box blank to use the default. You can change every other percentage, rate and fee in **Price book** too.

## Customer requests reach you automatically
When a customer submits an idea, replies in their design thread, or taps a Pay Now button, the site emails **infinitysstudio50@gmail.com** immediately — no backend, no tapping required on the customer's side. This uses a free relay called FormSubmit.

**One-time setup:** the very first message it sends will arrive as a "confirm this form" email from FormSubmit — click the link in that one email once, and every message after that lands straight in the inbox. Do this as soon as the site is live, with a test submission, before sharing the link with real customers.

Because this is still a static site with no database, each customer's own thread and cart only live in their own browser (not yours) — the email is what tells you a request came in, and you reply to the customer's email address directly, or via their thread if they're back on the same device. The **Studio Dashboard** section on the customer site (bottom of the page, PIN protected) mirrors whatever requests were made *from that browser* — handy if you're testing on your own computer, but for real customer requests, work from the emails.

## Getting paid — Yoco / Capitec
Open the Studio Dashboard on the customer site (bottom of the page → "Studio sign-in") and paste in your Yoco Payment Page link and/or Capitec "My QR" link under **Payment links**. Once set, approved design requests show a Pay Now button in the customer's thread. This is saved in your browser only (not synced to customers automatically) — set it up once on the device/browser you use to manage the site, e.g. right after publishing.

## The Studio Dashboard PIN
Both `studio.html` and the Studio Dashboard panel inside `index.html` are PIN protected so a random visitor to your site can't see other customers' design requests or your payment links. The very first time you (or anyone) open either one, you're asked to choose a PIN for that browser — after that, the same PIN unlocks it again. The two PINs are independent (one per file), so use the same one for both if you want to remember only one. This keeps casual visitors out, but it isn't bank-grade security, since the site itself is public — don't rely on it for anything more sensitive than "don't show my customer list to strangers."

## Put it on GitHub Pages (no coding needed)
1. Go to github.com → **New repository** → name it e.g. `infinity-sparkle` → **Public** → Create.
2. Click **uploading an existing file** and drag in `index.html`, `studio.html`, `README.md`, `manifest.json`, `sw.js`, and the `js` and `icons` folders → **Commit changes**.
3. Go to **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → **Save**.
4. After about a minute your site is at `https://<your-username>.github.io/infinity-sparkle/`.
   The studio is at `…/infinity-sparkle/studio.html`.
5. That URL is what goes on your QR code / download link.

## Keeping studio data on GitHub (optional)
Jobs are saved in the browser you use. To keep them on GitHub as well:
1. Create a second repository, **Private**, e.g. `iss-studio-data`.
2. GitHub → Settings → Developer settings → **Fine-grained tokens** → Generate. Give it access to **only** `iss-studio-data`, with Repository permissions → **Contents: Read and write**.
3. In the studio → **Backup & sync** → enter your username, `iss-studio-data`, and the token → **Push to GitHub**.
   On another computer, enter the same details → **Pull from GitHub**.

Never put customer data in the public website repository. Never use your actual GitHub account password for this — always use a token scoped to just this one private repo, generated the way step 2 describes.

## Things to know
- **Customer ideas and payment clicks reach you by automatic email** to infinitysstudio50@gmail.com (see above) — no tapping required on the customer's end. There's still no shared database, so treat email as the source of truth and the on-page thread as a nice-to-have that works best when you're both testing on the same device.
- **The studio PIN keeps casual visitors out**, but it isn't strong security, because the site is public.
- **Payment runs via your own Yoco / Capitec links**, set once in Studio Dashboard → Payment links. Confirm actual payment in your Yoco/Capitec app before starting a job — a customer clicking "Pay Now" only means they opened the link, not that money has arrived.
- **Shop and budget-range prices are in South African Rand.** The ready-to-wear catalogue was converted from an earlier US-dollar template at R17.50/$, rounded up to the nearest R50 — update any of it any time in `index.html` (search for `price:`).
- **You are not VAT registered**, so no VAT is added to selling prices in `studio.html` — this matches your current status. If that ever changes, turn VAT on in **Price book**.
