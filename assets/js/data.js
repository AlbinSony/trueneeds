// =============== TRUE NEEDS - DATA FILE ===============
// This file contains all the data for projects, testimonials, services, etc.
// When integrating with backend, replace these objects with API calls

const websiteData = {
  // =============== PROJECTS DATA ===============
  projects: [
    {
      id: 1,
      title: "Two-Story House",
      category: "Residential Construction",
      date: "2024-01-15",
      description: "Construction of a two-story house with columns, foundations, floors, ceilings and other finishes.",
      image: "assets/img/projects-img-1.png",
      featured: true,
      gallery: []
    },
    {
      id: 2,
      title: "Stairs & Columns",
      category: "Maintenance & Repair",
      date: "2024-05-21",
      description: "Professional maintenance and repair of structural elements ensuring safety and longevity.",
      image: "assets/img/projects-img-2.png",
      featured: true,
      gallery: []
    },
    {
      id: 3,
      title: "Modern Kitchen",
      category: "Interior Design",
      date: "2024-07-03",
      description: "Complete kitchen renovation with modern design elements and functional space optimization.",
      image: "assets/img/projects-img-3.png",
      featured: true,
      gallery: []
    }
  ],

  // =============== PROJECT CATEGORIES ===============
  projectCategories: [
    {
      id: 1,
      title: "Singular Living",
      subtitle: "Safe, private, and self-contained micro apartments for single residents",
      image: "assets/img/projects-img-1.png",
      link: "#projects"
    },
    {
      id: 2,
      title: "Budget Residences",
      subtitle: "Budget apartments for families who aspire for a better living environment",
      image: "assets/img/projects-img-2.png",
      link: "#projects"
    },
    {
      id: 3,
      title: "Luxury Residences",
      subtitle: "Exotic Luxury Residences for achievers to upgrade to a charming lifestyle",
      image: "assets/img/projects-img-3.png",
      link: "#projects"
    },
    {
      id: 4,
      title: "Senior Living",
      subtitle: "Senior Residences for those who believe that retiring doesn't mean retiring from life",
      image: "assets/img/about-img-2.png",
      link: "#projects"
    }
  ],

  // =============== TESTIMONIALS DATA ===============
  testimonials: [
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "Homeowner",
      rating: 5,
      text: "True Needs delivered exceptional quality on our residential project. Their attention to sustainable practices and professional approach made our dream home a reality. Highly recommended!",
      image: "assets/img/testimonial-1.jpg"
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Business Owner",
      rating: 5,
      text: "Outstanding construction company! They completed our commercial complex on time and within budget. Their innovative solutions and quality craftsmanship exceeded our expectations.",
      image: "assets/img/testimonial-2.jpg"
    },
    {
      id: 3,
      name: "Dr. Arun Nair",
      position: "Property Developer",
      rating: 5,
      text: "True Needs transformed our heritage building while preserving its character. Their expertise in renovation and commitment to sustainability is truly commendable.",
      image: "assets/img/testimonial-3.jpg"
    },
    {
      id: 4,
      name: "Kavitha Menon",
      position: "Architect",
      rating: 5,
      text: "Working with True Needs was a fantastic experience. Their team's professionalism and expertise in green building construction helped us achieve our sustainability goals while staying within budget.",
      image: "assets/img/testimonial-4.jpg"
    },
    {
      id: 5,
      name: "Engineer Suresh",
      position: "Civil Engineer",
      rating: 5,
      text: "Excellent infrastructure development project! True Needs completed our bridge construction ahead of schedule with outstanding quality. Their engineering solutions are top-notch.",
      image: "assets/img/testimonial-5.jpg"
    },
    {
      id: 6,
      name: "Maya Joseph",
      position: "Office Manager",
      rating: 5,
      text: "True Needs handled our office renovation project beautifully. Their interior design team created a modern workspace that perfectly reflects our company culture. Highly satisfied with the results!",
      image: "assets/img/testimonial-6.jpg"
    }
  ],

  // =============== SERVICES DATA ===============
  services: [
    {
      id: 1,
      icon: "ri-leaf-line",
      title: "Green Building Construction",
      description: "Specializing in environmentally conscious construction practices with energy-efficient designs and sustainable building materials."
    },
    {
      id: 2,
      icon: "ri-building-line",
      title: "Residential Construction",
      description: "Crafting homes that blend comfort, functionality, and aesthetic appeal with customized designs to suit individual preferences."
    },
    {
      id: 3,
      icon: "ri-briefcase-4-line",
      title: "Commercial Projects",
      description: "Delivering innovative solutions for commercial spaces with tailored designs to enhance productivity and create distinctive environments."
    },
    {
      id: 4,
      icon: "ri-tools-line",
      title: "Renovation & Remodeling",
      description: "Transforming existing spaces with thoughtful renovations, upgrading structures to meet modern standards while preserving character."
    },
    {
      id: 5,
      icon: "ri-road-map-line",
      title: "Infrastructure Development",
      description: "Contributing to the development of essential public infrastructure. Expertise in the construction of roads, bridges, and utility installations."
    },
    {
      id: 6,
      icon: "ri-briefcase-line",
      title: "Project Management",
      description: "Providing end-to-end project management services. Ensuring timely completion, budget adherence, and quality control."
    },
    {
      id: 7,
      icon: "ri-lightbulb-line",
      title: "Consulting Services",
      description: "Offering expert consultancy on sustainable construction practices. Advising on eco-friendly building materials and energy-efficient designs."
    },
    {
      id: 8,
      icon: "ri-home-gear-line",
      title: "Interior Design and Fit-Outs",
      description: "Creating aesthetically pleasing and functional interior spaces. Tailored solutions to align with client preferences and brand identity."
    }
  ],

  // =============== CORE VALUES DATA ===============
  coreValues: [
    {
      id: 1,
      icon: "fa-solid fa-leaf",
      title: "SUSTAINABILITY",
      description: "We are unwavering in our commitment to environmentally responsible practices, integrating sustainable solutions into every project to minimize our ecological footprint."
    },
    {
      id: 2,
      icon: "fa-solid fa-handshake",
      title: "INTEGRITY",
      description: "Our foundation is built on honesty, transparency, and ethical conduct. We prioritize integrity in all our interactions, ensuring trust and respect with clients, partners, and stakeholders."
    },
    {
      id: 3,
      icon: "fa-solid fa-lightbulb",
      title: "INNOVATION",
      description: "Embracing forward-thinking and cutting-edge technologies, we strive to pioneer innovative solutions that redefine industry standards and push the boundaries of what is possible in construction."
    },
    {
      id: 4,
      icon: "fa-solid fa-award",
      title: "EXCELLENCE",
      description: "We relentlessly pursue excellence in craftsmanship and project execution. From concept to completion, we aim for the highest standards of quality and precision in every endeavor."
    },
    {
      id: 5,
      icon: "fa-solid fa-users",
      title: "CLIENT-CENTRIC APPROACH",
      description: "Our clients are at the heart of everything we do. We prioritize understanding their needs, delivering personalized solutions, and exceeding expectations to foster long-term relationships."
    },
    {
      id: 6,
      icon: "fa-solid fa-people-group",
      title: "TEAM COLLABORATION",
      description: "We foster a culture of collaboration and teamwork, recognizing that the collective expertise of our diverse team is key to overcoming challenges and achieving success."
    },
    {
      id: 7,
      icon: "fa-solid fa-heart",
      title: "COMMUNITY IMPACT",
      description: "Beyond construction, we actively contribute to the well-being of the communities we serve. We believe in giving back and creating a positive impact on society."
    }
  ],

  // =============== STATS DATA ===============
  stats: {
    uniqueFeatures: [
      {
        number: "01",
        text: "SUSTAINABLE<br>LIFECYCLE BUILDER"
      },
      {
        number: "90",
        text: "DELIVERED<br>90 PROJECTS"
      },
      {
        number: "120",
        text: "PROJECTS ACROSS KERALA<br>IN 10 CITIES"
      },
      {
        number: "8K+",
        text: "OVER 8000+ SATISFIED<br>CUSTOMERS GLOBALLY"
      }
    ],
    serviceHighlights: [
      {
        number: "01",
        text: "GREEN BUILDING CONSTRUCTION<br>Energy-efficient and sustainable materials"
      },
      {
        number: "02",
        text: "RESIDENTIAL CONSTRUCTION<br>Comfortable, functional and customized homes"
      },
      {
        number: "03",
        text: "COMMERCIAL PROJECTS<br>Productive and distinctive workspaces"
      },
      {
        number: "04",
        text: "RENOVATION & REMODELING<br>Thoughtful upgrades preserving character"
      }
    ]
  },

  // =============== GALLERY DATA (can be expanded) ===============
  gallery: [
    {
      id: 1,
      title: "Modern Architecture",
      category: "Residential",
      image: "assets/img/projects-img-1.png"
    },
    {
      id: 2,
      title: "Commercial Complex",
      category: "Commercial",
      image: "assets/img/projects-img-2.png"
    },
    {
      id: 3,
      title: "Interior Design",
      category: "Interior",
      image: "assets/img/projects-img-3.png"
    }
  ]
};

// =============== UTILITY FUNCTIONS ===============
const DataUtils = {
  // Get featured projects
  getFeaturedProjects(count = 3) {
    return websiteData.projects.filter(p => p.featured).slice(0, count);
  },

  // Get all projects
  getAllProjects() {
    return websiteData.projects;
  },

  // Get project by ID
  getProjectById(id) {
    return websiteData.projects.find(p => p.id === id);
  },

  // Get all testimonials
  getAllTestimonials() {
    return websiteData.testimonials;
  },

  // Get all services
  getAllServices() {
    return websiteData.services;
  },

  // Get all core values
  getAllCoreValues() {
    return websiteData.coreValues;
  },

  // Get stats
  getStats() {
    return websiteData.stats;
  },

  // Get project categories
  getProjectCategories() {
    return websiteData.projectCategories;
  },

  // Format date
  formatDate(dateString) {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { websiteData, DataUtils };
}
