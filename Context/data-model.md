# TRAVELLO — Data Model Context

## Core entities

### profiles
- id
- display_name
- username
- avatar_url
- bio
- role
- impact_points
- created_at
- updated_at

### destinations
- id
- name
- region
- country
- description
- hero_image_url
- sustainability_score
- visitor_pressure
- accessibility_summary
- created_at

### destination_factors
- id
- destination_id
- factor
- score
- explanation

Factors:
- waste
- water
- nature
- visitor_pressure
- infrastructure
- accessibility

### challenges
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
- active

### challenge_completions
- id
- user_id
- challenge_id
- status
- started_at
- completed_at
- points_awarded

### challenge_evidence
- id
- completion_id
- user_id
- file_url/path
- latitude
- longitude
- captured_at
- verification_status

### badges
- id
- name
- description
- icon
- rule_key

### user_badges
- id
- user_id
- badge_id
- awarded_at

### posts
- id
- user_id
- destination_id
- challenge_completion_id nullable
- media_url
- caption
- visibility
- created_at

### post_likes
- post_id
- user_id
- created_at

### comments
- id
- post_id
- user_id
- body
- created_at

### follows
- follower_id
- following_id
- created_at

### businesses
- id
- destination_id
- name
- type
- description
- image_url
- sustainability_score
- accessibility_summary

### business_practices
- id
- business_id
- category
- practice
- value
- source

### campaigns
- id
- creator_id
- destination_id
- title
- description
- cover_image_url
- status
- start_date
- end_date

### campaign_challenges
- campaign_id
- challenge_id

### campaign_participants
- campaign_id
- user_id
- joined_at

### reports
- id
- user_id
- destination_id
- category
- description
- latitude
- longitude
- status
- priority
- created_at
- updated_at

### report_evidence
- id
- report_id
- file_url/path
- created_at

### notifications
- id
- user_id
- type
- title
- body
- read_at
- created_at

## Relationships

profile → posts
profile → completions
profile → badges
profile → reports
destination → challenges
destination → posts
destination → businesses
destination → reports
destination → campaigns
challenge → completions
completion → evidence
creator/profile → campaigns
campaign → challenges
campaign → participants

## Data integrity

Important rules:
- one user should not receive the same challenge points repeatedly unless the challenge explicitly supports repetition
- users can only create records for themselves
- campaign participation should be unique
- likes should be unique per user/post
- report status changes should be controlled

## Demo seed

Use realistic but fictional demo data unless sourced data is explicitly available.

Do not claim prototype scores are official government statistics.
