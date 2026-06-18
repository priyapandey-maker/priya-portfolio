/* ==========================================================================
   PORTFOLIO INTERACTION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Typewriter Effect Logic
    const typedTextSpan = document.getElementById('typed-text');
    const textArray = ["UI that makes sense.", "with purpose.", "AI agents."];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between full words
    let textArrayIndex = 0;
    let charIndex = 0;
    let isErasing = false;

    function type() {
        const currentWord = textArray[textArrayIndex];
        
        if (!isErasing) {
            // Typing characters
            typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                // Word is fully typed, pause before erasing
                isErasing = true;
                setTimeout(type, newTextDelay);
            } else {
                setTimeout(type, typingDelay);
            }
        } else {
            // Erasing characters
            typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                // Word is fully erased, move to next word
                isErasing = false;
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, 500); // Small pause after deletion
            } else {
                setTimeout(type, erasingDelay);
            }
        }
    }

    // Initialize typewriter delay on load
    if (typedTextSpan) {
        setTimeout(type, 800);
    }

    // 3. Floating Navbar Shrink on Scroll
    const header = document.querySelector('.navbar-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('navbar-scrolled');
        } else {
            header.classList.remove('navbar-scrolled');
        }
    });

    // 4. Mobile Menu Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openMenu = () => {
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    const closeMenu = () => {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Unlock background scroll
    };

    if (menuToggle && mobileOverlay && mobileClose) {
        menuToggle.addEventListener('click', openMenu);
        mobileClose.addEventListener('click', closeMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // 5. Scroll Reveal Intersection Observer
    const revealItems = document.querySelectorAll('.reveal-card, .text-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once animated, we don't need to observe it anymore
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null, // Viewport
            rootMargin: '0px',
            threshold: 0.12 // Trigger when 12% of the item is visible
        });

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        revealItems.forEach(item => {
            item.classList.add('active');
        });
    }

    // 6. Smooth Scroll Back-To-Top or link navigation
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
