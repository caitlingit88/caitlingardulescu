/**
 * Scroll Animation Handler (No Parallax)
 * Uses Intersection Observer to trigger animations when sections come into view.
 */

(function() {
  'use strict';

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on-scroll');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(
    '.section, .value-prop, .service-card, .testimonial'
  );

  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  if (!('scrollBehavior' in document.documentElement.style)) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  console.log('✨ Scroll animations initialized (no parallax)');
})();
