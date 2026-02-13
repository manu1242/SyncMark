# SyncMark - Real-time Bookmark Manager

A clean, minimalist bookmark manager built to help users organize their digital resources. This project explores modern full-stack development using Next.js 15, Supabase, and Tailwind CSS.

### How it Works
SyncMark allows users to securely log in via Google and save website URLs with custom titles. The application stores these safely in a database and uses real-time "broadcasting" to ensure that any change made in one browser tab appears instantly in all other tabs.

---

### Challenges I Faced & My Solutions

As a developer, building this project was a great learning experience. Here are the specific hurdles I encountered and how I overcame them:

**1. The "Invisible" Real-time Data**
*   **The Problem**: After saving a bookmark, it wouldn't show up in other tabs unless I refreshed the page. I thought my code was broken.
*   **The Discovery**: I learned that by default, database tables don't "shout" when they change.
*   **The Solution**: I had to go into the Supabase SQL Editor and explicitly enable "Broadcasting" for my table. I also had to set the `REPLICA IDENTITY` for the table to `FULL`, which finally allowed the database to send the complete bookmark data to the browser instantly.

**2. Handling Google Login Security**
*   **The Problem**: I wanted a secure login that didn't involve managing risky passwords.
*   **The Discovery**: Google OAuth is the gold standard, but it requires a very specific "callback" setup so Google knows where to send the user after they log in.
*   **The Solution**: I created a custom `/auth/callback` route handler. This effectively bridges the gap between Google's security check and my app's internal user session, making the login process feel seamless.

**3. Maintaining UI Cleanliness with Reusable Components**
*   **The Problem**: My code was starting to look messy with repeated styles and buttons.
*   **The Discovery**: Modern development is about efficiency—writing code once and using it everywhere.
*   **The Solution**: I broke the UI down into small, reusable "bricks" like `Button.tsx` and `Input.tsx`. This not only made my code much shorter (keeping every file under 200 lines) but also ensured the app looks consistent on every screen.

---

### Tech Stack used:
*   **Next.js 15**: For the fastest page speeds and modern routing.
*   **Supabase**: For the hidden engine (Auth, Database, and Real-time).
*   **Tailwind CSS**: For the clean, industry-standard minimalist design.
*   **Lucide & React Icons**: For professional, high-quality iconography.

### Local Setup
1. Define your Supabase keys in `.env.local`.
2. Run the `schema.sql` inside your Supabase SQL Editor.
3. Install dependencies: `npm install`
4. Run locally: `npm run dev`
