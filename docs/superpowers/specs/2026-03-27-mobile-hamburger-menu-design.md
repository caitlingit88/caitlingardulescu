# Mobile Hamburger Menu Design

**Date:** 27 March 2026
**Project:** caitlingardulescu.com
**Status:** Design Approved

---

## Overview

Add a mobile hamburger menu for small screens (≤640px) that provides access to main navigation. The menu slides in from the right as a sidebar with semi-transparent overlay behind it. Users can close it by clicking the close button, clicking a navigation link, or clicking the overlay.

---

## Requirements

- Mobile hamburger menu appears at 640px breakpoint (phones and smaller)
- Menu slides in from right side
- Include 5 main nav items: About, Services, Experience, CV, Book a Call
- Exclude secondary pages: Voice Over, Creative Work
- Close button visible inside menu
- Click outside (overlay) closes menu
- Clicking a nav link closes menu
- Smooth animation consistent with site style (0.3s ease-out)
- Prevent body scroll when menu is open
- No JavaScript dependencies or external libraries

---

## Architecture

### Components

**1. Hamburger Button**
- Three horizontal lines (☰) icon
- Only visible at ≤640px
- Fixed position in top-right of header
- Z-index higher than nav links

**2. Mobile Menu (Sidebar)**
- Fixed position, full viewport height
- Positioned on right side, initially off-screen (translateX(100%))
- Contains close button and nav list
- Slides in via transform animation (no layout shifts)
- Dark background (inherit from header style)

**3. Overlay**
- Semi-transparent dark background
- Covers entire viewport when menu open
- Click to close menu
- Appears/disappears with menu

**4. Nav Links**
- Reuse existing `.nav-links` in mobile view
- Styled differently for mobile (full width, larger tap targets)
- Close menu on click

---

## Implementation Details

### Files to Modify

**1. index.html**
- Add hamburger button markup in header (inside nav, after logo)
- Add close button inside mobile menu
- Add overlay element
- Ensure nav has `data-menu-open` attribute (initially "false")
- No structural changes to existing nav list

**2. css/animations.css**
- Add `@keyframes` for menu slide animation (optional, or use inline transition)
- Add hamburger button styling (show/hide, hover state)
- Add mobile menu styling (position, animation, overlay)
- Add media query for ≤640px viewport
- Respect `prefers-reduced-motion` for animations

**3. js/mobile-menu.js (new file)**
- Toggle hamburger button click
- Close button click handler
- Nav link click handler
- Overlay click handler
- Body scroll lock/unlock
- Keep code minimal and vanilla (no dependencies)

---

## Behavior

**Open Menu:**
1. User clicks hamburger button
2. Set `data-menu-open="true"` on nav
3. Menu slides in from right (translateX 100% → 0)
4. Overlay fades in
5. Body scroll disabled

**Close Menu:**
1. User clicks close button, nav link, or overlay
2. Set `data-menu-open="false"` on nav
3. Menu slides out to right (translateX 0 → 100%)
4. Overlay fades out
5. Body scroll enabled

**Accessibility:**
- Hamburger button has aria-label="Menu"
- Close button has aria-label="Close menu"
- Respect `prefers-reduced-motion` preference
- Focus management handled by browser (nav already in tab order)

---

## Styling Details

**Hamburger Button:**
- Size: ~44px × 44px (good mobile tap target)
- Three lines with 4px gaps
- Color: white (matches nav text)
- Hover: slight opacity change or color shift to gold

**Mobile Menu:**
- Width: 100% (full-width sidebar)
- Background: black (#000000, match header)
- Padding: consistent with site spacing
- Z-index: 101 (above header which is 100)

**Overlay:**
- Background: rgba(0, 0, 0, 0.5) or similar
- Z-index: 100 (below menu, above page content)

**Animation:**
- Transition: 0.3s ease-out (matches site animations.css)
- No animation if `prefers-reduced-motion: reduce`

---

## Testing Checklist

- [ ] Menu opens/closes on hamburger button click
- [ ] Menu closes when clicking a nav link
- [ ] Menu closes when clicking overlay
- [ ] Menu closes when clicking close button
- [ ] Body scroll is disabled when menu open
- [ ] Animation is smooth and uses correct timing
- [ ] Menu is hidden on desktop (≥641px)
- [ ] Menu is visible on mobile (≤640px)
- [ ] Close button is visible and clickable
- [ ] Overlay appears with menu
- [ ] Works with reduced motion preference enabled
- [ ] Links are accessible and properly styled on mobile

---

## Scope

- **In scope:** Mobile hamburger menu, animation, close behaviors, accessibility
- **Out of scope:** Desktop nav changes, new pages, submenu functionality, search feature

---

## Success Criteria

1. Menu is usable and intuitive on mobile devices
2. All 5 main nav items are accessible
3. Menu closes properly in all scenarios
4. Animation is smooth and matches site style
5. No layout shift when menu appears/disappears
6. Mobile site is fully navigable without horizontal scroll
