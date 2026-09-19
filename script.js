// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Subtle scroll-reveal for elements marked .reveal
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Beyond Technology — SheDesign single-photo carousel (no auto-movement) + lightbox
const showcase = document.querySelector('[data-showcase]');

if (showcase) {
  const SHEDESIGN_PHOTOS = Array.from({ length: 12 }, (_, i) => ({
    src: `assets/shedesign/she${i + 1}.jpg`,
    alt: 'Photo from volunteering with SheDesign Nepal',
  }));

  const carouselImage = showcase.querySelector('[data-carousel-image]');
  const carouselCounter = showcase.querySelector('[data-carousel-counter]');
  const carouselPhotoBtn = showcase.querySelector('[data-carousel-photo]');
  const carouselPrevBtn = showcase.querySelector('[data-carousel-prev]');
  const carouselNextBtn = showcase.querySelector('[data-carousel-next]');

  // One index, one render function — arrows are the only thing that moves it.
  // No timer, no animation loop, nothing else touches this state.
  let carouselIndex = 0;

  const renderCarousel = (index) => {
    carouselIndex = (index + SHEDESIGN_PHOTOS.length) % SHEDESIGN_PHOTOS.length;
    const photo = SHEDESIGN_PHOTOS[carouselIndex];
    carouselImage.style.opacity = '0';
    window.setTimeout(() => {
      carouselImage.src = photo.src;
      carouselImage.alt = photo.alt;
      carouselImage.style.opacity = '1';
    }, 150);
    carouselCounter.textContent = `${carouselIndex + 1} / ${SHEDESIGN_PHOTOS.length}`;
  };

  if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', () => renderCarousel(carouselIndex - 1));
  }

  if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', () => renderCarousel(carouselIndex + 1));
  }

  // --- Lightbox ---
  const lightbox = document.querySelector('[data-lightbox]');

  if (lightbox) {
    const lightboxImage = lightbox.querySelector('[data-lightbox-image]');
    const closeBtn = lightbox.querySelector('[data-lightbox-close]');
    const lbPrevBtn = lightbox.querySelector('[data-lightbox-prev]');
    const lbNextBtn = lightbox.querySelector('[data-lightbox-next]');

    let lightboxIndex = 0;
    let lastFocused = null;

    const showLightboxPhoto = (index) => {
      lightboxIndex = (index + SHEDESIGN_PHOTOS.length) % SHEDESIGN_PHOTOS.length;
      const photo = SHEDESIGN_PHOTOS[lightboxIndex];
      lightboxImage.src = photo.src;
      lightboxImage.alt = photo.alt;
    };

    const onKeydown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') showLightboxPhoto(lightboxIndex + 1);
      else if (e.key === 'ArrowLeft') showLightboxPhoto(lightboxIndex - 1);
    };

    function openLightbox(index) {
      lastFocused = document.activeElement;
      showLightboxPhoto(index);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
      document.addEventListener('keydown', onKeydown);
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeydown);
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    // Clicking the carousel photo opens the lightbox at whichever photo is
    // currently showing
    if (carouselPhotoBtn) {
      carouselPhotoBtn.addEventListener('click', () => openLightbox(carouselIndex));
    }

    closeBtn.addEventListener('click', closeLightbox);
    lbPrevBtn.addEventListener('click', () => showLightboxPhoto(lightboxIndex - 1));
    lbNextBtn.addEventListener('click', () => showLightboxPhoto(lightboxIndex + 1));

    // Clicking the backdrop (anywhere outside the image/buttons) closes it
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Swipe support on mobile
    let touchStartX = null;
    lightbox.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].clientX;
      },
      { passive: true }
    );

    lightbox.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const SWIPE_THRESHOLD = 40;
      if (deltaX > SWIPE_THRESHOLD) {
        showLightboxPhoto(lightboxIndex - 1);
      } else if (deltaX < -SWIPE_THRESHOLD) {
        showLightboxPhoto(lightboxIndex + 1);
      }
      touchStartX = null;
    });
  }
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

This is intentionally broken

