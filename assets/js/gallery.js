/*=============== GALLERY PAGE FUNCTIONALITY ===============*/

/*=============== FEATURED SLIDER ===============*/
const sliderMain = document.querySelector('.slider-main');
const slides = document.querySelectorAll('.slider-main__image');
const thumbnails = document.querySelectorAll('.slider-thumbnail');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
const sliderOverlay = document.querySelector('.slider-main__overlay');

let currentSlide = 0;
const totalSlides = slides.length;

// Slider data for overlay content
const sliderData = [
  {
    category: 'Residential',
    title: 'Modern Eco-Friendly Villa',
    description: 'A stunning residential project featuring sustainable design principles, energy-efficient systems, and contemporary architecture.'
  },
  {
    category: 'Commercial',
    title: 'Corporate Office Complex',
    description: 'State-of-the-art office building with advanced infrastructure, green technology, and modern workspace design.'
  },
  {
    category: 'Renovation',
    title: 'Heritage Building Restoration',
    description: 'Careful restoration of historical architecture while incorporating modern amenities and sustainable upgrades.'
  },
  {
    category: 'Residential',
    title: 'Sustainable Garden House',
    description: 'Nature-integrated residential design with rainwater harvesting, solar panels, and organic landscaping.'
  },
  {
    category: 'Infrastructure',
    title: 'Community Development Project',
    description: 'Large-scale infrastructure project enhancing public spaces with eco-friendly materials and smart design.'
  }
];

// Update slider overlay content
function updateSliderContent(index) {
  if (sliderOverlay) {
    const data = sliderData[index];
    sliderOverlay.innerHTML = `
      <span class="slider-main__category">${data.category}</span>
      <h3 class="slider-main__title">${data.title}</h3>
      <p class="slider-main__description">${data.description}</p>
    `;
  }
}

// Show specific slide
function showSlide(index) {
  // Remove active class from all slides and thumbnails
  slides.forEach(slide => slide.classList.remove('active'));
  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  
  // Add active class to current slide and thumbnail
  slides[index].classList.add('active');
  thumbnails[index].classList.add('active');
  
  // Update overlay content
  updateSliderContent(index);
  
  currentSlide = index;
}

// Next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Event listeners for navigation buttons
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
}

// Event listeners for thumbnails
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => showSlide(index));
});

// Auto-play slider (optional - uncomment to enable)
// let autoplayInterval = setInterval(nextSlide, 5000);

// Pause autoplay on hover (if autoplay is enabled)
// if (sliderMain) {
//   sliderMain.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
//   sliderMain.addEventListener('mouseleave', () => {
//     autoplayInterval = setInterval(nextSlide, 5000);
//   });
// }

/*=============== PHOTO GALLERY FILTER ===============*/
const filterButtons = document.querySelectorAll('.filter-btn');
const photoCards = document.querySelectorAll('.photo-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Get filter value
    const filterValue = button.getAttribute('data-filter');
    
    // Filter photo cards with animation
    photoCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

/*=============== LIGHTBOX FUNCTIONALITY ===============*/
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxPrev = document.querySelector('.lightbox__prev');
const lightboxNext = document.querySelector('.lightbox__next');
const zoomIcons = document.querySelectorAll('.photo-card__zoom');

let currentLightboxIndex = 0;
let visiblePhotos = [];

// Update visible photos array
function updateVisiblePhotos() {
  visiblePhotos = Array.from(photoCards).filter(card => {
    return card.style.display !== 'none' && 
           window.getComputedStyle(card).display !== 'none';
  });
}

// Open lightbox
function openLightbox(index) {
  updateVisiblePhotos();
  currentLightboxIndex = index;
  const photoCard = visiblePhotos[index];
  const img = photoCard.querySelector('.photo-card__image');
  
  if (img && lightbox && lightboxImg) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
}

// Close lightbox
function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

// Navigate lightbox
function navigateLightbox(direction) {
  updateVisiblePhotos();
  
  if (direction === 'next') {
    currentLightboxIndex = (currentLightboxIndex + 1) % visiblePhotos.length;
  } else {
    currentLightboxIndex = (currentLightboxIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
  }
  
  const photoCard = visiblePhotos[currentLightboxIndex];
  const img = photoCard.querySelector('.photo-card__image');
  
  if (img && lightboxImg) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }
}

// Event listeners for lightbox
zoomIcons.forEach((icon, index) => {
  icon.addEventListener('click', (e) => {
    e.stopPropagation();
    // Find the index in visible photos
    const card = icon.closest('.photo-card');
    updateVisiblePhotos();
    const visibleIndex = visiblePhotos.indexOf(card);
    if (visibleIndex !== -1) {
      openLightbox(visibleIndex);
    }
  });
});

// Also allow clicking on the entire photo card to open lightbox
photoCards.forEach(card => {
  card.addEventListener('click', () => {
    updateVisiblePhotos();
    const visibleIndex = visiblePhotos.indexOf(card);
    if (visibleIndex !== -1) {
      openLightbox(visibleIndex);
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', () => navigateLightbox('next'));
}

// Close lightbox on background click
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (lightbox && lightbox.classList.contains('active')) {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      navigateLightbox('next');
    } else if (e.key === 'ArrowLeft') {
      navigateLightbox('prev');
    }
  }
});

/*=============== VIDEO PLAY FUNCTIONALITY ===============*/
const videoPlayBtns = document.querySelectorAll('.video-card__play-btn');

videoPlayBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    // In a real implementation, you would open a modal with embedded video
    // For now, we'll just show an alert
    const videoCard = btn.closest('.video-card');
    const videoTitle = videoCard.querySelector('.video-card__title').textContent;
    
    console.log('Playing video:', videoTitle);
    alert(`Video player would open here for: ${videoTitle}\n\nIn production, this would open a modal with the embedded video.`);
    
    // Example implementation with modal:
    // const videoUrl = videoCard.getAttribute('data-video-url');
    // openVideoModal(videoUrl);
  });
});

/*=============== LOAD MORE FUNCTIONALITY ===============*/
const loadMoreBtn = document.querySelector('.load-more-btn');

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    // In a real implementation, you would load more photos from the server
    // For now, we'll just show an alert
    alert('Load more functionality would fetch additional images from the server.\n\nThis feature will be implemented when connected to the backend.');
    
    // Example implementation:
    // loadMorePhotos().then(photos => {
    //   appendPhotosToGallery(photos);
    // });
  });
}

/*=============== SCROLL REVEAL ANIMATIONS ===============*/
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 2000,
    delay: 300,
    reset: false
  });

  // Gallery hero animations
  sr.reveal('.gallery-hero__content', { origin: 'top' });
  sr.reveal('.gallery-hero__stat', { interval: 100 });

  // Featured slider
  sr.reveal('.featured-slider__header', { origin: 'left' });
  sr.reveal('.slider-wrapper', { delay: 400 });

  // Video gallery
  sr.reveal('.video-gallery__header', { origin: 'left' });
  sr.reveal('.video-card', { interval: 100 });

  // Photo gallery
  sr.reveal('.photo-gallery__header', { origin: 'left' });
  sr.reveal('.gallery-filters', { delay: 300 });
  sr.reveal('.photo-card', { interval: 50 });
  sr.reveal('.gallery-load-more', { delay: 500 });
}

/*=============== INITIALIZE ===============*/
// Initialize slider with first slide
if (slides.length > 0) {
  showSlide(0);
}

// Ensure all photo cards are visible initially
photoCards.forEach(card => {
  card.style.display = 'block';
  card.style.opacity = '1';
  card.style.transform = 'scale(1)';
  card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

console.log('Gallery page initialized successfully!');
