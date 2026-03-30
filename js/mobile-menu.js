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

    // Close menu - nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Don't close if clicking the close button itself
        if (!link.classList.contains('nav-close')) {
          toggleMenu(false);
        }
      });
    });
  }
});
