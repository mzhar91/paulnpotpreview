// Add click event listener to the "Get Yours Now" button
document.querySelector('#hero button').addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
});


// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    content: "This product has completely transformed our workflow. The quality is exceptional and the customer service is top-notch. Highly recommended!",
    rating: 5,
    avatar: "https://placehold.co/60x60"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Entrepreneur",
    content: "I've tried many similar products, but this one stands out for its durability and thoughtful design. Worth every penny.",
    rating: 5,
    avatar: "https://placehold.co/60x60"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Designer",
    content: "The attention to detail is impressive. This product has exceeded my expectations in every way possible.",
    rating: 4,
    avatar: "https://placehold.co/60x60"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Operations Manager",
    content: "We've implemented this across our entire department and seen immediate improvements in efficiency. A game-changer for our business.",
    rating: 5,
    avatar: "https://placehold.co/60x60"
  }
];

let currentTestimonial = 0;
let testimonialInterval;

// Function to render testimonials
function renderTestimonials() {
  const container = document.getElementById('testimonials-container');
  const dotsContainer = document.getElementById('testimonial-dots');
  
  // Clear containers
  container.innerHTML = '';
  dotsContainer.innerHTML = '';
  
  // Render testimonials
  testimonials.forEach((testimonial, index) => {
    const testimonialElement = document.createElement('div');
    testimonialElement.className = `absolute top-0 left-0 w-full h-full transition-opacity duration-500 flex flex-col items-center text-center ${
      index === currentTestimonial ? "opacity-100" : "opacity-0 pointer-events-none"
    }`;
    
    // Create stars for rating
    let starsHtml = '';
    for (let i = 0; i < testimonial.rating; i++) {
      starsHtml += `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#e86928" stroke="#e86928" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      `;
    }
    
    testimonialElement.innerHTML = `
      <div class="flex items-center justify-center mb-4">
        ${starsHtml}
      </div>
      <p class="text-lg italic mb-6">"${testimonial.content}"</p>
      <div class="flex items-center mt-auto">
        <img
          src="${testimonial.avatar}"
          alt="${testimonial.name}"
          class="w-[60px] h-[60px] rounded-full mr-4"
        />
        <div class="text-left">
          <h4 class="font-semibold">${testimonial.name}</h4>
          <p class="text-sm text-muted-foreground">${testimonial.role}</p>
        </div>
      </div>
    `;
    
    container.appendChild(testimonialElement);
    
    // Create dot for this testimonial
    const dot = document.createElement('button');
    dot.className = `size-2.5 rounded-full transition-colors ${
      index === currentTestimonial ? "bg-tertiary-green" : "bg-muted-foreground/30"
    }`;
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dot.addEventListener('click', () => {
      setCurrentTestimonial(index);
    });
    
    dotsContainer.appendChild(dot);
  });
}

function setCurrentTestimonial(index) {
  currentTestimonial = index;
  renderTestimonials();
  resetInterval();
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial === testimonials.length - 1) ? 0 : currentTestimonial + 1;
  renderTestimonials();
  resetInterval();
}

function prevTestimonial() {
  currentTestimonial = (currentTestimonial === 0) ? testimonials.length - 1 : currentTestimonial - 1;
  renderTestimonials();
  resetInterval();
}

function resetInterval() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

document.getElementById('next-testimonial').addEventListener('click', nextTestimonial);
document.getElementById('prev-testimonial').addEventListener('click', prevTestimonial);

renderTestimonials();
resetInterval();