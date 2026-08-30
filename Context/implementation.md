# TRAVELLO — Implementation Context

## Development philosophy

Build the smallest complete product journey first.

Do not build ten disconnected feature demos.

## Recommended order

### Phase 1 — Foundation
- React/Vite/TypeScript if selected
- Tailwind
- routing
- global layout
- design tokens
- Supabase client
- authentication

### Phase 2 — Core traveler journey
- landing
- home
- destination
- challenge
- active challenge
- evidence
- completion
- profile

### Phase 3 — Social loop
- posts
- likes
- creator profiles
- campaigns
- achievement sharing

### Phase 4 — Intelligence loop
- reports
- dashboard
- issue list
- issue map
- analytics

### Phase 5 — Supporting ecosystem
- businesses
- accessibility filters
- notifications
- local/community cards

## P0

Must work:
- landing
- auth
- home/feed
- destinations
- challenges
- completion
- evidence
- points/badge
- profile

## P1

Important:
- creator campaign
- reporting
- dashboard
- sustainability score
- accessibility

## P2

Future:
- advanced AI
- advanced verification
- real government integrations
- booking
- real partner rewards
- advanced analytics

## Architecture

Prefer:
src/
  components/
  pages/
  layouts/
  hooks/
  lib/
  services/
  data/
  types/
  utils/
  assets/

supabase/
  migrations/
  seed/

public/

.env.example

## Routing

Use clear routes such as:
/
/login
/signup
/home
/destinations
/destinations/:id
/challenges
/challenges/:id
/challenges/:id/active
/challenges/:id/evidence
/impact
/leaderboard
/creators
/creators/:id
/campaigns/:id
/businesses
/businesses/:id
/reports/new
/profile
/dashboard
/dashboard/reports

Adapt route naming if the framework conventions require it.

## Component rules

Prefer reusable components:
- DestinationCard
- ChallengeCard
- TravelPost
- CreatorCard
- BusinessCard
- SustainabilityScore
- AccessibilityBadge
- ImpactCard
- BadgeCard
- ReportCard
- ProgressBar
- Modal
- Toast
- Skeleton
- EmptyState
- ErrorState

Avoid giant page components.

## Backend rules

Use Supabase for persistent data.

Do not simulate core state entirely in localStorage if the database is available.

Temporary mock data is acceptable during UI-first development but should be easy to replace with real queries.

## Quality checklist

Before considering a section complete:
- responsive
- no broken links
- buttons have actions
- loading state
- error state
- empty state
- authentication state handled
- database ownership rules considered
- no hardcoded secrets
- no misleading “verified” claims
- accessible forms
- consistent design

## Hackathon rule

If time is limited:
Polish the core flow instead of adding more features.

The strongest demonstration is:

Discover → Responsible Challenge → Evidence → Reward → Share → Report → Destination Intelligence.
