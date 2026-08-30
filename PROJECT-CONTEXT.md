# TRAVELLO — Full Project Context

> **AI-Powered Green & Inclusive Travel Platform**
> Smart India Hackathon PS5: Green & Inclusive Travel — Smart Sustainable and Accessible Hospitality

---

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

**Demo login:** Go to `/login` → click "Traveler" or "Manager" for instant access.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 8 | Build tool |
| Tailwind CSS 4 | Styling |
| React Router 7 | Client-side routing |
| Recharts | Data visualization charts |
| Lucide React | Icons |
| clsx + tailwind-merge | Class merging |
| date-fns | Date formatting |

**No backend.** All data is mock/simulated. Supabase-ready architecture.

---

## How to Run

```bash
npm install          # install dependencies
npm run dev          # start dev server (http://localhost:5173)
npm run build        # production build (outputs to dist/)
npm run preview      # preview production build
```

---

## Project Structure

```
├── Context/                    # Design spec docs (original hackathon prompt)
├── public/                     # Static assets
├── src/
│   ├── App.tsx                 # Root component with all routes
│   ├── main.tsx                # Entry point
│   ├── index.css               # Global styles, Tailwind config, animations
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   │   ├── BadgeCard.tsx        # Achievement badge display
│   │   │   ├── ChallengeCard.tsx    # Challenge listing card
│   │   │   ├── DestinationCard.tsx  # Destination discovery card with image
│   │   │   ├── EmptyState.tsx       # Empty state placeholder
│   │   │   ├── PressureBadge.tsx    # Pressure level badge (Low/Medium/High)
│   │   │   ├── ReportCard.tsx       # Issue report card with status
│   │   │   └── SustainabilityScore.tsx  # Animated circular score
│   │   └── layout/             # Layout components
│   │       ├── Header.tsx          # Top nav with glass effect
│   │       ├── BottomNav.tsx       # Mobile bottom nav
│   │       └── Layout.tsx          # Main layout wrapper
│   ├── context/
│   │   └── AppContext.tsx       # Global state (React Context)
│   ├── data/
│   │   └── mock-data.ts        # All mock data (destinations, challenges, etc.)
│   ├── lib/
│   │   └── utils.ts            # cn(), score colors, pressure colors
│   ├── pages/                  # Route pages (see Routes section)
│   └── types/
│       └── index.ts            # All TypeScript interfaces
├── package.json
├── tsconfig.app.json           # TS config with @/* path alias
├── vite.config.ts              # Vite + Tailwind + path aliases
└── index.html                  # HTML entry with Inter font
```

---

## Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | LandingPage | Public hero, value prop, AI demo, CTA |
| `/login` | LoginPage | Login/signup with demo role selection |
| `/signup` | LoginPage | Same as login |
| `/home` | HomePage | Authenticated home with stats, recommendations |
| `/destinations` | DestinationsPage | Search/filter all destinations |
| `/destinations/:id` | DestinationHubPage | Full sustainability profile + businesses + challenges |
| `/trip-planner` | TripPlannerPage | AI itinerary generator |
| `/challenges` | ChallengesPage | All challenges with filters |
| `/challenges/:id` | ChallengeDetailPage | Challenge detail + start flow |
| `/challenges/:id/evidence` | EvidencePage | Photo upload → AI verification |
| `/reports/new` | ReportPage | Issue reporting form |
| `/dashboard` | DashboardPage | Manager dashboard with charts |
| `/impact` | ImpactPage | Personal impact + badges + leaderboard |
| `/social` | SocialPage | Community travel feed |
| `/creators` | CreatorsPage | Creators + campaigns |
| `/profile` | ProfilePage | User profile + role switch |

---

## Design System

### Colors
- **Forest greens:** `forest-50` to `forest-950` (primary palette)
- **Earth/warm neutrals:** `earth-*`, `warm-*`, `sand-*`
- **Accent:** Green gradients for CTAs, amber for warnings, red for alerts

### Background
- Body: Mesh gradient (`#f0f5f1 → #faf6ef → #f2f0ea`)
- `.bg-mesh`: Radial gradient overlay utility
- `.glass`: Frosted glass (backdrop-blur + white/70)
- `.card-elevated`: White card with shadow

### Animations (in index.css)
- `animate-fade-in` — opacity 0→1
- `animate-slide-up` — translate Y 20px→0 + fade
- `animate-slide-down` — translate Y -10px→0 + fade
- `animate-scale-in` — scale 0.95→1 + fade
- `animate-float` — gentle Y oscillation (6s loop)
- `animate-glow` — box-shadow pulse
- `animate-shimmer` — gradient position shift

### Component Patterns
- Cards: `rounded-2xl border border-sand-200 bg-white hover:shadow-xl`
- Buttons: `rounded-xl font-semibold` with gradient backgrounds
- Inputs: `rounded-xl border-sand-200 focus:ring-2 focus:ring-forest-500`
- Badges: `rounded-full text-xs font-semibold px-3 py-1`

---

## Data Model (TypeScript Types)

All types defined in `src/types/index.ts`:

```typescript
User {
  id, displayName, username, avatarUrl, bio, role,
  impactPoints, challengesCompleted, destinationsVisited,
  badgesEarned, co2Avoided
}

Destination {
  id, name, region, country, description, heroImageUrl,
  sustainabilityScore, visitorPressure, wastePressure,
  waterPressure, environmentalSensitivity, crowdLevel,
  accessibilitySummary, factors: DestinationFactor[],
  accessibility: AccessibilityInfo, tags, image
}

DestinationFactor {
  factor, score, explanation, icon
}

AccessibilityInfo {
  wheelchairAccessible, stepFreeRoutes, accessibleToilets,
  elevator, accessibleParking, lowWalkingRequirement,
  trailDifficulty, notes
}

Challenge {
  id, destinationId, title, description, category,
  difficulty, points, estimatedMinutes, instructions[],
  evidenceRequired, whyItMatters, icon
}

ChallengeCompletion {
  id, userId, challengeId, status, startedAt,
  completedAt, pointsAwarded, evidence
}

Evidence {
  photoUrl, latitude, longitude, capturedAt,
  verificationStatus, verificationConfidence, checks[]
}

Business {
  id, destinationId, name, type, description, imageUrl,
  sustainabilityScore, accessibilitySummary,
  sustainabilityPractices[], accessibilityFeatures[],
  priceRange, rating, reviews
}

Report {
  id, userId, destinationId, category, description,
  latitude, longitude, status, priority, createdAt, photoUrl
}

AIInsight {
  id, destinationId, type, title, description,
  reportCount, trend, recommendation, severity
}

TripPlan {
  id, destinationId, days: TripDay[], totalEstimatedCost,
  totalTravelTime, sustainabilityScore
}

SocialPost {
  id, userId, destinationId, caption, imageUrl,
  likes, comments, createdAt, challengeCompletion,
  author: {name, avatar, username}, destination
}

Creator {
  id, name, handle, avatar, followers, campaigns, bio
}

Campaign {
  id, creatorId, destinationId, title, description,
  coverImageUrl, participants, challengeCount, status
}

Badge {
  id, name, description, icon, ruleKey, earned, earnedAt
}

Notification {
  id, type, title, body, read, createdAt
}
```

---

## Mock Data

All in `src/data/mock-data.ts`:

### Destinations (3)
- **Matheran** — Hill station, Maharashtra. Score: 82. High visitor pressure.
- **Goa** — Beach destination. Score: 71. Very high visitor pressure.
- **Manali** — Mountain destination, Himachal. Score: 68. High pressure.

### Attractions (10)
Matheran: Echo Point, Louisa Point, Forest Trail, Toy Train, Panorama Point
Goa: Palolem Beach, Spice Farm, Divar Island
Manali: Hadimba Temple, Jogini Waterfall

### Challenges (8)
Matheran: Waste-Free Trail, Refill Champion, Local Supporter, Trail Guardian, Zero Carbon Commute
Goa: Beach Cleanup Warrior, Local Food Explorer
Manali: Mountain Trail Respecter

### Businesses (5)
Green Valley Homestay, Forest Café (Matheran), Eco Beach Resort, Spice Garden Tours (Goa), Himalayan Eco Lodge (Manali)

### Reports (8)
Various waste, accessibility, overcrowding, environmental, infrastructure issues

### AI Insights (5)
Hotspot detection, visitor pressure trends, accessibility opportunities

### Social Posts (4)
Trail discovery, challenge completions, spice garden visit, waterfall trek

### Creators (3) + Campaigns (2)
Sneha Patel, Vikram Singh, Ananya Rao

### Badges (10)
Responsible Traveler through Impact Legend

### Users
Current user: Priya Sharma (420 points, 8 challenges, 6 badges)

---

## State Management

`src/context/AppContext.tsx` — React Context with:

```typescript
// State
user, destinations, challenges, businesses, reports,
aiInsights, completions, tripPlan, notifications,
selectedDestination

// Actions
setSelectedDestination(d)
startChallenge(challengeId)       → creates in_progress completion
completeChallenge(challengeId)    → awards points, creates notification
submitReport(reportData)          → adds to reports list
generateTripPlan(destId, prefs)   → creates itinerary with AI logic
addNotification(n)
markNotificationRead(id)
```

All state is in-memory. No persistence. No backend calls.

---

## AI / Recommendation Engine

`generateTripPlan()` in AppContext creates an itinerary based on:
- Destination attractions and businesses
- Current crowd levels
- Sustainability scores
- Budget and accessibility preferences

Logic is rule-based (not real AI). Every recommendation includes:
- **Why recommended** explanation
- Sustainability impact
- Accessibility info
- Crowd level
- Estimated cost and travel time

The `EvidencePage` uses a mock AI verification with simulated checks:
- Image matches challenge
- Location within challenge zone
- Timestamp verified
- Photo quality acceptable

---

## Key User Flows

### Flow A: Discover → Plan → Challenge → Report → Dashboard

1. User lands on `/` → clicks "Start Your Journey"
2. Goes to `/login` → clicks "Traveler" demo button
3. On `/home` → sees recommended destination
4. Clicks destination → sees full sustainability profile on `/destinations/:id`
5. Clicks "Plan Sustainable Trip" → goes to `/trip-planner`
6. Sets preferences → clicks "Generate Trip Plan" → sees itinerary
7. Goes to `/challenges` → starts a challenge
8. On `/challenges/:id/evidence` → uploads photo → submits
9. Sees AI verification result → earns points
10. Goes to `/reports/new` → reports an issue
11. Issue appears on `/dashboard` with AI insights

### Flow B: Manager Dashboard

1. User goes to `/login` → clicks "Manager"
2. On `/dashboard` → sees destination health metrics
3. Views charts (pie chart, trend line)
4. Reads AI insights with recommendations
5. Reviews recent reports with status/priority
6. Sees recommended actions

---

## Image Sources

All images from Unsplash CDN (free, no attribution required for prototype):

| Element | Unsplash Photo ID |
|---------|-------------------|
| Matheran destination | `photo-1506905925346-21bda4d32df4` |
| Goa destination | `photo-1507525428034-b723cf961d3e` |
| Manali destination | `photo-1464822759023-fed622ff2c3b` |
| Forest trail | `photo-1448375240586-882707db888b` |
| Mountain viewpoints | `photo-1470071459604`, `photo-1519681393784` |
| Beach/Palm | `photo-1512100356356-de1b84283e18`, `photo-1473116763249` |
| Temple | `photo-1548013146-72479768bada` |
| Waterfall | `photo-1433086966358-54859d0ed716` |
| Train | `photo-1544620347-c4fd4a3d5957` |
| Spice | `photo-1596040033229-a9821ebd058d` |
| Resort | `photo-1520250497591-112f2f40a3f4` |
| Lodge | `photo-1510798831971-661eb04b3739` |
| Garden | `photo-1416879595882-3373a0480b5b` |
| Café | `photo-1554118811-1e0d58224f24` |
| Homestay | `photo-1587061949409-02df41d5e562` |
| User avatars | `photo-1494790108377`, `photo-1507003211169`, `photo-1438761681033`, etc. |

Image URL format: `https://images.unsplash.com/{photo-id}?w={width}&h={height}&fit=crop&auto=format`

---

## Build Output

```
dist/
├── index.html          0.99 KB
├── assets/
│   ├── index-*.css    ~71 KB (Tailwind + custom styles)
│   └── index-*.js    ~796 KB (React + app code)
```

Build command: `npm run build` (tsc + vite build)

---

## Key Files Summary

| File | Lines | Purpose |
|------|-------|---------|
| `src/App.tsx` | ~55 | Root routes |
| `src/context/AppContext.tsx` | ~200 | Global state + actions |
| `src/data/mock-data.ts` | ~850 | All mock data |
| `src/types/index.ts` | ~200 | TypeScript interfaces |
| `src/pages/LandingPage.tsx` | ~250 | Public landing page |
| `src/pages/LoginPage.tsx` | ~200 | Login/signup + demo |
| `src/pages/HomePage.tsx` | ~150 | Authenticated home |
| `src/pages/DestinationHubPage.tsx` | ~300 | Destination profile |
| `src/pages/TripPlannerPage.tsx` | ~250 | AI trip planner |
| `src/pages/ChallengesPage.tsx` | ~120 | Challenge listing |
| `src/pages/ChallengeDetailPage.tsx` | ~150 | Challenge detail |
| `src/pages/EvidencePage.tsx` | ~200 | Evidence submission |
| `src/pages/ReportPage.tsx` | ~180 | Issue reporting |
| `src/pages/DashboardPage.tsx` | ~250 | Manager dashboard |
| `src/pages/ImpactPage.tsx` | ~200 | Impact profile |
| `src/pages/SocialPage.tsx` | ~80 | Social feed |
| `src/pages/CreatorsPage.tsx` | ~100 | Creators + campaigns |
| `src/pages/ProfilePage.tsx` | ~100 | User profile |
| `src/index.css` | ~120 | Global styles + animations |
| `src/components/common/*.tsx` | ~50-80 each | Reusable components |
| `src/components/layout/*.tsx` | ~80-120 each | Layout components |

---

## Context Files (Original Specs)

The `Context/` folder contains the original hackathon design specifications:
- `context.md` — File index
- `flow.md` — Product journey and routing
- `homepage.md` — Landing page spec
- `destinations.md` — Destination discovery spec
- `challenges.md` — Challenge engine spec
- `verification.md` — Evidence and verification spec
- `rewards.md` — Points, badges, leaderboard spec
- `social.md` — Social feed spec
- `creators.md` — Creator/ambassador spec
- `businesses.md` — Sustainable business spec
- `accessibility.md` — Accessibility spec
- `reports.md` — Report & Protect spec
- `dashboard.md` — Manager dashboard spec
- `profile.md` — Traveler profile spec
- `design-system.md` — Visual system spec
- `supabase.md` — Backend integration spec
- `data-model.md` — Database entities spec
- `ai.md` — AI/recommendation spec
- `implementation.md` — Development order spec

---

*Prototype data. Not official statistics.*
*Built for Smart India Hackathon PS5: Green & Inclusive Travel.*
