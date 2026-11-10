# Ophelia’s Oasis

React + Vite frontend for our hotel school project.

## Run locally

Use Node 22.12 or newer. From this folder:

```sh
npm install
npm run dev
```

Open the localhost address printed in the terminal (normally port 5173).
Stop the server with Ctrl+C in that terminal.

If the server was started in the background, stop this project's default port from PowerShell:

```powershell
Get-NetTCPConnection -LocalPort 5173 -State Listen | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ }
```

```sh
npm run build
node --test src/demo/booking.test.js
```

## Offline mode

The website defaults to local demo data. Supabase does not need to be running.
Use **My stay** or the **Guest demo / Staff demo** footer links to explore.
Demo bookings, rates, and profile changes stay in the current browser tab's session storage.
**Reset demo** restores the samples. No real booking, card charge, email, or account is created.

## Backend handoff

The existing Supabase reservation form is preserved in `src/components/ReservationForm.jsx`.
Login and signup handlers are also retained. To opt into those existing live flows, add these
to your ignored `.env.local`, then restart Vite:

```dotenv
VITE_LIVE_BACKEND=true
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

Remove the live flag or set it to false to return to offline mode.
Do not commit environment files or use a secret/service-role key in this frontend.

Live payment is not implemented. Guest/staff previews always use demo data, even with the live flag on.
The backend team still owns secure role routing, availability, payment processing, reminders,
transaction history, backups, and server-side validation. Demo calculations are a visual aid,
not a replacement for those checks.

See [IMAGE_CREDITS.md](IMAGE_CREDITS.md) for photo sources.
