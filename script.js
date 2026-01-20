
// Custom Cursor with requestAnimationFrame (non-blocking)
// Custom Cursor with requestAnimationFrame (non-blocking)
// Only initialize on devices with a fine pointer (mouse) to save resources on mobile
if (window.matchMedia("(pointer: fine)").matches) {
    const cursorDot = document.querySelector("#cursor-dot");
    const cursorOutline = document.querySelector("#cursor-outline");

    if (cursorDot && cursorOutline) {
        let lastX = 0, lastY = 0, outlineX = 0, outlineY = 0;
        let animationFrameId = null;

        const updateOutline = () => {
            outlineX += (lastX - outlineX) * 0.2;
            outlineY += (lastY - outlineY) * 0.2;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            animationFrameId = requestAnimationFrame(updateOutline);
        };

        window.addEventListener("mousemove", (e) => {
            lastX = e.clientX;
            lastY = e.clientY;
            cursorDot.style.left = `${lastX}px`;
            cursorDot.style.top = `${lastY}px`;
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateOutline);
            }
        }, { passive: true });
    }
}

// Mobile Menu Toggle with Accessibility
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Active Link Highlight on Scroll (Throttled)
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');
let lastScrollTime = 0;
const scrollThrottle = 100;

window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime < scrollThrottle) return;
    lastScrollTime = now;

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
}, { passive: true });

// Fade In Animation using Intersection Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .project-card, .about-card, .glass-card').forEach(el => {
    el.classList.add('fade-in-section');
    observer.observe(el);
});
