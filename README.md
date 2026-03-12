# Family Flow

**Organize the chaos. Protect what matters.**

An AI-inspired family scheduling and activity planning app for overwhelmed parents managing children's school, sports, lessons, appointments, and free time.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd family-flow

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

This project is optimized for Vercel deployment. Simply connect the repository and deploy — no environment variables or database setup required.

## Features

- **Dashboard** — At-a-glance family week overview with load charts, conflict alerts, and balance indicators
- **Calendar** — Weekly calendar view with color-coded activities, filtering by child/category, and event detail modals
- **Conflicts** — Automatic detection of schedule overlaps with AI-style resolution suggestions
- **Free Time** — Open time blocks identified and categorized, with protected downtime zones
- **Suggestions** — Personalized activity recommendations based on schedule availability and interests
- **Children** — Individual child profiles with schedule summaries and weekly load indicators
- **Weekly Plan** — AI-generated narrative weekly plan with logistics, conflict notes, and downtime reminders
- **Settings** — Planning style, downtime preferences, travel buffers, and notification controls

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Data:** Local mock data (no backend required)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard
│   ├── calendar/          # Calendar view
│   ├── conflicts/         # Conflict detection
│   ├── free-time/         # Free time blocks
│   ├── suggestions/       # Activity suggestions
│   ├── children/          # Child profiles
│   ├── weekly-plan/       # Weekly plan
│   └── settings/          # App settings
├── components/
│   ├── layout/            # Navbar, page header
│   ├── shared/            # Reusable components
│   └── ui/                # Base UI components
├── data/                  # Mock data
├── lib/                   # Utilities
└── types/                 # TypeScript types
```

## Design Philosophy

Family Flow is designed to **reduce stress, not increase it**. The app helps families:

1. Consolidate schedules in one view
2. Detect and resolve conflicts proactively
3. Identify healthy free-time windows
4. Recommend balanced activities without overscheduling
5. Protect downtime intentionally

The copy and design reflect calm guidance rather than productivity obsession.
