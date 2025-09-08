document.addEventListener('DOMContentLoaded', () => {
  /*=============== DOM ELEMENTS ===============*/
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav__link');
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const slides = document.querySelectorAll('.home__slide');

  /*=============== NAVIGATION HANDLERS ===============*/
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
      document.body.style.overflow = 'hidden';
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = '';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = '';
    });
  });

  /* Disable body scroll when mobile menu is open */
  const toggleBodyScroll = () => {
    if (navMenu.classList.contains('show-menu')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  navToggle?.addEventListener('click', toggleBodyScroll);
  navClose?.addEventListener('click', toggleBodyScroll);
  navLinks.forEach(link => link.addEventListener('click', toggleBodyScroll));

  // Close mobile menu on resize to desktop and restore body scroll
  const onResize = () => {
    if (window.innerWidth > 1150) {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = '';
    } else {
      updateHeader();
    }
  };
  window.addEventListener('resize', onResize);
  onResize();

  /*=============== HEADER BACKGROUND ===============*/
  const hero = document.getElementById('home');
  const setHeaderState = (isTransparent) => {
    if (!header) return;
    header.classList.toggle('header--transparent', isTransparent);
    header.classList.toggle('bg-header', !isTransparent);
  };
  const updateHeader = () => {
    if (!hero) {
      setHeaderState(window.scrollY < 50);
      return;
    }
    const scrolledPastHero = window.scrollY > (hero.offsetHeight - (header?.offsetHeight || 0));
    setHeaderState(!scrolledPastHero);
  };
  const updateHeaderAndMenu = () => {
    updateHeader();
    // Ensure the mobile menu never auto-opens on scroll
    if (window.innerWidth <= 1150 && navMenu.classList.contains('show-menu')) {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = '';
    }
  };
  // Use IntersectionObserver for more reliable hero detection
  if ('IntersectionObserver' in window && hero) {
    const coreValues = document.querySelector('.values');
    const observer = new IntersectionObserver((entries) => {
      const heroEntry = entries.find(e => e.target.id === 'home');
      const valuesEntry = entries.find(e => e.target.classList?.contains('values'));
      const isHeroVisible = heroEntry ? heroEntry.isIntersecting : false;
      const isCoreVisible = valuesEntry ? valuesEntry.isIntersecting : false;
      // In hero → always transparent. In core values → colored. Else → colored if not in hero
      if (isHeroVisible) {
        setHeaderState(true);
      } else if (isCoreVisible) {
        setHeaderState(false);
      } else {
        setHeaderState(false);
      }
    }, { root: null, threshold: 0.15 });
    observer.observe(hero);
    if (coreValues) observer.observe(coreValues);
  } else {
    window.addEventListener('scroll', updateHeaderAndMenu, { passive: true });
  }
  updateHeaderAndMenu();

  // Always ensure mobile menu is closed during any viewport interaction to prevent auto-expansion
  const closeMenu = () => {
    if (window.innerWidth <= 1150 && navMenu.classList.contains('show-menu')) {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = '';
    }
  };
  window.addEventListener('scroll', closeMenu, { passive: true });
  window.addEventListener('touchmove', closeMenu, { passive: true });
  window.addEventListener('wheel', closeMenu, { passive: true });
  window.addEventListener('orientationchange', closeMenu);
  window.addEventListener('hashchange', closeMenu);

  /*=============== HOME SLIDESHOW ===============*/
  let currentSlide = 0;
  
  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  };
  
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  if (slides.length > 0) {
    showSlide(0);
    setInterval(nextSlide, 5000);
  }

  /*=============== SWIPER SERVICES (guarded) ===============*/
  if (document.querySelector('.services__swiper')) {
    new Swiper('.services__swiper', {
      loop: true,
      grabCursor: true,
      spaceBetween: 24,
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  /*=============== ACTIVE SECTION HIGHLIGHT ===============*/
  const highlightActiveSection = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 58;
      const sectionId = section.getAttribute('id');
      const menuLink = document.querySelector(`.nav__menu a[href*='${sectionId}']`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        menuLink?.classList.add('active-link');
      } else {
        menuLink?.classList.remove('active-link');
      }
    });
  };

  window.addEventListener('scroll', highlightActiveSection);
  highlightActiveSection();

  /*=============== SCROLL REVEAL ANIMATIONS ===============*/
  const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1200,
    delay: 200,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  });

  sr.reveal('.home__content, .services__data, .footer__container');
  sr.reveal('.home__images', { origin: 'bottom', delay: 500 });
  sr.reveal('.about__images, .contact__img', { origin: 'left' });
  sr.reveal('.responsible__header', { origin: 'right', delay: 300 });
  sr.reveal('.responsible__stats', { origin: 'bottom', interval: 150 });
  sr.reveal('.lifecycle__content', { origin: 'bottom', delay: 300 });
  sr.reveal('.categories__card', { origin: 'bottom', delay: 200, interval: 200 });
  sr.reveal('.corporate-video__content', { origin: 'top', delay: 400 });

  // Inertia scroll-like subtle parallax for sections marked .parallax-bg
  const parallaxSections = document.querySelectorAll('.parallax-bg');
  const onScrollParallax = () => {
    parallaxSections.forEach(sec => {
      const speed = 0.2;
      const y = window.scrollY * speed;
      sec.style.backgroundPosition = `center calc(50% + ${y}px)`;
    });
  };
  if (parallaxSections.length) {
    window.addEventListener('scroll', onScrollParallax, { passive: true });
    onScrollParallax();
  }
});