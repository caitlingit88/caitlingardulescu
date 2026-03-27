# Mobile Hamburger Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a functional mobile hamburger menu that slides in from the right at ≤640px viewport, allowing users to access main navigation links and close via button, link click, or overlay click.

**Architecture:** Three-file approach: add HTML markup for menu structure in index.html, add CSS for styling and animation in animations.css, create vanilla JS file for all interactive behavior (toggle, close handlers, scroll lock).

**Tech Stack:** Vanilla HTML/CSS/JavaScript (no dependencies), CSS transforms for animation, `data-menu-open` attribute for state management.

---

## File Structure

| File | Responsibility |
|------|---|
| `index.html` | Add hamburger button, close button, overlay markup; add `data-menu-open` attribute to nav |
| `css/animations.css` | Hamburger button styles, mobile menu sidebar styles, overlay styles, slide animation, 640px media query |
| `js/mobile-menu.js` | Toggle menu open/close, handle all close events (button/link/overlay), manage body scroll lock |

---

## Task 1: Add HTML Markup

**Files:**
- Modify: `index.html:541-554` (header/nav section)

- [ ] **Step 1: Add hamburger button to header nav**

In the `<nav>` element inside header, add the hamburger button right after the logo `<div class="logo">` and before `<ul class="nav-links">`:

```html
<button class="hamburger" aria-label="Menu">
  <span></span>
  <span></span>
  <span></span>
</button>
```

Current location (line ~544): After `<div class="logo">...</div>`, before `<ul class="nav-links">`

- [ ] **Step 2: Add data-menu-open attribute to nav**

Change line 543 from:
```html
<nav>
```

To:
```html
<nav data-menu-open="false">
```

- [ ] **Step 3: Add close button inside nav-links**

Inside the `<ul class="nav-links">`, add a close button as the last list item:

```html
<li><button class="nav-close" aria-label="Close menu">✕</button></li>
```

This goes after the CTA link and before `</ul>`.

- [ ] **Step 4: Add overlay element**

After the `</nav>` closing tag (inside the header container), add:

```html
<div class="menu-overlay" data-menu-overlay></div>
```

- [ ] **Step 5: Verify structure**

Open index.html in browser and check:
- Hamburger button renders in header (will be hidden on desktop for now)
- Close button is inside nav-links
- Overlay element exists (will be invisible until CSS added)

---

## Task 2: Add Hamburger Button CSS

**Files:**
- Modify: `css/animations.css:298` (end of file, add before closing)

- [ ] **Step 1: Add hamburger button base styles**

Add to end of animations.css (before the final newline):

```css
/* ============================================
   Mobile Hamburger Menu
   ============================================ */

/* Hamburger Button */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1px;
  transition: all 0.3s ease-out;
}

.hamburger:hover span {
  background-color: var(--gold);
}

/* Hamburger visible at mobile breakpoint */
@media (max-width: 640px) {
  .hamburger {
    display: flex;
  }
}
```

- [ ] **Step 2: Hide nav-links on mobile (update existing media query)**

Find the existing `@media (max-width: 768px)` rule (around line 494).

Inside that media query, change the `.nav-links` rule from:
```css
.nav-links {
    display: none;
}
```

To:
```css
.nav-links {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    background-color: #000000;
    padding: var(--spacing-lg);
    gap: var(--spacing-lg);
    z-index: 101;
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
    align-items: flex-start;
}

nav[data-menu-open="true"] .nav-links {
    transform: translateX(0);
}
```

This moves it from display:none to a positioned sidebar that slides in/out.

- [ ] **Step 3: Add close button styles**

In the mobile media query (≤640px), add:

```css
.nav-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.8);
    font-size: var(--font-size-2xl);
    cursor: pointer;
    padding: var(--spacing-sm);
    align-self: flex-end;
    margin-bottom: var(--spacing-lg);
    transition: color 0.2s ease-out;
}

.nav-close:hover {
    color: var(--gold);
}
```

- [ ] **Step 4: Verify styles in browser**

At 640px or smaller:
- Hamburger button visible in top-right of header
- Nav links NOT visible (menu is off-screen)
- At desktop (>640px), hamburger hidden and nav links visible as normal

---

## Task 3: Add Overlay CSS

**Files:**
- Modify: `css/animations.css` (add to mobile menu section)

- [ ] **Step 1: Add overlay styles**

In the mobile menu CSS section (after the close button styles), add:

```css
/* Overlay */
.menu-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    opacity: 0;
    transition: opacity 0.3s ease-out;
}

@media (max-width: 640px) {
    nav[data-menu-open="true"] + .menu-overlay,
    .menu-overlay[data-menu-overlay] {
        display: block;
    }

    nav[data-menu-open="true"] ~ .menu-overlay {
        opacity: 1;
    }
}
```

- [ ] **Step 2: Test overlay visibility**

At 640px or smaller, when you manually add `data-menu-open="true"` to the nav (using browser DevTools), the overlay should appear semi-transparent behind the menu.

---

## Task 4: Create mobile-menu.js with Core Toggle

**Files:**
- Create: `js/mobile-menu.js`

- [ ] **Step 1: Create file with DOMContentLoaded hook**

Create new file `js/mobile-menu.js`:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('[data-menu-overlay]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const closeButton = document.querySelector('.nav-close');

  if (!hamburger) return; // No menu on desktop view

  // Toggle menu open/close
  function toggleMenu(open) {
    nav.setAttribute('data-menu-open', open ? 'true' : 'false');
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Open menu
  hamburger.addEventListener('click', function() {
    toggleMenu(true);
  });

  // Close menu - button
  closeButton.addEventListener('click', function() {
    toggleMenu(false);
  });

  // Close menu - overlay click
  overlay.addEventListener('click', function() {
    toggleMenu(false);
  });

  // Close menu - nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      toggleMenu(false);
    });
  });
});
```

- [ ] **Step 2: Add script to index.html**

Add this line before the closing `</body>` tag in index.html (after the other script tags, around line 790):

```html
<script src="js/mobile-menu.js" defer></script>
```

---

## Task 5: Test Mobile Menu Functionality

**Files:**
- Test: Browser at 640px viewport
- Test: Browser at 375px viewport (mobile)
- Test: Browser at 1200px viewport (desktop)

- [ ] **Step 1: Test hamburger button at mobile breakpoint**

1. Open index.html in browser
2. Resize to 640px width (or use DevTools mobile view)
3. Verify hamburger button (☰) appears in top-right header
4. Click hamburger button
5. Verify nav menu slides in from right
6. Verify overlay appears behind menu
7. Verify menu is visible and clickable

**Expected:** Menu slides in smoothly, overlay is visible

- [ ] **Step 2: Test close button**

1. With menu open, click the close button (✕)
2. Verify menu slides out to right
3. Verify overlay disappears

**Expected:** Smooth slide-out animation

- [ ] **Step 3: Test overlay close**

1. Click hamburger to open menu
2. Click the semi-transparent overlay area
3. Verify menu closes

**Expected:** Menu closes immediately

- [ ] **Step 4: Test nav link close**

1. Click hamburger to open menu
2. Click any nav link (e.g., "About")
3. Verify menu closes and page navigates

**Expected:** Menu closes before navigation

- [ ] **Step 5: Test body scroll lock**

1. Open menu on mobile
2. Try to scroll the page
3. Verify page does NOT scroll when menu is open

**Expected:** No scroll possible while menu open

- [ ] **Step 6: Test desktop view**

1. Resize browser to 1200px width
2. Verify hamburger button is HIDDEN
3. Verify nav links are visible normally in header
4. Verify everything works as before

**Expected:** Desktop nav unchanged, hamburger hidden

- [ ] **Step 7: Test reduced motion preference**

1. In OS settings, enable "Reduce motion" / "Prefers reduced motion"
2. Open mobile menu
3. Verify menu appears instantly (no animation) or very fast

**Expected:** No smooth animation when reduced motion enabled

---

## Task 6: Commit Changes

**Files:**
- Modified: `index.html`
- Modified: `css/animations.css`
- Created: `js/mobile-menu.js`

- [ ] **Step 1: Verify all changes**

```bash
git status
```

Expected output shows:
- `index.html` modified
- `css/animations.css` modified
- `js/mobile-menu.js` new file

- [ ] **Step 2: Stage all changes**

```bash
git add index.html css/animations.css js/mobile-menu.js
```

- [ ] **Step 3: Commit with message**

```bash
git commit -m "feat: add mobile hamburger menu for responsive navigation

- Add hamburger button and close button to header
- Slide-in sidebar menu from right at 640px breakpoint
- Semi-transparent overlay behind menu
- Close menu on button click, link click, or overlay click
- Disable body scroll when menu open
- Respect prefers-reduced-motion preference"
```

- [ ] **Step 4: Verify commit**

```bash
git log --oneline -1
```

Expected: Your new commit appears at top with message starting "feat: add mobile hamburger menu"

---

## Self-Review vs Spec

✅ **Spec coverage:**
- ✅ Mobile hamburger menu at 640px breakpoint
- ✅ Menu slides in from right side
- ✅ 5 main nav items accessible (About, Services, Experience, CV, Book a Call)
- ✅ Close button visible inside menu
- ✅ Click outside (overlay) closes menu
- ✅ Clicking nav link closes menu
- ✅ Smooth animation (0.3s ease-out, matches site style)
- ✅ Prevent body scroll when menu open
- ✅ No external dependencies
- ✅ Respects prefers-reduced-motion

✅ **No placeholders:** All steps contain exact code, file paths, and commands.

✅ **Type consistency:** Function names and attribute values consistent throughout (toggleMenu, data-menu-open, data-menu-overlay).
