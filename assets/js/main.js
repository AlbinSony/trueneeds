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
      header?.classList.add('menu-open');
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
      header?.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
      header?.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
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
      header?.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
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
  let slideshowInterval;
  
  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    console.log(`Slide changed to: ${index + 1}/${slides.length}`); // Debug log
  };
  
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  const startSlideshow = () => {
    if (slides.length > 0) {
      console.log(`Starting slideshow with ${slides.length} slides`); // Debug log
      showSlide(0);
      slideshowInterval = setInterval(nextSlide, 5000);
    } else {
      console.log('No slides found for slideshow'); // Debug log
    }
  };

  const stopSlideshow = () => {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
    }
  };

  // Start slideshow
  startSlideshow();

  // Pause slideshow when page is not visible (mobile optimization)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });

  // Restart slideshow on orientation change (mobile)
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      stopSlideshow();
      startSlideshow();
    }, 500);
  });

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
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    mobile: true, // Enable animations on mobile
    desktop: true, // Enable animations on desktop
    reset: false, // Don't reset animations on scroll
    viewFactor: 0.1, // Trigger when 10% of element is visible
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  // Enhanced animations for all elements
  sr.reveal('.home__content, .services__data, .footer__container', {
    mobile: true,
    desktop: true,
    distance: '60px',
    duration: 1000,
    delay: 100
  });
  
  sr.reveal('.home__images', { 
    origin: 'bottom', 
    delay: 500,
    mobile: true,
    desktop: true,
    distance: '80px',
    duration: 1200
  });
  
  sr.reveal('.about__images, .contact__img', { 
    origin: 'left',
    mobile: true,
    desktop: true,
    distance: '100px',
    duration: 1000,
    delay: 200
  });
  
  sr.reveal('.responsible__header', { 
    origin: 'right', 
    delay: 300,
    mobile: true,
    desktop: true,
    distance: '80px',
    duration: 1000
  });
  
  sr.reveal('.responsible__stats', { 
    origin: 'bottom', 
    interval: 150,
    mobile: true,
    desktop: true,
    distance: '60px',
    duration: 800,
    delay: 100
  });
  
  sr.reveal('.lifecycle__content', { 
    origin: 'bottom', 
    delay: 300,
    mobile: true,
    desktop: true,
    distance: '80px',
    duration: 1000
  });
  
  sr.reveal('.categories__card', { 
    origin: 'bottom', 
    delay: 200, 
    interval: 200,
    mobile: true,
    desktop: true,
    distance: '60px',
    duration: 800
  });
  
  sr.reveal('.corporate-video__content', { 
    origin: 'top', 
    delay: 400,
    mobile: true,
    desktop: true,
    distance: '80px',
    duration: 1000
  });

  // Additional mobile-specific animations
  sr.reveal('.home__title', {
    origin: 'top',
    distance: '50px',
    duration: 1000,
    delay: 300,
    mobile: true,
    desktop: true
  });

  sr.reveal('.home__buttons', {
    origin: 'bottom',
    distance: '40px',
    duration: 800,
    delay: 600,
    mobile: true,
    desktop: true
  });

  sr.reveal('.home__info', {
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 800,
    mobile: true,
    desktop: true
  });

  sr.reveal('.section__title', {
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 200,
    mobile: true,
    desktop: true
  });

  sr.reveal('.section__subtitle', {
    origin: 'top',
    distance: '40px',
    duration: 800,
    delay: 100,
    mobile: true,
    desktop: true
  });

  sr.reveal('.services__card', {
    origin: 'bottom',
    distance: '60px',
    duration: 800,
    delay: 200,
    interval: 100,
    mobile: true,
    desktop: true
  });

  sr.reveal('.projects__card', {
    origin: 'bottom',
    distance: '60px',
    duration: 800,
    delay: 200,
    interval: 150,
    mobile: true,
    desktop: true
  });

  sr.reveal('.testimonial__card', {
    origin: 'bottom',
    distance: '60px',
    duration: 800,
    delay: 200,
    mobile: true,
    desktop: true
  });

  sr.reveal('.contact__card', {
    origin: 'bottom',
    distance: '60px',
    duration: 800,
    delay: 200,
    interval: 100,
    mobile: true,
    desktop: true
  });

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

  /*=============== MOBILE ANIMATION FALLBACK ===============*/
  // Fallback animation system for mobile devices
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    const animateOnScroll = () => {
      // Comprehensive list of all elements that should animate
      const elements = document.querySelectorAll(`
        .home__content,
        .home__title,
        .home__buttons,
        .home__info,
        .home__divider,
        .services__card,
        .services__header,
        .services__description,
        .projects__card,
        .projects__container,
        .testimonial__card,
        .contact__card,
        .contact__container,
        .responsible__stats,
        .responsible__header,
        .responsible__description,
        .categories__card,
        .categories__container,
        .lifecycle__content,
        .corporate-video__content,
        .about__container,
        .about__data,
        .about__images,
        .section__title,
        .section__subtitle,
        .values__grid,
        .footer__container,
        .footer__content,
        .nav__menu,
        .button,
        .button__link
      `);
      
      elements.forEach(element => {
        if (element && element.getBoundingClientRect) {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 100; // Reduced for better mobile detection
          
          if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
            element.classList.add('in-view');
          }
        }
      });
    };
    
    // Initial check
    animateOnScroll();
    
    // Listen for scroll events with throttling for better performance
    let ticking = false;
    const throttledAnimate = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          animateOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledAnimate, { passive: true });
    
    // Re-check on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        animateOnScroll();
      }
    });
  }

  /*=============== ENHANCED MOBILE INTERACTIONS ===============*/
  // Add touch-friendly interactions for mobile
  if (isMobile) {
    // Add ripple effect to buttons on mobile
    const buttons = document.querySelectorAll('.button, .button__link');
    buttons.forEach(button => {
      button.addEventListener('touchstart', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.touches[0].clientX - rect.left - size / 2;
        const y = e.touches[0].clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
      .button, .button__link {
        position: relative;
        overflow: hidden;
      }
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      }
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
});