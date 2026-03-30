document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelectorAll('.nav-links a');
  const closeButton = document.querySelector('.nav-close');
  const menuOverlay = document.querySelector('.menu-overlay');

  // Toggle menu open/close
  function toggleMenu(open) {
    nav.setAttribute('data-menu-open', open ? 'true' : 'false');
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Only initialize if hamburger exists (mobile view)
  if (hamburger) {
    // Open menu
    hamburger.addEventListener('click', function() {
      toggleMenu(true);
    });

    // Close menu - button
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        toggleMenu(false);
      });
    }

    // Close menu - overlay click
    if (menuOverlay) {
      menuOverlay.addEventListener('click', function() {
        toggleMenu(false);
      });
    }

    // Close menu - nav link click (but allow navigation to happen first)
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Check if this is an external link or CTA
        const isExternal = link.target === '_blank' || link.href.startsWith('http');
        const isCTA = link.classList.contains('nav-cta');

        // Close menu after a brief delay to allow navigation
        if (!link.classList.contains('nav-close')) {
          setTimeout(() => toggleMenu(false), 100);
        }
      });
    });
  }
});
