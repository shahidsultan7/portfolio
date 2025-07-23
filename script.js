document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileSideMenu = document.getElementById('mobileSideMenu');
    
    // Create an overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('fixed', 'inset-0', 'bg-black', 'z-40', 'transition-opacity', 'duration-300', 'ease-in-out');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    document.body.appendChild(overlay);

    // Function to open the mobile menu
    function openMobileMenu() {
        if (mobileSideMenu) {
            mobileSideMenu.classList.remove('-translate-x-full');
            mobileSideMenu.classList.add('translate-x-0');
            mobileMenuButton.classList.add('is-open'); // For icon animation
            overlay.style.opacity = '0.5';
            overlay.style.pointerEvents = 'auto';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }

    // Function to close the mobile menu
    function closeMobileMenu() {
        if (mobileSideMenu) {
            mobileSideMenu.classList.remove('translate-x-0');
            mobileSideMenu.classList.add('-translate-x-full');
            mobileMenuButton.classList.remove('is-open'); // For icon animation
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    // Event listener for the main hamburger button to toggle the menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            if (mobileMenuButton.classList.contains('is-open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    
    // Event listener for overlay click to close menu
    overlay.addEventListener('click', closeMobileMenu);

    // Close mobile menu when a link inside it is clicked
    const mobileNavLinks = mobileSideMenu ? mobileSideMenu.querySelectorAll('.nav-link') : [];
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });


    // --- Dynamic Header Color Change Logic ---
    const mainHeader = document.getElementById('mainHeader');
    const headerTitleSpan = mainHeader ? mainHeader.querySelector('#headerTitleSpan') : null;
    const allNavLinks = document.querySelectorAll('.nav-link');

    function handleHeaderScroll() {
        if (!mainHeader) return;

        const scrollPosition = window.scrollY;
        const grayTextColorClass = 'text-gray-700';

        if (scrollPosition > 50) {
            mainHeader.classList.add('scrolled-header');
            if (headerTitleSpan) {
                headerTitleSpan.classList.remove('text-white');
                headerTitleSpan.classList.add(grayTextColorClass);
            }
            allNavLinks.forEach(link => {
                if (!link.closest('#mobileSideMenu')) { // Don't change mobile menu links
                    link.classList.remove('text-white');
                    link.classList.add(grayTextColorClass);
                }
            });
        } else {
            mainHeader.classList.remove('scrolled-header');
            if (headerTitleSpan) {
                headerTitleSpan.classList.remove(grayTextColorClass);
                headerTitleSpan.classList.add('text-white');
            }
            allNavLinks.forEach(link => {
                 if (!link.closest('#mobileSideMenu')) {
                    link.classList.remove(grayTextColorClass);
                    link.classList.add('text-white');
                }
            });
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
            if (this.closest('#mobileSideMenu')) {
                closeMobileMenu();
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
        const offset = mainHeader ? mainHeader.offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - offset - window.innerHeight / 3) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            const targetId = linkHref.startsWith('#') ? linkHref.slice(1) : null;

            if (targetId && targetId === currentSectionId) {
                link.classList.add('active');
            } else if (linkHref === 'index.html' && currentSectionId === '') {
                link.classList.add('active');
            }
        });
    }

    // --- Back to Top Button Functionality ---
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&#8593;'; // Unicode for upward arrow
    backToTopButton.classList.add(
        'back-to-top', 'fixed', 'bottom-6', 'right-6', 'bg-blue-600',
        'text-white', 'p-3', 'rounded-full', 'shadow-md',
        'transition-opacity', 'duration-300', 'z-50', 'cursor-pointer',
        'hover:bg-blue-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'focus:ring-opacity-50'
    );
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
