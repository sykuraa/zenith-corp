/**
 * Zenith Corp. — script.js
 * Handles: Hero Carousel, Mobile Navigation, Copyright Year
 */

'use strict';

/* ============================================================
   UTILITY
============================================================ */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   COPYRIGHT YEAR
============================================================ */
(function setCopyrightYear() {
  const el = document.getElementById('copyright-year');
  if (el) {
    el.textContent = new Date().getFullYear();
  }
})();

/* ============================================================
   MOBILE NAVIGATION
============================================================ */
(function initMobileNav() {
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('navMenu');

  if (!btn || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    btn.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden'; // prevent scroll behind menu
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function () {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close when a nav link is clicked
  menu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      btn.focus();
    }
  });

  // Close when clicking outside the menu (on overlay)
  document.addEventListener('click', function (e) {
    if (
      menu.classList.contains('is-open') &&
      !menu.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      closeMenu();
    }
  });
})();

/* ============================================================
   HERO CAROUSEL
============================================================ */
(function initCarousel() {
  const slides   = document.querySelectorAll('.carousel-slide');
  const dots     = document.querySelectorAll('.dot');
  const prevBtn  = document.getElementById('carouselPrev');
  const nextBtn  = document.getElementById('carouselNext');
  const carousel = document.querySelector('.hero-carousel');

  if (!slides.length) return;

  const TOTAL        = slides.length;
  const AUTO_DELAY   = 6000; // ms between auto-advances
  const TRANSITION   = prefersReducedMotion ? 0 : 700; // ms, matches CSS

  let currentIndex = 0; // Slide 0 = Apology — always starts here
  let autoTimer    = null;
  let isPaused     = false;

  /* ---------- Core: go to a specific slide ---------- */
  function goToSlide(newIndex) {
    // Clamp / wrap
    newIndex = ((newIndex % TOTAL) + TOTAL) % TOTAL;
    if (newIndex === currentIndex) return;

    // Deactivate current
    slides[currentIndex].classList.remove('active');
    slides[currentIndex].setAttribute('aria-hidden', 'true');
    dots[currentIndex].classList.remove('dot--active');
    dots[currentIndex].setAttribute('aria-selected', 'false');

    currentIndex = newIndex;

    // Activate new
    slides[currentIndex].classList.add('active');
    slides[currentIndex].removeAttribute('aria-hidden');
    dots[currentIndex].classList.add('dot--active');
    dots[currentIndex].setAttribute('aria-selected', 'true');
  }

  /* ---------- Auto-advance ---------- */
  function startAutoPlay() {
    if (prefersReducedMotion) return; // respect user preference
    stopAutoPlay();
    autoTimer = setInterval(function () {
      if (!isPaused) {
        goToSlide(currentIndex + 1);
      }
    }, AUTO_DELAY);
  }

  function stopAutoPlay() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  /* ---------- Pause on hover / focus ---------- */
  if (carousel) {
    carousel.addEventListener('mouseenter', function () { isPaused = true; });
    carousel.addEventListener('mouseleave', function () { isPaused = false; });
    carousel.addEventListener('focusin',    function () { isPaused = true; });
    carousel.addEventListener('focusout',   function () { isPaused = false; });
  }

  /* ---------- Arrow buttons ---------- */
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goToSlide(currentIndex - 1);
      // Restart auto-play timer after manual nav
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goToSlide(currentIndex + 1);
      startAutoPlay();
    });
  }

  /* ---------- Dot buttons ---------- */
  dots.forEach(function (dot, idx) {
    dot.addEventListener('click', function () {
      goToSlide(idx);
      startAutoPlay();
    });
  });

  /* ---------- Keyboard navigation ---------- */
  if (carousel) {
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const dir = e.key === 'ArrowLeft' ? -1 : 1;
        goToSlide(currentIndex + dir);
        startAutoPlay();
      }
    });
  }

  /* ---------- Touch / swipe support ---------- */
  let touchStartX = null;
  const SWIPE_THRESHOLD = 50; // px

  if (carousel) {
    carousel.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      touchStartX = null;

      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        goToSlide(currentIndex + (dx < 0 ? 1 : -1));
        startAutoPlay();
      }
    }, { passive: true });
  }

  /* ---------- Initialize ---------- */
  // Ensure slide 0 is active (apology always first)
  slides.forEach(function (slide, idx) {
    if (idx === 0) {
      slide.classList.add('active');
      slide.removeAttribute('aria-hidden');
    } else {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
    }
  });

  dots.forEach(function (dot, idx) {
    if (idx === 0) {
      dot.classList.add('dot--active');
      dot.setAttribute('aria-selected', 'true');
    } else {
      dot.classList.remove('dot--active');
      dot.setAttribute('aria-selected', 'false');
    }
  });

  // Start
  startAutoPlay();

})();

/* ============================================================
   SMOOTH SCROLL OFFSET (accounts for fixed header height)
============================================================ */
(function initSmoothScrollOffset() {
  const HEADER_HEIGHT = 72; // px, matches --header-height

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const topPos = target.getBoundingClientRect().top + window.pageYOffset - HEADER_HEIGHT;

      window.scrollTo({
        top: topPos,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
  });
})();
