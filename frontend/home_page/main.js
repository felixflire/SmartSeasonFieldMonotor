// GreenRoot Farms - main.js

document.addEventListener('DOMContentLoaded', () => {

  // ── Smooth scroll for "Learn More" anchor link ──
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Navbar background opacity on scroll ──
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(26, 58, 31, 0.98)';
    } else {
      nav.style.background = 'rgba(26, 58, 31, 0.92)';
    }
  });

  // ── Animate stat numbers counting up ──
  const stats = document.querySelectorAll('.stat-num');

  const animateStat = (el) => {
    const raw = el.textContent.trim();
    const suffix = raw.replace(/[\d,]/g, '');       // e.g. "+", "%"
    const target = parseInt(raw.replace(/[^0-9]/g, ''), 10);
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  // Use IntersectionObserver so animation triggers when stats scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));

  // ── Card hover ripple effect ──
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
  });

});
