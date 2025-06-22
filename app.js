// Basic JavaScript for Perth Chip Repairs Website

document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for anchor links (optional, if you have them within pages)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Ensure it's not just a hash for non-scrolling purposes
            if (hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                e.preventDefault();
                document.querySelector(hrefAttribute).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html'; // Default to index.html if path is '/'
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });


    // Contact Form Validation (Simple Example)
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(event) {
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const photoUpload = document.getElementById('photo-upload');

            // Basic validation: check if fields are empty
            if (!name.value.trim()) {
                alert('Please enter your full name.');
                name.focus();
                isValid = false;
            } else if (!email.value.trim() || !validateEmail(email.value.trim())) {
                alert('Please enter a valid email address.');
                email.focus();
                isValid = false;
            } else if (!message.value.trim()) {
                alert('Please describe the damage.');
                message.focus();
                isValid = false;
            }

            // Photo upload validation (example: check file count or size if needed)
            if (photoUpload && photoUpload.files.length > 0) {
                for (let i = 0; i < photoUpload.files.length; i++) {
                    const fileSize = photoUpload.files[i].size / 1024 / 1024; // in MB
                    if (fileSize > 5) {
                        alert(`File "${photoUpload.files[i].name}" is too large (max 5MB).`);
                        isValid = false;
                        break;
                    }
                }
            }
            // If you want to make photo upload mandatory:
            // else if (photoUpload && photoUpload.files.length === 0) {
            //     alert('Please upload at least one photo of the damage.');
            //     isValid = false;
            // }


            if (!isValid) {
                event.preventDefault(); // Prevent form submission if validation fails
            } else {
                // Optional: Add a message like "Submitting..." or disable the button
                // This form will submit via standard HTML POST.
                // For AJAX submission, more complex JS would be needed here.
                console.log('Form is valid and would be submitted.');
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // --- Placeholder for Homepage Carousel ---
    const carouselPlaceholder = document.querySelector('.carousel-placeholder');
    if (carouselPlaceholder) {
        let slideIndex = 0;
        const slides = [
            { type: "Stone Benchtop", before: "Chipped Edge", after: "Seamless Repair" },
            { type: "Tile Floor", before: "Cracked Tile", after: "Good as New" },
            { type: "Concrete Path", before: "Surface Damage", after: "Restored Finish" }
        ];

        function showSlides() {
            if (carouselPlaceholder && slides.length > 0) {
                const currentSlide = slides[slideIndex];
                carouselPlaceholder.innerHTML = `
                    <h3>${currentSlide.type}</h3>
                    <p><strong>Before:</strong> ${currentSlide.before}</p>
                    <p><strong>After:</strong> ${currentSlide.after}</p>
                    <p style="font-size:0.8em; color:#bdc3c7;"><em>Visuals coming soon!</em></p>
                `;
                slideIndex++;
                if (slideIndex >= slides.length) { slideIndex = 0; }
                // To auto-slide:
                // setTimeout(showSlides, 4000);
            }
        }
        if (slides.length > 0) {
            showSlides(); // Initial call
            // For now, it will just show the first slide text.
            // setInterval(showSlides, 4000); // Cycle through text slides
        }
    }


    // --- Basic Gallery Interaction ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                // For a real gallery, you'd use a lightbox.
                // This is a simple alert for now.
                alert('Displaying: ' + (this.alt || 'Gallery Image') + '\n(Full image/lightbox to be implemented)');
            });
        });
    }

    // --- Parameterized service selection on contact page ---
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam && document.getElementById('service-type')) {
        const serviceSelect = document.getElementById('service-type');
        const validServices = {
            'stone': 'stone_benchtop',
            'tile': 'tile_repair',
            'concrete': 'concrete_repair'
        };
        if (validServices[serviceParam]) {
            serviceSelect.value = validServices[serviceParam];
        }
    }

    // --- Mobile Navigation Toggle (Basic - if a toggle button with ID 'mobile-nav-toggle' exists) ---
    const mobileNavToggle = document.getElementById('mobile-nav-toggle'); // Assuming you add this ID to a button/icon in HTML
    const mainNav = document.querySelector('header nav ul');
    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function() {
            mainNav.classList.toggle('nav-active'); // You'll need CSS for .nav-active
        });
    }

    // --- Add a class to body if on mobile for fixed CTA or other mobile-specific styles ---
    // This is an alternative to the CSS fixed CTA commented out in style.css
    // It allows more JS control if needed.
    if (window.innerWidth <= 768) {
        document.body.classList.add('is-mobile');
        // Example: Create and append a fixed CTA if 'is-mobile'
        // const fixedCtaButton = document.createElement('a');
        // fixedCtaButton.href = 'contact.html';
        // fixedCtaButton.textContent = 'Get Quote';
        // fixedCtaButton.className = 'mobile-fixed-cta-button'; // Style this class in CSS
        // document.body.appendChild(fixedCtaButton);
    }

    console.log("Perth Chip Repairs JS Initialized.");
});
