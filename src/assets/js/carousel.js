// Función genérica para inicializar carruseles
function initCarousel(selector, itemSelector, gap) {
  const carousel = document.querySelector(selector);
  if (!carousel) return;
  
  let container;
  if (selector === '.testimonials-carousel-wrapper') {
    container = carousel.querySelector('.testimonials-items');
  } else if (itemSelector === '.testimonial-pair') {
    container = carousel.querySelector('.testimonials-grid');
  } else {
    container = carousel.querySelector('.faq-list');
  }
  
  const prevBtn = carousel.querySelector(selector === '.testimonials-carousel-wrapper' ? '.testimonials-carousel-btn--prev' : '.carousel-btn--prev');
  const nextBtn = carousel.querySelector(selector === '.testimonials-carousel-wrapper' ? '.testimonials-carousel-btn--next' : '.carousel-btn--next');
  const items = carousel.querySelectorAll(itemSelector);
  
  if (!container || !prevBtn || !nextBtn || items.length === 0) return;
  
  let currentIndex = 0;
  
  function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === items.length - 1;
  }
  
  function scrollToIndex(index) {
    if (index < 0 || index >= items.length) return;
    
    currentIndex = index;
    const item = items[index];
    const itemWidth = item.offsetWidth;
    const scrollPosition = index * (itemWidth + gap);
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    updateButtons();
  }
  
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  });
  
  // Actualizar botones cuando se hace scroll manualmente
  container.addEventListener('scroll', () => {
    const scrollLeft = container.scrollLeft;
    const itemWidth = items[0].offsetWidth;
    const newIndex = Math.round(scrollLeft / (itemWidth + gap));
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < items.length) {
      currentIndex = newIndex;
      updateButtons();
    }
  });
  
  // Inicializar botones
  updateButtons();
  
  // Recalcular en resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      scrollToIndex(currentIndex);
    }, 250);
  });
}

// Inicializar carruseles cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Carrusel de testimonios (nuevo bloque)
  initCarousel('.testimonials-carousel-wrapper', '.testimonial-pair', 20);
  
  // Carrusel de FAQ
  initCarousel('.faq-carousel', '.faq-item', 12);
});
