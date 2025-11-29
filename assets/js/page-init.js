// ===============================================
// TRUE NEEDS - PAGE INITIALIZATION SCRIPTS
// ===============================================
// This file contains page-specific initialization
// logic that was previously inline in HTML files.
// ===============================================

// =============== HOMEPAGE PROJECTS LOADER ===============
function initializeHomepageProjects() {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const featuredProjects = await fetchFeaturedProjects(3);
      
      if (featuredProjects && featuredProjects.length > 0) {
        console.log(`Loaded ${featuredProjects.length} featured projects from Sanity`);
        updateHomepageProjects(featuredProjects);
      }
    } catch (error) {
      console.log('Using static projects on homepage');
    }
  });
}

function updateHomepageProjects(projects) {
  const projectCards = document.querySelectorAll('.projects__card');
  
  projects.forEach((project, index) => {
    if (projectCards[index]) {
      const card = projectCards[index];
      const img = card.querySelector('.projects__img');
      const category = card.querySelector('.projects__data span');
      const title = card.querySelector('.projects__title');
      const date = card.querySelector('.projects__date');
      const description = card.querySelector('.projects__data p');
      
      if (img && project.image?.asset?.url) {
        img.src = project.image.asset.url;
        img.alt = project.title;
      }
      
      if (category) category.textContent = project.category || 'Construction';
      if (title) title.textContent = project.title;
      if (date) date.textContent = formatProjectDate(project.date);
      if (description) description.textContent = project.description || 'Professional construction project completed with high quality standards.';
    }
  });
}

function formatProjectDate(dateString) {
  if (!dateString) return 'Recent';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// =============== TESTIMONIALS SWIPER INITIALIZATION ===============
function initializeTestimonialsSwiper() {
  // Initialize testimonials swiper with smooth flow
  const testimonialsSwiper = new Swiper('.testimonials__container', {
    effect: 'slide',
    loop: true,
    spaceBetween: 24,
    grabCursor: true,
    centeredSlides: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 600,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
    // Smooth transitions
    on: {
      init: function() {
        // Add smooth initialization
        this.el.style.opacity = '1';
      },
    }
  });

  // Enhanced pause/resume on hover
  const testimonialContainer = document.querySelector('.testimonials__container');
  if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => {
      testimonialsSwiper.autoplay.stop();
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
      testimonialsSwiper.autoplay.start();
    });
  }

  return testimonialsSwiper;
}

// =============== AUTO-INITIALIZE ON PAGE LOAD ===============
document.addEventListener('DOMContentLoaded', () => {
  // Check which page we're on
  const path = window.location.pathname;
  
  if (path.includes('index.html') || path.endsWith('/') || path === '') {
    // Initialize homepage-specific features
    initializeHomepageProjects();
    
    // Wait for Swiper library to be ready, then initialize testimonials
    if (typeof Swiper !== 'undefined') {
      initializeTestimonialsSwiper();
    } else {
      // If Swiper hasn't loaded yet, wait for window load
      window.addEventListener('load', initializeTestimonialsSwiper);
    }
  }
});
