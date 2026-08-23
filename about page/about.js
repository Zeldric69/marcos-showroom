import { renderNavbar, renderFooter, initConfiguratorModal } from '../main/components.js';

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize global header, footer, and modals
    renderNavbar('about');
    renderFooter();
    initConfiguratorModal();

    // 2. Populate company history text safely
    const historyElement = document.getElementById('company-history');
    if (historyElement) {
        historyElement.textContent = 
            "Marcos Premium was founded on the principle of automotive excellence, providing unmatched service to enthusiasts since 2020.";
    }

    // 3. Optional: Smooth number ticker animation for the stats banner
    const statElements = document.querySelectorAll('.display-5');
    
    const animateCounter = (el, target, suffix = "") => {
        let current = 0;
        const increment = target / 50; // Speed of counting
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target + suffix;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    };

    // Trigger number animations when stats come into view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.textContent.includes("130")) {
                    animateCounter(el, 130, "+");
                } else if (el.textContent.includes("100")) {
                    animateCounter(el, 100, "%");
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statElements.forEach(stat => {
        if (stat.textContent.includes("130") || stat.textContent.includes("100")) {
            observer.observe(stat);
        }
    });
});