/* Premium JS Layer v2 — No preloader, no cursor, just smooth animations */
(function() {
  'use strict';

  function initScrollProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.pageYOffset / h) * 100 : 0) + '%';
    }, { passive: true });
  }

  function initNav() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.pageYOffset > 10);
    }, { passive: true });
    var tog = document.getElementById('nt') || document.getElementById('navToggle');
    var links = document.getElementById('nl') || document.getElementById('navLinks');
    if (tog && links) {
      tog.addEventListener('click', function() { links.classList.toggle('open'); });
      links.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() { links.classList.remove('open'); });
      });
    }
  }

  function initBackToTop() {
    var btt = document.querySelector('.btt');
    if (!btt) return;
    window.addEventListener('scroll', function() {
      btt.classList.toggle('show', window.pageYOffset > 300);
    }, { passive: true });
    btt.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  function initScrollReveal() {
    document.querySelectorAll('.reveal, .rv, .reveal-up, .stagger-children').forEach(function(el) {
      new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) { entry.target.classList.add('v'); entry.target.classList.add('visible'); }
        });
      }, { threshold: 0.1 }).observe(el);
    });
  }

  function initCounters() {
    document.querySelectorAll('[data-count]').forEach(function(el) {
      new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            var t = parseInt(el.dataset.count, 10), suf = el.dataset.suffix || '', dur = 1800, st = null;
            (function step(ts) {
              if (!st) st = ts;
              var p = Math.min((ts - st) / dur, 1);
              el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * t) + suf;
              if (p < 1) requestAnimationFrame(step); else el.textContent = t + suf;
            })(performance.now());
          }
        });
      }, { threshold: 0.5 }).observe(el);
    });
  }

  function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;
    var lenis = new Lenis({ duration: 1.1, easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function(time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
  }

  function initGSAP() {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    gsap.from('.nav', { y: -15, opacity: 0, duration: 0.5, ease: 'power2.out' });
    gsap.from('.hero-badge, .hero h1, .accent-line, .hero-sub, .hero-btns', { y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', delay: 0.15 });
    gsap.from('.phero h1, .phero p, .page-hero h1, .page-hero p', { y: 25, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.15 });

    if (typeof ScrollTrigger === 'undefined') return;

    gsap.utils.toArray('.sec-head, .tag, .title, .sh-tag, .sh-title').forEach(function(el) {
      gsap.from(el, { y: 25, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } });
    });
    gsap.utils.toArray('.card, .p-card, .feat-card, .wwd-card').forEach(function(el, i) {
      gsap.from(el, { y: 35, opacity: 0, duration: 0.6, delay: (i % 4) * 0.08, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } });
    });
    gsap.utils.toArray('.nums-i').forEach(function(el, i) {
      gsap.from(el, { y: 20, opacity: 0, duration: 0.5, delay: i * 0.08, ease: 'power2.out', scrollTrigger: { trigger: el.parentElement, start: 'top 90%' } });
    });
    var trust = document.querySelector('.trust-in');
    if (trust) gsap.from(trust, { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: '.trust', start: 'top 90%' } });

    gsap.utils.toArray('.cl-b, .clc').forEach(function(el, i) {
      gsap.from(el, { y: 15, opacity: 0, duration: 0.4, delay: (i % 6) * 0.05, ease: 'power2.out', scrollTrigger: { trigger: el.parentElement, start: 'top 92%', toggleActions: 'play none none none' } });
    });
    gsap.utils.toArray('.wwd-tags span, .tags span, .d-pill').forEach(function(el, i) {
      gsap.from(el, { scale: 0.85, opacity: 0, duration: 0.3, delay: (i % 8) * 0.03, ease: 'power2.out', scrollTrigger: { trigger: el.closest('.wwd-card, .card') || el, start: 'top 88%' } });
    });
    gsap.utils.toArray('.accent-line, .story-line').forEach(function(el) {
      gsap.from(el, { scaleX: 0, transformOrigin: 'left center', duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });
    var story = document.querySelector('.story-card');
    if (story) gsap.from(story, { y: 35, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: story, start: 'top 82%' } });

    gsap.utils.toArray('.sec-blue .w, .cta-s .w, .cta-sec .w').forEach(function(el) {
      gsap.from(el, { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 82%' } });
    });
    var dash = document.querySelector('.dash, .dg');
    if (dash) gsap.from(dash, { y: 50, opacity: 0, scale: 0.97, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: dash, start: 'top 82%' } });

    gsap.utils.toArray('.fb').forEach(function(el, i) {
      gsap.from(el, { y: 12, opacity: 0, duration: 0.35, delay: i * 0.04, ease: 'power2.out', scrollTrigger: { trigger: el.parentElement, start: 'top 85%' } });
    });
    gsap.utils.toArray('.sol').forEach(function(el) {
      gsap.from(el, { y: 25, opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 82%' } });
    });
    gsap.from('footer, .ft, .footer', { opacity: 0, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: 'footer, .ft, .footer', start: 'top 95%' } });

    // Magnetic buttons (calm)
    document.querySelectorAll('.btn, .nav-btn, .nav-cta').forEach(function(btn) {
      btn.addEventListener('mousemove', function(e) {
        var r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.1, y: (e.clientY - r.top - r.height / 2) * 0.1, duration: 0.4, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', function() { gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' }); });
    });

    var heroVid = document.querySelector('.hero-vid video');
    if (heroVid) gsap.to(heroVid, { y: 80, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
  }

  function initSolutionFinder() {
    if (typeof window.ss === 'undefined') {
      window.ss = function(i) {
        document.querySelectorAll('.fb').forEach(function(b, j) { b.classList.toggle('on', j === i); });
        document.querySelectorAll('.fs').forEach(function(s, j) { s.classList.toggle('on', j === i); });
      };
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    initScrollProgress();
    initNav();
    initBackToTop();
    initScrollReveal();
    initCounters();
    initSolutionFinder();
    setTimeout(function() { initSmoothScroll(); initGSAP(); }, 50);
  });
})();
