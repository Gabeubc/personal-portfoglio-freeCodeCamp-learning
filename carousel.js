// Project Carousel Implementation
class ProjectCarousel {
    constructor() {
        this.carousel = document.querySelector('.projects-grid');
        this.projects = document.querySelectorAll('.project-tile');
        this.currentIndex = 0;
        this.projectWidth = 0;
        this.gap = 32; // 2rem = 32px
        
        this.init();
    }
    
    init() {
        if (!this.carousel || this.projects.length === 0) return;
        
        // Create navigation buttons
        this.createNavigationButtons();
        
        // Create pagination dots
        this.createPaginationDots();
        
        // Calculate project width
        this.updateDimensions();
        
        // Add event listeners
        this.addEventListeners();
        
        // Update on resize
        window.addEventListener('resize', () => this.updateDimensions());
    }
    
    createNavigationButtons() {
        const section = document.getElementById('projects');
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn carousel-btn-prev';
        prevBtn.setAttribute('aria-label', 'Previous project');
        prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        prevBtn.addEventListener('click', () => this.prev());
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn carousel-btn-next';
        nextBtn.setAttribute('aria-label', 'Next project');
        nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        nextBtn.addEventListener('click', () => this.next());
        
        // Wrap carousel in container
        const carouselWrapper = document.createElement('div');
        carouselWrapper.className = 'carousel-wrapper';
        this.carousel.parentNode.insertBefore(carouselWrapper, this.carousel);
        carouselWrapper.appendChild(this.carousel);
        carouselWrapper.appendChild(prevBtn);
        carouselWrapper.appendChild(nextBtn);
    }
    
    createPaginationDots() {
        const section = document.getElementById('projects');
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        dotsContainer.setAttribute('role', 'tablist');
        
        this.projects.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Go to project ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        section.appendChild(dotsContainer);
        this.dots = dotsContainer.querySelectorAll('.carousel-dot');
    }
    
    updateDimensions() {
        if (this.projects.length > 0) {
            this.projectWidth = this.projects[0].offsetWidth;
        }
    }
    
    addEventListeners() {
        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }
    
    next() {
        if (this.currentIndex < this.projects.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop back to start
        }
        this.updateCarousel();
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.projects.length - 1; // Loop to end
        }
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        const scrollAmount = this.currentIndex * (this.projectWidth + this.gap);
        this.carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        // Update dots
        if (this.dots) {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
        
        // Update button states
        this.updateButtonStates();
    }
    
    updateButtonStates() {
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        // Always enable buttons for infinite loop
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ProjectCarousel();
});
