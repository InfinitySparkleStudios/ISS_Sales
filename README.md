# Our Keepsake by Infinity Sparkle Studios

Customers get a private, PIN-protected keepsake for their jewellery. They open it by scanning the QR card that comes with their piece. In it they save photos and memories (engagement, wedding, honeymoon, first home, babies and more), find the details, certificate and care tips for their piece, and can share a view-only family link.

## What's in this folder

| File | What it is |
|---|---|
| `index.html` | The customer app (opened from the QR card) |
| `admin.html` | Keepsake Studio, your admin page: create keepsakes, print QR cards, reset PINs |
| `manifest.json`, `sw.js`, `icon*` | Let customers install the app on their phone's home screen |

## Where it lives

- Customer app: https://infinitysparklestudios.github.io/ISS_Sales/keepsake/
- Admin: https://infinitysparklestudios.github.io/ISS_Sales/keepsake/admin.html
- Database: the Supabase project **ISS-Keepsake** (`ddkmeltjmkeueaocoqcp`). It is separate from InfinityCRM.
- Back-end function: `keepsake`, deployed in ISS-Keepsake (source in `supabase/functions/keepsake/index.ts` in the package)

## Security

- Customers can't read the database directly. Everything goes through the `keepsake` function.
- PINs are hashed and never stored as plain text. After 5 wrong tries, the keepsake locks for 15 minutes.
- Photos sit in a private storage bucket and are shown through links that expire after 3 hours.
- Only `info@infinitysstudio.com`, signed in with a confirmed email, can use the admin page.
- Each keepsake holds up to 150 photos. They are resized on the phone before upload, to about 2000px.

## Day-to-day

1. In **admin.html**, click **New keepsake**. Fill in the names and piece details, then save.
2. Click **Print QR card**. It prints a business-card-size front and back. Put it in the ring box.
3. The customer scans the card, chooses a PIN and starts adding memories.
4. If a customer forgets their PIN, use **Reset PIN**. Their photos stay safe.
5. If a card is lost, use **Lost card: new QR**. The old card stops working.

## Wedding and event apps

In admin.html, choose **Kind: Wedding app** when you create a keepsake. The couple open it with their QR card and PIN, then get extra tabs:

- **Our wedding:** details, programme, dress code, story, theme colour, the RSVP and photo-wall switches, the guest link and QR, and printable table QR cards (4 per A4 page).
- **Guests:** add names (one invitation per line, e.g. "Jan & Sanet Botha, 2"), see who's coming and their dietary needs, and download the list.

Guests use the link `…/keepsake/?e=<guest link code>`. They don't need a PIN. They can read the details, RSVP by typing part of their name, and add photos (up to 10 at a time, 800 per event). Guest photos go into the couple's private keepsake.
