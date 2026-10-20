# Website template guide

This is an early page scaffold, not a finished website. Each template page has a short description and one large placeholder. The team will decide the detailed layouts and functionality later.

## Run locally

From the app folder, with Node 22.12 or newer:

```sh
npm install
npm run dev
```

The terminal prints the localhost address. Public and preview pages work without accounts. The existing login and signup use Supabase when the ignored .env.local file is configured.

## Pages

| Area              | Pages                                                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Public            | Home, Rooms, Gallery, About & Contact, Reservations, Booking Policies                                                             |
| Guest preview     | Dashboard, My Reservations, Reservation Details, Bills, Profile                                                                   |
| Staff preview     | Dashboard, Reservation Management, Arrivals & Check-in, Current Guests & Check-out, Payments & Bills, Daily Tasks, Rates, Reports |
| Existing accounts | Log In, Sign Up                                                                                                                   |

The preview toolbar opens guest and staff pages without signing in. Staff and management share one preview. There are no sample bookings, payment forms, report calculations, or database actions in these placeholders.

The Reports page reserves space for the assignment’s expected occupancy, expected room income, incentive discount, daily arrivals, and daily occupancy reports.

## Where to edit

- src/App.jsx — routes.
- src/NavBar.jsx — main navigation and preview links.
- src/Home.jsx and src/Reservation.jsx — home and reservation placeholders.
- src/pages/PublicPages.jsx — other public pages.
- src/previewPages.js — guest/staff page titles, descriptions, and placeholder labels.
- src/components/TemplatePage.jsx — shared simple page layout.
- src/components/PreviewLayout.jsx — guest/staff navigation.
- src/index.css — light palette, fonts, and full-width layout.
- src/App.css and src/NavBar.css — page and navigation styles.

## Existing login

Login and signup remain connected to the team's existing Supabase code. Login still opens Reservations. Role-based routing and any future database work are left for the backend team. Preview links do not grant real staff permissions.
