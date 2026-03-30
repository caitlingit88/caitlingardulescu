document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelectorAll('.nav-links a');
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
    // Toggle menu - hamburger click
    hamburger.addEventListener('click', function() {
      const isOpen = nav.getAttribute('data-menu-open') === 'true';
      toggleMenu(!isOpen);
    });

    // Close menu - overlay click
    if (menuOverlay) {
      menuOverlay.addEventListener('click', function() {
        toggleMenu(false);
      });
    }

    // Close menu - nav link click (but allow navigation to happen first)
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Close menu after a brief delay to allow navigation
        setTimeout(() => toggleMenu(false), 100);
      });
    });
  }
});
