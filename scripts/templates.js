function getFooter () {
    return `
    <p>&copy; 2024 Nick Lennon Drums. All rights reserved.</p>
    <p>Email: <a href="mailto:nicklennondrums@gmail.com">nicklennondrums@gmail.com</a></p>
    `
}

function getNavbar () {
    return `
    <nav class="navbar navbar-expand-lg navbar-light navbar-large fixed-top">
        <a class="navbar-brand" href="#home">Nick Lennon Drums</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#home">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#about">About</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Services
                    </a>
                    <div class="dropdown-menu remain-open" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item servicesDropdownItem" href="#services" onclick="showCarouselItem(0)">Performance</a>
                        <a class="dropdown-item servicesDropdownItem" href="#services" onclick="showCarouselItem(1)">Recording</a>
                        <a class="dropdown-item servicesDropdownItem" href="#services" onclick="showCarouselItem(2)">Transcription</a>
                        <a class="dropdown-item servicesDropdownItem" href="#services" onclick="showCarouselItem(3)">Tuition</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#contact">Contact</a>
                </li>
            </ul>
        </div>
    </nav>
    `
}

function loadPage () {
    var navbarContainer = document.getElementById('navbar-container');
    navbarContainer.innerHTML = getNavbar();

    var footerContainer = document.getElementById('footer-container');
    footerContainer.innerHTML = getFooter();
};

document.addEventListener('DOMContentLoaded', function() {
    loadPage();
});