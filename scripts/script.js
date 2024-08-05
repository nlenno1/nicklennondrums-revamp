function showCarouselItem(index) {
    scrollToSection('services');
    var carousel = document.getElementById('servicesCarousel');
    var bootstrapCarousel = bootstrap.Carousel.getInstance(carousel); // Get the instance
    if (!bootstrapCarousel) {
        bootstrapCarousel = new bootstrap.Carousel(carousel); // Create a new instance if not already created
        console.log('carousel instance created');
    }
    bootstrapCarousel.to(index);
}

/**
 * Scrolls the page to 100 pixels below the top of a section with the given id.
 * @param {string} sectionId - The id of the section to scroll to.
 */
function scrollToSection(sectionId) {
    // Get the section element by its id
    var section = document.getElementById(sectionId);
    // Check if the section exists and is different from the current section
    if (section) {
        // Get the position of the section
        var sectionTop = section.getBoundingClientRect().top + window.scrollY;
        
        // Calculate the target position (100 pixels below the section)
        var targetPosition = sectionTop - 66; // Adjust this value if needed

        // Smooth scroll to the target position
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function addNavbarResizeOnScroll() {
    // Shrink the navbar on scroll
    window.onscroll = function() {
        var navbar = document.querySelector('.navbar');
        if (document.documentElement.scrollTop > 50) {
            navbar.classList.remove('navbar-large');
            navbar.classList.add('navbar-small');
        } else {
            navbar.classList.remove('navbar-small');
            navbar.classList.add('navbar-large');
        }
    };
}

function addNavbarFunctionality () {
    // Attach event listeners to navbar links
    document.querySelectorAll('.nav-link:not(.dropdown-toggle), .navbar-brand, .dropdown-item').forEach(anchor => {
        const navToggleButton = document.getElementsByClassName('navbar-toggler');
        const menuToggleable = document.getElementById('navbarNav');
        const menuCollapse = new bootstrap.Collapse(menuToggleable, {toggle:false})
    
        anchor.addEventListener('click', function(e) {
            // Prevent default link behavior
            e.preventDefault();
    
            // Extract the target section id from the href attribute
            var sectionId = this.getAttribute('href').substring(1);

            if (sectionId == 'services') {
                hideServicesDetail();
            }
    
            if (menuToggleable.classList.contains('show')) {
                menuCollapse.toggle() 
            }
    
            // Call the function to scroll to the section 100px below
            scrollToSection(sectionId);
        });
    });
    
    document.querySelectorAll('.servicesDropdownItem').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault()
        })
    })
}

function contactFormFunctionality () {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        let hasError = false;
        let hasInvalidCharacters = false;
        const errorMessages = [];

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation checks
        if (!name) {
            hasError = true;
            errorMessages.push("Name is required.");
        } else if (!isSafeInput(name)) {
            hasError = true;
            errorMessages.push("Invalid characters in name.");
            hasInvalidCharacters = true;
        }

        if (!email) {
            hasError = true;
            errorMessages.push("Email is required.");
        } else if (!validateEmail(email)) {
            hasError = true;
            errorMessages.push("Invalid email address.");
            hasInvalidCharacters = true;
        }

        if (!message) {
            hasError = true;
            errorMessages.push("Message is required.");
        } else if (!isSafeInput(message)) {
            hasError = true;
            errorMessages.push("Invalid characters in message.");
            hasInvalidCharacters = true;
        }
        if (hasInvalidCharacters) {
            errorMessages.push('Please do not use any of the following symbols: /[<>{}[\]()$%^&*]/')
        }

        if (hasError) {
            showErrorModal(errorMessages);
        } else {
            // Proceed with form submission
            // contactForm.submit(); // Uncomment this line to enable form submission
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function isSafeInput(input) {
        const unsafePattern = /[<>{}[\]()$%^&*]/; // Add more characters or patterns as needed
        return !unsafePattern.test(input);
    }

    function showErrorModal(messages) {
        const errorModalBody = document.querySelector('#errorModal .modal-body');
        errorModalBody.innerHTML = messages.join("<br>");
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
    }
}

async function loadHTML(url, elementId) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const html = await response.text();
      if (html == "") {console.error(`Failed to load content for ${elementId}`)}
      document.getElementById(elementId).innerHTML = html;
    } catch (error) {
      console.error('Failed to load HTML:', error);
    }
}

async function loadPage() {
    const baseUrl = `${window.location.origin}${window.location.pathname.split('/').slice(0, -1).join('/')}`;
    const navbarUrl = `${baseUrl}/templates/navbar.html`;
    const footerUrl = `${baseUrl}/templates/footer.html`;
    try {
      await Promise.all([
        loadHTML(navbarUrl, 'navbar-container'),
        loadHTML(footerUrl, 'footer-container')
      ]);
      addNavbarFunctionality();
      addNavbarResizeOnScroll();
      contactFormFunctionality();
    } catch (error) {
      console.error('Error loading content:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadPage();
});