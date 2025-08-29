// Main JavaScript for 3D Printer Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initFormHandling();
    initAnimations();
    initModalHandling();
    initLanguageFeatures();
});

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav a');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;

        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .project-card, .industry-card, .contact-item').forEach(card => {
        observer.observe(card);
    });
}

// Form handling
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // Collect form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());

                // Here you would typically send the data to your backend
                // For now, we'll simulate a successful submission
                await simulateFormSubmission(data);

                // Show success modal
                showSuccessModal();

                // Reset form
                contactForm.reset();

            } catch (error) {
                console.error('Form submission error:', error);
                alert('There was an error sending your message. Please try again.');
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Simulate form submission (replace with actual backend call)
async function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('Network error'));
            }
        }, 2000);
    });
}

// Modal handling
function initModalHandling() {
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal function for buttons
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Make closeModal function globally available
window.closeModal = closeModal;

// Animations
function initAnimations() {
    // Add CSS animations to elements
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .industry-card');

    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-3d');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Language features
function initLanguageFeatures() {
    // Language change effects
    window.addEventListener('languageChanged', (e) => {
        const newLang = e.detail.language;

        // Add transition effect
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 200);

        // Update any language-specific features
        updateLanguageSpecificFeatures(newLang);
    });
}

function updateLanguageSpecificFeatures(lang) {
    // Add any language-specific functionality here
    // For example, different contact methods, date formats, etc.

    // Update social media links based on language preference
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        // You could modify links based on language here
        // For example, different Instagram accounts for different regions
    });
}

// Project order functionality
function initProjectOrdering() {
    const orderButtons = document.querySelectorAll('.order-btn');

    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const projectName = button.getAttribute('data-project');

            // Auto-fill project type in contact form
            const projectSelect = document.getElementById('projectType');
            if (projectSelect && projectName) {
                // Find matching option or set to "other"
                const options = projectSelect.options;
                let found = false;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].textContent.includes(projectName) ||
                        projectName.includes(options[i].textContent)) {
                        projectSelect.selectedIndex = i;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    projectSelect.value = 'other';
                }

                // Auto-fill project description
                const descriptionTextarea = document.getElementById('message');
                if (descriptionTextarea) {
                    const currentLang = window.languageManager?.getCurrentLanguage() || 'en';
                    let message = '';

                    if (currentLang === 'fr') {
                        message = `Je suis intéressé par le projet: ${projectName}. Pourriez-vous me fournir plus d'informations et un devis?`;
                    } else if (currentLang === 'ar') {
                        message = `أنا مهتم بالمشروع: ${projectName}. هل يمكنكم تقديم المزيد من المعلومات وعرض سعر؟`;
                    } else {
                        message = `I am interested in the project: ${projectName}. Could you please provide more information and a quote?`;
                    }

                    descriptionTextarea.value = message;
                }

                // Scroll to contact form
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const offsetTop = contactSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Industry card click handling
function initIndustryCards() {
    const industryCards = document.querySelectorAll('.industry-card');

    industryCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add click effect
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

// Performance optimization
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounce scroll events
    let scrollTimeout;
    const debouncedScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based features
            updateScrollProgress();
        }, 16);
    };

    window.addEventListener('scroll', debouncedScroll);
}

function updateScrollProgress() {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    // You could add a scroll progress bar here
    // const progressBar = document.querySelector('.scroll-progress');
    // if (progressBar) {
    //     progressBar.style.width = scrolled + '%';
    // }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initProjectOrdering();
    initIndustryCards();
    initPerformanceOptimizations();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initScrollEffects,
        initFormHandling,
        showSuccessModal,
        closeModal
    };
}