// =============== TRUE NEEDS - RENDER FUNCTIONS ===============
// This file handles rendering data into HTML elements
// Separates presentation logic from data

const Renderer = {
  // =============== RENDER PROJECTS ===============
  renderProjects(projects, containerId = 'projects-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = projects.map(project => `
      <article class="projects__card">
        <img
          src="${project.image}"
          alt="${project.title}"
          class="projects__img" />

        <div class="projects__data">
          <span>${project.category}</span>
          <h2 class="projects__title">${project.title}</h2>
          <span class="projects__date">${DataUtils.formatDate(project.date)}</span>
          <p>${project.description}</p>
        </div>
      </article>
    `).join('');
  },

  // =============== RENDER PROJECT CATEGORIES ===============
  renderProjectCategories(categories, containerId = 'categories-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = categories.map(category => `
      <article class="categories__card">
        <div class="categories__image">
          <img src="${category.image}" alt="${category.title}" class="categories__img">
          <div class="categories__overlay">
            <h3 class="categories__title">${category.title}</h3>
            <p class="categories__subtitle">${category.subtitle}</p>
            <a href="${category.link}" class="categories__button">View Projects</a>
          </div>
        </div>
      </article>
    `).join('');
  },

  // =============== RENDER TESTIMONIALS ===============
  renderTestimonials(testimonials, containerId = 'testimonials-wrapper') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const stars = '<i class="ri-star-fill"></i>'.repeat(5);

    container.innerHTML = testimonials.map(testimonial => `
      <article class="testimonial__card swiper-slide">
        <div class="testimonial__content">
          <div class="testimonial__stars">
            ${stars}
          </div>
          
          <p class="testimonial__text">
            "${testimonial.text}"
          </p>
          
          <div class="testimonial__author">
            <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial__img">
            <div class="testimonial__info">
              <h3 class="testimonial__name">${testimonial.name}</h3>
              <span class="testimonial__position">${testimonial.position}</span>
            </div>
          </div>
        </div>
      </article>
    `).join('');
  },

  // =============== RENDER SERVICES ===============
  renderServices(services, containerId = 'services-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = services.map((service, index) => `
      <article class="services__card hover-raise tilt shine">
        <div class="services__card-image">
          <img src="${service.image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop'}" alt="${service.title}">
        </div>
        <div class="services__card-content">
          <div class="services__icon"><i class="${service.icon}"></i></div>
          <h3 class="services__title">${service.title}</h3>
          <p>${service.description}</p>
        </div>
      </article>
    `).join('');
  },

  // =============== RENDER CORE VALUES ===============
  renderCoreValues(values, containerId = 'core-values-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = values.map((value, index) => `
      <div class="responsible__stat-item" data-value="${value.title.toLowerCase().replace(/\s+/g, '-')}">
        <span class="responsible__stat-number"><i class="${value.icon}"></i></span>
        <p class="responsible__stat-text">${value.title}</p>
        <div class="core-value-detail" style="display:none">
          ${value.description}
        </div>
      </div>
    `).join('');
  },

  // =============== RENDER STATS ===============
  renderStats(stats, containerId, type = 'unique') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = type === 'unique' ? stats.uniqueFeatures : stats.serviceHighlights;

    container.innerHTML = data.map(stat => `
      <div class="responsible__stat-item hover-raise">
        <span class="responsible__stat-number">${stat.number}</span>
        <p class="responsible__stat-text">${stat.text}</p>
      </div>
    `).join('');
  },

  // =============== RENDER GALLERY ===============
  renderGallery(images, containerId = 'gallery-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = images.map(image => `
      <div class="gallery__item">
        <img src="${image.image}" alt="${image.title}" class="gallery__img">
        <div class="gallery__overlay">
          <h3 class="gallery__title">${image.title}</h3>
          <p class="gallery__category">${image.category}</p>
        </div>
      </div>
    `).join('');
  },

  // =============== INITIALIZE ALL ===============
  initializeHomePage() {
    // Render featured projects
    const featuredProjects = DataUtils.getFeaturedProjects(3);
    this.renderProjects(featuredProjects, 'projects-container');

    // Render project categories
    const categories = DataUtils.getProjectCategories();
    this.renderProjectCategories(categories, 'categories-container');

    // Render testimonials
    const testimonials = DataUtils.getAllTestimonials();
    this.renderTestimonials(testimonials, 'testimonials-wrapper');

    // Render services
    const services = DataUtils.getAllServices();
    this.renderServices(services, 'services-grid');

    // Render core values
    const coreValues = DataUtils.getAllCoreValues();
    this.renderCoreValues(coreValues, 'core-values-grid');

    // Render stats
    const stats = DataUtils.getStats();
    this.renderStats(stats, 'unique-stats', 'unique');
    this.renderStats(stats, 'service-stats', 'service');
  },

  initializeProjectsPage() {
    // Render all projects
    const allProjects = DataUtils.getAllProjects();
    this.renderProjects(allProjects, 'all-projects-container');
  },

  initializeGalleryPage() {
    // Render gallery images
    const gallery = websiteData.gallery;
    this.renderGallery(gallery, 'gallery-grid');
  }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check which page we're on and initialize accordingly
  const path = window.location.pathname;
  
  if (path.includes('projects.html')) {
    Renderer.initializeProjectsPage();
  } else if (path.includes('gallery.html')) {
    Renderer.initializeGalleryPage();
  } else {
    // Assume index.html
    Renderer.initializeHomePage();
  }
});
