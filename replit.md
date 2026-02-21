# Zatch™ - Landing Page & Waitlist Platform

## Overview

Zatch is a marketing/landing page website for "India's First Live Bargain Marketplace." The platform combines live shopping, short video discovery, and real-time price negotiation. This repository contains the promotional website with highly interactive, animation-heavy sections and a waitlist signup system backed by a PostgreSQL database.

The site is built as a full-stack TypeScript application with a React frontend featuring Awwwards-style interactive animations (Framer Motion), and an Express backend serving a waitlist API.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (`client/`)
- **Framework**: React 18 with TypeScript (no SSR, SPA mode)
- **Routing**: Wouter (lightweight client-side router)
- **Styling**: Tailwind CSS v4 with CSS variables for theming, using a dark/black theme with neon green (#39FF14 / #C7F04F) accent colors
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives — components live in `client/src/components/ui/`
- **Animations**: Framer Motion used extensively for scroll-driven animations, mouse tracking, physics-based interactions, and micro-interactions
- **Fonts**: Space Grotesk (headings/display) and Inter (body text) loaded from Google Fonts
- **State Management**: TanStack React Query for server state, local React state for UI
- **Build Tool**: Vite with path aliases (`@/` → `client/src/`, `@shared/` → `shared/`)
- **Custom cursor**: Default cursor is hidden globally; a custom cursor component is rendered

### Pages
- `/` — Home (landing page with multiple animated sections: KineticHero, FullScreenScroll, ThreeWays, ForBuyers, ForSellers, StickmanCTA, FAQ, Trust)
- `/about` — About page with team info
- `/download` — App download page with QR code
- `/privacy`, `/terms`, `/returns`, `/shipping` — Legal/policy pages

### Backend (`server/`)
- **Framework**: Express 5 on Node.js with TypeScript (compiled via tsx in dev, esbuild for production)
- **API**: Simple REST API with two endpoints:
  - `POST /api/waitlist` — Add email to waitlist (validates with Zod schema, checks for duplicates)
  - `GET /api/waitlist/count` — Get total waitlist signups
- **Dev Server**: Vite dev server is integrated as middleware for HMR during development
- **Production**: Static files served from `dist/public/`, with SPA fallback to `index.html`

### Database
- **Database**: PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema validation
- **Schema** (`shared/schema.ts`):
  - `users` table: id (UUID), username, password
  - `waitlist` table: id (serial), email (unique), name, role (default "buyer"), created_at
- **Migrations**: Drizzle Kit with `drizzle-kit push` command (no migration files, direct push to DB)
- **Connection**: `pg.Pool` from the `pg` package

### Shared (`shared/`)
- Contains the Drizzle schema and Zod validation schemas used by both frontend and backend
- Insert schemas are derived from table schemas using `drizzle-zod`

### Build Process (`script/build.ts`)
- Client: Built with Vite, output to `dist/public/`
- Server: Built with esbuild, bundling select dependencies (allowlisted) to reduce cold start times, output to `dist/index.cjs`
- Production start: `node dist/index.cjs`

### Key Design Decisions
- **Monorepo structure**: Client, server, and shared code in one repo with path aliases for clean imports
- **Heavy animation focus**: The site prioritizes visual impact with scroll-driven parallax, mouse-tracking interactions, physics-based animations, and interactive demos (e.g., BargainSimulator)
- **Waitlist-first**: The app is pre-launch; the primary conversion action is joining the waitlist via a modal
- **No authentication yet**: The users table exists in schema but auth is not implemented on the frontend

## External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL` environment variable
- **Google Fonts**: Space Grotesk and Inter loaded via CDN
- **QR Code API**: `api.qrserver.com` used to generate QR codes dynamically on the download page
- **Unsplash**: Some section images loaded from Unsplash CDN
- **Replit Plugins**: Optional Vite plugins for dev banners, cartographer, and runtime error overlay (only in Replit dev environment)