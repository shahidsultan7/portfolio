document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileSideMenu = document.getElementById('mobileSideMenu');
    const closeMenuButton = document.getElementById('closeMenuButton');

    // Function to open the mobile menu
    function openMobileMenu() {
        if (mobileSideMenu) {
            mobileSideMenu.classList.remove('-translate-x-full');
            mobileSideMenu.classList.add('translate-x-0');
            document.body.style.overflow = 'hidden'; // Prevent scrolling on the main content
        }
    }

    // Function to close the mobile menu
    function closeMobileMenu() {
        if (mobileSideMenu) {
            mobileSideMenu.classList.remove('translate-x-0');
            mobileSideMenu.classList.add('-translate-x-full');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    // Event listener for opening the mobile menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', openMobileMenu);
    }

    // Event listener for closing the mobile menu
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when a link inside it is clicked
    const mobileNavLinks = mobileSideMenu ? mobileSideMenu.querySelectorAll('.nav-link') : [];
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });


    // --- Dynamic Header Color Change Logic ---
    const mainHeader = document.getElementById('mainHeader');
    // Target the span element by its ID for the header title
    const headerTitleSpan = mainHeader ? mainHeader.querySelector('#headerTitleSpan') : null;
    // Select all navigation links (both desktop and mobile)
    const allNavLinks = document.querySelectorAll('.nav-link');
    // Select the mobile menu button itself for color change
    // mobileMenuButton is already defined at the top, so we can use it directly.

    function handleHeaderScroll() {
        if (!mainHeader) return; // Exit if header not found

        const scrollPosition = window.scrollY;
        // Define the Tailwind class for the gray color
        const grayTextColorClass = 'text-gray-700'; // Using Tailwind's default gray-700

        if (scrollPosition > 50) {
            mainHeader.classList.add('scrolled-header');
            // Change header title color to gray
            if (headerTitleSpan) {
                headerTitleSpan.classList.remove('text-white');
                headerTitleSpan.classList.add(grayTextColorClass);
            }
            // Change all nav link colors to gray
            allNavLinks.forEach(link => {
                link.classList.remove('text-white');
                link.classList.add(grayTextColorClass);
            });
            // Change hamburger menu icon color to gray
            if (mobileMenuButton) {
                mobileMenuButton.classList.remove('text-white');
                mobileMenuButton.classList.add(grayTextColorClass);
            }
        } else {
            mainHeader.classList.remove('scrolled-header');
            // Revert header title color to white
            if (headerTitleSpan) {
                headerTitleSpan.classList.remove(grayTextColorClass);
                headerTitleSpan.classList.add('text-white');
            }
            // Revert all nav link colors to white
            allNavLinks.forEach(link => {
                link.classList.remove(grayTextColorClass);
                link.classList.add('text-white');
            });
            // Revert hamburger menu icon color to white
            if (mobileMenuButton) {
                mobileMenuButton.classList.remove(grayTextColorClass);
                mobileMenuButton.classList.add('text-white');
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
            // If it's a mobile nav link, also close the menu
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
    // navLinks is already defined as allNavLinks, but keeping for this function's scope
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLinkOnScroll() {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const offset = mainHeader ? mainHeader.offsetHeight : 0;
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
