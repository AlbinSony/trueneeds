document.addEventListener('DOMContentLoaded', () => {
    /*=============== CORE VALUES INTERACTIVITY ===============*/
    const coreValuesGrid = document.getElementById('core-values-grid');
    if (coreValuesGrid) {
      coreValuesGrid.addEventListener('click', function(e) {
        let item = e.target.closest('.responsible__stat-item');
        if (!item) return;
        // Hide all details first
        coreValuesGrid.querySelectorAll('.core-value-detail').forEach(detail => {
          detail.style.display = 'none';
        });
        // Remove active class from all
        coreValuesGrid.querySelectorAll('.responsible__stat-item').forEach(card => {
          card.classList.remove('active');
        });
        // Show clicked item's detail
        let detail = item.querySelector('.core-value-detail');
        if (detail) {
          detail.style.display = 'block';
          item.classList.add('active');
        }
      });
    }

  /*=============== WHAT MAKES US UNIQUE - MOUSE MOVE GLITTER ANIMATION ===============*/
  const uniqueStatsGrid = document.getElementById('unique-stats');
  if (uniqueStatsGrid) {
    // Create glitter particle on mouse move
    function createGlitter(e, item) {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create a glitter particle
      const particle = document.createElement('div');
      particle.className = 'glitter-particle';
      
      // Random properties
      const size = Math.random() * 8 + 4;
      const isGreen = Math.random() > 0.3;
      const isStar = Math.random() > 0.7;
      
      if (isStar) {
        particle.innerHTML = '✦';
        particle.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          font-size: ${Math.random() * 14 + 8}px;
          color: ${isGreen ? '#85a751' : '#1c2d47'};
          text-shadow: 0 0 8px ${isGreen ? 'rgba(133, 167, 81, 0.9)' : 'rgba(28, 45, 71, 0.9)'};
          pointer-events: none;
          z-index: 100;
          transform: translate(-50%, -50%);
        `;
      } else {
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: ${isGreen ? 'linear-gradient(135deg, #85a751, #a8d060)' : 'linear-gradient(135deg, #1c2d47, #3a5a8a)'};
          border-radius: 50%;
          pointer-events: none;
          z-index: 100;
          box-shadow: 0 0 ${size + 4}px ${isGreen ? 'rgba(133, 167, 81, 0.8)' : 'rgba(28, 45, 71, 0.8)'};
          transform: translate(-50%, -50%);
        `;
      }
      
      item.appendChild(particle);
      
      // Animate particle floating up and fading
      const driftX = (Math.random() - 0.5) * 40;
      const driftY = -Math.random() * 60 - 20;
      
      particle.animate([
        { 
          transform: 'translate(-50%, -50%) scale(1)', 
          opacity: 1 
        },
        { 
          transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) scale(0)`, 
          opacity: 0 
        }
      ], {
        duration: 600 + Math.random() * 400,
        easing: 'ease-out'
      }).onfinish = () => particle.remove();
    }
    
    // Throttle function to limit particle creation rate
    let lastGlitterTime = 0;
    const glitterThrottle = 50; // Create glitter every 50ms
    
    uniqueStatsGrid.addEventListener('mousemove', function(e) {
      const now = Date.now();
      if (now - lastGlitterTime < glitterThrottle) return;
      lastGlitterTime = now;
      
      let item = e.target.closest('.responsible__stat-item');
      if (!item) return;
      
      createGlitter(e, item);
    });
    
    // Also add click effect
    uniqueStatsGrid.addEventListener('click', function(e) {
      let item = e.target.closest('.responsible__stat-item');
      if (!item) return;
      
      // Create burst of particles on click
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          const fakeEvent = {
            clientX: e.clientX + (Math.random() - 0.5) * 40,
            clientY: e.clientY + (Math.random() - 0.5) * 40
          };
          createGlitter(fakeEvent, item);
        }, i * 30);
      }
      
      item.classList.add('clicked');
      setTimeout(() => item.classList.remove('clicked'), 600);
    });
  }

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
  // Header is always solid - no transparency functionality needed
  const updateHeaderAndMenu = () => {
    // Ensure the mobile menu never auto-opens on scroll
    if (window.innerWidth <= 1150 && navMenu.classList.contains('show-menu')) {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = '';
    }
  };
  
  // No need for scroll-based header changes since header is always solid
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
  
  // Enhanced Core Values ScrollReveal for mobile
  sr.reveal('.values .responsible__stat-item', { 
    origin: 'bottom', 
    interval: 200,
    mobile: true,
    desktop: true,
    distance: '40px',
    duration: 1000,
    delay: 100,
    reset: false
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
        .values .responsible__stat-item,
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

  /*=============== CORE VALUES SCROLL EFFECT ===============*/
  // Enhanced scroll-triggered effect for Core Values section (Desktop + Mobile)
  let coreValuesObserver = null;
  let coreValuesItemObservers = [];
  
  const initCoreValuesEffect = () => {
    const coreValuesSection = document.querySelector('.values');
    const coreValuesItems = document.querySelectorAll('.values .responsible__stat-item');
    
    // Clean up existing observers
    if (coreValuesObserver) {
      coreValuesObserver.disconnect();
    }
    coreValuesItemObservers.forEach(observer => observer.disconnect());
    coreValuesItemObservers = [];
    
    if (coreValuesSection && coreValuesItems.length > 0) {
      // Mobile-specific settings
      const isMobile = window.innerWidth <= 768;
      const threshold = isMobile ? 0.2 : 0.3; // Lower threshold for mobile
      const rootMargin = isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px';
      const staggerDelay = isMobile ? 150 : 200; // Faster stagger for mobile
      
      coreValuesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log('Core Values section in view - adding scroll effects');
            
            // Add scroll-active class to all Core Values items when section is in view
            coreValuesItems.forEach((item, index) => {
              // Reset any existing classes first
              item.classList.remove('scroll-active', 'animate');
              
              setTimeout(() => {
                item.classList.add('scroll-active');
                if (isMobile) {
                  item.classList.add('animate');
                  // Add a more prominent effect for mobile
                  item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                }
                console.log(`Core Value item ${index + 1} activated with mobile effect`);
              }, index * staggerDelay);
            });
          } else {
            // Remove scroll-active class when section is out of view
            coreValuesItems.forEach(item => {
              item.classList.remove('scroll-active');
              if (isMobile) {
                item.classList.remove('animate');
                // Reset to initial state
                item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
              }
            });
          }
        });
      }, {
        threshold: threshold,
        rootMargin: rootMargin
      });

      coreValuesObserver.observe(coreValuesSection);
      
      // Also add individual item observers for better mobile performance
      if (isMobile) {
        coreValuesItems.forEach((item, index) => {
          const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  entry.target.classList.add('scroll-active', 'animate');
                  // Enhanced mobile effect
                  entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                  entry.target.style.transform = 'translateY(-8px) scale(1.05)';
                  entry.target.style.boxShadow = '0 12px 30px rgba(0,0,0,.15), 0 6px 18px rgba(200,16,46,.2)';
                  entry.target.style.opacity = '1';
                  console.log(`Individual Core Value item ${index + 1} activated with enhanced mobile effect`);
                }, index * 100); // Faster individual activation
              } else {
                entry.target.classList.remove('scroll-active', 'animate');
                // Reset to initial state
                entry.target.style.transform = 'translateY(30px) scale(0.95)';
                entry.target.style.boxShadow = '0 2px 8px rgba(0,0,0,.1)';
                entry.target.style.opacity = '0.6';
              }
            });
          }, {
            threshold: 0.3, // Lower threshold for easier activation
            rootMargin: '0px 0px -30px 0px'
          });
          
          itemObserver.observe(item);
          coreValuesItemObservers.push(itemObserver);
        });
      }
    }
  };
  
  // Initialize Core Values effect
  initCoreValuesEffect();
  
  // Reinitialize on window resize
  window.addEventListener('resize', () => {
    initCoreValuesEffect();
  });

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