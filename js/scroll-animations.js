/**
 * Scroll Animation Handler
 * Uses Intersection Observer to trigger animations when sections come into view
 */

(function() {
  'use strict';

  // Create Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation class when element enters viewport
        entry.target.classList.add('on-scroll');
        // Stop observing this element (animation only triggers once)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and grid items for animation
  const elementsToAnimate = document.querySelectorAll(
    '.section, .value-prop, .service-card, .testimonial'
  );

  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  // Parallax effect for hero image
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    heroImage.classList.add('parallax');

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const parallaxOffset = scrollPosition * 0.3; // 30% of scroll speed
      heroImage.style.setProperty('--parallax-offset', `${parallaxOffset}px`);
    });
  }

  // Smooth scroll behavior (already in CSS, but backup for older browsers)
  if (!('scrollBehavior' in document.documentElement.style)) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  console.log('✨ Scroll animations initialized');
})();
