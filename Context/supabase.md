# TRAVELLO — Supabase Context

## Environment

Supabase credentials must be provided through `.env`.

Expected frontend variables:

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

Never hardcode real credentials.

Never expose a Supabase service-role key in browser code.

Create `.env.example`.

## Client

Create a single reusable Supabase client module.

Do not instantiate clients repeatedly throughout components.

## Authentication

Use Supabase Auth for:
- signup
- login
- logout
- session persistence

After signup, create/update a profile record as required.

## Row Level Security

Enable RLS for user-owned and sensitive tables.

Users should only be able to modify records they own.

Examples:
- user profile
- challenge completion
- evidence
- reports
- private settings

Public read access may be appropriate for:
- published destinations
- published challenges
- public posts
- public business profiles

But policies should be explicit.

## Storage

If using Supabase Storage:
- use controlled buckets
- validate upload types
- associate files with owners/records
- avoid exposing private evidence publicly

## Queries

Use reusable service/helper functions for complex database operations.

Do not put large database queries directly into every page component.

## Realtime

Realtime is optional.

Use it only if it materially improves:
- notifications
- dashboard updates
- live challenge/report status

Do not add realtime merely for technology points.

## Seed data

Provide seed/migration data for:
- 3 destinations
- challenges
- demo users/creators
- businesses
- badges
- posts
- reports

## Missing environment handling

If Supabase env variables are missing:
- show a clear development configuration message
- avoid cryptic runtime errors

## Security

Validate:
- ownership
- user input
- file uploads
- state transitions

Do not trust client-side point totals or completion status.

Server/database logic should prevent duplicate rewards.
