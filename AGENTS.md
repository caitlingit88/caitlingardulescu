# Repository Guidelines

## Project Structure & Module Organization
This repository is a static website (no framework build step). Main entry points are `index.html` and page variants in `pages/` (`about.html`, `services.html`, `cv.html`, etc.). Shared behavior lives in `js/` (for example `mobile-menu.js`), animation and interaction styles are in `css/animations.css`, and static assets are in `images/`, `fonts/`, `logos/`, and `mp3/`. Deployment config is in `wrangler.jsonc`. Planning/design notes are in `docs/superpowers/`.

## Build, Test, and Development Commands
- `python3 -m http.server 8000` (run from repo root): quick local preview at `http://localhost:8000`.
- `npx wrangler dev`: run a Cloudflare-compatible local dev server using `wrangler.jsonc`.
- `npx wrangler deploy`: deploy static assets to Cloudflare Pages/Workers Assets.
- `git status` and `git diff -- <file>`: verify only intended files changed before commit.

## Coding Style & Naming Conventions
Use vanilla HTML/CSS/JavaScript only. Follow existing formatting: 2-space indentation in CSS/JS blocks, readable multi-line attributes in HTML where needed, and concise comments only for non-obvious logic. Prefer kebab-case for file names (`mobile-menu.js`) and descriptive class names (`menu-overlay`, `nav-links`). Reuse existing design tokens and color variables in `index.html`/CSS before adding new ones.

## Testing Guidelines
There is no automated test suite yet; use manual verification before PR:
- Validate desktop and mobile breakpoints (especially `<=640px` navigation behavior).
- Confirm menu open/close, overlay click, and scroll lock behavior.
- Smoke-test all internal links in `index.html` and `pages/`.
- Check reduced-motion behavior and basic accessibility attributes (`aria-label`, keyboard navigation).

## Commit & Pull Request Guidelines
Recent history favors Conventional Commit prefixes: `feat:` and `fix:` with imperative summaries (example: `fix: make hamburger button toggle menu open/close`). Keep commits focused by concern (layout, behavior, assets). PRs should include:
- Clear summary of user-visible changes
- Linked issue/task (if available)
- Before/after screenshots or short screen recording for UI changes
- Manual test notes (viewport sizes and flows checked)
