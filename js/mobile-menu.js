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
