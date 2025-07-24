document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileSideMenu = document.getElementById('mobileSideMenu');
    const mainHeader = document.getElementById('mainHeader');
    const headerTitleSpan = mainHeader ? mainHeader.querySelector('#headerTitleSpan') : null;
    const allNavLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const backToTopButton = document.createElement('button');
    const overlay = document.createElement('div');

    overlay.classList.add('fixed', 'inset-0', 'bg-black', 'z-40', 'transition-opacity', 'duration-300', 'ease-in-out');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    document.body.appendChild(overlay);

    function openMobileMenu() {
        if (mobileSideMenu) {
            mobileSideMenu.classList.remove('-translate-x-full');
            mobileSideMenu.classList.add('translate-x-0');
            mobileMenuButton.classList.add('is-open');
            overlay.style.opacity = '0.5';
            overlay.style.pointerEvents = 'auto';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        if (mobileSideMenu) {
            mobileSideMenu.classList.remove('translate-x-0');
            mobileSideMenu.classList.add('-translate-x-full');
            mobileMenuButton.classList.remove('is-open');
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            if (mobileMenuButton.classList.contains('is-open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    overlay.addEventListener('click', closeMobileMenu);

    const mobileNavLinks = mobileSideMenu ? mobileSideMenu.querySelectorAll('.nav-link') : [];
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

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
                if (!link.closest('#mobileSideMenu')) {
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

    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    function highlightNavLinkOnScroll() {
        let currentSectionId = '';
        const offset = mainHeader ? mainHeader.offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - offset - window.innerHeight / 3) {
                currentSectionId = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
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

    backToTopButton.id = 'backToTopBtn';
    backToTopButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
    `;
    backToTopButton.classList.add(
        'fixed', 'bottom-8', 'right-8', 'w-14', 'h-14',
        'rounded-full', 'shadow-lg', 'flex', 'items-center', 'justify-center',
        'z-50', 'cursor-pointer'
    );
    document.body.appendChild(backToTopButton);

    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

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

    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        highlightNavLinkOnScroll();
        toggleBackToTopButton();
        animateCards();
    });

    handleHeaderScroll();
    highlightNavLinkOnScroll();
    toggleBackToTopButton();
    animateCards();
});