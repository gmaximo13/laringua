# AGENTS.md — Laringua

## Project overview

Laringua is a personal mobile application developed for a couple to organize their shared life.

The application is not exclusively financial. Its long-term scope includes shared expenses, payments, plans, goals, shopping lists, movies, places to visit, and important dates.

The initial development priority is the shared finance module.

## Technology stack

- React Native with Expo
- Expo Router for navigation
- TypeScript with strict typing
- React hooks and functional components
- React Native StyleSheet
- SQLite through expo-sqlite for local persistence
- npm as the package manager

Inspect package.json and the existing source code to confirm installed versions and dependencies before making changes.

## Development principles

- Follow the existing project conventions.
- Prefer simple, readable, maintainable code.
- Do not introduce unnecessary abstractions or dependencies.
- Keep UI components separate from business logic and database access.
- Use TypeScript types and interfaces instead of `any`.
- Use descriptive English names for variables, functions, files, and database fields.
- Preserve the current visual identity, theme, and navigation.
- Do not refactor unrelated files.
- Do not introduce a backend, cloud database, authentication, or synchronization unless explicitly requested.
- Do not implement future modules prematurely.

## Architecture

Prefer separating responsibilities into:

- `src/app`: screens and navigation.
- `src/components`: reusable UI components.
- `src/database`: SQLite initialization and migrations.
- `src/features`: feature-specific types, repositories, services, and business logic.
- `src/shared`: shared themes, constants, and utilities.

Adapt to the existing structure rather than reorganizing the project without approval.

## Finance business rules

- Expenses have a total amount and a payer.
- Each expense has a responsibility split between participants.
- Support equal, custom, and single-person responsibility splits.
- The sum of the splits must equal the total expense.
- Payments between participants settle balances and must not count as new expenses.
- Store monetary values as integer cents.
- Calculate balances from recorded transactions instead of maintaining an independent mutable balance.
- Preserve financial consistency using database transactions.
- Do not assume the person who paid is responsible for the full expense.

## Database guidelines

- Use SQLite for structured local data.
- Enable foreign key enforcement.
- Use versioned migrations for schema changes.
- Define constraints and indexes where appropriate.
- Use parameterized SQL queries.
- Do not concatenate user input into SQL.
- Keep SQL queries inside repositories or database modules.
- Handle errors and avoid partially persisted financial operations.
- Never delete existing user data or reset the database without explicit approval.

## Working agreement

Before implementing a significant change:

1. Inspect the relevant existing files.
2. Explain the proposed approach and files affected.
3. Identify uncertainties and ask before making consequential architectural decisions.
4. Implement only the agreed scope.
5. Run available validation commands.
6. Summarize the changes and explain important decisions.

When asked to plan, analyze, or review, do not modify files.

## Validation

- Run TypeScript validation after code changes.
- Run the existing lint command when available.
- Add or update tests for nontrivial business rules.
- Do not claim that a test passed unless it was actually executed.
- Report validation failures and any tests that could not be run.

## Communication

- Communicate with the developer in Brazilian Portuguese.
- Explain important technical decisions concisely.
- When introducing unfamiliar concepts, explain why they are necessary.
- Do not silently make product or architectural decisions.
- Prioritize helping the developer understand and maintain the code.

## Learning documentation

- For every task that changes code or introduces a technical concept, create or update study notes in `localDocs/Estudo/` in Brazilian Portuguese.
- Explain concepts in plain language for a beginner who is developing software engineering skills. Connect each concept to actual Laringua files and decisions.
- Include practical examples, the reason for the approach, important limitations, and suggested reading order when useful.
- Keep the index updated and distinguish implemented behavior from planned work. Update existing explanations when behavior changes rather than duplicating them.
- Documentation is part of the task, not an optional follow-up. Do not implement unrelated features just to illustrate a concept.
