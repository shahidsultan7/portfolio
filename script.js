document.addEventListener('DOMContentLoaded', () => {
    // --- Dynamic Header Logic ---
    const mainHeader = document.getElementById('mainHeader');
    const headerTitle = mainHeader.querySelector('a.text-3xl');

    function handleHeaderScroll() {
        const scrollPosition = window.scrollY;
        const grayTextColor = getComputedStyle(document.documentElement).getPropertyValue('--gray-text').trim();

        if (scrollPosition > 50) {
            mainHeader.classList.add('scrolled-header');
            if (headerTitle) {
                headerTitle.style.color = grayTextColor; 
            }
        } else {
            mainHeader.classList.remove('scrolled-header');
            if (headerTitle) {
                headerTitle.style.color = 'white';
            }
        }
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Update Current Year in Footer ---
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // --- Active Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLinkOnScroll() {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - window.innerHeight / 3) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    // --- Back to Top Button Functionality ---
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑'; 
    backToTopButton.classList.add('back-to-top', 'fixed', 'bottom-6', 'right-6', 'bg-primary-blue', 'text-white', 'p-3', 'rounded-full', 'shadow-md', 'transition-opacity', 'duration-300', 'z-50', 'cursor-pointer');
    backToTopButton.style.opacity = '0';
    backToTopButton.style.pointerEvents = 'none';
    document.body.appendChild(backToTopButton);

    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.pointerEvents = 'auto';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.pointerEvents = 'none';
        }
    }

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Card Animation on Scroll ---
    const cards = document.querySelectorAll('.card');

    function animateCards() {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top; 
            const windowHeight = window.innerHeight;

            if (cardTop < windowHeight * 0.85) {
                card.classList.add('animate-in');
            }
        });
    }

    // --- Consolidated Scroll Event Listener ---
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        highlightNavLinkOnScroll();
        toggleBackToTopButton();
        animateCards();
    });

    // --- Initial Calls on Page Load ---
    handleHeaderScroll();
    highlightNavLinkOnScroll();
    toggleBackToTopButton();
    animateCards();
});
