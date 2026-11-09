# Digital Payment Survey Platform

A research survey application for studying cyber fraud awareness,
perceived security, trust, spending behaviour and digital payment
continuance intention among university students.

## Architecture

- apps/web: Next.js respondent portal and admin dashboard
- apps/api: NestJS REST API
- apps/analytics: Python statistical analysis service
- packages/ui: shared user interface components
- packages/survey-schema: shared survey definitions and validation
- docs: research protocol and technical documentation

## Development principles

- Preserve existing VPS applications and configurations.
- Keep secrets out of source control.
- Validate all responses on the server.
- Maintain versioned questionnaire definitions.
- Keep raw and cleaned research datasets separate.
- Record analysis configuration for reproducibility.

## Production domain

https://survey.researchustad.org
