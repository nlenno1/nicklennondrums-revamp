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
        var targetPosition = sectionTop - 60; // Adjust this value if needed

        // Smooth scroll to the target position
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function waitForTransitionEnd(element) {
    return new Promise((resolve) => {
        const handleTransitionEnd = () => {
            element.removeEventListener('transitionend', handleTransitionEnd);
            resolve();
        };
        element.addEventListener('transitionend', handleTransitionEnd);
    });
}

function showServicesDetail(serviceName) {
    switch (serviceName.toLowerCase()) {
        case 'performance':
            description = ` With over a decade of experience in live performance, I bring a dynamic and engaging presence to the stage. My expertise spans various genres, from rock and jazz to electronic and classical. I have performed at major venues and festivals, working with both established and emerging artists. My approach combines technical proficiency with an intuitive understanding of audience interaction, ensuring every performance is memorable and impactful.`;
            break;
        case 'recording':
            description = `My recording experience includes working in both professional studios and home setups. I specialize in capturing high-quality drum tracks and integrating them seamlessly into diverse musical projects. Proficient in industry-standard software and equipment, I focus on delivering clean, well-balanced recordings that meet the artistic vision of the project. My attention to detail and creative input help in achieving polished and professional results.`;
            break;
        case 'transcription':
            description = `As a skilled transcriber, I excel in converting complex musical performances into accurate, readable notations. I have extensive experience with various styles and genres, ensuring that each transcription is precise and reflects the nuances of the original performance. My work is characterized by thoroughness and a deep understanding of musical theory, making it easier for musicians to learn and reproduce the music.`;
            break;
        case 'tuition':
            description = `My tuition services are designed to help drummers of all levels enhance their skills and achieve their musical goals. I offer personalized lessons that cover technique, rhythm, and musicality, tailored to each student's needs. With a patient and supportive teaching style, I aim to build confidence and foster a love for drumming, guiding students through progressive learning paths that lead to measurable improvement.`;
            break;
        default:
            description = 'Service not found.';
            break;
    }

    document.querySelectorAll(".carousel-item img").forEach(carouselItem => {
        if (carouselItem.style.height != "260px") {
            carouselItem.style.height = "260px";
        }
    })

    scrollToSection('services');

    const element = document.querySelector('.service-detail-display');
    if (element) {
        element.innerHTML = `
            <div class="service-detail-text-display">
                <p>
                    ${description}
                </p>
            </div>
            <button class="close-center-button" onClick="hideServicesDetail()">&times;</button>
        `;
        element.style.opacity = "1";
    }
}

async function hideServicesDetail() {
    const servicesDetailDisplay = document.querySelector('.service-detail-display');
    servicesDetailDisplay.style.opacity = "0";
    scrollToSection('services');
    document.querySelectorAll(".carousel-item img").forEach(carouselItem => {
        carouselItem.style.height = "400px";
    })
    servicesDetailDisplay.innerHTML="";
    await waitForTransitionEnd(servicesDetailDisplay); 
}