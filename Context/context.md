# TRAVELLO — Context File Index

TRAVELLO is a responsive social travel platform for HackCelestial 3.0 PS5: Green & Inclusive Travel — Smart Sustainable and Accessible Hospitality.

## How to use these context files

The master prompt defines the overall product. These files provide detailed instructions for specific areas.

Before implementing a page or feature, read the relevant file(s).

## File map

- `flow.md` — complete product journey and routing logic
- `homepage.md` — landing page and authenticated home/feed
- `destinations.md` — destination discovery and destination hub
- `challenges.md` — responsible-travel challenge engine
- `verification.md` — evidence, location, timestamp and verification UX
- `rewards.md` — points, badges, impact and leaderboard
- `social.md` — social feed, posts, likes, comments and sharing
- `creators.md` — responsible travel creators and campaigns
- `businesses.md` — sustainable hospitality/business profiles
- `accessibility.md` — accessibility-first travel information
- `reports.md` — traveler issue reporting
- `dashboard.md` — destination manager/admin intelligence dashboard
- `profile.md` — traveler profile and personal impact
- `design-system.md` — visual system, components and responsive UX
- `supabase.md` — Supabase setup, security and integration rules
- `data-model.md` — database entities, relationships and seed data
- `ai.md` — practical AI/recommendation opportunities
- `implementation.md` — development order, architecture and MVP boundaries

## Context selection rule

Use the smallest relevant set of files needed for a task.

Examples:

- Homepage work → `homepage.md`, `design-system.md`, `flow.md`
- Challenge work → `challenges.md`, `verification.md`, `rewards.md`, `supabase.md`
- Destination work → `destinations.md`, `accessibility.md`, `challenges.md`
- Dashboard work → `dashboard.md`, `reports.md`, `data-model.md`
- Database work → `supabase.md`, `data-model.md`
- Overall routing → `flow.md`

Do not invent unrelated features when a context file already defines the intended behavior.
