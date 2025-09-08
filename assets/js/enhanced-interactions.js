// Add the missing navigation items and back link
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the projects page and add missing elements
  const navList = document.querySelector('.nav__list');
  const projectsHero = document.querySelector('.projects-hero__header');
  
  // Add navigation items if missing
  if (navList && navList.children.length === 0) {
    navList.innerHTML = `
      <li><a href="index.html#home" class="nav__link">Home</a></li>
      <li><a href="index.html#about" class="nav__link">About</a></li>
      <li><a href="index.html#services" class="nav__link">Services</a></li>
      <li><a href="#projects" class="nav__link">Projects</a></li>
      <li><a href="index.html#contact" class="nav__link button">Contact</a></li>
    `;
  }
  
  // Add back link if missing
  if (projectsHero && !projectsHero.querySelector('.projects__back-link')) {
    const backLink = document.createElement('a');
    backLink.href = 'index.html';
    backLink.className = 'projects__back-link';
    backLink.innerHTML = '<i class="ri-arrow-left-line"></i> Back to Home';
    projectsHero.insertBefore(backLink, projectsHero.firstChild);
  }
  
  // Add close button to nav menu if missing
  const navMenu = document.getElementById('nav-menu');
  if (navMenu && !navMenu.querySelector('.nav__close')) {
    const closeBtn = document.createElement('div');
    closeBtn.className = 'nav__close';
    closeBtn.id = 'nav-close';
    closeBtn.innerHTML = '<i class="ri-close-large-line"></i>';
    navMenu.appendChild(closeBtn);
  }
  
  // Add footer content if missing
  const footer = document.querySelector('.footer');
  if (footer) {
    const footerLogo = footer.querySelector('.footer__logo');
    if (footerLogo && !footerLogo.innerHTML.trim()) {
      footerLogo.innerHTML = '<i class="ri-building-3-line"></i><span>True Needs</span>';
    }
    
    const footerDesc = footer.querySelector('.footer__description');
    if (footerDesc && !footerDesc.textContent.trim()) {
      footerDesc.textContent = 'Where construction meets conscientious craftsmanship.';
    }
    
    const footerEmail = footer.querySelector('.footer__email');
    if (footerEmail && !footerEmail.textContent.trim()) {
      footerEmail.textContent = 'Email : trueneedssustainabledevelopers@gmail.com';
    }
  }
  
  // Enhanced animation setup
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);
  
  // Observe all animatable elements
  document.querySelectorAll('.animate-on-scroll, .projects__card, .services__card').forEach(el => {
    observer.observe(el);
  });
  
  // Add smooth scroll enhancement
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Parallax effect for hero images
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const homeImages = document.querySelector('.home__images');
  if (homeImages) {
    const rate = scrolled * -0.5;
    homeImages.style.transform = `translateY(${rate}px)`;
  }
});

// Dynamic navbar background on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  const scrolled = window.pageYOffset;
  
  if (scrolled > 50) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.backdropFilter = 'blur(20px)';
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.backdropFilter = 'blur(20px)';
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
  }
});

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
  if (e.target.matches('.button, .button__link, .media-btn')) {
    const button = e.target;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);