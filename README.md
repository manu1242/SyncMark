# Smart Bookmark Manager

A simple, fast, and real-time bookmark manager built with Next.js 15, Supabase, and Tailwind CSS.


# How it Works

The app allows users to save URLs with custom titles. All data is stored in a Supabase PostgreSQL database. 

The core feature is the **Real-time Sync**: when you add a bookmark in one tab, Supabase sends a broadcast to all other open tabs, and the list updates instantly without a page refresh.

---

# Tech Stack & Techniques

**Next.js 15 (App Router)**
Used the latest React framework for high-performance server-side rendering and clean folder-based routing.

**Supabase Auth**
Implemented Google-only authentication. This ensures secure, one-click login without the need for manual password management.

**Supabase Database & Realtime**
Used PostgreSQL for data storage and the Realtime engine to keep the UI in sync across different browsers and devices.

**Tailwind CSS**
Used for a clean, modern, and mobile-responsive layout. Focused on light industry-standard colors and sans-serif typography.

---

# Reusable Components

The project follows a modular structure where components are kept focused and under 200 lines:

*   **Button.tsx**: A primary UI component handling multiple variants (Primary, Danger, Ghost) and loading states.
*   **Input.tsx**: A reusable field with built-in styling for labels and validation errors.
*   **BookmarkList.tsx**: Manages the real-time subscription lifecycle and dynamic card rendering.
*   **AddBookmarkForm.tsx**: A focused component for input gathering and submission logic.

---

# Challenges & Solutions

**The Real-time Synchronization**
The biggest challenge was getting the list to update automatically without a refresh. Initially, the data saved but didn't broadcast. 

*   *Solution*: I learned that Supabase Realtime must be explicitly enabled for each table. I had to run a specific SQL command to set the "REPLICA IDENTITY" to "FULL", which tells the database to send the complete data object during an update.

**Route Protection**
Ensuring users can only see their own bookmarks was critical.

*   *Solution*: I used Supabase Middleware to check the user's session on every request. If a user isn't logged in, they are redirected to the login page immediately. 

**Responsive Design**
The app needs to work perfectly on mobile.

*   *Solution*: Used Tailwind's grid system to switch from a 3-column layout on desktop to a single-stack layout on small screens, ensuring a clean experience for every user.

---

# Local Setup

1. Copy `.env.local.example` to `.env.local` and add your Supabase credentials.
2. Run the SQL script in `schema.sql` inside your Supabase SQL Editor.
3. Install dependencies using `npm install`.
4. Start the development server with `npm run dev`.
