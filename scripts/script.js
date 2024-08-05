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
    } catch (error) {
      console.error('Error loading content:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadPage();
});