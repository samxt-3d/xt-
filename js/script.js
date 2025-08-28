// Form handling and modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('orderModal');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Order button event listeners
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectName = this.getAttribute('data-project');
            // Pre-select the project in the form
            const projectSelect = document.getElementById('project');
            if (projectSelect) {
                projectSelect.value = projectName;
            }
            // Scroll to contact form
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const orderData = {
                name: formData.get('name'),
                email: formData.get('email'),
                project: formData.get('project'),
                description: formData.get('description'),
                image: formData.get('image')
            };

            // Validate required fields
            if (!orderData.name || !orderData.email || !orderData.description) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }

            // Create email content
            const subject = `Nouvelle commande 3D - ${orderData.name}`;
            const body = `
Nouvelle commande reçue de XT 3D Projects

Informations du client :
Nom : ${orderData.name}
Email : ${orderData.email}
Type de projet : ${orderData.project}

Description du projet :
${orderData.description}

Cordialement,
XT 3D Projects
            `.trim();

            // Create mailto link
            const mailtoLink = `mailto:samxt37@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success modal
            showModal();

            // Reset form
            this.reset();

            console.log('Commande soumise:', orderData);
        });
    }

    // Modal functions
    function showModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add scroll effect to header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
    });

    // Image upload preview
    const imageInput = document.getElementById('image');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validate file type
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                if (!validTypes.includes(file.type)) {
                    alert('Veuillez sélectionner un fichier image valide (JPEG, PNG, GIF).');
                    this.value = '';
                    return;
                }

                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('La taille du fichier doit être inférieure à 5 Mo.');
                    this.value = '';
                    return;
                }

                console.log('Image selected:', file.name);
            }
        });
    }

    // Add loading animation to project cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

    // Form validation feedback
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');

        if (isRequired && !value) {
            field.classList.add('error');
            field.classList.remove('success');
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                field.classList.remove('success');
            } else {
                field.classList.remove('error');
                field.classList.add('success');
            }
        } else if (value) {
            field.classList.remove('error');
            field.classList.add('success');
        }
    }

    // Add CSS for form validation states
    const style = document.createElement('style');
    style.textContent = `
        .contact-form input.error,
        .contact-form textarea.error,
        .contact-form select.error {
            border-color: #e53e3e;
            background-color: #fed7d7;
        }

        .contact-form input.success,
        .contact-form textarea.success,
        .contact-form select.success {
            border-color: #38a169;
            background-color: #c6f6d5;
        }

        .contact-form input:focus,
        .contact-form textarea:focus,
        .contact-form select:focus {
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
    `;
    document.head.appendChild(style);
});

// Utility function to close modal (accessible from HTML)
function closeModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'none';
    }
}