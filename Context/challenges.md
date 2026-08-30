# TRAVELLO — Challenge Engine Context

## Purpose

Challenges are the core behavioral mechanic.

A challenge converts sustainability from information into an action.

## Destination-specific rule

Do not use one universal challenge list.

Examples:

Matheran:
- Waste-Free Trail
- Refill Instead of Plastic
- Stay on Designated Trails
- Respect Wildlife
- Support Local

Wildlife destination:
- Respect wildlife
- Avoid feeding animals
- Stay on marked routes

Water-stressed destination:
- Reduce water waste
- Refill instead of single-use bottles

High-pressure destination:
- Visit during lower-pressure periods
- Avoid sensitive zones

## Challenge data

Each challenge can contain:
- id
- destination_id
- title
- description
- category
- difficulty
- points
- estimated_minutes
- instructions
- evidence_required
- verification_method
- active status

## Challenge card

Show:
- icon/category
- title
- short description
- difficulty
- points
- progress/completion
- CTA

## Challenge details

Structure:
1. title
2. destination
3. why it matters
4. instructions
5. time/difficulty
6. points
7. verification requirements
8. Start Challenge

## Active challenge

Show:
- active status
- destination
- checklist
- evidence requirements
- completion CTA

Do not require a complicated real-time timer unless it improves the experience.

## Completion

A challenge is completed only after the completion record and required evidence have been submitted.

## Recommendation logic

Start rule-based.

Example:
IF destination visitor_pressure = high
→ recommend low-impact visitor behavior

IF destination category = wildlife
→ recommend wildlife-respect challenge

IF destination water_stress = high
→ recommend water conservation challenge

The UI should explain why a challenge is recommended.

## Anti-gaming

MVP:
- one completion per user per challenge within a sensible period
- destination association
- timestamp
- evidence when required

Future:
- community moderation
- partner verification
- AI-assisted evidence analysis

Never claim that a photo alone proves a real-world action.
