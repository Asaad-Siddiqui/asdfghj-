# TRAVELLO — Evidence and Verification Context

## Purpose

Verification creates credibility without making the MVP technically excessive.

## MVP verification

Use:
- evidence photo when required
- location
- timestamp
- challenge association

The system records these values with the completion.

## UX

Evidence screen:
- challenge name
- upload/capture photo
- detected/selected location
- timestamp
- submit button

After submission:
- processing state
- result
- completion outcome

## Verification confidence

A prototype may display a “verification confidence” indicator only if it is clearly presented as a demo/prototype confidence value.

Do not imply that the system can definitively prove a physical action.

## Future verification

Potential future layers:
1. metadata validation
2. AI-assisted image analysis
3. community verification
4. business/partner verification

## Upload handling

Validate:
- file type
- size
- ownership
- association with the user

Do not expose private evidence to arbitrary users.

## Failure states

Provide useful messages:
- image missing
- upload failed
- location unavailable
- invalid challenge state
- retry

Do not silently mark a challenge complete after an upload failure.
